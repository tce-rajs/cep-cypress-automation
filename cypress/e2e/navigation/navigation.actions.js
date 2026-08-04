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
    cy.get('body', { timeout: 35000 }).then(($body) => {
      const isLoggedIn = $body.find('[data-qa-id="playlist-current-grade-subject-btn"]:visible, [data-qa-id="wb-welcome-back-title"]:visible, [data-qa-id="playlist-module"]:visible').length > 0;
      if (!isLoggedIn) {
        const $pinInput = $body.find('[data-qa-id="login-pin-digit-input-0"]:visible, [data-qa-id="pin-input"]:visible');
        if ($pinInput.length > 0) {
          LoginPage.enterPin(pin);
        } else {
          const $modal = $body.find('[data-qa-id="login-auth-modal-container"]');
          if ($modal.length > 0 && $modal.is(':visible')) {
            LoginPage.openLoginModal();
            LoginPage.enterPin(pin);
          }
        }
      }
    });

    // Handle network retry banner if API requests lag
    cy.get('body', { timeout: 45000 }).then(($body) => {
      if ($body.text().includes('something went wrong') || $body.find('[data-qa-id="playlist-try-again-resources"]').length > 0) {
        cy.get('[data-qa-id="playlist-try-again-resources"], button').contains(/try again/i).click({ force: true });
        cy.wait(2000);
      }
    });

    // Assert Dashboard / Playlist is loaded
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
    this.openContents();
    cy.get('body').then(($body) => {
      const $chaps = $body.find('[data-qa-id="playlist-select-chapter"]:visible, mat-list-item:visible');
      if ($chaps.length > 0) {
        let matched = false;
        if (chapterName) {
          $chaps.each((i, el) => {
            const text = el.innerText || '';
            if (!matched && (text.includes(chapterName) || chapterName.includes(text.trim()))) {
              cy.wrap(el).click({ force: true });
              matched = true;
            }
          });
        }
        if (!matched) {
          cy.wrap($chaps.first()).click({ force: true });
        }
      }
    });
    cy.wait(800);
    return this;
  }

  selectTopic(topicName) {
    this.openContents();
    cy.get('body').then(($body) => {
      const $topics = $body.find('[data-qa-id="playlist-select-topic"]:visible, mat-list-item:visible');
      if ($topics.length > 0) {
        let matched = false;
        if (topicName) {
          $topics.each((i, el) => {
            const text = el.innerText || '';
            if (!matched && (text.includes(topicName) || topicName.includes(text.trim()))) {
              cy.wrap(el).click({ force: true });
              matched = true;
            }
          });
        }
        if (!matched) {
          cy.wrap($topics.first()).click({ force: true });
        }
      }
    });
    cy.wait(1000);
    return this;
  }

  logout() {
    cy.get('body').then(($body) => {
      // 1. Dismiss open player overlay if present
      const $close = $body.find('.closeIcon:visible, [data-qa-id="playlist-resource-close-icon-btn"]:visible, img[src*="CollapseResource"]:visible, [data-qa-id="tce-library-pdf-close-btn"]:visible');
      if ($close.length > 0) {
        cy.wrap($close.first()).click({ force: true });
        cy.wait(800);
      }

      // 2. Click User Avatar if present to reveal signout button
      if ($body.find('[data-qa-id="floating-signout-trigger-btn"]:visible, [data-qa-id="toolbar-profile-signout-btn"]:visible, .SignOutBtn:visible').length === 0) {
        const $avatar = $body.find('[data-qa-id="toolbar-user-avatar"]:visible, .userimg:visible, .userborder:visible');
        if ($avatar.length > 0) {
          cy.wrap($avatar.first()).click({ force: true });
          cy.wait(800);
        }
      }

      // 3. Click Sign Out button
      const $signOut = $body.find('[data-qa-id="floating-signout-trigger-btn"]:visible, [data-qa-id="toolbar-profile-signout-btn"]:visible, .SignOutBtn:visible, img[src*="SignOut"]:visible');
      if ($signOut.length > 0) {
        cy.wrap($signOut.first()).click({ force: true });
        cy.wait(1000);
      }
    });

    // 4. Verify user modal / guest mode login container is restored after signout
    cy.get('[data-qa-id="login-auth-modal-container"], [data-qa-id="pin-input"], input[type="password"]', { timeout: 20000 })
      .should('exist');
    return this;
  }
}

export default new NavigationActions();
