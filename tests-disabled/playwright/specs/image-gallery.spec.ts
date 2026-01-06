import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';

test.describe('Image Gallery Tests', () => {
  let testHelper: TestHelpers;

  test.beforeEach(async ({ page }) => {
    testHelper = new TestHelpers(page);
  });

  test('Portfolio gallery should load and display images correctly', async ({ page }) => {
    await testHelper.reportProgress('Testing portfolio gallery image loading');
    
    await page.goto('/portfolio');
    await testHelper.waitForImages();
    
    // Check that images are present
    const images = await page.locator('img').all();
    expect(images.length).toBeGreaterThan(0);
    
    // Test first few images
    for (const img of images.slice(0, 5)) {
      if (await img.isVisible()) {
        // Image should have loaded
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        const naturalHeight = await img.evaluate((el: HTMLImageElement) => el.naturalHeight);
        
        expect(naturalWidth).toBeGreaterThan(0);
        expect(naturalHeight).toBeGreaterThan(0);
        
        // Should have proper attributes
        const alt = await img.getAttribute('alt');
        const src = await img.getAttribute('src');
        
        expect(src).toBeTruthy();
        expect(alt).toBeTruthy(); // For accessibility
      }
    }
    
    await testHelper.reportProgress('✅ Portfolio gallery images loaded successfully');
  });

  test('Image modal/lightbox should work correctly', async ({ page }) => {
    await testHelper.reportProgress('Testing image modal/lightbox functionality');
    
    await page.goto('/portfolio');
    await testHelper.waitForImages();
    
    // Look for clickable images or gallery items
    const galleryItems = page.locator('img, .gallery-item, [data-testid="gallery-image"]');
    const itemCount = await galleryItems.count();
    
    if (itemCount > 0) {
      // Click on first image
      await galleryItems.first().click();
      
      // Check for modal/lightbox
      const modal = page.locator('.modal, .lightbox, [role="dialog"], .image-overlay');
      
      if (await modal.count() > 0) {
        await expect(modal.first()).toBeVisible();
        
        // Check for larger image
        const modalImage = modal.locator('img').first();
        await expect(modalImage).toBeVisible();
        
        // Should have close button
        const closeButton = modal.locator('[aria-label*="close" i], .close, .modal-close, button:has-text("×")');
        
        if (await closeButton.count() > 0) {
          await closeButton.first().click();
          await expect(modal.first()).not.toBeVisible();
        } else {
          // Try clicking outside modal to close
          await page.mouse.click(50, 50);
          await page.waitForTimeout(300);
        }
        
        // Test navigation within modal if present
        await galleryItems.first().click();
        
        const nextButton = modal.locator('[aria-label*="next" i], .next, .arrow-right');
        const prevButton = modal.locator('[aria-label*="previous" i], .prev, .arrow-left');
        
        if (await nextButton.count() > 0) {
          await nextButton.first().click();
          await page.waitForTimeout(300);
          
          // Should show different image
          await expect(modalImage).toBeVisible();
        }
        
        if (await prevButton.count() > 0) {
          await prevButton.first().click();
          await page.waitForTimeout(300);
        }
      }
    }
    
    await testHelper.reportProgress('✅ Image modal/lightbox test completed');
  });

  test('Gallery should support keyboard navigation', async ({ page }) => {
    await testHelper.reportProgress('Testing gallery keyboard navigation');
    
    await page.goto('/portfolio');
    await testHelper.waitForImages();
    
    // Look for gallery items
    const galleryItems = page.locator('img, .gallery-item, [data-testid="gallery-image"]');
    
    if (await galleryItems.count() > 0) {
      // Focus on first image
      await galleryItems.first().focus();
      
      // Test Enter key to open
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      
      // Look for modal
      const modal = page.locator('.modal, .lightbox, [role="dialog"]');
      
      if (await modal.count() > 0) {
        // Test arrow key navigation
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
        
        await page.keyboard.press('ArrowLeft');
        await page.waitForTimeout(300);
        
        // Test Escape to close
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
        
        // Modal should be closed
        await expect(modal.first()).not.toBeVisible();
      }
      
      // Test Tab navigation through gallery
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
    }
    
    await testHelper.reportProgress('✅ Gallery keyboard navigation test completed');
  });

  test('Gallery should handle image loading errors gracefully', async ({ page }) => {
    await testHelper.reportProgress('Testing gallery error handling');
    
    // Intercept image requests and make some fail
    await page.route('**/*.{jpg,jpeg,png,webp}', async (route, request) => {
      if (Math.random() < 0.3) { // 30% chance of failure
        await route.abort('internetdisconnected');
      } else {
        await route.continue();
      }
    });
    
    await page.goto('/portfolio');
    await page.waitForTimeout(2000); // Wait for loading attempts
    
    // Check that page doesn't crash
    const images = await page.locator('img').all();
    
    for (const img of images.slice(0, 3)) {
      if (await img.isVisible()) {
        // Image should either load or show placeholder/error state
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        const hasErrorClass = await img.evaluate((el) => 
          el.classList.contains('error') || 
          el.classList.contains('failed') ||
          el.getAttribute('aria-label')?.includes('error')
        );
        
        // Should either have loaded (width > 0) or show error state
        expect(naturalWidth > 0 || hasErrorClass).toBeTruthy();
      }
    }
    
    // Check for any JavaScript errors
    const errors = await testHelper.getConsoleErrors();
    const criticalErrors = errors.filter(error => 
      !error.includes('Failed to load resource') && // Expected network errors
      !error.includes('net::ERR_INTERNET_DISCONNECTED')
    );
    
    expect(criticalErrors).toHaveLength(0);
    
    await testHelper.reportProgress('✅ Gallery error handling test completed');
  });

  test('Lazy loading should work for gallery images', async ({ page }) => {
    await testHelper.reportProgress('Testing gallery lazy loading functionality');
    
    await page.goto('/portfolio');
    
    // Get all images
    const images = await page.locator('img').all();
    
    if (images.length > 5) {
      // Check that images below the fold have lazy loading
      for (const img of images.slice(3)) { // Skip first few images
        const loading = await img.getAttribute('loading');
        const isInViewport = await testHelper.isInViewport(`img[src="${await img.getAttribute('src')}"]`);
        
        if (!isInViewport) {
          // Images not in viewport should be lazy loaded
          expect(loading).toBe('lazy');
          
          // Image should not have loaded yet
          const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
          
          // Scroll to bring image into view
          await img.scrollIntoViewIfNeeded();
          await page.waitForTimeout(500);
          
          // Now it should load
          const newNaturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
          expect(newNaturalWidth).toBeGreaterThan(0);
        }
      }
    }
    
    await testHelper.reportProgress('✅ Gallery lazy loading test completed');
  });

  test('Gallery should be responsive across different screen sizes', async ({ page }) => {
    await testHelper.reportProgress('Testing gallery responsiveness');
    
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1440, height: 900, name: 'desktop' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/portfolio');
      await testHelper.waitForImages();
      
      // Check gallery layout
      const gallery = page.locator('.gallery, .portfolio, .image-grid');
      
      if (await gallery.count() > 0) {
        // Gallery should be visible
        await expect(gallery.first()).toBeVisible();
        
        // Check for responsive grid
        const gridItems = gallery.locator('img, .gallery-item').first();
        
        if (await gridItems.count() > 0) {
          const itemBox = await gridItems.boundingBox();
          
          if (itemBox) {
            // Item should fit within viewport width
            expect(itemBox.width).toBeLessThanOrEqual(viewport.width);
            expect(itemBox.x + itemBox.width).toBeLessThanOrEqual(viewport.width);
          }
        }
      }
      
      // Take screenshot for visual regression
      await page.screenshot({
        path: `tests/playwright/screenshots/gallery-${viewport.name}.png`,
        fullPage: true
      });
    }
    
    await testHelper.reportProgress('✅ Gallery responsiveness test completed');
  });

  test('Gallery should load images progressively', async ({ page }) => {
    await testHelper.reportProgress('Testing progressive image loading');
    
    await page.goto('/portfolio');
    
    let imagesLoaded = 0;
    const totalImages = await page.locator('img').count();
    
    // Monitor image load events
    await page.addInitScript(() => {
      window.addEventListener('load', () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (img.complete && img.naturalWidth > 0) {
            img.setAttribute('data-loaded', 'true');
          }
          
          img.addEventListener('load', () => {
            img.setAttribute('data-loaded', 'true');
          });
        });
      });
    });
    
    // Wait for page load
    await page.waitForLoadState('domcontentloaded');
    
    // Check progressive loading
    await page.waitForTimeout(1000);
    
    const loadedImages = await page.locator('img[data-loaded="true"]').count();
    
    // At least some images should have loaded
    expect(loadedImages).toBeGreaterThan(0);
    
    // Wait for more images to load
    await testHelper.waitForImages();
    
    const finalLoadedImages = await page.locator('img[data-loaded="true"]').count();
    
    // More images should have loaded over time
    expect(finalLoadedImages).toBeGreaterThanOrEqual(loadedImages);
    
    await testHelper.reportProgress(`✅ Progressive loading test completed (${finalLoadedImages}/${totalImages} loaded)`);
  });

  test('Gallery metadata should be properly displayed', async ({ page }) => {
    await testHelper.reportProgress('Testing gallery image metadata display');
    
    await page.goto('/portfolio');
    await testHelper.waitForImages();
    
    // Look for image captions, titles, or metadata
    const metadataElements = page.locator('.caption, .image-title, .image-description, .metadata, figcaption');
    
    if (await metadataElements.count() > 0) {
      // Check first few metadata elements
      for (const element of await metadataElements.all().then(els => els.slice(0, 3))) {
        if (await element.isVisible()) {
          const text = await element.textContent();
          expect(text?.trim().length).toBeGreaterThan(0);
          
          // Should be associated with an image
          const parent = element.locator('xpath=ancestor::*[img or contains(@class, "image") or contains(@class, "gallery")]');
          expect(await parent.count()).toBeGreaterThan(0);
        }
      }
    }
    
    // Check EXIF data display if present
    const exifData = page.locator('[data-exif], .exif-data, .camera-info');
    
    if (await exifData.count() > 0) {
      const exifText = await exifData.first().textContent();
      expect(exifText?.trim().length).toBeGreaterThan(0);
    }
    
    await testHelper.reportProgress('✅ Gallery metadata test completed');
  });
});