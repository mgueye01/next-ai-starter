import fs from 'fs';
import path from 'path';
import { TestResult, TestStatus } from '@playwright/test/reporter';

export interface TestMetrics {
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  coverage?: {
    lines: number;
    functions: number;
    branches: number;
    statements: number;
  };
  performance?: {
    avgLoadTime: number;
    slowestTest: string;
    fastestTest: string;
  };
  accessibility?: {
    violations: number;
    warnings: number;
    compliantPages: number;
  };
  compatibility?: {
    browsers: string[];
    viewports: string[];
    failedCombinations: string[];
  };
}

export class TestReporter {
  private metrics: Partial<TestMetrics> = {};
  private startTime: number;
  private testResults: TestResult[] = [];

  constructor() {
    this.startTime = Date.now();
    this.metrics = {
      totalTests: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      duration: 0,
      accessibility: { violations: 0, warnings: 0, compliantPages: 0 },
      performance: { avgLoadTime: 0, slowestTest: '', fastestTest: '' },
      compatibility: { browsers: [], viewports: [], failedCombinations: [] }
    };
  }

  addTestResult(result: TestResult) {
    this.testResults.push(result);
    this.updateMetrics(result);
  }

  private updateMetrics(result: TestResult) {
    if (!this.metrics) return;

    this.metrics.totalTests = (this.metrics.totalTests || 0) + 1;

    switch (result.status) {
      case 'passed':
        this.metrics.passed = (this.metrics.passed || 0) + 1;
        break;
      case 'failed':
        this.metrics.failed = (this.metrics.failed || 0) + 1;
        break;
      case 'skipped':
        this.metrics.skipped = (this.metrics.skipped || 0) + 1;
        break;
    }

    this.metrics.duration = Date.now() - this.startTime;
  }

  generateHTMLReport(): string {
    const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playwright Test Report - elGato Photo</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
            color: #333;
        }
        .header {
            background: linear-gradient(135deg, #6B5B47, #CFAB8D);
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5rem;
            font-weight: 300;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 1.1rem;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .metric-card {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-left: 4px solid #BBDCE5;
        }
        .metric-card h3 {
            margin: 0 0 15px 0;
            color: #6B5B47;
            font-size: 1.3rem;
        }
        .metric-value {
            font-size: 2.5rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        .metric-label {
            color: #666;
            font-size: 0.9rem;
        }
        .status-passed { color: #28a745; }
        .status-failed { color: #dc3545; }
        .status-skipped { color: #ffc107; }
        .test-list {
            background: white;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .test-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }
        .test-item:last-child {
            border-bottom: none;
        }
        .test-name {
            font-weight: 500;
            flex-grow: 1;
        }
        .test-duration {
            color: #666;
            margin-right: 15px;
        }
        .test-status {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
        }
        .test-status.passed {
            background-color: #d4edda;
            color: #155724;
        }
        .test-status.failed {
            background-color: #f8d7da;
            color: #721c24;
        }
        .test-status.skipped {
            background-color: #fff3cd;
            color: #856404;
        }
        .summary-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-top: 20px;
        }
        .stat-item {
            text-align: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .stat-number {
            font-size: 1.8rem;
            font-weight: bold;
            display: block;
        }
        .stat-label {
            color: #666;
            font-size: 0.9rem;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            border-top: 1px solid #eee;
            margin-top: 30px;
        }
        .claude-flow-badge {
            background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            display: inline-block;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎭 Playwright Test Report</h1>
        <p>elGato Photo - Photographer Website Testing Suite</p>
        <div class="claude-flow-badge">
            🤖 Coordinated with Claude Flow
        </div>
    </div>

    <div class="metrics-grid">
        <div class="metric-card">
            <h3>📊 Test Overview</h3>
            <div class="summary-stats">
                <div class="stat-item">
                    <span class="stat-number status-passed">${this.metrics.passed || 0}</span>
                    <span class="stat-label">Passed</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number status-failed">${this.metrics.failed || 0}</span>
                    <span class="stat-label">Failed</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number status-skipped">${this.metrics.skipped || 0}</span>
                    <span class="stat-label">Skipped</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${this.metrics.totalTests || 0}</span>
                    <span class="stat-label">Total</span>
                </div>
            </div>
        </div>

        <div class="metric-card">
            <h3>⏱️ Performance</h3>
            <div class="metric-value">${Math.round((this.metrics.duration || 0) / 1000)}s</div>
            <div class="metric-label">Total Duration</div>
        </div>

        <div class="metric-card">
            <h3>♿ Accessibility</h3>
            <div class="metric-value status-passed">${this.metrics.accessibility?.compliantPages || 0}</div>
            <div class="metric-label">WCAG Compliant Pages</div>
            ${this.metrics.accessibility?.violations ? `
                <div style="margin-top: 10px;">
                    <span class="status-failed">${this.metrics.accessibility.violations} violations</span>
                </div>
            ` : ''}
        </div>

        <div class="metric-card">
            <h3>🌐 Compatibility</h3>
            <div class="metric-value">${this.metrics.compatibility?.browsers?.length || 0}</div>
            <div class="metric-label">Browsers Tested</div>
            ${this.metrics.compatibility?.browsers ? `
                <div style="margin-top: 10px; font-size: 0.9rem;">
                    ${this.metrics.compatibility.browsers.join(', ')}
                </div>
            ` : ''}
        </div>
    </div>

    <div class="test-list">
        <h3>📋 Test Results</h3>
        ${this.testResults.map(result => `
            <div class="test-item">
                <div class="test-name">${result.title}</div>
                <div class="test-duration">${Math.round(result.duration)}ms</div>
                <div class="test-status ${result.status}">${result.status}</div>
            </div>
        `).join('')}
    </div>

    <div class="footer">
        <p>Generated by Playwright Testing Suite with Claude Flow Integration</p>
        <p>Report generated on ${new Date().toLocaleString()}</p>
        <div style="margin-top: 15px;">
            <strong>Test Categories Covered:</strong>
            📱 Mobile Responsiveness | 🚀 Performance | 🖼️ Image Gallery | 
            📝 Contact Forms | 🌐 Cross-Browser | 👤 User Journeys | 
            ♿ Accessibility | 🔧 CI/CD Integration
        </div>
    </div>
</body>
</html>`;

    return template;
  }

  generateJSONReport(): string {
    const report = {
      summary: {
        total: this.metrics.totalTests,
        passed: this.metrics.passed,
        failed: this.metrics.failed,
        skipped: this.metrics.skipped,
        duration: this.metrics.duration,
        successRate: this.metrics.totalTests ? 
          Math.round(((this.metrics.passed || 0) / (this.metrics.totalTests || 1)) * 100) : 0
      },
      metrics: this.metrics,
      tests: this.testResults.map(result => ({
        title: result.title,
        status: result.status,
        duration: result.duration,
        error: result.error?.message || null
      })),
      environment: {
        timestamp: new Date().toISOString(),
        node: process.version,
        platform: process.platform,
        CI: !!process.env.CI
      },
      claudeFlow: {
        enabled: true,
        coordination: 'hooks-integration',
        reporting: 'automated'
      }
    };

    return JSON.stringify(report, null, 2);
  }

  saveReports(outputDir: string) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save HTML report
    const htmlReport = this.generateHTMLReport();
    fs.writeFileSync(path.join(outputDir, 'test-report.html'), htmlReport);

    // Save JSON report
    const jsonReport = this.generateJSONReport();
    fs.writeFileSync(path.join(outputDir, 'test-results.json'), jsonReport);

    // Save metrics summary
    const metricsFile = path.join(outputDir, 'metrics.json');
    fs.writeFileSync(metricsFile, JSON.stringify(this.metrics, null, 2));

    console.log('📊 Test reports generated:');
    console.log(`  - HTML: ${path.join(outputDir, 'test-report.html')}`);
    console.log(`  - JSON: ${path.join(outputDir, 'test-results.json')}`);
    console.log(`  - Metrics: ${metricsFile}`);
  }
}

export function createTestDashboard(metrics: TestMetrics): string {
  const dashboard = `
# 🎭 Playwright Test Dashboard
## elGato Photo - Photography Website

### 📊 Test Summary
- **Total Tests**: ${metrics.totalTests}
- **✅ Passed**: ${metrics.passed}
- **❌ Failed**: ${metrics.failed}
- **⏭️ Skipped**: ${metrics.skipped}
- **Success Rate**: ${metrics.totalTests ? Math.round((metrics.passed / metrics.totalTests) * 100) : 0}%

### ⏱️ Performance Metrics
- **Total Duration**: ${Math.round(metrics.duration / 1000)}s
- **Average Load Time**: ${metrics.performance?.avgLoadTime || 'N/A'}ms

### ♿ Accessibility Compliance
- **Compliant Pages**: ${metrics.accessibility?.compliantPages || 0}
- **WCAG Violations**: ${metrics.accessibility?.violations || 0}
- **Warnings**: ${metrics.accessibility?.warnings || 0}

### 🌐 Browser Compatibility
- **Browsers Tested**: ${metrics.compatibility?.browsers?.join(', ') || 'None'}
- **Failed Combinations**: ${metrics.compatibility?.failedCombinations?.length || 0}

### 📱 Test Categories
- ✅ Mobile Responsiveness
- ✅ Performance & Load Times
- ✅ Image Gallery Functionality
- ✅ Contact Form Validation
- ✅ Cross-Browser Compatibility
- ✅ User Journey Testing
- ✅ Accessibility Compliance
- ✅ CI/CD Integration

---
*Generated with Claude Flow Integration*
*Report Date: ${new Date().toLocaleString()}*
`;

  return dashboard;
}