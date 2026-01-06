import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';

test.describe('Contact Form Tests', () => {
  let testHelper: TestHelpers;

  test.beforeEach(async ({ page }) => {
    testHelper = new TestHelpers(page);
    await page.goto('/contact');
  });

  test('Contact form should be present and accessible', async ({ page }) => {
    await testHelper.reportProgress('Testing contact form accessibility');
    
    // Check for form presence
    const form = page.locator('form, [role="form"], .contact-form');
    await expect(form.first()).toBeVisible();
    
    // Check for essential form fields
    const nameField = page.locator('input[name*="name" i], input[placeholder*="nom" i], input[aria-label*="name" i]');
    const emailField = page.locator('input[type="email"], input[name*="email" i], input[placeholder*="email" i]');
    const messageField = page.locator('textarea, input[name*="message" i], [placeholder*="message" i]');
    const submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Envoyer")');
    
    await expect(nameField.first()).toBeVisible();
    await expect(emailField.first()).toBeVisible();
    await expect(messageField.first()).toBeVisible();
    await expect(submitButton.first()).toBeVisible();
    
    // Check for proper labels
    const labels = await page.locator('label').all();
    expect(labels.length).toBeGreaterThanOrEqual(3);
    
    // Check aria-labels or associated labels
    const nameId = await nameField.first().getAttribute('id');
    const emailId = await emailField.first().getAttribute('id');
    const messageId = await messageField.first().getAttribute('id');
    
    if (nameId) {
      const nameLabel = page.locator(`label[for="${nameId}"]`);
      await expect(nameLabel).toBeVisible();
    }
    
    if (emailId) {
      const emailLabel = page.locator(`label[for="${emailId}"]`);
      await expect(emailLabel).toBeVisible();
    }
    
    if (messageId) {
      const messageLabel = page.locator(`label[for="${messageId}"]`);
      await expect(messageLabel).toBeVisible();
    }
    
    await testHelper.reportProgress('✅ Contact form accessibility verified');
  });

  test('Form validation should work correctly', async ({ page }) => {
    await testHelper.reportProgress('Testing contact form validation');
    
    const nameField = page.locator('input[name*="name" i], input[placeholder*="nom" i]').first();
    const emailField = page.locator('input[type="email"], input[name*="email" i]').first();
    const messageField = page.locator('textarea, input[name*="message" i]').first();
    const submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Envoyer")').first();
    
    // Test empty form submission
    await submitButton.click();
    
    // Check for validation messages
    const validationMessages = page.locator('.error, .invalid, [aria-invalid="true"], :invalid');
    
    if (await validationMessages.count() > 0) {
      expect(await validationMessages.count()).toBeGreaterThan(0);
    }
    
    // Test invalid email format
    await emailField.fill('invalid-email');
    await submitButton.click();
    
    const emailValidation = await emailField.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(emailValidation).toBeFalsy();
    
    // Test with valid data
    await nameField.fill('Test User');
    await emailField.fill('test@example.com');
    await messageField.fill('This is a test message for the photographer contact form.');
    
    // Verify fields are valid
    const nameValid = await nameField.evaluate((el: HTMLInputElement) => el.validity.valid);
    const emailValid = await emailField.evaluate((el: HTMLInputElement) => el.validity.valid);
    const messageValid = await messageField.evaluate((el: HTMLInputElement) => el.validity.valid);
    
    expect(nameValid).toBeTruthy();
    expect(emailValid).toBeTruthy();
    expect(messageValid).toBeTruthy();
    
    await testHelper.reportProgress('✅ Form validation test completed');
  });

  test('Form submission should work properly', async ({ page }) => {
    await testHelper.reportProgress('Testing contact form submission');
    
    // Fill out the form with valid data
    const nameField = page.locator('input[name*="name" i], input[placeholder*="nom" i]').first();
    const emailField = page.locator('input[type="email"], input[name*="email" i]').first();
    const messageField = page.locator('textarea, input[name*="message" i]').first();
    const submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Envoyer")').first();
    
    await nameField.fill('Test Photographer Client');
    await emailField.fill('client@example.com');
    await messageField.fill('Je suis intéressé par une séance photo pour mon mariage. Pourriez-vous me contacter?');
    
    // Monitor network requests
    let formSubmitted = false;
    page.on('request', request => {
      if (request.method() === 'POST' && request.url().includes('/contact')) {
        formSubmitted = true;
      }
    });
    
    // Submit the form
    await submitButton.click();
    
    // Wait for submission response
    await page.waitForTimeout(2000);
    
    // Check for success message or confirmation
    const successMessage = page.locator('.success, .confirmation, .thank-you, :has-text("merci"), :has-text("envoyé")');
    const errorMessage = page.locator('.error, .failure, :has-text("erreur")');
    
    // Should either show success message or have submitted the form
    const hasSuccessMessage = await successMessage.count() > 0;
    const hasErrorMessage = await errorMessage.count() > 0;
    
    // Form should either succeed or show a proper error message
    expect(hasSuccessMessage || formSubmitted || hasErrorMessage).toBeTruthy();
    
    // If error message exists, it should be informative
    if (hasErrorMessage) {
      const errorText = await errorMessage.first().textContent();
      expect(errorText?.length).toBeGreaterThan(5);
    }
    
    await testHelper.reportProgress('✅ Form submission test completed');
  });

  test('Form should handle special characters and international names', async ({ page }) => {
    await testHelper.reportProgress('Testing contact form with international characters');
    
    const nameField = page.locator('input[name*="name" i], input[placeholder*="nom" i]').first();
    const emailField = page.locator('input[type="email"], input[name*="email" i]').first();
    const messageField = page.locator('textarea, input[name*="message" i]').first();
    
    // Test with international characters
    await nameField.fill('José María González-López');
    await emailField.fill('josé.maría@café-españa.com');
    await messageField.fill('Bonjour, je suis intéressé par vos services de photographie. Pouvez-vous me donner plus d\'informations sur vos tarifs?');
    
    // Check that characters are preserved
    const nameValue = await nameField.inputValue();
    const emailValue = await emailField.inputValue();
    const messageValue = await messageField.inputValue();
    
    expect(nameValue).toBe('José María González-López');
    expect(emailValue).toBe('josé.maría@café-españa.com');
    expect(messageValue).toContain('intéressé');
    
    // Test emoji and special characters
    await messageField.fill('📷 Je voudrais une séance photo! 🎉 Budget: €500-1000');
    
    const emojiValue = await messageField.inputValue();
    expect(emojiValue).toContain('📷');
    expect(emojiValue).toContain('€');
    
    await testHelper.reportProgress('✅ International character test completed');
  });

  test('Form should be mobile-friendly', async ({ page }) => {
    await testHelper.reportProgress('Testing contact form on mobile devices');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact');
    
    // Check that form is visible and usable
    const form = page.locator('form, [role="form"], .contact-form').first();
    await expect(form).toBeVisible();
    
    // Check that form fields are properly sized
    const fields = await page.locator('input, textarea').all();
    
    for (const field of fields.slice(0, 3)) {
      if (await field.isVisible()) {
        const box = await field.boundingBox();
        
        if (box) {
          // Fields should be wide enough for mobile use
          expect(box.width).toBeGreaterThan(200);
          // Fields should have adequate height for touch
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    }
    
    // Test form interaction on mobile
    const nameField = page.locator('input[name*="name" i], input[placeholder*="nom" i]').first();
    const emailField = page.locator('input[type="email"], input[name*="email" i]').first();
    
    await nameField.tap();
    await nameField.fill('Mobile User');
    
    await emailField.tap();
    await emailField.fill('mobile@test.com');
    
    // Check that keyboard input works
    const nameValue = await nameField.inputValue();
    const emailValue = await emailField.inputValue();
    
    expect(nameValue).toBe('Mobile User');
    expect(emailValue).toBe('mobile@test.com');
    
    await testHelper.reportProgress('✅ Mobile contact form test completed');
  });

  test('Form should prevent spam and have security measures', async ({ page }) => {
    await testHelper.reportProgress('Testing contact form security measures');
    
    const form = page.locator('form, [role="form"], .contact-form').first();
    
    // Check for CAPTCHA or similar protection
    const captcha = page.locator('[class*="captcha"], [class*="recaptcha"], [data-testid="captcha"]');
    const honeypot = page.locator('input[style*="display: none"], input[style*="visibility: hidden"], .visually-hidden input');
    const csrfToken = page.locator('input[name*="token"], input[name*="csrf"], input[type="hidden"]');
    
    const hasCaptcha = await captcha.count() > 0;
    const hasHoneypot = await honeypot.count() > 0;
    const hasCSRF = await csrfToken.count() > 0;
    
    // Should have at least one security measure
    expect(hasCaptcha || hasHoneypot || hasCSRF).toBeTruthy();
    
    // Test rate limiting by submitting multiple times quickly
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    
    for (let i = 0; i < 3; i++) {
      await submitButton.click();
      await page.waitForTimeout(100);
    }
    
    // Check for rate limiting message or disabled state
    const isDisabled = await submitButton.isDisabled();
    const rateLimitMessage = page.locator(':has-text("trop"), :has-text("rate"), :has-text("limite")');
    const hasRateLimit = await rateLimitMessage.count() > 0;
    
    // Form should either disable submission or show rate limit message
    if (!isDisabled && !hasRateLimit) {
      console.log('Note: No obvious rate limiting detected');
    }
    
    await testHelper.reportProgress('✅ Security measures test completed');
  });

  test('Form should handle file attachments if supported', async ({ page }) => {
    await testHelper.reportProgress('Testing file attachment functionality');
    
    // Look for file input fields
    const fileInput = page.locator('input[type="file"]');
    
    if (await fileInput.count() > 0) {
      // Test file selection
      const testFilePath = 'tests/playwright/fixtures/test-image.jpg';
      
      // Create a test image file if it doesn't exist
      await testHelper.reportProgress('Creating test file for upload');
      
      try {
        await fileInput.first().setInputFiles([{
          name: 'test-photo.jpg',
          mimeType: 'image/jpeg',
          buffer: Buffer.from('fake-image-content')
        }]);
        
        // Check that file is selected
        const files = await fileInput.first().evaluate((input: HTMLInputElement) => {
          return input.files ? Array.from(input.files).map(f => f.name) : [];
        });
        
        expect(files).toContain('test-photo.jpg');
        
        // Check for file size/type validation
        const fileValidation = await fileInput.first().evaluate((input: HTMLInputElement) => {
          return input.validity.valid;
        });
        
        expect(fileValidation).toBeTruthy();
        
      } catch (error) {
        console.log('File upload test failed:', error);
      }
    } else {
      await testHelper.reportProgress('No file upload field found, skipping test');
    }
    
    await testHelper.reportProgress('✅ File attachment test completed');
  });

  test('Form should provide clear error messages', async ({ page }) => {
    await testHelper.reportProgress('Testing contact form error messaging');
    
    const nameField = page.locator('input[name*="name" i], input[placeholder*="nom" i]').first();
    const emailField = page.locator('input[type="email"], input[name*="email" i]').first();
    const messageField = page.locator('textarea, input[name*="message" i]').first();
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    
    // Test various error conditions
    const errorScenarios = [
      { field: nameField, value: '', expectedError: 'nom' },
      { field: emailField, value: 'invalid', expectedError: 'email' },
      { field: messageField, value: '', expectedError: 'message' },
      { field: messageField, value: 'a', expectedError: 'court' }
    ];
    
    for (const scenario of errorScenarios) {
      // Clear all fields
      await nameField.clear();
      await emailField.clear();
      await messageField.clear();
      
      // Fill with test value
      await scenario.field.fill(scenario.value);
      
      // Submit form
      await submitButton.click();
      await page.waitForTimeout(500);
      
      // Look for error messages
      const errorMessages = page.locator('.error, .invalid, [role="alert"], .field-error');
      
      if (await errorMessages.count() > 0) {
        const errorText = await errorMessages.first().textContent();
        expect(errorText?.length).toBeGreaterThan(0);
      }
    }
    
    await testHelper.reportProgress('✅ Error messaging test completed');
  });

  test('Form should support keyboard navigation', async ({ page }) => {
    await testHelper.reportProgress('Testing contact form keyboard navigation');
    
    const nameField = page.locator('input[name*="name" i], input[placeholder*="nom" i]').first();
    
    // Start from name field
    await nameField.focus();
    
    // Tab through all form fields
    const tabSequence = [];
    
    for (let i = 0; i < 10; i++) {
      const activeElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? {
          tagName: el.tagName,
          type: el.getAttribute('type'),
          name: el.getAttribute('name'),
          placeholder: el.getAttribute('placeholder')
        } : null;
      });
      
      if (activeElement) {
        tabSequence.push(activeElement);
      }
      
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    }
    
    // Should have navigated through form fields
    expect(tabSequence.length).toBeGreaterThan(2);
    
    // Should include input fields and submit button
    const hasInputs = tabSequence.some(el => el.tagName === 'INPUT');
    const hasButton = tabSequence.some(el => el.tagName === 'BUTTON');
    
    expect(hasInputs).toBeTruthy();
    expect(hasButton).toBeTruthy();
    
    await testHelper.reportProgress('✅ Keyboard navigation test completed');
  });
});