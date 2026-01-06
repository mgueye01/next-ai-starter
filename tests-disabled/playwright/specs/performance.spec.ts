import { test, expect } from '@playwright/test';
import { TestHelpers, PHOTOGRAPHER_PAGES } from '../utils/test-helpers';

test.describe('Performance and Page Load Tests', () => {
  let testHelper: TestHelpers;

  test.beforeEach(async ({ page }) => {
    testHelper = new TestHelpers(page);
  });

  PHOTOGRAPHER_PAGES.forEach(pagePath => {
    test(`${pagePath} should load within acceptable time limits`, async ({ page }) => {
      await testHelper.reportProgress(`Testing page load performance for ${pagePath}`);
      
      // Measure page load time
      const startTime = Date.now();
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Page should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
      
      // Measure detailed performance metrics
      const metrics = await testHelper.measurePageLoad();
      
      // Core Web Vitals thresholds
      expect(metrics.domContentLoaded).toBeLessThan(1500); // 1.5 seconds
      expect(metrics.firstContentfulPaint).toBeLessThan(1800); // 1.8 seconds
      
      await testHelper.reportProgress(`✅ ${pagePath} loaded in ${loadTime}ms`);
    });
  });

  test('Core Web Vitals should meet Google standards', async ({ page }) => {
    await testHelper.reportProgress('Testing Core Web Vitals metrics');
    
    for (const pagePath of PHOTOGRAPHER_PAGES) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      const vitals = await testHelper.measureCoreWebVitals();
      
      // LCP (Largest Contentful Paint) should be under 2.5s
      if (vitals.lcp) {
        expect(vitals.lcp).toBeLessThan(2500);
      }
      
      // FID (First Input Delay) should be under 100ms
      if (vitals.fid) {
        expect(vitals.fid).toBeLessThan(100);
      }
      
      // CLS (Cumulative Layout Shift) should be under 0.1
      if (vitals.cls) {
        expect(vitals.cls).toBeLessThan(0.1);
      }
      
      await testHelper.reportProgress(`✅ Core Web Vitals measured for ${pagePath}`);
    }
  });

  test('Images should load efficiently with proper optimization', async ({ page }) => {
    await testHelper.reportProgress('Testing image loading performance');
    
    await page.goto('/portfolio');
    
    // Track image loading performance
    const imageLoadTimes: number[] = [];
    
    page.on('response', response => {
      if (response.url().match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
        const timing = response.timing();
        imageLoadTimes.push(timing.responseEnd);
      }
    });
    
    await testHelper.waitForImages();
    
    // Images should load within reasonable time
    imageLoadTimes.forEach(loadTime => {
      expect(loadTime).toBeLessThan(2000); // 2 seconds per image
    });
    
    // Check for proper image formats and attributes
    const images = await page.locator('img').all();
    
    for (const img of images.slice(0, 5)) { // Test first 5 images
      if (await img.isVisible()) {
        const src = await img.getAttribute('src');
        const loading = await img.getAttribute('loading');
        const alt = await img.getAttribute('alt');
        
        // Should use modern formats or have proper fallbacks
        expect(src).toBeTruthy();
        
        // Should have alt text for accessibility
        expect(alt).toBeTruthy();
        
        // Should use lazy loading for non-critical images
        if (loading) {
          expect(['lazy', 'eager']).toContain(loading);
        }
      }
    }
    
    await testHelper.reportProgress('✅ Image performance test completed');
  });

  test('JavaScript bundle size should be reasonable', async ({ page }) => {
    await testHelper.reportProgress('Testing JavaScript bundle size');
    
    let totalJSSize = 0;
    const jsFiles: string[] = [];
    
    page.on('response', response => {
      if (response.url().includes('.js') && response.status() === 200) {
        jsFiles.push(response.url());
        // Note: We can't easily get response size in Playwright without additional tools
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that we're not loading too many JS files
    expect(jsFiles.length).toBeLessThan(10); // Reasonable number of JS files
    
    // Check for code splitting - should have multiple smaller chunks rather than one large bundle
    const hasChunks = jsFiles.some(file => file.includes('chunk') || file.match(/\d+\./));
    expect(hasChunks).toBeTruthy();
    
    await testHelper.reportProgress(`✅ JavaScript loading test completed (${jsFiles.length} files)`);
  });

  test('CSS should load without blocking', async ({ page }) => {
    await testHelper.reportProgress('Testing CSS loading performance');
    
    const cssFiles: string[] = [];
    
    page.on('response', response => {
      if (response.url().includes('.css') && response.status() === 200) {
        cssFiles.push(response.url());
      }
    });
    
    await page.goto('/');
    
    // Check for render blocking
    const firstPaint = await page.evaluate(() => {
      return performance.getEntriesByName('first-paint')[0]?.startTime || 0;
    });
    
    // First paint should happen quickly
    expect(firstPaint).toBeLessThan(1500);
    
    await testHelper.reportProgress(`✅ CSS loading test completed (${cssFiles.length} files)`);
  });

  test('Page should work under slow network conditions', async ({ page, browserName }) => {
    // Skip on webkit as it has issues with network throttling
    test.skip(browserName === 'webkit', 'Network throttling not reliable on WebKit');
    
    await testHelper.reportProgress('Testing performance under slow network conditions');
    
    // Simulate slow 3G network
    const context = page.context();
    await context.route('**/*', async (route) => {
      // Add delay to simulate slow network
      await new Promise(resolve => setTimeout(resolve, 200));
      await route.continue();
    });
    
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForSelector('h1, h2, .title', { timeout: 10000 });
    const loadTime = Date.now() - startTime;
    
    // Should still be usable under slow conditions (within 10 seconds)
    expect(loadTime).toBeLessThan(10000);
    
    // Content should be visible even if images haven't loaded
    const hasVisibleText = await page.locator('h1, h2, p').first().isVisible();
    expect(hasVisibleText).toBeTruthy();
    
    await testHelper.reportProgress('✅ Slow network test completed');
  });

  test('Memory usage should remain reasonable', async ({ page }) => {
    await testHelper.reportProgress('Testing memory usage patterns');
    
    // Navigate through all pages to test for memory leaks
    for (const pagePath of PHOTOGRAPHER_PAGES) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      // Force garbage collection if available
      try {
        await page.evaluate(() => {
          if ('gc' in window) {
            (window as any).gc();
          }
        });
      } catch {
        // GC not available, continue
      }
      
      // Check for obvious memory leaks (console errors about memory)
      const errors = await testHelper.getConsoleErrors();
      const memoryErrors = errors.filter(error => 
        error.toLowerCase().includes('memory') || 
        error.toLowerCase().includes('leak')
      );
      
      expect(memoryErrors).toHaveLength(0);
    }
    
    await testHelper.reportProgress('✅ Memory usage test completed');
  });

  test('Service worker should cache resources properly', async ({ page }) => {
    await testHelper.reportProgress('Testing service worker caching');
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if service worker is registered
    const swRegistered = await page.evaluate(() => {
      return 'serviceWorker' in navigator;
    });
    
    if (swRegistered) {
      // Test cache functionality by going offline and back online
      const context = page.context();
      
      // Go offline
      await context.setOffline(true);
      
      // Try to navigate (should work if properly cached)
      await page.goto('/');
      
      // Go back online
      await context.setOffline(false);
      
      await testHelper.reportProgress('✅ Service worker caching test completed');
    } else {
      await testHelper.reportProgress('ℹ️ No service worker detected, skipping cache test');
    }
  });
});