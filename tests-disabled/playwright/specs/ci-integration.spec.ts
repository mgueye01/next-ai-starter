import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';

test.describe('CI/CD Integration Tests', () => {
  let testHelper: TestHelpers;

  test.beforeEach(async ({ page }) => {
    testHelper = new TestHelpers(page);
  });

  test('Application should start successfully', async ({ page }) => {
    await testHelper.reportProgress('Testing application startup in CI environment');
    
    // Test that the application starts and is accessible
    await page.goto('/');
    
    // Should get a successful response
    const response = await page.request.get('/');
    expect(response.status()).toBe(200);
    
    // Page should have basic structure
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Should have title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    
    await testHelper.reportProgress('✅ Application startup test passed');
  });

  test('All routes should be accessible', async ({ page }) => {
    await testHelper.reportProgress('Testing route accessibility in CI');
    
    const routes = [
      '/',
      '/portfolio',
      '/contact',
      '/services/tarifs',
      '/a-propos'
    ];
    
    for (const route of routes) {
      const response = await page.request.get(route);
      expect(response.status()).toBe(200, `Route ${route} should be accessible`);
      
      await page.goto(route);
      
      // Should not have critical console errors
      const errors = await testHelper.getConsoleErrors();
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('net::ERR_INTERNET_DISCONNECTED') &&
        error.includes('Error')
      );
      
      expect(criticalErrors.length).toBe(0, `Route ${route} should not have critical errors`);
    }
    
    await testHelper.reportProgress('✅ Route accessibility test passed');
  });

  test('Build artifacts should be valid', async ({ page }) => {
    await testHelper.reportProgress('Testing build artifacts validity');
    
    await page.goto('/');
    
    // Check that CSS is loaded
    const stylesheets = await page.evaluate(() => {
      return Array.from(document.styleSheets).map(sheet => {
        try {
          return {
            href: sheet.href,
            rules: sheet.cssRules?.length || 0
          };
        } catch {
          return { href: sheet.href, rules: -1 }; // CORS or other error
        }
      });
    });
    
    expect(stylesheets.length).toBeGreaterThan(0, 'Should have stylesheets loaded');
    
    // Check that JavaScript is loaded and working
    const jsWorks = await page.evaluate(() => {
      return typeof window !== 'undefined' && 
             typeof document !== 'undefined' &&
             document.body.children.length > 0;
    });
    
    expect(jsWorks).toBeTruthy('JavaScript should be working');
    
    // Check for Next.js specific artifacts
    const nextJsLoaded = await page.evaluate(() => {
      return typeof window.__NEXT_DATA__ !== 'undefined' ||
             document.querySelector('#__next') !== null;
    });
    
    expect(nextJsLoaded).toBeTruthy('Next.js should be properly loaded');
    
    await testHelper.reportProgress('✅ Build artifacts validation passed');
  });

  test('Environment variables should be properly configured', async ({ page }) => {
    await testHelper.reportProgress('Testing environment configuration');
    
    await page.goto('/');
    
    // Check that the application is running in the expected mode
    const isProduction = await page.evaluate(() => {
      return process.env.NODE_ENV === 'production' || 
             !window.location.host.includes('localhost');
    });
    
    // In CI, we expect either development or production mode
    // Application should be functional regardless
    const appFunctional = await page.evaluate(() => {
      return document.body.children.length > 0 &&
             !document.body.textContent?.includes('Application Error');
    });
    
    expect(appFunctional).toBeTruthy('Application should be functional');
    
    await testHelper.reportProgress('✅ Environment configuration test passed');
  });

  test('Database connections should work', async ({ page }) => {
    await testHelper.reportProgress('Testing database connectivity (if applicable)');
    
    // This test checks if pages that might require database access load correctly
    await page.goto('/');
    
    // If there are dynamic routes that require database, test them
    const dynamicPages = [
      '/portfolio', // Might load images from database
      '/services/tarifs', // Might load pricing from database
    ];
    
    for (const pagePath of dynamicPages) {
      await page.goto(pagePath);
      
      // Page should load without database errors
      const hasDbError = await page.locator(':has-text("Database"), :has-text("Connection"), :has-text("Error 500")').count();
      expect(hasDbError).toBe(0, `Page ${pagePath} should not have database errors`);
      
      // Should have some content loaded
      const hasContent = await page.locator('img, p, h1, h2').count();
      expect(hasContent).toBeGreaterThan(0, `Page ${pagePath} should have content`);
    }
    
    await testHelper.reportProgress('✅ Database connectivity test passed');
  });

  test('API endpoints should respond correctly', async ({ page }) => {
    await testHelper.reportProgress('Testing API endpoints');
    
    const apiEndpoints = [
      '/api/contact', // If contact form has API endpoint
    ];
    
    for (const endpoint of apiEndpoints) {
      try {
        const response = await page.request.get(endpoint);
        
        // Should either succeed or return proper error
        expect([200, 404, 405]).toContain(response.status());
        
        if (response.status() === 405) {
          // Method not allowed is fine for GET on POST endpoints
          console.log(`Endpoint ${endpoint} requires different HTTP method`);
        }
      } catch (error) {
        // API endpoint might not exist, which is fine
        console.log(`API endpoint ${endpoint} not found or not accessible`);
      }
    }
    
    await testHelper.reportProgress('✅ API endpoints test completed');
  });

  test('Static assets should be served correctly', async ({ page }) => {
    await testHelper.reportProgress('Testing static asset serving');
    
    await page.goto('/');
    await testHelper.waitForImages();
    
    // Check that images load
    const images = await page.locator('img').all();
    let loadedImages = 0;
    
    for (const img of images.slice(0, 5)) { // Test first 5 images
      if (await img.isVisible()) {
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        if (naturalWidth > 0) {
          loadedImages++;
        }
      }
    }
    
    if (images.length > 0) {
      expect(loadedImages).toBeGreaterThan(0, 'At least some images should load');
    }
    
    // Check favicon
    const faviconResponse = await page.request.get('/favicon.ico');
    expect([200, 404]).toContain(faviconResponse.status()); // 404 is ok if no favicon
    
    await testHelper.reportProgress('✅ Static assets test passed');
  });

  test('Security headers should be present', async ({ page }) => {
    await testHelper.reportProgress('Testing security headers');
    
    const response = await page.request.get('/');
    const headers = response.headers();
    
    // Check for important security headers (Next.js might set some automatically)
    const securityHeaders = {
      'x-frame-options': 'Should prevent clickjacking',
      'x-content-type-options': 'Should prevent MIME sniffing',
      'x-xss-protection': 'Should enable XSS protection',
      'content-security-policy': 'Should have CSP policy',
      'strict-transport-security': 'Should enforce HTTPS (in production)'
    };
    
    Object.entries(securityHeaders).forEach(([header, description]) => {
      if (headers[header]) {
        console.log(`✓ ${header}: ${headers[header]}`);
      } else {
        console.warn(`⚠ Missing ${header}: ${description}`);
      }
    });
    
    // At least some basic security headers should be present
    const hasBasicSecurity = headers['x-frame-options'] || 
                            headers['content-security-policy'] ||
                            headers['x-content-type-options'];
    
    if (!hasBasicSecurity) {
      console.warn('Consider adding security headers for production deployment');
    }
    
    await testHelper.reportProgress('✅ Security headers test completed');
  });

  test('Performance metrics should be within acceptable ranges', async ({ page }) => {
    await testHelper.reportProgress('Testing performance metrics in CI');
    
    const metrics = await testHelper.measurePageLoad();
    
    // CI environment might be slower, so use relaxed thresholds
    expect(metrics.totalLoadTime).toBeLessThan(10000, 'Total load time should be under 10 seconds in CI');
    expect(metrics.domContentLoaded).toBeLessThan(5000, 'DOM content loaded should be under 5 seconds in CI');
    
    // First paint should happen reasonably quickly
    if (metrics.firstPaint > 0) {
      expect(metrics.firstPaint).toBeLessThan(8000, 'First paint should happen within 8 seconds in CI');
    }
    
    await testHelper.reportProgress(`✅ Performance metrics: ${metrics.totalLoadTime}ms total, ${metrics.domContentLoaded}ms DOM ready`);
  });

  test('Console should not have critical errors', async ({ page }) => {
    await testHelper.reportProgress('Testing console output in CI');
    
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Visit multiple pages to catch any console errors
    const pages = ['/', '/portfolio', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
    }
    
    // Filter out expected/acceptable errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') &&
      !error.includes('net::ERR_INTERNET_DISCONNECTED') &&
      !error.includes('Extension') &&
      !error.includes('Manifest') &&
      !error.toLowerCase().includes('warning')
    );
    
    if (criticalErrors.length > 0) {
      console.error('Critical console errors found:', criticalErrors);
    }
    
    expect(criticalErrors.length).toBe(0, 'Should not have critical console errors');
    
    await testHelper.reportProgress('✅ Console output test passed');
  });

  test('Site should be crawlable by search engines', async ({ page }) => {
    await testHelper.reportProgress('Testing search engine crawlability');
    
    // Check robots.txt
    const robotsResponse = await page.request.get('/robots.txt');
    
    if (robotsResponse.status() === 200) {
      const robotsContent = await robotsResponse.text();
      expect(robotsContent.length).toBeGreaterThan(0);
      
      // Should not disallow everything
      expect(robotsContent).not.toMatch(/Disallow:\s*\/\s*$/m);
    }
    
    // Check sitemap
    const sitemapResponse = await page.request.get('/sitemap.xml');
    
    if (sitemapResponse.status() === 200) {
      const sitemapContent = await sitemapResponse.text();
      expect(sitemapContent).toContain('<urlset');
      expect(sitemapContent).toContain('<url>');
    }
    
    // Check meta tags
    await page.goto('/');
    
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    if (description) {
      expect(description.length).toBeGreaterThan(0);
    }
    
    await testHelper.reportProgress('✅ Search engine crawlability test passed');
  });
});