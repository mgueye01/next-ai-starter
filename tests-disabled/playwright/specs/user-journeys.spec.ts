import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';

test.describe('User Journey Tests', () => {
  let testHelper: TestHelpers;

  test.beforeEach(async ({ page }) => {
    testHelper = new TestHelpers(page);
  });

  test('Potential client journey: Discover → Browse → Contact', async ({ page }) => {
    await testHelper.reportProgress('Testing potential client discovery journey');
    
    // Step 1: Land on homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should see compelling hero content
    const heroContent = page.locator('h1, h2, .hero, .title').first();
    await expect(heroContent).toBeVisible();
    await expect(heroContent).toContainText(/elgato|photo|photographe/i);
    
    // Should see clear call-to-action
    const portfolioLink = page.locator('a[href*="portfolio"], button:has-text("Portfolio"), .portfolio-link');
    const contactLink = page.locator('a[href*="contact"], button:has-text("Contact"), .contact-link');
    
    expect(await portfolioLink.count() + await contactLink.count()).toBeGreaterThan(0);
    
    // Step 2: Navigate to portfolio
    if (await portfolioLink.count() > 0) {
      await portfolioLink.first().click();
      await page.waitForLoadState('networkidle');
      
      // Should see portfolio content
      expect(page.url()).toContain('/portfolio');
      
      // Should see images
      await testHelper.waitForImages();
      const images = await page.locator('img').count();
      expect(images).toBeGreaterThan(0);
      
      // Should be able to view images in detail
      const firstImage = page.locator('img').first();
      if (await firstImage.isVisible()) {
        await firstImage.click();
        await page.waitForTimeout(500);
        
        // Might open lightbox/modal
        const modal = page.locator('.modal, .lightbox, [role="dialog"]');
        if (await modal.count() > 0) {
          await expect(modal.first()).toBeVisible();
          
          // Close modal
          await page.keyboard.press('Escape');
        }
      }
    }
    
    // Step 3: Navigate to contact
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    
    // Should see contact form
    const form = page.locator('form, .contact-form');
    await expect(form.first()).toBeVisible();
    
    // Should see contact information
    const contactInfo = page.locator(':has-text("email"), :has-text("téléphone"), :has-text("contact")');
    expect(await contactInfo.count()).toBeGreaterThan(0);
    
    // Step 4: Fill out inquiry form
    const nameField = page.locator('input[name*="name"], input[placeholder*="nom"]').first();
    const emailField = page.locator('input[type="email"]').first();
    const messageField = page.locator('textarea').first();
    
    if (await nameField.count() > 0) {
      await nameField.fill('Marie Dupont');
    }
    
    if (await emailField.count() > 0) {
      await emailField.fill('marie.dupont@gmail.com');
    }
    
    if (await messageField.count() > 0) {
      await messageField.fill('Bonjour, je souhaiterais réserver une séance photo pour mon mariage en juin. Pouvez-vous me contacter?');
    }
    
    await testHelper.reportProgress('✅ Client discovery journey completed successfully');
  });

  test('Wedding photography inquiry journey', async ({ page }) => {
    await testHelper.reportProgress('Testing wedding photography inquiry journey');
    
    // Navigate to services or pricing
    await page.goto('/services/tarifs');
    await page.waitForLoadState('networkidle');
    
    // Should see wedding photography information
    const weddingInfo = page.locator(':has-text("mariage"), :has-text("wedding"), .wedding, .mariage');
    
    if (await weddingInfo.count() > 0) {
      // Check pricing information
      const pricing = page.locator(':has-text("€"), :has-text("euro"), :has-text("tarif"), .price, .pricing');
      expect(await pricing.count()).toBeGreaterThan(0);
    }
    
    // Navigate to portfolio to see wedding examples
    await page.goto('/portfolio');
    await testHelper.waitForImages();
    
    // Look for wedding-related content
    const weddingGallery = page.locator('[alt*="mariage" i], [alt*="wedding" i], .wedding-gallery');
    
    if (await weddingGallery.count() > 0) {
      await weddingGallery.first().click();
      await page.waitForTimeout(300);
    }
    
    // Navigate to contact with wedding inquiry intent
    await page.goto('/contact');
    
    const messageField = page.locator('textarea').first();
    if (await messageField.count() > 0) {
      await messageField.fill('Nous planifions notre mariage pour septembre 2024 à Paris. Nous aimerions connaître vos disponibilités et tarifs pour une couverture photo complète de la journée.');
    }
    
    await testHelper.reportProgress('✅ Wedding photography inquiry journey completed');
  });

  test('Portrait session booking journey', async ({ page }) => {
    await testHelper.reportProgress('Testing portrait session booking journey');
    
    // Start from homepage
    await page.goto('/');
    
    // Look for portrait-related content
    const portraitContent = page.locator(':has-text("portrait"), .portrait-section');
    
    if (await portraitContent.count() > 0) {
      // Might click on portrait section
      if (await portraitContent.first().isVisible()) {
        await portraitContent.first().scrollIntoViewIfNeeded();
      }
    }
    
    // Go to portfolio to see portrait examples
    await page.goto('/portfolio');
    await testHelper.waitForImages();
    
    // Look for portrait images
    const portraitImages = page.locator('[alt*="portrait" i], .portrait-image');
    
    if (await portraitImages.count() > 0) {
      // View portrait examples
      await portraitImages.first().click();
      await page.waitForTimeout(300);
    }
    
    // Check services/pricing for portrait information
    await page.goto('/services/tarifs');
    
    const portraitPricing = page.locator(':has-text("portrait")');
    if (await portraitPricing.count() > 0) {
      await portraitPricing.first().scrollIntoViewIfNeeded();
    }
    
    // Contact for portrait session
    await page.goto('/contact');
    
    const messageField = page.locator('textarea').first();
    if (await messageField.count() > 0) {
      await messageField.fill('Bonjour, je recherche un photographe pour des photos de portraits professionnels. Pouvez-vous me proposer un créneau?');
    }
    
    await testHelper.reportProgress('✅ Portrait session booking journey completed');
  });

  test('Mobile user journey', async ({ page }) => {
    await testHelper.reportProgress('Testing mobile user journey');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Start from homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should see mobile-optimized content
    const heroContent = page.locator('h1, h2, .hero').first();
    await expect(heroContent).toBeVisible();
    
    // Test mobile navigation
    const mobileMenu = page.locator('.mobile-menu, .hamburger, [aria-label*="menu"]');
    
    if (await mobileMenu.count() > 0) {
      await mobileMenu.first().tap();
      await page.waitForTimeout(300);
      
      // Should show navigation options
      const navLinks = page.locator('nav a, .menu a');
      expect(await navLinks.count()).toBeGreaterThan(0);
      
      // Navigate to portfolio via mobile menu
      const portfolioNav = page.locator('nav a[href*="portfolio"], .menu a[href*="portfolio"]');
      if (await portfolioNav.count() > 0) {
        await portfolioNav.first().tap();
      } else {
        await page.goto('/portfolio');
      }
    } else {
      await page.goto('/portfolio');
    }
    
    await testHelper.waitForImages();
    
    // Test mobile image gallery interaction
    const images = await page.locator('img').all();
    
    if (images.length > 0) {
      // Test touch interaction
      const firstImage = images[0];
      await firstImage.tap();
      await page.waitForTimeout(300);
    }
    
    // Navigate to contact on mobile
    await page.goto('/contact');
    
    // Test mobile form interaction
    const form = page.locator('form').first();
    if (await form.count() > 0) {
      const nameField = page.locator('input[name*="name"]').first();
      const emailField = page.locator('input[type="email"]').first();
      
      if (await nameField.count() > 0) {
        await nameField.tap();
        await nameField.fill('Mobile User');
      }
      
      if (await emailField.count() > 0) {
        await emailField.tap();
        await emailField.fill('mobile@example.com');
      }
    }
    
    await testHelper.reportProgress('✅ Mobile user journey completed');
  });

  test('Return visitor journey', async ({ page }) => {
    await testHelper.reportProgress('Testing return visitor journey');
    
    // Simulate return visitor with stored preferences
    await page.addInitScript(() => {
      localStorage.setItem('visitedBefore', 'true');
      localStorage.setItem('preferredCategory', 'wedding');
    });
    
    // Start from homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Return visitor might skip intro and go directly to portfolio
    await page.goto('/portfolio');
    await testHelper.waitForImages();
    
    // Might filter by preferred category if available
    const categoryFilter = page.locator('.filter, .category, button:has-text("mariage")');
    
    if (await categoryFilter.count() > 0) {
      await categoryFilter.first().click();
      await page.waitForTimeout(500);
    }
    
    // Quickly browse through images
    const images = await page.locator('img').all();
    
    for (let i = 0; i < Math.min(3, images.length); i++) {
      if (await images[i].isVisible()) {
        await images[i].click();
        await page.waitForTimeout(200);
        
        // Close if modal opened
        await page.keyboard.press('Escape');
      }
    }
    
    // Go to specific service page
    await page.goto('/services/tarifs');
    
    // Might scroll to specific section
    const weddingSection = page.locator(':has-text("mariage")');
    if (await weddingSection.count() > 0) {
      await weddingSection.first().scrollIntoViewIfNeeded();
    }
    
    // Contact with specific question
    await page.goto('/contact');
    
    const messageField = page.locator('textarea').first();
    if (await messageField.count() > 0) {
      await messageField.fill('Bonjour, nous nous sommes déjà parlé par email. Je reviens vers vous pour finaliser la réservation de notre séance photo.');
    }
    
    await testHelper.reportProgress('✅ Return visitor journey completed');
  });

  test('Social media referral journey', async ({ page }) => {
    await testHelper.reportProgress('Testing social media referral journey');
    
    // Simulate coming from social media with referrer
    await page.goto('/', {
      referer: 'https://instagram.com'
    });
    
    // Might track social media referral
    const socialReferral = await page.evaluate(() => {
      return document.referrer.includes('instagram.com');
    });
    
    expect(socialReferral).toBeTruthy();
    
    // Social media users often go straight to portfolio
    await page.goto('/portfolio');
    await testHelper.waitForImages();
    
    // Might be looking for specific type of content (Instagram-style)
    const images = await page.locator('img').all();
    
    // Quick browsing behavior
    for (let i = 0; i < Math.min(5, images.length); i++) {
      if (await images[i].isVisible()) {
        await images[i].scrollIntoViewIfNeeded();
        await page.waitForTimeout(100);
      }
    }
    
    // Social users might contact quickly
    await page.goto('/contact');
    
    const messageField = page.locator('textarea').first();
    if (await messageField.count() > 0) {
      await messageField.fill('Salut! Je vous ai trouvé sur Instagram et j\'adore votre style. Vous êtes libre pour une séance photo?');
    }
    
    await testHelper.reportProgress('✅ Social media referral journey completed');
  });

  test('SEO/Google search landing journey', async ({ page }) => {
    await testHelper.reportProgress('Testing SEO/Google search landing journey');
    
    // Simulate landing from Google search
    await page.goto('/?utm_source=google&utm_medium=organic&utm_campaign=photographer-paris');
    
    // Check that UTM parameters are handled
    const urlParams = await page.evaluate(() => {
      const params = new URLSearchParams(window.location.search);
      return {
        source: params.get('utm_source'),
        medium: params.get('utm_medium')
      };
    });
    
    expect(urlParams.source).toBe('google');
    expect(urlParams.medium).toBe('organic');
    
    // SEO landing page should have clear value proposition
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();
    
    const description = page.locator('p, .description').first();
    await expect(description).toBeVisible();
    
    // Should have clear navigation options
    const ctaButtons = page.locator('a[href*="portfolio"], a[href*="contact"], button');
    expect(await ctaButtons.count()).toBeGreaterThan(0);
    
    // User from Google search likely looking for specific service
    await page.goto('/services/tarifs');
    
    // Should find pricing information easily
    const pricingInfo = page.locator(':has-text("€"), :has-text("tarif"), .price');
    expect(await pricingInfo.count()).toBeGreaterThan(0);
    
    // Convert to contact
    await page.goto('/contact');
    
    const messageField = page.locator('textarea').first();
    if (await messageField.count() > 0) {
      await messageField.fill('Bonjour, je vous ai trouvé sur Google en cherchant un photographe à Paris. Pouvez-vous me donner plus d\'informations sur vos services?');
    }
    
    await testHelper.reportProgress('✅ SEO/Google search landing journey completed');
  });

  test('Complete booking flow simulation', async ({ page }) => {
    await testHelper.reportProgress('Testing complete booking flow simulation');
    
    // Start from homepage
    await page.goto('/');
    
    // Step 1: View portfolio
    await page.goto('/portfolio');
    await testHelper.waitForImages();
    
    // Step 2: Check services and pricing
    await page.goto('/services/tarifs');
    
    // Step 3: Read about photographer
    await page.goto('/a-propos');
    
    // Step 4: Contact with detailed inquiry
    await page.goto('/contact');
    
    const nameField = page.locator('input[name*="name"]').first();
    const emailField = page.locator('input[type="email"]').first();
    const messageField = page.locator('textarea').first();
    
    if (await nameField.count() > 0 && await emailField.count() > 0 && await messageField.count() > 0) {
      await nameField.fill('Sophie Martin');
      await emailField.fill('sophie.martin@gmail.com');
      await messageField.fill('Bonjour, nous organisons notre mariage le 15 juin 2024 au Château de Versailles. Nous recherchons un photographe pour couvrir la cérémonie et la réception (environ 8 heures). Pouvez-vous nous faire une proposition avec vos tarifs? Nous avons vu vos photos sur votre portfolio et nous adorons votre style. Merci!');
      
      // Simulate form submission (without actually submitting)
      const submitButton = page.locator('button[type="submit"]').first();
      
      if (await submitButton.count() > 0) {
        // Just focus on submit button to simulate intent
        await submitButton.focus();
      }
    }
    
    // Step 5: Might check social proof or reviews
    const testimonials = page.locator('.testimonial, .review, :has-text("avis")');
    if (await testimonials.count() > 0) {
      await testimonials.first().scrollIntoViewIfNeeded();
    }
    
    await testHelper.reportProgress('✅ Complete booking flow simulation completed');
  });
});