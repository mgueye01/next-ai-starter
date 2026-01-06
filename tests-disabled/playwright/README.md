# 🎭 Playwright Testing Suite for elGato Photo

A comprehensive end-to-end testing suite for the elGato Photo photographer website, featuring Claude Flow integration for automated coordination and reporting.

## 🎯 Test Coverage

### 📱 Mobile Responsiveness
- **File**: `specs/mobile-responsiveness.spec.ts`
- Tests all pages across 5 different mobile viewports
- Validates touch target sizes (minimum 44px)
- Checks for horizontal overflow issues
- Tests mobile navigation menu functionality
- Verifies text readability on mobile devices

### 🚀 Performance Testing
- **File**: `specs/performance.spec.ts`
- Page load time analysis (under 3 seconds target)
- Core Web Vitals measurement (LCP, FID, CLS)
- Image optimization and lazy loading validation
- JavaScript bundle size analysis
- Slow network condition testing
- Memory usage monitoring

### 🖼️ Image Gallery Testing
- **File**: `specs/image-gallery.spec.ts`
- Image loading and display verification
- Modal/lightbox functionality testing
- Keyboard navigation support
- Error handling for failed image loads
- Lazy loading implementation validation
- Progressive image loading testing
- Metadata and EXIF data display

### 📝 Contact Form Testing
- **File**: `specs/contact-form.spec.ts`
- Form accessibility validation
- Input validation and error messaging
- Form submission functionality
- International character support
- Mobile form interaction
- Security measures (CAPTCHA, rate limiting)
- File attachment support (if applicable)

### 🌐 Cross-Browser Compatibility
- **File**: `specs/cross-browser.spec.ts`
- Testing across Chromium, Firefox, and WebKit
- CSS feature support validation
- JavaScript compatibility testing
- Font loading verification
- Responsive design consistency
- Feature detection and graceful degradation

### 👤 User Journey Testing
- **File**: `specs/user-journeys.spec.ts`
- Complete client discovery workflow
- Wedding photography inquiry process
- Portrait session booking flow
- Mobile user experience
- Return visitor behavior
- Social media referral journeys
- SEO/Google search landing optimization

### ♿ Accessibility Compliance
- **File**: `specs/accessibility.spec.ts`
- WCAG 2.1 AA standard compliance
- Image alt text validation
- Heading hierarchy testing
- Keyboard navigation support
- Form accessibility validation
- Color contrast verification
- ARIA attributes usage
- Screen reader compatibility

### 🔧 CI/CD Integration
- **File**: `specs/ci-integration.spec.ts`
- Application startup verification
- Route accessibility testing
- Build artifact validation
- Environment configuration checks
- Database connectivity testing
- API endpoint verification
- Security headers validation
- Search engine crawlability

## 🚀 Getting Started

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm test

# Run with browser UI
npm run test:ui

# Run in headed mode
npm run test:headed

# Run mobile-specific tests
npm run test:mobile

# Run specific test categories
npm run test:accessibility
npm run test:performance
npm run test:cross-browser
```

### Test Configuration

The test suite is configured via `playwright.config.ts` with the following key features:

- **Multiple Browser Testing**: Chrome, Firefox, Safari, Edge
- **Mobile Device Testing**: iPhone, Android, iPad viewports
- **High-Resolution Testing**: 4K desktop support
- **Comprehensive Reporting**: HTML, JSON, JUnit formats
- **Performance Monitoring**: Built-in metrics collection
- **Screenshot Capture**: On failure for debugging
- **Video Recording**: Failure retention for analysis

## 🤖 Claude Flow Integration

This testing suite includes deep integration with Claude Flow for automated coordination and team communication.

### Hooks Integration

**Pre-Task Setup** (`global-setup.ts`):
```bash
npx claude-flow@alpha hooks pre-task --description "Playwright Test Suite"
npx claude-flow@alpha hooks session-restore --session-id "playwright-test-session"
```

**Progress Reporting** (throughout tests):
```bash
npx claude-flow@alpha hooks notify --message "Test progress update"
npx claude-flow@alpha hooks post-edit --file "test-results" --message "Test completed"
```

**Post-Task Cleanup** (`global-teardown.ts`):
```bash
npx claude-flow@alpha hooks post-task --task-id "playwright-tests"
npx claude-flow@alpha hooks session-end --export-metrics true
```

### Team Coordination Features

1. **Real-time Progress Updates**: Live test execution status
2. **Automated Result Reporting**: Test outcomes shared with development team
3. **Memory Integration**: Test results stored for cross-session analysis
4. **Performance Metrics**: Automated bottleneck detection and reporting
5. **Failure Notifications**: Immediate alerts for critical test failures

## 📊 Test Reporting

### Available Report Formats

1. **HTML Report**: Interactive visual report with screenshots
   - Location: `tests/playwright-report/index.html`
   - View with: `npm run test:report`

2. **JSON Report**: Machine-readable results
   - Location: `tests/playwright-results.json`
   - Used for CI/CD integration and analysis

3. **JUnit Report**: XML format for CI systems
   - Location: `tests/playwright-results.xml`
   - Compatible with most CI/CD platforms

4. **Custom Dashboard**: Photography-focused metrics
   - Generated by `utils/test-reporting.ts`
   - Includes photographer-specific KPIs

### Report Features

- **Test Execution Metrics**: Duration, success rates, failure analysis
- **Performance Benchmarks**: Load times, Core Web Vitals, optimization scores
- **Accessibility Compliance**: WCAG violation reports, improvement suggestions
- **Cross-Browser Matrix**: Compatibility across all tested browsers
- **Mobile Experience**: Touch interaction, viewport optimization results
- **User Journey Analysis**: Conversion funnel testing, UX optimization

## 🏗️ CI/CD Pipeline

### GitHub Actions Workflow

The suite includes a comprehensive GitHub Actions workflow (`.github/workflows/playwright-tests.yml`) that provides:

**Multi-Shard Testing**:
- Tests run in parallel across 4 shards for faster execution
- Automatic load balancing across test suites

**Cross-Platform Matrix**:
- Ubuntu, macOS, and Windows testing
- All major browsers on each platform

**Specialized Audit Jobs**:
- **Accessibility Audit**: Dedicated WCAG compliance checking
- **Performance Audit**: Core Web Vitals and optimization analysis
- **Cross-Browser Matrix**: Comprehensive compatibility testing

**Automated Reporting**:
- Report merging and artifact collection
- Team notifications via Claude Flow hooks
- GitHub job summaries with actionable insights

### Environment Variables

```bash
# CI Detection
CI=true

# Claude Flow Configuration (optional)
CLAUDE_FLOW_API_KEY=your-api-key
CLAUDE_FLOW_SESSION_ID=custom-session-id
```

## 🎨 Photography Website Specific Features

### Image-Centric Testing
- High-resolution image loading validation
- Gallery performance under load
- Lazy loading implementation verification
- Image format optimization (WebP, AVIF support)

### Mobile Photography Experience
- Touch gesture support for gallery navigation
- Mobile-optimized contact forms
- Portrait/landscape orientation handling
- Photo sharing functionality validation

### Client Interaction Workflows
- Wedding inquiry form testing with French localization
- Portfolio browsing behavior analysis
- Contact form validation with photography-specific fields
- Service pricing page functionality

### SEO and Discovery
- Photography-specific meta tag validation
- Local business schema markup testing
- Social media integration verification
- Image alt text optimization for photography content

## 🔧 Customization

### Adding New Tests

1. Create test file in `tests/playwright/specs/`
2. Import test helpers: `import { TestHelpers } from '../utils/test-helpers';`
3. Add Claude Flow reporting: `await testHelper.reportProgress('Test description');`
4. Follow photography website testing patterns

### Extending Test Utilities

The `TestHelpers` class (`utils/test-helpers.ts`) provides:

- **Image Loading**: `waitForImages()`, `measureImageLoadTime()`
- **Performance**: `measureCoreWebVitals()`, `measurePageLoad()`
- **Responsive**: `testResponsiveBreakpoints()`
- **Forms**: `testFormValidation()`
- **Claude Flow**: `reportProgress()` with automated hooks

### Custom Reporters

Extend the `TestReporter` class (`utils/test-reporting.ts`) for:

- Photography-specific metrics
- Client workflow analysis
- Performance benchmarking
- Accessibility scoring

## 📈 Performance Benchmarks

### Target Metrics

- **Page Load Time**: < 3 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **First Input Delay**: < 100 milliseconds
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 5 seconds

### Mobile Performance

- **Touch Target Size**: ≥ 44px
- **Viewport Optimization**: No horizontal scroll
- **Font Size**: ≥ 16px for body text
- **Image Optimization**: WebP/AVIF format usage

## 🛠️ Troubleshooting

### Common Issues

1. **Browser Installation**: Run `npx playwright install --with-deps`
2. **Port Conflicts**: Ensure port 3000 is available for test server
3. **Claude Flow Connectivity**: Hooks integration is optional and will gracefully degrade
4. **Timeout Issues**: Increase timeout in `playwright.config.ts` if needed

### Debug Mode

```bash
# Run tests in debug mode
npx playwright test --debug

# Run specific test with debugging
npx playwright test tests/playwright/specs/accessibility.spec.ts --debug

# Generate trace files
npx playwright test --trace on
```

### Headless vs Headed Testing

```bash
# Headless (default, faster)
npm test

# Headed (see browser actions)
npm run test:headed

# Interactive UI mode
npm run test:ui
```

## 🤝 Contributing

### Adding Photography-Specific Tests

1. Focus on client user journeys
2. Include mobile-first testing approaches
3. Add Claude Flow progress reporting
4. Validate French language content
5. Test high-resolution image handling

### Code Style

- Use descriptive test names with photographer context
- Include progress reporting for long-running tests
- Add proper error handling and cleanup
- Follow accessibility-first testing principles

---

## 📞 Support

For questions about this testing suite:

1. **GitHub Issues**: Report bugs and feature requests
2. **Claude Flow Documentation**: For coordination and reporting features
3. **Playwright Documentation**: For core testing functionality

**Happy Testing!** 🎭📸