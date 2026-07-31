import LoginPage from '../../pages/LoginPage';
import navigationPage from './navigation.page';
import { navigationData } from './navigation.data';

/**
 * Navigation Reusable Actions
 * Encapsulates high-level user workflows (Section 13 of plan.md)
 */
export class NavigationActions {
  visit() {
    LoginPage.visit();
    return this;
  }

  loginByPin(pin = navigationData.validPin) {
    cy.get('body', { timeout: 30000 }).then(($body) => {
      const isLoggedIn = $body.find('[data-qa-id="playlist-current-grade-subject-btn"]:visible').length > 0 ||
                         $body.find('[data-qa-id="wb-welcome-back-title"]:visible').length > 0 ||
                         $body.find('[data-qa-id="playlist-module"]:visible').length > 0;
      if (!isLoggedIn) {
        LoginPage.openLoginModal();
        LoginPage.enterPin(pin);
      }
    });

    // Handle network retry banner if API requests lag
    cy.get('body', { timeout: 45000 }).then(($body) => {
      if ($body.text().includes('something went wrong') || $body.find('[data-qa-id="playlist-try-again-resources"]').length > 0) {
        cy.get('[data-qa-id="playlist-try-again-resources"], button').contains(/try again/i).click({ force: true });
        cy.wait(2000);
      }
    });

    cy.get('[data-qa-id="wb-welcome-back-title"], [data-qa-id="playlist-current-grade-subject-btn"], [data-qa-id="playlist-module"]', { timeout: 45000 })
      .should('exist');
    cy.wait(1500);
    return this;
  }

  openClassPopup() {
    cy.get('body').then(($body) => {
      if ($body.find('.modal--select-content-menu:visible').length === 0) {
        navigationPage.currentGradeSubjectBtn.should('exist').click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  openRecentClasses() {
    navigationPage.recentClassesTab.should('exist').click({ force: true });
    cy.wait(500);
    return this;
  }

  openAllClasses() {
    navigationPage.allClassesTab.should('exist').click({ force: true });
    cy.wait(500);
    return this;
  }

  selectRecentClass(className) {
    this.openClassPopup();
    this.openRecentClasses();
    if (className) {
      navigationPage.recentClassItem.contains(className).click({ force: true });
    } else {
      navigationPage.recentClassItem.first().click({ force: true });
    }
    cy.wait(1000);
    return this;
  }

  selectGrade(gradeName) {
    navigationPage.selectGradeBtn.contains(gradeName).should('exist').click({ force: true });
    cy.wait(500);
    return this;
  }

  selectDivision(divisionName) {
    navigationPage.selectDivisionBtn.contains(divisionName).should('exist').click({ force: true });
    cy.wait(500);
    return this;
  }

  selectSubject(subjectName) {
    navigationPage.selectSubjectBtn.contains(subjectName).should('exist').click({ force: true });
    cy.wait(1000);
    return this;
  }

  openContents() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-qa-id="playlist-chapter-tp-popup"]:visible').length === 0) {
        navigationPage.chapterTopicBtn.should('exist').click({ force: true });
        cy.wait(800);
      }
    });
    return this;
  }

  selectChapter(chapterName) {
    navigationPage.selectChapter.contains(chapterName).should('exist').click({ force: true });
    cy.wait(800);
    return this;
  }

  selectTopic(topicName) {
    navigationPage.selectTopic.contains(topicName).should('exist').click({ force: true });
    cy.wait(1000);
    return this;
  }

  logout() {
    navigationPage.userAvatar.should('exist').click({ force: true });
    navigationPage.profileSignoutBtn.should('exist').click({ force: true });
    cy.wait(1000);
    return this;
  }
}

export default new NavigationActions();
