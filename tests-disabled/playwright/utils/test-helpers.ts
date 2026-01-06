import { Page, expect } from '@playwright/test';
import { execSync } from 'child_process';

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Report test progress to Claude Flow hooks
   */
  async reportProgress(message: string, file?: string) {
    try {
      if (file) {
        execSync(`npx claude-flow@alpha hooks post-edit --file "${file}" --message "${message}"`, { 
          stdio: 'pipe',
          cwd: process.cwd()
        });
      } else {
        execSync(`npx claude-flow@alpha hooks notify --message "${message}"`, { 
          stdio: 'pipe',
          cwd: process.cwd()
        });
      }
    } catch (error) {
      // Silently fail if Claude Flow is not available
    }
  }

  /**
   * Wait for all images to load on the page
   */
  async waitForImages() {
    await this.page.evaluate(() => {
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
  }

  /**
   * Check if an element is visible in viewport
   */
  async isInViewport(selector: string): Promise<boolean> {
    return await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) return false;
      
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }, selector);
  }

  /**
   * Measure Core Web Vitals
   */
  async measureCoreWebVitals() {
    return await this.page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals: { [key: string]: number } = {};
        
        // LCP (Largest Contentful Paint)
        if ('PerformanceObserver' in window) {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.lcp = lastEntry.startTime;
          }).observe({ entryTypes: ['largest-contentful-paint'] });

          // FID (First Input Delay) - simulated
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              vitals.fid = entry.processingStart - entry.startTime;
            });
          }).observe({ entryTypes: ['first-input'] });

          // CLS (Cumulative Layout Shift)
          let clsValue = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as any[]) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
            vitals.cls = clsValue;
          }).observe({ entryTypes: ['layout-shift'] });
        }

        // Wait a bit for measurements
        setTimeout(() => resolve(vitals), 2000);
      });
    });
  }

  /**
   * Simulate slow network conditions
   */
  async simulateSlowNetwork() {
    const context = this.page.context();
    await context.route('**/*', (route) => {
      setTimeout(() => route.continue(), 1000); // 1 second delay
    });
  }

  /**
   * Test responsive breakpoints
   */
  async testResponsiveBreakpoints() {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'large', width: 1920, height: 1080 }
    ];

    const results: { [key: string]: boolean } = {};

    for (const breakpoint of breakpoints) {
      await this.page.setViewportSize({
        width: breakpoint.width,
        height: breakpoint.height
      });
      
      // Wait for layout to stabilize
      await this.page.waitForTimeout(500);
      
      // Check if layout looks reasonable
      const bodyWidth = await this.page.evaluate(() => document.body.clientWidth);
      const hasOverflow = await this.page.evaluate(() => 
        document.body.scrollWidth > document.body.clientWidth
      );
      
      results[breakpoint.name] = bodyWidth > 0 && !hasOverflow;
    }

    return results;
  }

  /**
   * Check for console errors
   */
  async getConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];
    
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    return errors;
  }

  /**
   * Test form validation
   */
  async testFormValidation(formSelector: string, fields: { selector: string; invalidValue: string }[]) {
    const results: { [key: string]: boolean } = {};

    for (const field of fields) {
      // Fill with invalid value
      await this.page.fill(field.selector, field.invalidValue);
      
      // Try to submit form
      await this.page.click(`${formSelector} button[type="submit"]`);
      
      // Check if validation error appears
      const hasError = await this.page.evaluate((selector) => {
        const field = document.querySelector(selector) as HTMLInputElement;
        return !field.validity.valid || field.getAttribute('aria-invalid') === 'true';
      }, field.selector);
      
      results[field.selector] = hasError;
    }

    return results;
  }

  /**
   * Measure page load performance
   */
  async measurePageLoad() {
    const startTime = Date.now();
    
    await this.page.goto(this.page.url(), { waitUntil: 'networkidle' });
    await this.waitForImages();
    
    const loadTime = Date.now() - startTime;
    
    const performanceMetrics = await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      };
    });

    return {
      totalLoadTime: loadTime,
      ...performanceMetrics
    };
  }
}

export const PHOTOGRAPHER_PAGES = [
  '/',
  '/portfolio',
  '/contact',
  '/services/tarifs',
  '/a-propos'
];

export const MOBILE_VIEWPORTS = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12', width: 390, height: 844 },
  { name: 'iPhone 12 Pro Max', width: 428, height: 926 },
  { name: 'Samsung Galaxy S21', width: 360, height: 800 },
  { name: 'iPad', width: 768, height: 1024 },
];

export const DESKTOP_VIEWPORTS = [
  { name: 'Small Desktop', width: 1366, height: 768 },
  { name: 'Medium Desktop', width: 1440, height: 900 },
  { name: 'Large Desktop', width: 1920, height: 1080 },
  { name: '4K Desktop', width: 3840, height: 2160 },
];