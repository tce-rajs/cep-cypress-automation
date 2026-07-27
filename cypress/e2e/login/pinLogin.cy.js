import LoginPage from '../../pages/LoginPage';
import DashboardPage from '../../pages/DashboardPage';

describe('PIN Login Module', () => {
  let loginData;

  beforeEach(() => {
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
    LoginPage.visit();
  });

  // HAPPY PATH TEST FIRST
  it('TC003 - [HAPPY PATH] Verify successful PIN Login', () => {
    LoginPage.openLoginModal();
    LoginPage.elements.pinInput(0).should('be.visible');
    LoginPage.enterPin(loginData.validPin);
    LoginPage.verifyDashboard();
    DashboardPage.verifyWelcomeMessage();
  });

  it('TC001 - Verify application launches in Guest Mode', () => {
    LoginPage.verifyGuestMode();
  });

  it('TC002 - Verify Login Modal opens PIN login dialog', () => {
    LoginPage.openLoginModal();
    LoginPage.elements.pinInput(0).should('be.visible');
  });

  it('TC004 - Verify Invalid PIN displays login-pin-error-message', () => {
    LoginPage.openLoginModal();
    LoginPage.elements.pinInput(0).should('be.visible');
    LoginPage.enterPin(loginData.invalidPin);
    LoginPage.verifyPinError();
  });

  it('TC005 - Verify Empty PIN shows required validation / red highlight', () => {
    LoginPage.openLoginModal();
    LoginPage.elements.pinInput(0).should('be.visible').focus().blur();
    LoginPage.verifyFieldRedBorder(() => LoginPage.elements.pinInput(0));
  });
});
