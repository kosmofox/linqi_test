# LINQI - Automated Testing with Playwright + TypeScript

Automated end-to-end testing suite for the LINQI application using Playwright and TypeScript.

## 📋 Requirements

### Must Have:
- Playwright + TypeScript
- Tests run in Google Chrome
- Page Object pattern implementation
- Fixtures for test setup and teardown

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd <your-repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chrome
```

4. Create a `.env` file in the root directory:
```env
BASE_URL=https://linqi.wecantest.it
LOGIN_URL=https://login.wecantest.it/Account/Login
PROCESS_URL=https://linqi.wecantest.it/processDashboard
PROCESS_CREATE_URL=https://linqi.wecantest.it/processDesigner

TEST_USER_NAME=your_username_here
TEST_USER_PASSWORD=your_password_here
```

## 🧪 Running Tests

### Run all tests:
```bash
npm test
```
