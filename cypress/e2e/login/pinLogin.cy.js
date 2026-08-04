import LoginPage from '../../pages/LoginPage';
import DashboardPage from '../../pages/DashboardPage';

describe('PIN Login Module', () => {
  let loginData;

  beforeEach(() => {
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
    LoginPage.visit();
    cy.get('body').then(($body) => {
      if ($body.find('[data-qa-id="wb-welcome-back-title"]:visible, [data-qa-id="playlist-current-grade-subject-btn"]:visible').length > 0) {
        const $avatar = $body.find('[data-qa-id="toolbar-user-avatar"]:visible, .userimg:visible');
        if ($avatar.length > 0) {
          cy.wrap($avatar.first()).click({ force: true });
          cy.wait(500);
        }
        const $signOut = $body.find('[data-qa-id="floating-signout-trigger-btn"]:visible, .SignOutBtn:visible');
        if ($signOut.length > 0) {
          cy.wrap($signOut.first()).click({ force: true });
          cy.wait(1000);
        }
      }
    });
  });

  it('TC001 - Verify application launches in Guest Mode', () => {
    LoginPage.verifyGuestMode();
  });

  it('TC002 - Verify Login Modal opens PIN login dialog', () => {
    LoginPage.openLoginModal();
    LoginPage.elements.pinInput(0).should('exist');
  });

  it('TC004 - Verify Invalid PIN displays login-pin-error-message', () => {
    LoginPage.openLoginModal();
    LoginPage.elements.pinInput(0).should('exist');
    LoginPage.enterPin(loginData.invalidPin);
    LoginPage.verifyPinError();
  });

  it('TC003 - [HAPPY PATH] Verify successful PIN Login', () => {
    LoginPage.openLoginModal();
    LoginPage.elements.pinInput(0).should('exist');
    LoginPage.enterPin(loginData.validPin);
    LoginPage.verifyDashboard();
    DashboardPage.verifyWelcomeMessage();
  });
});
