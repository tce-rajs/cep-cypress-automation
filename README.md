# CEP V2 - Cypress Test Automation Framework

![Cypress Version](https://img.shields.io/badge/Cypress-13.0.0-green.svg)
![Build Status](https://img.shields.io/badge/Tests-60%2F60%20Passed-brightgreen.svg)
![Pass Rate](https://img.shields.io/badge/Pass%20Rate-100%25-success.svg)

An enterprise-grade, end-to-end UI test automation framework built for **CEP V2 Whiteboard & Playlist Application** using **Cypress**, **Page Object Model (POM)** architecture, and **Allure Reporting**.

---

## 📊 Live Allure Test Report

🌐 **Live HTML Allure Report**: [https://tce-rajs.github.io/cep-automation-reports/](https://tce-rajs.github.io/cep-automation-reports/)

---

## 🚀 What We Are Testing

This framework validates core business workflows, player components, navigation, and user authentication for CEP V2:

1. **MOD-001: Login Module (17/17 Passed - 100%)**
   - Guest Mode verification, PIN Login (`75583`), Password Login (School Search, Credentials), and Field Validation rules.
2. **MOD-002: Navigation Module (14/14 Passed - 100%)**
   - Dashboard welcome header, Grade / Level / Division / Subject selection modal, Chapter & Topic selection popup, and header state persistence.
3. **MOD-003: Playlist Module (8/8 Passed - 100%)**
   - Playlist loading, asset card rendering, type icons (PDF, Video, Worksheet), and active asset selection highlighting.
4. **MOD-004: PDF / Worksheet Player Module (15/15 Passed - 100%)**
   - PDF canvas load verification, page navigation (Next, Prev, Go-To-Page), page count display, Portrait / Landscape orientation, and Answer Toggle.
5. **MOD-005: Video Player Module (6/6 Passed - 100%)**
   - Video container initialization, HTML5 / VideoJS playback lifecycle (Play, Pause, Mute/Unmute via `#myMuteIcon`), and end-to-end player closing.

---

## 🛠️ Tech Stack & Architecture

- **Test Runner**: Cypress 13
- **Design Pattern**: Page Object Model (POM)
- **Reporting**: Allure Commandline (`@shelex/cypress-allure-plugin`)
- **Assertions**: Unforgiving DOM visibility, text matching, and negative structural checks (`should('not.exist')`)
- **Session Reuse**: Single-Login session persistence with automatic state cleanup between specs.

---

## ⚡ Quick Run Commands

### 1. Execute All Test Modules & Launch Allure Report
```bash
npm run test:allure
```

### 2. Run Test Suite Headed in Chrome
```bash
npx cypress run --browser chrome --headed --env allure=true
```

### 3. Open Allure Report
```bash
npm run allure:report
```

---

## 📁 Repository Links

- **Main Test Automation Code**: [https://github.com/tce-rajs/cep-cypress-automation.git](https://github.com/tce-rajs/cep-cypress-automation.git)
- **Live Allure Report Website**: [https://github.com/tce-rajs/cep-automation-reports.git](https://github.com/tce-rajs/cep-automation-reports.git)