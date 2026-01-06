import { test, expect } from '@playwright/test';

test.describe('Basic Photography Website Tests', () => {
  test('Home page loads and displays key elements', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Check if page loads properly
    await page.waitForLoadState('networkidle');
    
    // Check for main content
    await expect(page.locator('body')).toBeVisible();
    
    // Check for elGato branding
    await expect(page.locator('text=elGato').first()).toBeVisible();
    
    // Check for navigation elements
    const navigation = page.locator('nav, [role="navigation"], .navbar');
    if (await navigation.count() > 0) {
      await expect(navigation.first()).toBeVisible();
    }
    
    // Check for images
    const images = await page.locator('img').all();
    expect(images.length).toBeGreaterThan(0);
    
    // Verify no major JavaScript errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Wait a bit for any errors to surface
    await page.waitForTimeout(2000);
    
    // Filter out known non-critical errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') && 
      !error.includes('Failed to load resource')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('Mobile viewport renders without horizontal overflow', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to home page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });
    
    expect(hasHorizontalOverflow).toBeFalsy();
    
    // Check that main content is visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('Contact navigation link exists', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Look for contact link
    const contactLink = page.locator('a[href="/contact"], a[href*="contact"]').first();
    await expect(contactLink).toBeVisible();
  });

  test('Images load properly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for images to load
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images, img => {
          if (img.complete) return;
          return new Promise((resolve) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
          });
        })
      );
    });
    
    // Check that at least one image loaded successfully
    const loadedImages = await page.evaluate(() => {
      return Array.from(document.images).filter(img => img.naturalWidth > 0).length;
    });
    
    expect(loadedImages).toBeGreaterThan(0);
  });
});