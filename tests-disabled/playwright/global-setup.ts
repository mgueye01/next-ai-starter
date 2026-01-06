import { chromium, FullConfig } from '@playwright/test';
import { execSync } from 'child_process';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global test setup...');
  
  try {
    // Execute Claude Flow hooks for test session initialization
    console.log('📡 Initializing Claude Flow test session...');
    execSync('npx claude-flow@alpha hooks pre-task --description "Playwright Test Suite Execution" --task-type "testing"', { 
      stdio: 'pipe',
      cwd: process.cwd()
    });
    
    execSync('npx claude-flow@alpha hooks session-restore --session-id "playwright-test-session"', { 
      stdio: 'pipe',
      cwd: process.cwd()
    });

    console.log('✅ Claude Flow hooks initialized');
  } catch (error) {
    console.warn('⚠️  Claude Flow hooks not available, continuing without coordination:', error);
  }

  // Create a browser instance for authentication if needed
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Pre-warm the application
  try {
    await page.goto(config.webServer?.url || 'http://localhost:3000');
    await page.waitForLoadState('networkidle');
    console.log('✅ Application pre-warmed successfully');
  } catch (error) {
    console.warn('⚠️  Failed to pre-warm application:', error);
  }
  
  await browser.close();
  
  console.log('✅ Global setup completed');
}

export default globalSetup;