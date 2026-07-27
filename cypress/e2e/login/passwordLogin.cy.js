import LoginPage from '../../pages/LoginPage';
import DashboardPage from '../../pages/DashboardPage';

describe('Password Login Module', () => {
  let loginData;

  beforeEach(() => {
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
    LoginPage.visit();
  });

  // HAPPY PATH TEST FIRST
  it('TC013 - [HAPPY PATH] Verify Valid Password Login navigates to Dashboard', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.enterSchool(loginData.schoolSearch);
    LoginPage.selectSchool(loginData.school);
    LoginPage.enterUsername(loginData.username);
    LoginPage.enterPassword(loginData.password);
    LoginPage.verifyLoginButtonEnabled();
    LoginPage.clickLogin();
    LoginPage.verifyDashboard();
    DashboardPage.verifyWelcomeMessage();
  });

  it('TC006 - Verify Open Password Login form', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.elements.usernameInput().should('be.visible');
    LoginPage.elements.passwordInput().should('be.visible');
  });

  it('TC007 - Verify School Search dropdown displays on typing', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.enterSchool(loginData.schoolSearch);
    LoginPage.elements.schoolDropdownOption().should('be.visible');
  });

  it('TC008 - Verify Select School from dropdown', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.enterSchool(loginData.schoolSearch);
    LoginPage.selectSchool(loginData.school);
    LoginPage.verifySchoolSelected(loginData.school);
  });

  it('TC009 - Verify Username Field accepts input', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.enterUsername(loginData.username);
    LoginPage.elements.usernameInput().should('have.value', loginData.username);
  });

  it('TC010 - Verify Password Field accepts input', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.enterPassword(loginData.password);
    LoginPage.elements.passwordInput().should('have.value', loginData.password);
  });

  it('TC011 - Verify Login Button is disabled initially', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.verifyLoginButtonDisabled();
  });

  it('TC012 - Verify Login Button enabled when all mandatory fields completed', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.enterSchool(loginData.schoolSearch);
    LoginPage.selectSchool(loginData.school);
    LoginPage.enterUsername(loginData.username);
    LoginPage.enterPassword(loginData.password);
    LoginPage.verifyLoginButtonEnabled();
  });
});
