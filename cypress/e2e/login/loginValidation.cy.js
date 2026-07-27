import LoginPage from '../../pages/LoginPage';

describe('Login Validation Module', () => {
  let loginData;

  beforeEach(() => {
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
    LoginPage.visit();
  });

  it('TC014 - Verify Invalid Username displays login-pwd-error-message', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.enterSchool(loginData.schoolSearch);
    LoginPage.selectSchool(loginData.school);
    LoginPage.enterUsername(loginData.invalidUsername);
    LoginPage.enterPassword(loginData.password);
    LoginPage.clickLogin();
    LoginPage.verifyPwdError();
  });

  it('TC015 - Verify Invalid Password displays login-pwd-error-message', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.enterSchool(loginData.schoolSearch);
    LoginPage.selectSchool(loginData.school);
    LoginPage.enterUsername(loginData.username);
    LoginPage.enterPassword(loginData.invalidPassword);
    LoginPage.clickLogin();
    LoginPage.verifyPwdError();
  });

  it('TC016 - Verify Empty Username field keeps button disabled and highlights red border', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.enterSchool(loginData.schoolSearch);
    LoginPage.selectSchool(loginData.school);
    LoginPage.elements.usernameInput().focus().blur();
    LoginPage.enterPassword(loginData.password);
    LoginPage.verifyLoginButtonDisabled();
    LoginPage.verifyFieldRedBorder(LoginPage.elements.usernameInput);
  });

  it('TC017 - Verify Empty Password field keeps button disabled and highlights red border', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.enterSchool(loginData.schoolSearch);
    LoginPage.selectSchool(loginData.school);
    LoginPage.enterUsername(loginData.username);
    LoginPage.elements.passwordInput().focus().blur();
    LoginPage.verifyLoginButtonDisabled();
    LoginPage.verifyFieldRedBorder(LoginPage.elements.passwordInput);
  });

  it('TC018 - Verify Empty School field keeps button disabled and highlights red border', () => {
    LoginPage.openLoginModal();
    LoginPage.clickPasswordLogin();
    LoginPage.enterUsername(loginData.username);
    LoginPage.enterPassword(loginData.password);
    LoginPage.verifyLoginButtonDisabled();
    LoginPage.verifyFieldRedBorder(LoginPage.elements.schoolInput);
  });
});
