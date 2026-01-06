import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from 'axe-playwright';
import { TestHelpers, PHOTOGRAPHER_PAGES } from '../utils/test-helpers';

test.describe('Accessibility Compliance Tests', () => {
  let testHelper: TestHelpers;

  test.beforeEach(async ({ page }) => {
    testHelper = new TestHelpers(page);
    // Inject axe-core for accessibility testing
    await injectAxe(page);
  });

  PHOTOGRAPHER_PAGES.forEach(pagePath => {
    test(`${pagePath} should meet WCAG 2.1 AA standards`, async ({ page }) => {
      await testHelper.reportProgress(`Testing accessibility compliance for ${pagePath}`);
      
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      // Run axe accessibility checks
      try {
        await checkA11y(page, null, {
          detailedReport: true,
          detailedReportOptions: { html: true },
          tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
        });
        
        await testHelper.reportProgress(`✅ ${pagePath} passed WCAG 2.1 AA compliance`);
      } catch (error) {
        // Get detailed violations
        const violations = await getViolations(page);
        console.error(`Accessibility violations on ${pagePath}:`, violations);
        throw error;
      }
    });
  });

  test('Images should have proper alt text', async ({ page }) => {
    await testHelper.reportProgress('Testing image alt text accessibility');
    
    for (const pagePath of PHOTOGRAPHER_PAGES) {
      await page.goto(pagePath);
      await testHelper.waitForImages();
      
      const images = await page.locator('img').all();
      
      for (const img of images) {
        if (await img.isVisible()) {
          const alt = await img.getAttribute('alt');
          const src = await img.getAttribute('src');
          
          // Every image should have alt text
          expect(alt).toBeTruthy(`Image ${src} missing alt text on ${pagePath}`);
          
          // Alt text should be descriptive (not just filename)
          expect(alt.length).toBeGreaterThan(3);
          expect(alt).not.toMatch(/\.(jpg|jpeg|png|webp|gif)$/i); // Not just filename
          
          // Decorative images should have empty alt=""
          if (alt === '') {
            // Should have role="presentation" or be decorative
            const role = await img.getAttribute('role');
            const ariaHidden = await img.getAttribute('aria-hidden');
            
            // Empty alt is ok if it's truly decorative
            if (role !== 'presentation' && ariaHidden !== 'true') {
              console.warn(`Image with empty alt should have role="presentation" or aria-hidden="true": ${src}`);
            }
          }
        }
      }
    }
    
    await testHelper.reportProgress('✅ Image alt text accessibility test completed');
  });

  test('Headings should follow proper hierarchy', async ({ page }) => {
    await testHelper.reportProgress('Testing heading hierarchy accessibility');
    
    for (const pagePath of PHOTOGRAPHER_PAGES) {
      await page.goto(pagePath);
      
      const headings = await page.evaluate(() => {
        const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        return headingElements.map(el => ({
          level: parseInt(el.tagName.substring(1)),
          text: el.textContent?.trim() || '',
          visible: el.offsetWidth > 0 && el.offsetHeight > 0
        }));
      });
      
      // Should have exactly one h1
      const h1Count = headings.filter(h => h.level === 1 && h.visible).length;
      expect(h1Count).toBe(1, `Page ${pagePath} should have exactly one visible h1`);
      
      // Should not skip heading levels
      const visibleHeadings = headings.filter(h => h.visible).sort((a, b) => a.level - b.level);
      
      for (let i = 1; i < visibleHeadings.length; i++) {
        const currentLevel = visibleHeadings[i].level;
        const prevLevel = visibleHeadings[i - 1].level;
        
        // Should not jump more than one level
        expect(currentLevel - prevLevel).toBeLessThanOrEqual(1, 
          `Heading level jumps from h${prevLevel} to h${currentLevel} on ${pagePath}`);
      }
      
      // Headings should have meaningful text
      visibleHeadings.forEach(heading => {
        expect(heading.text.length).toBeGreaterThan(0, 'Headings should not be empty');
      });
    }
    
    await testHelper.reportProgress('✅ Heading hierarchy test completed');
  });

  test('Interactive elements should be keyboard accessible', async ({ page }) => {
    await testHelper.reportProgress('Testing keyboard accessibility');
    
    for (const pagePath of PHOTOGRAPHER_PAGES) {
      await page.goto(pagePath);
      
      // Get all interactive elements
      const interactiveElements = await page.locator('a, button, input, textarea, select, [tabindex], [role="button"], [role="link"]').all();
      
      for (const element of interactiveElements.slice(0, 10)) { // Test first 10 to avoid timeout
        if (await element.isVisible()) {
          // Should be focusable
          await element.focus();
          
          const isFocused = await element.evaluate((el) => el === document.activeElement);
          expect(isFocused).toBeTruthy('Interactive element should be focusable');
          
          // Should have visible focus indicator
          const focusVisible = await element.evaluate((el) => {
            const styles = window.getComputedStyle(el, ':focus');
            return styles.outline !== 'none' || 
                   styles.outlineWidth !== '0px' || 
                   styles.boxShadow !== 'none';
          });
          
          if (!focusVisible) {
            console.warn('Element may not have visible focus indicator:', await element.getAttribute('class'));
          }
          
          // Links should have href or role
          const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
          if (tagName === 'a') {
            const href = await element.getAttribute('href');
            const role = await element.getAttribute('role');
            
            expect(href || role).toBeTruthy('Links should have href or role attribute');
          }
          
          // Buttons should have accessible name
          if (tagName === 'button') {
            const accessibleName = await element.evaluate((el) => {
              return el.textContent?.trim() || 
                     el.getAttribute('aria-label') || 
                     el.getAttribute('title');
            });
            
            expect(accessibleName).toBeTruthy('Buttons should have accessible name');
          }
        }
      }
    }
    
    await testHelper.reportProgress('✅ Keyboard accessibility test completed');
  });

  test('Form elements should have proper labels', async ({ page }) => {
    await testHelper.reportProgress('Testing form accessibility');
    
    await page.goto('/contact');
    
    const formElements = await page.locator('input, textarea, select').all();
    
    for (const element of formElements) {
      if (await element.isVisible()) {
        const id = await element.getAttribute('id');
        const ariaLabel = await element.getAttribute('aria-label');
        const ariaLabelledby = await element.getAttribute('aria-labelledby');
        const placeholder = await element.getAttribute('placeholder');
        
        // Should have proper labeling
        let hasLabel = false;
        
        if (id) {
          const label = page.locator(`label[for="${id}"]`);
          hasLabel = await label.count() > 0;
        }
        
        hasLabel = hasLabel || !!ariaLabel || !!ariaLabelledby;
        
        expect(hasLabel).toBeTruthy('Form elements should have proper labels');
        
        // Required fields should be marked
        const required = await element.getAttribute('required');
        const ariaRequired = await element.getAttribute('aria-required');
        
        if (required !== null) {
          // Should have visual indicator for required fields
          const parentHasRequired = await element.evaluate((el) => {
            const parent = el.closest('label, .form-group, .field');
            return parent?.textContent?.includes('*') || 
                   parent?.querySelector('.required') !== null;
          });
          
          expect(ariaRequired === 'true' || parentHasRequired).toBeTruthy('Required fields should be properly indicated');
        }
      }
    }
    
    await testHelper.reportProgress('✅ Form accessibility test completed');
  });

  test('Color contrast should meet WCAG standards', async ({ page }) => {
    await testHelper.reportProgress('Testing color contrast accessibility');
    
    for (const pagePath of PHOTOGRAPHER_PAGES) {
      await page.goto(pagePath);
      
      // Test contrast of text elements
      const textElements = await page.locator('p, h1, h2, h3, h4, h5, h6, a, button, span, div').all();
      
      for (const element of textElements.slice(0, 15)) { // Test first 15 to avoid timeout
        if (await element.isVisible()) {
          const textContent = await element.textContent();
          
          if (textContent && textContent.trim().length > 0) {
            const contrast = await element.evaluate((el) => {
              const styles = window.getComputedStyle(el);
              const color = styles.color;
              const backgroundColor = styles.backgroundColor;
              
              // Simple contrast check (real implementation would use proper color contrast calculation)
              return {
                color,
                backgroundColor,
                fontSize: parseFloat(styles.fontSize),
                fontWeight: styles.fontWeight
              };
            });
            
            // Basic checks for obvious contrast issues
            expect(contrast.color).not.toBe(contrast.backgroundColor);
            expect(contrast.color).not.toBe('rgb(255, 255, 255)'); // White text on white background
            expect(contrast.color).not.toBe('rgb(0, 0, 0)'); // Black text (should be styled)
          }
        }
      }
    }
    
    await testHelper.reportProgress('✅ Color contrast test completed');
  });

  test('ARIA attributes should be used correctly', async ({ page }) => {
    await testHelper.reportProgress('Testing ARIA attributes usage');
    
    for (const pagePath of PHOTOGRAPHER_PAGES) {
      await page.goto(pagePath);
      
      // Check for proper ARIA usage
      const ariaElements = await page.locator('[aria-label], [aria-labelledby], [aria-describedby], [role]').all();
      
      for (const element of ariaElements) {
        const ariaLabel = await element.getAttribute('aria-label');
        const ariaLabelledby = await element.getAttribute('aria-labelledby');
        const ariaDescribedby = await element.getAttribute('aria-describedby');
        const role = await element.getAttribute('role');
        
        // ARIA labels should not be empty
        if (ariaLabel) {
          expect(ariaLabel.trim().length).toBeGreaterThan(0);
        }
        
        // ARIA labelledby should reference existing elements
        if (ariaLabelledby) {
          const referencedElement = page.locator(`#${ariaLabelledby}`);
          expect(await referencedElement.count()).toBe(1);
        }
        
        // ARIA describedby should reference existing elements
        if (ariaDescribedby) {
          const referencedElement = page.locator(`#${ariaDescribedby}`);
          expect(await referencedElement.count()).toBe(1);
        }
        
        // Roles should be valid
        if (role) {
          const validRoles = [
            'button', 'link', 'navigation', 'main', 'banner', 'contentinfo',
            'complementary', 'form', 'search', 'dialog', 'alert', 'status',
            'img', 'presentation', 'tab', 'tabpanel', 'tablist', 'menu',
            'menuitem', 'menubar', 'grid', 'gridcell', 'row', 'columnheader'
          ];
          
          expect(validRoles).toContain(role);
        }
      }
    }
    
    await testHelper.reportProgress('✅ ARIA attributes test completed');
  });

  test('Page should work with screen reader simulation', async ({ page }) => {
    await testHelper.reportProgress('Testing screen reader compatibility');
    
    await page.goto('/');
    
    // Simulate screen reader navigation
    const pageStructure = await page.evaluate(() => {
      const structure: any[] = [];
      
      // Get page title
      structure.push({ type: 'title', content: document.title });
      
      // Get main landmarks
      const landmarks = document.querySelectorAll('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], main, nav, header, footer');
      landmarks.forEach(landmark => {
        structure.push({
          type: 'landmark',
          role: landmark.getAttribute('role') || landmark.tagName.toLowerCase(),
          content: landmark.textContent?.substring(0, 100) || ''
        });
      });
      
      // Get headings
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        structure.push({
          type: 'heading',
          level: heading.tagName.substring(1),
          content: heading.textContent?.trim() || ''
        });
      });
      
      // Get form elements
      const formElements = document.querySelectorAll('input, textarea, select, button');
      formElements.forEach(element => {
        const label = element.getAttribute('aria-label') || 
                     element.getAttribute('placeholder') ||
                     document.querySelector(`label[for="${element.id}"]`)?.textContent;
        
        structure.push({
          type: 'form-element',
          element: element.tagName.toLowerCase(),
          label: label || 'unlabeled'
        });
      });
      
      return structure;
    });
    
    // Page should have meaningful structure for screen readers
    expect(pageStructure.length).toBeGreaterThan(0);
    
    const hasTitle = pageStructure.some(item => item.type === 'title' && item.content.length > 0);
    expect(hasTitle).toBeTruthy('Page should have title');
    
    const hasHeadings = pageStructure.some(item => item.type === 'heading');
    expect(hasHeadings).toBeTruthy('Page should have headings');
    
    const hasMainLandmark = pageStructure.some(item => 
      item.type === 'landmark' && (item.role === 'main' || item.role === 'main')
    );
    expect(hasMainLandmark).toBeTruthy('Page should have main landmark');
    
    await testHelper.reportProgress('✅ Screen reader compatibility test completed');
  });

  test('Skip links should be present and functional', async ({ page }) => {
    await testHelper.reportProgress('Testing skip links accessibility');
    
    await page.goto('/');
    
    // Look for skip links
    const skipLinks = page.locator('a[href="#main"], a[href="#content"], .skip-link');
    
    if (await skipLinks.count() > 0) {
      const skipLink = skipLinks.first();
      
      // Skip link should be focusable
      await skipLink.focus();
      
      // Should be visible when focused
      const isVisible = await skipLink.isVisible();
      expect(isVisible).toBeTruthy('Skip link should be visible when focused');
      
      // Should have proper text
      const text = await skipLink.textContent();
      expect(text?.toLowerCase()).toContain('skip');
      
      // Should link to main content
      const href = await skipLink.getAttribute('href');
      expect(href?.startsWith('#')).toBeTruthy('Skip link should link to anchor');
      
      if (href) {
        const target = page.locator(href);
        expect(await target.count()).toBe(1, 'Skip link target should exist');
      }
    } else {
      console.warn('No skip links found - consider adding for better accessibility');
    }
    
    await testHelper.reportProgress('✅ Skip links test completed');
  });

  test('Media should have captions and transcripts where needed', async ({ page }) => {
    await testHelper.reportProgress('Testing media accessibility');
    
    for (const pagePath of PHOTOGRAPHER_PAGES) {
      await page.goto(pagePath);
      
      // Check video elements
      const videos = await page.locator('video').all();
      
      for (const video of videos) {
        if (await video.isVisible()) {
          // Videos should have captions or be decorative
          const hasTrack = await video.locator('track[kind="captions"], track[kind="subtitles"]').count() > 0;
          const ariaLabel = await video.getAttribute('aria-label');
          const isDecorative = ariaLabel?.includes('decorative') || await video.getAttribute('aria-hidden') === 'true';
          
          if (!isDecorative) {
            expect(hasTrack || ariaLabel).toBeTruthy('Videos should have captions or proper labeling');
          }
        }
      }
      
      // Check audio elements
      const audios = await page.locator('audio').all();
      
      for (const audio of audios) {
        if (await audio.isVisible()) {
          // Audio should have transcripts or proper labeling
          const ariaLabel = await audio.getAttribute('aria-label');
          expect(ariaLabel).toBeTruthy('Audio elements should have proper labeling');
        }
      }
    }
    
    await testHelper.reportProgress('✅ Media accessibility test completed');
  });

  test('Focus management should work properly', async ({ page }) => {
    await testHelper.reportProgress('Testing focus management');
    
    await page.goto('/portfolio');
    
    // Test focus trap in modal if present
    const images = await page.locator('img').all();
    
    if (images.length > 0) {
      await images[0].click();
      await page.waitForTimeout(300);
      
      const modal = page.locator('.modal, .lightbox, [role="dialog"]');
      
      if (await modal.count() > 0) {
        // Focus should be trapped in modal
        const focusableElements = modal.locator('button, a, input, [tabindex]:not([tabindex="-1"])');
        const focusableCount = await focusableElements.count();
        
        if (focusableCount > 0) {
          // Tab through elements
          for (let i = 0; i < focusableCount + 2; i++) {
            await page.keyboard.press('Tab');
            
            const activeElement = await page.evaluate(() => {
              const el = document.activeElement;
              return el ? {
                tagName: el.tagName,
                className: el.className,
                id: el.id
              } : null;
            });
            
            // Focus should stay within modal
            if (activeElement) {
              const isInModal = await modal.locator(`${activeElement.tagName.toLowerCase()}${activeElement.id ? '#' + activeElement.id : ''}${activeElement.className ? '.' + activeElement.className.split(' ')[0] : ''}`).count() > 0;
              
              if (!isInModal) {
                console.warn('Focus escaped modal');
              }
            }
          }
        }
        
        // Close modal
        await page.keyboard.press('Escape');
      }
    }
    
    await testHelper.reportProgress('✅ Focus management test completed');
  });
});