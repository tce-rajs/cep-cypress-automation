# CEP V2 Login Module - Test Scenarios & Test Cases

This document details all Test Scenarios (TS001 – TS025) and Test Cases for the **CEP V2 Login Module**, covering both **PIN Authentication** and **Password Authentication** flows for:

**Application URL**
`https://ce-qa-school.devstudi.com/teach/whiteboard`

---

# 📋 Feature Overview & Business Rules

## Business Rules

### BR-001

Application always opens in **Guest Mode**.

### BR-002

Clicking the Login Modal (`data-qa-id="login-auth-modal-container"`) opens the authentication dialog.

### BR-003

PIN Login accepts **exactly 5 numeric digits** (`login-pin-digit-input-0` through `login-pin-digit-input-4`).

### BR-004

Invalid PIN displays `data-qa-id="login-pin-error-message"`.

### BR-005

School selection must be performed using the dropdown combobox (`role='combobox'`).

### BR-006

Password Login requires:

* School
* Username
* Password

before Login can proceed.

### BR-007

Login button (`data-qa-id="login-pwd-submit-button"`) remains disabled until all mandatory fields are completed.

### BR-008

Empty mandatory fields display validation (red border / invalid state).

### BR-009

Successful authentication redirects to Dashboard.

### BR-010

Guest Mode is no longer visible after successful login.

### BR-011

Authenticated user session remains active until logout or session expiry.

### BR-012

Invalid credentials display authentication error (`data-qa-id="login-pwd-error-message"`).

### BR-013

Authenticated user should only be redirected to Dashboard.

---

# 📁 Test Data

| Data             | Value           |
| ---------------- | --------------- |
| Valid PIN        | 75583           |
| Invalid PIN      | 12345           |
| School           | Velammal School |
| Username         | support.admin   |
| Password         | Tce#12345       |
| Invalid Username | invalid.user    |
| Invalid Password | Wrong@123       |

---

# 📊 Test Scenario Matrix

| Scenario ID | Test Scenario                                 | Priority | Automation | Spec File             |
| ----------- | --------------------------------------------- | -------- | ---------- | --------------------- |
| TS001       | Verify Guest Mode                             | High     | Yes        | pinLogin.cy.js        |
| TS002       | Verify Login Modal Opens                      | High     | Yes        | pinLogin.cy.js        |
| TS003       | Verify PIN Login Screen                       | High     | Yes        | pinLogin.cy.js        |
| TS004       | Verify Password Login Screen                  | High     | Yes        | passwordLogin.cy.js   |
| TS005       | Verify School Search                          | High     | Yes        | passwordLogin.cy.js   |
| TS006       | Verify School Selection                       | High     | Yes        | passwordLogin.cy.js   |
| TS007       | Verify Username Field                         | High     | Yes        | passwordLogin.cy.js   |
| TS008       | Verify Password Field                         | High     | Yes        | passwordLogin.cy.js   |
| TS009       | Verify Login Button Behaviour                 | High     | Yes        | passwordLogin.cy.js   |
| TS010       | Verify Successful PIN Login                   | High     | Yes        | pinLogin.cy.js        |
| TS011       | Verify Successful Password Login              | High     | Yes        | passwordLogin.cy.js   |
| TS012       | Verify Invalid PIN                            | High     | Yes        | pinLogin.cy.js        |
| TS013       | Verify Invalid Username                       | High     | Yes        | loginValidation.cy.js |
| TS014       | Verify Invalid Password                       | High     | Yes        | loginValidation.cy.js |
| TS015       | Verify Empty Mandatory Fields                 | High     | Yes        | loginValidation.cy.js |
| TS016       | Verify Dashboard Loaded                       | High     | Yes        | dashboard.cy.js       |
| TS017       | Verify Login Modal Close Behaviour            | Medium   | Yes        | loginUI.cy.js         |
| TS018       | Verify Switching Between PIN & Password Login | High     | Yes        | loginUI.cy.js         |
| TS019       | Verify Password Masking                       | High     | Yes        | loginUI.cy.js         |
| TS020       | Verify PIN Accepts Numeric Input Only         | High     | Yes        | pinLogin.cy.js        |
| TS021       | Verify PIN Maximum Length                     | Medium   | Yes        | pinLogin.cy.js        |
| TS022       | Verify School Dropdown Behaviour              | Medium   | Yes        | passwordLogin.cy.js   |
| TS023       | Verify Refresh Behaviour Before Login         | Medium   | Yes        | loginSession.cy.js    |
| TS024       | Verify Session Persistence After Login        | Medium   | Yes        | loginSession.cy.js    |
| TS025       | Verify Logout (If Available)                  | High     | Future     | loginSession.cy.js    |

---

# 🧪 Detailed Test Cases

---

# TS001 – Guest Mode

## TC001 – Verify Application Opens in Guest Mode

**Precondition**

* Application URL is accessible.

**Steps**

1. Launch application.
2. Observe landing page.

**Expected Result**

* Guest Mode is displayed.
* Login modal trigger is visible.

**Tags**

Smoke | Regression | Sanity

---

# TS002 – Login Modal

## TC002 – Verify Login Modal Opens

**Precondition**

Application launched.

**Steps**

1. Click Login Modal.

**Expected Result**

PIN Authentication dialog opens.

---

# TS003 – PIN Login

## TC003 – Happy Path PIN Login

**Steps**

1. Launch application.
2. Open Login Modal.
3. Enter Valid PIN.
4. Wait for authentication.

**Expected Result**

Dashboard loads successfully.

---

## TC004 – Invalid PIN

Expected

* Error message displayed (`data-qa-id="login-pin-error-message"`).
* User remains on Login screen.

---

## TC005 – Empty PIN Validation

Expected

* Invalid state displayed (red border / highlight).

---

## TC006 – Verify PIN Accepts Numbers Only

**Steps**

Attempt entering:

* Letters
* Special characters

**Expected**

Only numeric values are accepted.

---

## TC007 – Verify PIN Maximum Length

**Steps**

Attempt entering six digits.

**Expected**

Only first five digits are accepted.

---

## TC008 – Verify PIN Auto Focus

**Expected**

Cursor automatically moves to next input after every digit.

---

## TC009 – Verify PIN Backspace Navigation

**Expected**

Deleting previous digit moves cursor back.

---

## TC010 – Verify PIN Paste Behaviour

Paste

75583

**Expected**

All five PIN boxes populate correctly.

---

# TS004 – Password Login Screen

## TC011 – Open Password Login

Expected

Password Login form displays:

* School
* Username
* Password
* Login Button

---

## TC012 – Verify Switching Between PIN & Password Login

Expected

User can navigate between both authentication methods without page refresh.

---

# TS005 – School Search

## TC013 – Search School

Expected

Matching schools displayed.

---

## TC014 – Select School

Expected

Selected school appears inside combobox (`[role='combobox']`).

---

## TC015 – Search Non-existing School

Expected

No matching record displayed.

---

# TS006 – Username Field

## TC016 – Username Input

Expected

Username accepted successfully.

---

## TC017 – Username Leading/Trailing Spaces

Expected

Application trims spaces.

---

# TS007 – Password Field

## TC018 – Password Input

Expected

Password accepted.

---

## TC019 – Password Masking

Expected

Password is displayed as masked characters.

---

## TC020 – Password Leading/Trailing Spaces

Expected

Application behaviour follows expected validation.

---

# TS008 – Login Button

## TC021 – Button Disabled

Expected

Disabled until mandatory fields completed.

---

## TC022 – Button Enabled

Expected

Enabled once:

* School
* Username
* Password

are entered.

---

## TC023 – Prevent Multiple Login Clicks

Expected

Only one login request is sent.

---

## TC024 – Login Loading State

Expected

Loading indicator displayed until authentication completes.

---

# TS009 – Successful Password Login

## TC025 – Happy Path Password Login

Expected

Dashboard displayed (`data-qa-id="wb-welcome-back-title"`).

---

# TS010 – Dashboard Verification

## TC026 – Dashboard Loaded

Expected

* Welcome title visible.
* Guest Mode hidden.
* User authenticated.

---

# TS011 – Validation

## TC027 – Invalid Username

Expected

Authentication error displayed (`data-qa-id="login-pwd-error-message"`).

---

## TC028 – Invalid Password

Expected

Authentication error displayed (`data-qa-id="login-pwd-error-message"`).

---

## TC029 – Empty Username

Expected

* Login disabled.
* Username highlighted (red border / invalid state).

---

## TC030 – Empty Password

Expected

* Login disabled.
* Password highlighted (red border / invalid state).

---

## TC031 – Empty School

Expected

* Login disabled.
* School highlighted (red border / invalid state).

---

# TS012 – Login Modal

## TC032 – Close Login Modal

Expected

Authentication dialog closes successfully.

---

# TS013 – Session

## TC033 – Refresh Before Login

Expected

Application opens again in Guest Mode.

---

## TC034 – Refresh After Login

Expected

User remains authenticated.

---

## TC035 – Session Persistence

Expected

Authenticated session remains active after refresh.

---

# TS014 – API Verification (Automation)

## TC036 – Verify Login API Response

**Automation Only**

Intercept Login API.

Verify:

* Status Code = 200
* Authentication token exists
* User ID exists
* School ID exists

---

# 🚀 Automation Tags

| Test Case              | Smoke | Sanity | Regression |
| ---------------------- | ----- | ------ | ---------- |
| Valid PIN Login        | ✅     | ✅      | ✅          |
| Valid Password Login   | ✅     | ✅      | ✅          |
| Invalid PIN            | ❌     | ✅      | ✅          |
| Invalid Username       | ❌     | ✅      | ✅          |
| Invalid Password       | ❌     | ✅      | ✅          |
| Empty Mandatory Fields | ❌     | ✅      | ✅          |
| Dashboard Verification | ✅     | ✅      | ✅          |
| Session Persistence    | ❌     | ❌      | ✅          |
| API Verification       | ❌     | ✅      | ✅          |

---

# 📌 Future Automation Scope

The following scenarios are recommended for future implementation:

* Browser Back after Login
* Browser Refresh after Login
* Session Timeout
* Multiple Browser Tabs
* Network Failure During Login
* Slow Network Response
* HTTP 401 Response
* HTTP 500 Response
* Offline Mode
* Remember Me (if introduced)
* Password Visibility Toggle (if introduced)

---

# 📂 Recommended Cypress Folder Structure

```text
cypress/

e2e/
└── login/
    ├── pinLogin.cy.js
    ├── passwordLogin.cy.js
    ├── loginValidation.cy.js
    └── testScenariosAndCases.md

fixtures/
└── loginData.json

support/
├── commands.js
└── e2e.js

pages/
├── LoginPage.js
└── DashboardPage.js
```

This structure keeps the login automation modular, reusable, and scalable.
