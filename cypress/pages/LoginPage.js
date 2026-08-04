class LoginPage {
  // Locators Repository with specific error message elements & SPA timeouts
  elements = {
    loginModal: () => cy.get('[data-qa-id="login-auth-modal-container"]', { timeout: 15000 }),
    pinInput: (index) => cy.get(`[data-qa-id="login-pin-digit-input-${index}"]`, { timeout: 15000 }),
    passwordLoginLink: () => cy.get('[data-qa-id="login-pin-password-link"]', { timeout: 15000 }),
    schoolInput: () => cy.get("[role='combobox']", { timeout: 15000 }),
    schoolDropdownOption: () => cy.get('div .ng-option-label, .ng-option-label', { timeout: 15000 }),
    usernameInput: () => cy.get('[data-qa-id="login-pwd-username-input"]', { timeout: 15000 }),
    passwordInput: () => cy.get('[data-qa-id="login-pwd-password-input"]', { timeout: 15000 }),
    submitButton: () => cy.get('[data-qa-id="login-pwd-submit-button"]', { timeout: 15000 }),
    pwdErrorMessage: () => cy.get('[data-qa-id="login-pwd-error-message"]', { timeout: 15000 }),
    pinErrorMessage: () => cy.get('[data-qa-id="login-pin-error-message"]', { timeout: 15000 }),
    dashboardTitle: () => cy.get('[data-qa-id="wb-welcome-back-title"]', { timeout: 15000 })
  };

  visit() {
    cy.visit('/', { timeout: 90000, failOnStatusCode: false });
    cy.get('body', { timeout: 30000 }).should('be.visible');
    cy.wait(1500);
    return this;
  }

  verifyGuestMode() {
    this.elements.loginModal().should('be.visible');
    return this;
  }

  openLoginModal() {
    cy.get('[data-qa-id="login-auth-modal-container"]', { timeout: 15000 })
      .should('exist')
      .click({ force: true });
    cy.wait(1500); // Visual pause for modal opening animation
    return this;
  }

  enterPin(pin) {
    const digits = String(pin).split('');
    digits.forEach((digit, index) => {
      this.elements.pinInput(index).should('exist').clear({ force: true }).type(digit, { force: true });
      cy.wait(150);
    });

    // Trigger form submission via Enter key on final PIN digit
    this.elements.pinInput(digits.length - 1).type('{enter}', { force: true });

    cy.get('body').then(($body) => {
      const $submit = $body.find('[data-qa-id="login-btn"], [data-qa-id="login-pin-submit-button"], button[type="submit"], .btn-login');
      if ($submit.length > 0 && $submit.is(':visible')) {
        cy.wrap($submit.first()).click({ force: true });
      }
    });
    cy.wait(1500);
    return this;
  }

  clickPasswordLogin() {
    cy.get('[data-qa-id="login-pin-password-link"]', { timeout: 15000 })
      .should('exist')
      .click({ force: true });
    cy.wait(1500); // Visual pause when switching to Password view
    return this;
  }

  enterSchool(schoolName) {
    this.elements.schoolInput().should('be.visible').clear({ force: true }).type(schoolName, { delay: 100 });
    cy.wait(800);
    return this;
  }

  selectSchool(schoolName) {
    this.elements.schoolDropdownOption().contains(schoolName).should('be.visible').click({ force: true });
    cy.wait(500);
    return this;
  }

  verifySchoolSelected(schoolName) {
    cy.get("[role='combobox'], .ng-select-container, .ng-value-container", { timeout: 15000 })
      .should('contain.text', schoolName);
    return this;
  }

  enterUsername(username) {
    this.elements.usernameInput().should('be.visible').clear().type(username);
    return this;
  }

  enterPassword(password) {
    this.elements.passwordInput().should('be.visible').clear().type(password);
    return this;
  }

  clickLogin() {
    this.elements.submitButton().should('be.visible').click({ force: true });
    cy.wait(1000);
    return this;
  }

  verifyLoginButtonEnabled() {
    this.elements.submitButton().should('be.enabled');
    return this;
  }

  verifyLoginButtonDisabled() {
    this.elements.submitButton().should('be.disabled');
    return this;
  }

  verifyPwdError(expectedMessage) {
    if (expectedMessage) {
      this.elements.pwdErrorMessage().should('be.visible').and('contain.text', expectedMessage);
    } else {
      this.elements.pwdErrorMessage().should('be.visible');
    }
    return this;
  }

  verifyPinError(expectedMessage) {
    if (expectedMessage) {
      this.elements.pinErrorMessage().should('be.visible').and('contain.text', expectedMessage);
    } else {
      this.elements.pinErrorMessage().should('be.visible');
    }
    return this;
  }

  verifyFieldRedBorder(elementGetter) {
    elementGetter().should('satisfy', ($el) => {
      const hasClass = $el.hasClass('ng-invalid') || $el.hasClass('is-invalid') || $el.hasClass('error') || $el.parent().hasClass('ng-invalid');
      const style = window.getComputedStyle($el[0]);
      const border = style.borderColor || style.border;
      return hasClass || border.includes('rgb') || border.includes('red') || border !== '';
    });
    return this;
  }

  verifyDashboard() {
    this.elements.dashboardTitle().should('be.visible');
    return this;
  }
}

export default new LoginPage();
