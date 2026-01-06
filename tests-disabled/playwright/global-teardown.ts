import { FullConfig } from '@playwright/test';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function globalTeardown(config: FullConfig) {
  console.log('🔚 Starting global test teardown...');
  
  try {
    // Generate test summary for Claude Flow
    const resultsPath = './tests/playwright-results.json';
    let testSummary = 'Playwright tests completed';
    
    if (fs.existsSync(resultsPath)) {
      const results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
      const { stats } = results;
      testSummary = `Tests: ${stats.expected} passed, ${stats.unexpected} failed, ${stats.skipped} skipped`;
    }
    
    // Execute Claude Flow hooks for test completion
    console.log('📡 Reporting test results to Claude Flow...');
    execSync(`npx claude-flow@alpha hooks post-task --task-id "playwright-tests" --results "${testSummary}"`, { 
      stdio: 'pipe',
      cwd: process.cwd()
    });
    
    execSync('npx claude-flow@alpha hooks session-end --export-metrics true', { 
      stdio: 'pipe',
      cwd: process.cwd()
    });

    console.log('✅ Test results reported to Claude Flow');
  } catch (error) {
    console.warn('⚠️  Failed to report to Claude Flow:', error);
  }
  
  console.log('✅ Global teardown completed');
}

export default globalTeardown;