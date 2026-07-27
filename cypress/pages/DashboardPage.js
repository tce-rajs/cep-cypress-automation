class DashboardPage {
  elements = {
    welcomeMessage: () => cy.get('[data-qa-id="wb-welcome-back-title"]'),
    dashboardContainer: () => cy.get('[data-qa-id="dashboard-container"], .dashboard-page, body'),
    logoutButton: () => cy.get('[data-qa-id="logout-button"], [data-qa-id="user-logout"], .logout-btn')
  };

  verifyWelcomeMessage() {
    this.elements.welcomeMessage().should('be.visible');
    return this;
  }

  verifyDashboardLoaded() {
    this.elements.welcomeMessage().should('be.visible');
    return this;
  }

  logout() {
    this.elements.logoutButton().click();
    return this;
  }
}

export default new DashboardPage();
