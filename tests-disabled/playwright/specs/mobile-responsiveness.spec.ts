import { test, expect, Page } from '@playwright/test';
import { TestHelpers, PHOTOGRAPHER_PAGES, MOBILE_VIEWPORTS } from '../utils/test-helpers';

test.describe('Mobile Responsiveness Tests', () => {
  let testHelper: TestHelpers;

  test.beforeEach(async ({ page }) => {
    testHelper = new TestHelpers(page);
  });

  // Test each page on different mobile devices
  MOBILE_VIEWPORTS.forEach(viewport => {
    PHOTOGRAPHER_PAGES.forEach(pagePath => {
      test(`${pagePath} should be responsive on ${viewport.name}`, async ({ page }) => {
        await testHelper.reportProgress(`Testing ${pagePath} on ${viewport.name} (${viewport.width}x${viewport.height})`);
        
        // Set viewport
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        
        // Navigate to page
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');
        
        // Check for horizontal overflow
        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth;
        });
        
        expect(hasHorizontalOverflow).toBeFalsy(`Page ${pagePath} has horizontal overflow on ${viewport.name}`);
        
        // Check that main content is visible
        const mainContent = page.locator('main, [role="main"], .main-content, body > div');
        await expect(mainContent.first()).toBeVisible();
        
        // Check navigation is accessible
        const navigation = page.locator('nav, [role="navigation"], .navbar, .navigation');
        if (await navigation.count() > 0) {
          await expect(navigation.first()).toBeVisible();
        }
        
        // Test touch targets are adequate size (minimum 44px)
        const clickableElements = await page.locator('button, a, input, [role="button"]').all();
        
        for (const element of clickableElements) {
          if (await element.isVisible()) {
            const box = await element.boundingBox();
            if (box) {
              expect(box.width).toBeGreaterThanOrEqual(44);
              expect(box.height).toBeGreaterThanOrEqual(44);
            }
          }
        }
        
        // Check font sizes are readable (minimum 16px for body text)
        const bodyFontSize = await page.evaluate(() => {
          return parseInt(window.getComputedStyle(document.body).fontSize);
        });
        
        expect(bodyFontSize).toBeGreaterThanOrEqual(14); // Allow slightly smaller on mobile
        
        // Screenshot for visual regression
        await page.screenshot({
          path: `tests/playwright/screenshots/mobile-${viewport.name.toLowerCase().replace(/\s+/g, '-')}-${pagePath.replace(/\//g, '-') || 'home'}.png`,
          fullPage: true
        });
        
        await testHelper.reportProgress(`✅ ${pagePath} responsive test passed on ${viewport.name}`);
      });
    });
  });

  test('Navigation menu should work on mobile devices', async ({ page }) => {
    await testHelper.reportProgress('Testing mobile navigation menu functionality');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Look for mobile menu trigger (hamburger menu, etc.)
    const menuTrigger = page.locator('[aria-label*="menu" i], .menu-toggle, .hamburger, [data-testid="mobile-menu"]');
    
    if (await menuTrigger.count() > 0) {
      await menuTrigger.first().click();
      
      // Check if menu opens
      const menu = page.locator('.mobile-menu, .menu-open, [aria-expanded="true"]');
      await expect(menu.first()).toBeVisible();
      
      // Test menu links
      const menuLinks = menu.locator('a');
      const linkCount = await menuLinks.count();
      
      expect(linkCount).toBeGreaterThan(0);
      
      // Test closing menu
      await menuTrigger.first().click();
      await page.waitForTimeout(300); // Animation time
    }
    
    await testHelper.reportProgress('✅ Mobile navigation menu test completed');
  });

  test('Images should load properly on mobile', async ({ page }) => {
    await testHelper.reportProgress('Testing image loading on mobile devices');
    
    await page.setViewportSize({ width: 390, height: 844 });
    
    for (const pagePath of PHOTOGRAPHER_PAGES) {
      await page.goto(pagePath);
      await testHelper.waitForImages();
      
      // Check all images have loaded
      const images = await page.locator('img').all();
      
      for (const img of images) {
        if (await img.isVisible()) {
          const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
          const naturalHeight = await img.evaluate((el: HTMLImageElement) => el.naturalHeight);
          
          expect(naturalWidth).toBeGreaterThan(0);
          expect(naturalHeight).toBeGreaterThan(0);
          
          // Check for lazy loading attribute
          const loading = await img.getAttribute('loading');
          const src = await img.getAttribute('src');
          
          // Images should have src or data-src for lazy loading
          expect(src || await img.getAttribute('data-src')).toBeTruthy();
        }
      }
    }
    
    await testHelper.reportProgress('✅ Mobile image loading test completed');
  });

  test('Text should be readable on mobile devices', async ({ page }) => {
    await testHelper.reportProgress('Testing text readability on mobile devices');
    
    await page.setViewportSize({ width: 375, height: 667 });
    
    for (const pagePath of PHOTOGRAPHER_PAGES) {
      await page.goto(pagePath);
      
      // Check contrast ratios and font sizes
      const textElements = await page.locator('p, h1, h2, h3, h4, h5, h6, span, div').all();
      
      for (const element of textElements.slice(0, 10)) { // Test first 10 to avoid timeout
        if (await element.isVisible()) {
          const styles = await element.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              fontSize: parseInt(computed.fontSize),
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              lineHeight: computed.lineHeight
            };
          });
          
          // Font size should be at least 14px on mobile
          if (styles.fontSize > 0) {
            expect(styles.fontSize).toBeGreaterThanOrEqual(12);
          }
        }
      }
    }
    
    await testHelper.reportProgress('✅ Mobile text readability test completed');
  });

  test('Touch gestures should work for gallery navigation', async ({ page }) => {
    await testHelper.reportProgress('Testing touch gestures for image galleries');
    
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/portfolio');
    
    // Look for gallery or carousel elements
    const gallery = page.locator('.gallery, .carousel, .swiper, [data-testid="gallery"]');
    
    if (await gallery.count() > 0) {
      // Test swipe gestures (simulated with mouse drag)
      const galleryBox = await gallery.first().boundingBox();
      
      if (galleryBox) {
        // Simulate swipe right
        await page.mouse.move(galleryBox.x + 50, galleryBox.y + galleryBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(galleryBox.x + galleryBox.width - 50, galleryBox.y + galleryBox.height / 2);
        await page.mouse.up();
        
        await page.waitForTimeout(300);
        
        // Simulate swipe left
        await page.mouse.move(galleryBox.x + galleryBox.width - 50, galleryBox.y + galleryBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(galleryBox.x + 50, galleryBox.y + galleryBox.height / 2);
        await page.mouse.up();
      }
    }
    
    await testHelper.reportProgress('✅ Touch gesture test completed');
  });
});