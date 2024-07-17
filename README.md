# Template Playwright

## Overview

This template is designed to serve as a foundation for web testing projects using Playwright. It includes a structured framework for end-to-end, visual, load, and API testing. The template is organized into page objects, making tests easy to write, read, and maintain.

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm (v6 or newer)

### Installation

1. Download the template from QA's Chapter
2. Install dependencies: `npm install`

### Running Tests

- To run all tests: `npx playwright test`
- To run a specific test file: `npx playwright test {PATH_OF_TEST}`
- To run tests with headed browsers: `npx playwright test --ui`
- To show the test report: `npx playwright show-report`
- To run load tests: `k6 run {PATH_OF_TEST}`

## Structure

- `page-object/`: Contains Page Object classes for encapsulating page-specific actions and elements.
- `tests/`: Contains test files written with Playwright's testing library.
- `package.json`: Manages project dependencies and scripts.

## Key Features

- **Page Object Model**: Enhances test maintenance and reduces code duplication.
- **Playwright Test**: Provides powerful testing capabilities for end-to-end tests.
- **Faker.js**: Generates fake data for robust testing scenarios.
- **Visual Testing**: Supports visual regression testing.
- **Load Testing**: Integrates with `k6` for load testing.
- **API Testing**: Facilitates testing of RESTful APIs.

## Best Practices

- **Modular Design**: Keep tests independent and reusable.
- **Data Separation**: Use external data sources for test data.
- **Continuous Integration**: Integrate tests into your CI/CD pipeline for automated feedback.
- **Code Reviews**: Regularly review test code to ensure quality and adherence to standards.

## Contributing

Contributions are welcome! Please read our contributing guidelines for more information on how to report issues, submit fixes, and contribute to the codebase.