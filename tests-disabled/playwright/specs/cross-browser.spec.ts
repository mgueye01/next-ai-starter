import { test, expect, devices } from '@playwright/test';
import { TestHelpers, PHOTOGRAPHER_PAGES } from '../utils/test-helpers';

test.describe('Cross-Browser Compatibility Tests', () => {
  const browsers = ['chromium', 'firefox', 'webkit'];
  
  browsers.forEach(browserName => {
    test.describe(`${browserName} compatibility`, () => {
      let testHelper: TestHelpers;

      test.beforeEach(async ({ page }) => {
        testHelper = new TestHelpers(page);
      });

      PHOTOGRAPHER_PAGES.forEach(pagePath => {
        test(`${pagePath} should render correctly in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
          test.skip(currentBrowser !== browserName, `Only run on ${browserName}`);
          
          await testHelper.reportProgress(`Testing ${pagePath} cross-browser compatibility on ${browserName}`);
          
          // Navigate to page
          await page.goto(pagePath);
          await page.waitForLoadState('networkidle');
          
          // Check basic page structure
          const body = page.locator('body');
          await expect(body).toBeVisible();
          
          // Check for main content
          const mainContent = page.locator('main, [role="main"], .main-content, body > div');
          await expect(mainContent.first()).toBeVisible();
          
          // Check for navigation
          const nav = page.locator('nav, [role="navigation"], .navbar');
          if (await nav.count() > 0) {
            await expect(nav.first()).toBeVisible();
          }
          
          // Check for images loading
          await testHelper.waitForImages();
          const images = await page.locator('img').all();
          
          for (const img of images.slice(0, 3)) {
            if (await img.isVisible()) {
              const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
              expect(naturalWidth).toBeGreaterThan(0);
            }
          }
          
          // Check for JavaScript errors
          const errors = await testHelper.getConsoleErrors();
          const criticalErrors = errors.filter(error => 
            !error.includes('favicon') && 
            !error.includes('net::ERR') &&
            !error.includes('Extension')
          );
          
          expect(criticalErrors).toHaveLength(0);
          
          // Take screenshot for visual comparison
          await page.screenshot({
            path: `tests/playwright/screenshots/${browserName}-${pagePath.replace(/\//g, '-') || 'home'}.png`,
            fullPage: true
          });
          
          await testHelper.reportProgress(`✅ ${pagePath} compatible with ${browserName}`);
        });
      });

      test(`CSS features should work in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
        test.skip(currentBrowser !== browserName, `Only run on ${browserName}`);
        
        await testHelper.reportProgress(`Testing CSS features in ${browserName}`);
        
        await page.goto('/');
        
        // Test CSS Grid support
        const hasGrid = await page.evaluate(() => {
          const div = document.createElement('div');
          div.style.display = 'grid';
          return div.style.display === 'grid';
        });
        expect(hasGrid).toBeTruthy();
        
        // Test Flexbox support
        const hasFlex = await page.evaluate(() => {
          const div = document.createElement('div');
          div.style.display = 'flex';
          return div.style.display === 'flex';
        });
        expect(hasFlex).toBeTruthy();
        
        // Test CSS Variables support
        const hasVariables = await page.evaluate(() => {
          return CSS.supports('color', 'var(--test-color)');
        });
        expect(hasVariables).toBeTruthy();
        
        // Test modern CSS features
        const modernFeatures = await page.evaluate(() => {
          const features = {
            transforms: CSS.supports('transform', 'translateX(10px)'),
            transitions: CSS.supports('transition', 'all 0.3s ease'),
            borderRadius: CSS.supports('border-radius', '10px'),
            boxShadow: CSS.supports('box-shadow', '0 0 10px rgba(0,0,0,0.1)'),
            gradients: CSS.supports('background', 'linear-gradient(to right, red, blue)')
          };
          return features;
        });
        
        Object.entries(modernFeatures).forEach(([feature, supported]) => {
          expect(supported).toBeTruthy(`${feature} should be supported in ${browserName}`);
        });
        
        await testHelper.reportProgress(`✅ CSS features compatible with ${browserName}`);
      });

      test(`JavaScript features should work in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
        test.skip(currentBrowser !== browserName, `Only run on ${browserName}`);
        
        await testHelper.reportProgress(`Testing JavaScript features in ${browserName}`);
        
        await page.goto('/');
        
        // Test ES6+ features
        const jsFeatures = await page.evaluate(() => {
          const features = {
            arrow_functions: typeof (() => {}) === 'function',
            const_let: (() => { try { eval('const x = 1'); return true; } catch { return false; } })(),
            template_literals: `test ${1}` === 'test 1',
            promises: typeof Promise !== 'undefined',
            fetch: typeof fetch !== 'undefined',
            async_await: (async () => {}).constructor.name === 'AsyncFunction',
            classes: typeof class {} === 'function',
            modules: typeof import !== 'undefined',
            destructuring: (() => { try { const [a] = [1]; return true; } catch { return false; } })(),
            spread_operator: (() => { try { const arr = [...[1,2,3]]; return arr.length === 3; } catch { return false; } })()
          };
          return features;
        });
        
        Object.entries(jsFeatures).forEach(([feature, supported]) => {
          expect(supported).toBeTruthy(`${feature} should be supported in ${browserName}`);
        });
        
        // Test DOM API support
        const domFeatures = await page.evaluate(() => {
          return {
            querySelector: typeof document.querySelector === 'function',
            addEventListener: typeof document.addEventListener === 'function',
            classList: document.body.classList !== undefined,
            dataset: document.body.dataset !== undefined,
            customElements: typeof customElements !== 'undefined',
            intersectionObserver: typeof IntersectionObserver !== 'undefined',
            mutationObserver: typeof MutationObserver !== 'undefined'
          };
        });
        
        Object.entries(domFeatures).forEach(([feature, supported]) => {
          if (feature === 'intersectionObserver' && browserName === 'webkit') {
            // IntersectionObserver might not be available in older WebKit
            return;
          }
          expect(supported).toBeTruthy(`${feature} should be supported in ${browserName}`);
        });
        
        await testHelper.reportProgress(`✅ JavaScript features compatible with ${browserName}`);
      });

      test(`Fonts should load correctly in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
        test.skip(currentBrowser !== browserName, `Only run on ${browserName}`);
        
        await testHelper.reportProgress(`Testing font loading in ${browserName}`);
        
        await page.goto('/');
        
        // Wait for fonts to load
        await page.evaluate(() => {
          if ('fonts' in document) {
            return document.fonts.ready;
          }
          return Promise.resolve();
        });
        
        // Check computed font families
        const fontFamilies = await page.evaluate(() => {
          const elements = [document.body, document.querySelector('h1'), document.querySelector('p')];
          return elements.map(el => {
            if (el) {
              return {
                element: el.tagName,
                fontFamily: window.getComputedStyle(el).fontFamily,
                fontSize: window.getComputedStyle(el).fontSize
              };
            }
            return null;
          }).filter(Boolean);
        });
        
        // Fonts should be applied
        fontFamilies.forEach(font => {
          expect(font.fontFamily).toBeTruthy();
          expect(font.fontSize).toBeTruthy();
          expect(font.fontFamily).not.toBe('Times'); // Should not fall back to default serif
        });
        
        await testHelper.reportProgress(`✅ Font loading compatible with ${browserName}`);
      });

      test(`Responsive design should work in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
        test.skip(currentBrowser !== browserName, `Only run on ${browserName}`);
        
        await testHelper.reportProgress(`Testing responsive design in ${browserName}`);
        
        const viewports = [
          { width: 375, height: 667, name: 'mobile' },
          { width: 768, height: 1024, name: 'tablet' },
          { width: 1440, height: 900, name: 'desktop' }
        ];
        
        for (const viewport of viewports) {
          await page.setViewportSize(viewport);
          await page.goto('/');
          
          // Check for responsive behavior
          const bodyWidth = await page.evaluate(() => document.body.clientWidth);
          expect(bodyWidth).toBeCloseTo(viewport.width, 50); // Allow some margin
          
          // Check for mobile-specific elements
          if (viewport.name === 'mobile') {
            const mobileMenu = page.locator('.mobile-menu, .hamburger, [aria-label*="menu"]');
            // Mobile menu might be present (not required)
          }
          
          // Check that content fits viewport
          const hasOverflow = await page.evaluate(() => {
            return document.body.scrollWidth > window.innerWidth;
          });
          expect(hasOverflow).toBeFalsy(`No horizontal overflow on ${viewport.name} in ${browserName}`);
        }
        
        await testHelper.reportProgress(`✅ Responsive design compatible with ${browserName}`);
      });

      test(`Form functionality should work in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
        test.skip(currentBrowser !== browserName, `Only run on ${browserName}`);
        
        await testHelper.reportProgress(`Testing form functionality in ${browserName}`);
        
        await page.goto('/contact');
        
        // Find form elements
        const form = page.locator('form').first();
        
        if (await form.count() > 0) {
          const nameField = page.locator('input[name*="name"], input[placeholder*="nom"]').first();
          const emailField = page.locator('input[type="email"], input[name*="email"]').first();
          const messageField = page.locator('textarea, input[name*="message"]').first();
          
          // Test form interaction
          if (await nameField.count() > 0) {
            await nameField.fill('Test User');
            const value = await nameField.inputValue();
            expect(value).toBe('Test User');
          }
          
          if (await emailField.count() > 0) {
            await emailField.fill('test@example.com');
            const value = await emailField.inputValue();
            expect(value).toBe('test@example.com');
            
            // Test validation
            await emailField.clear();
            await emailField.fill('invalid-email');
            const isValid = await emailField.evaluate((el: HTMLInputElement) => el.validity.valid);
            expect(isValid).toBeFalsy();
          }
          
          if (await messageField.count() > 0) {
            await messageField.fill('Test message');
            const value = await messageField.inputValue();
            expect(value).toBe('Test message');
          }
        }
        
        await testHelper.reportProgress(`✅ Form functionality compatible with ${browserName}`);
      });
    });
  });

  test('Visual consistency across browsers', async ({ page }) => {
    await testHelper.reportProgress('Testing visual consistency across browsers');
    
    // This test runs once and compares screenshots
    // (In a real scenario, you'd use a visual regression testing tool)
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take a baseline screenshot
    await page.screenshot({
      path: 'tests/playwright/screenshots/baseline-homepage.png',
      fullPage: true
    });
    
    // Test critical UI elements are present
    const criticalElements = [
      'body',
      'h1, h2, .title',
      'nav, [role="navigation"]',
      'img',
      'a[href]',
      'button'
    ];
    
    for (const selector of criticalElements) {
      const elements = page.locator(selector);
      if (await elements.count() > 0) {
        await expect(elements.first()).toBeVisible();
      }
    }
    
    await testHelper.reportProgress('✅ Visual consistency test completed');
  });

  test('Feature detection and graceful degradation', async ({ page }) => {
    await testHelper.reportProgress('Testing feature detection and graceful degradation');
    
    await page.goto('/');
    
    // Test feature detection patterns
    const featureSupport = await page.evaluate(() => {
      const features = {
        // Modern web features
        webp: (function() {
          const canvas = document.createElement('canvas');
          canvas.width = 1;
          canvas.height = 1;
          return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
        })(),
        
        // CSS features
        cssGrid: CSS.supports('display', 'grid'),
        cssCustomProperties: CSS.supports('color', 'var(--test)'),
        
        // JavaScript features
        intersectionObserver: 'IntersectionObserver' in window,
        resizeObserver: 'ResizeObserver' in window,
        
        // Storage features
        localStorage: 'localStorage' in window,
        sessionStorage: 'sessionStorage' in window,
        
        // Network features
        serviceWorker: 'serviceWorker' in navigator,
        fetch: 'fetch' in window
      };
      
      return features;
    });
    
    // Log feature support for debugging
    console.log('Feature support:', featureSupport);
    
    // Essential features should be supported
    expect(featureSupport.localStorage).toBeTruthy();
    expect(featureSupport.fetch).toBeTruthy();
    
    // Test that page works even without modern features
    await page.addInitScript(() => {
      // Simulate older browser by removing modern features
      delete (window as any).IntersectionObserver;
      delete (window as any).ResizeObserver;
    });
    
    await page.reload();
    
    // Page should still be functional
    const isPageFunctional = await page.evaluate(() => {
      return document.body.children.length > 0;
    });
    
    expect(isPageFunctional).toBeTruthy();
    
    await testHelper.reportProgress('✅ Feature detection test completed');
  });
});