<div align="center">

# 🚀 CEP Cypress Automation Framework

[![Cypress](https://img.shields.io/badge/Cypress-v13.0.0-172B4D?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Allure Report](https://img.shields.io/badge/Allure%20Report-2.43.0-FF6C37?style=for-the-badge&logo=qameta&logoColor=white)](https://tce-rajs.github.io/cep-automation-reports/)
[![Pattern](https://img.shields.io/badge/Architecture-POM-blueviolet?style=for-the-badge)](#-architecture--design-patterns)
[![License](https://img.shields.io/badge/License-ISC-informational?style=for-the-badge)](#)

<p align="center">
  <b>Enterprise-grade End-to-End (E2E) Test Automation Framework for Customer Experience Platform (CEP)</b><br/>
  Powered by Cypress, Page Object Model (POM), and Automated Allure Analytics.
</p>

---

</div>

## 📌 Executive Summary

The **CEP Cypress Automation Framework** is designed for scalable, robust, and maintainable web automation testing. It enforces industry-standard software engineering practices including strict encapsulation via the **Page Object Model (POM)** pattern, modular test data management, custom utility hooks, and automated **Allure trend analytics**.

---

## 🔗 Repository & Live Report References

- 📦 **Parent Test Automation Repository**: [https://github.com/tce-rajs/cep-cypress-automation.git](https://github.com/tce-rajs/cep-cypress-automation.git)
- 📊 **Allure Reports Code Repository**: [https://github.com/tce-rajs/cep-automation-reports.git](https://github.com/tce-rajs/cep-automation-reports.git)
- 🌐 **Live Interactive Allure Web Report**: [https://tce-rajs.github.io/cep-automation-reports/](https://tce-rajs.github.io/cep-automation-reports/)

---

## ⚡ Framework Highlights

| Feature | Description |
| :--- | :--- |
| 🧩 **Page Object Model (POM)** | Decouples page locators, actions, and assertions for seamless maintainability. |
| 📊 **Historical Allure Trends** | Retains prior test run trends (`allure-results` & `allure-report` history preservation). |
| 🎬 **Rich Asset Automation** | Automated verification of interactive learning assets (PDF, Video Player, Controls). |
| 🔒 **Robust Authentication** | Comprehensive specs for PIN-based, Password-based, and multi-factor login validations. |
| 🛠️ **Smart CLI Scripting** | Custom scripts (`allure-manager.js`) to handle single-command execution & reporting. |

---

## 🏗️ Architecture & Tech Stack

```text
cep-cypress-automation/
├── 📁 cypress/
│   ├── 📁 e2e/                           # Test Specifications (Grouped by Feature Domain)
│   │   ├── 📁 asset-player/               # Asset Player Domain (PDF & Video Players)
│   │   ├── 📁 login/                      # Authentication Specs (PIN & Password)
│   │   ├── 📁 navigation/                 # Class, Grade, Subject, Chapter & Topic Navigation
│   │   └── 📁 playlist/                   # Playlist Card Rendering & Selection
│   ├── 📁 fixtures/                      # Mock Data & Static Test Payloads
│   ├── 📁 pages/                         # Page Object Classes (Locators & Actions)
│   └── 📁 support/                       # Custom Commands & Test Lifecycle Hooks
├── 📁 scripts/
│   └── 📄 allure-manager.js              # Allure Trend Aggregator & Duration Calculator
├── 📄 cypress.config.js                  # Cypress Execution & Plugin Configs
├── 📄 package.json                       # Scripts, Dependencies & Metadata
└── 📄 README.md                          # Framework Documentation
```

### 💻 Technologies Used
- **Test Runner:** [Cypress 13.0](https://www.cypress.io/)
- **Language:** JavaScript (ES6+)
- **Reporting Engine:** [Allure Framework](https://allurereport.org/) via `@shelex/cypress-allure-plugin`
- **Pattern:** Page Object Model (POM)
- **Node Environment:** Node.js v18+ LTS

---

## 🛠️ Prerequisites & Setup

<details open>
<summary><b>1. System Requirements</b></summary>

Ensure your environment meets the minimum version criteria:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Browser**: Google Chrome (Latest) / Electron

```bash
# Verify local environment
node -v
npm -v
```
</details>

<details open>
<summary><b>2. Installation</b></summary>

Clone the repository and install all required node modules:

```bash
# Clone the repository
git clone https://github.com/tce-rajs/cep-cypress-automation.git

# Navigate to project directory
cd cep-cypress-automation

# Install dependencies
npm install
```
</details>

---

## 🚀 Test Execution Commands

Quick reference for executing test suites across different modes and browsers:

### 🎮 Execution Matrix

| Goal | Command | Mode |
| :--- | :--- | :--- |
| **Run All Tests + Allure Report** | `npm test` *(or `npm run test:allure`)* | Headed / Automated Report |
| **Open Cypress GUI** | `npm run cypress:open` | Interactive Test Runner |
| **Run All Tests in Chrome** | `npm run cypress:run` | Headed CLI Execution |
| **Generate Report Only** | `npm run allure:generate` | CLI Report Builder |
| **Open Existing Allure Report** | `npm run allure:open` | Browser Server |
| **Clear Report Cache** | `npm run allure:clear` | Cleanup |

---

### 🎯 Running Specific Test Specs

To target a specific feature or test file:

```bash
# Run Login Suite (PIN Login)
npx cypress run --spec "cypress/e2e/login/pinLogin.cy.js" --browser chrome --headed

# Run Login Suite (Password Login)
npx cypress run --spec "cypress/e2e/login/passwordLogin.cy.js" --browser chrome --headed

# Run Navigation Suite
npx cypress run --spec "cypress/e2e/navigation/navigation.cy.js" --browser chrome --headed

# Run Asset Player Suite (PDF Player)
npx cypress run --spec "cypress/e2e/asset-player/pdf-player/pdfPlayer.cy.js" --browser chrome --headed

# Run Asset Player Suite (Video Player)
npx cypress run --spec "cypress/e2e/asset-player/video-player/videoPlayer.cy.js" --browser chrome --headed
```

---

## 🧪 Test Coverage Modules (60 / 60 Passed - 100%)

| Domain | Feature Area | Status |
| :--- | :--- | :---: |
| 🔑 **Authentication** | MOD-001: PIN Login & Password Validation | `Passed (17/17)` |
| 🧭 **Navigation** | MOD-002: Class, Grade, Subject, Chapter & Topic Selection | `Passed (14/14)` |
| 📋 **Playlist** | MOD-003: Asset Card Listing & Selection | `Passed (8/8)` |
| 📄 **Asset Player** | MOD-004: PDF / Worksheet Player & Controls | `Passed (15/15)` |
| 🎬 **Asset Player** | MOD-005: Video Player Controls & Stream Playback | `Passed (6/6)` |

---

<div align="center">
  <sub>Maintained by <b>QA Automation Engineering Team</b> • CEP V2 Automation</sub>
</div>