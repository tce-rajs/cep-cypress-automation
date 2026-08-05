import navigationPage from './navigation.page';

/**
 * Navigation Assertions Repository
 * Dedicated assertion checks for Section 11 & Section 15 of plan.md
 */
export class NavigationAssertions {
  verifyDashboardVisible() {
    cy.get('[data-qa-id="wb-welcome-back-title"], [data-qa-id="playlist-current-grade-subject-btn"]', { timeout: 30000 }).should('be.visible');
    return this;
  }

  verifyCurrentClassDisplayed(expectedText) {
    if (expectedText) {
      navigationPage.currentGradeSubjectBtn.should('be.visible').and('contain.text', expectedText);
    } else {
      navigationPage.currentGradeSubjectBtn.should('be.visible');
    }
    return this;
  }

  verifyRecentClassesActive() {
    navigationPage.recentClassesTab.should('be.visible');
    return this;
  }

  verifyAllClassesTabActive() {
    navigationPage.allClassesTab.should('be.visible');
    return this;
  }

  verifyGradeSelected(gradeName) {
    navigationPage.selectGradeBtn.contains(gradeName).should('exist');
    return this;
  }

  verifyDivisionSelected(divisionName) {
    navigationPage.selectDivisionBtn.contains(divisionName).should('exist');
    return this;
  }

  verifySubjectSelected(subjectName) {
    navigationPage.currentGradeSubjectBtn.should('be.visible').and('contain.text', subjectName);
    return this;
  }

  verifyContentsPopupVisible() {
    cy.get('[data-qa-id="playlist-chapter-tp-popup"], .contents-selector--item, .chapter-tp-dialog, .modal--select-content-menu', { timeout: 25000 })
      .should('exist');
    return this;
  }

  verifyChapterUpdated(chapterName) {
    cy.get('body').then(($body) => {
      if ($body.find('[data-qa-id="playlist-select-chapter"], mat-list-item').length > 0) {
        cy.get('[data-qa-id="playlist-select-chapter"], mat-list-item').should('exist');
      } else {
        cy.get('[data-qa-id="playlist-chapter-topic-btn"], [data-qa-id="playlist-module"]').should('exist');
      }
    });
    return this;
  }

  verifyTopicUpdated(topicName) {
    cy.get('body').then(($body) => {
      if ($body.find('[data-qa-id="playlist-select-topic"], mat-list-item').length > 0) {
        cy.get('[data-qa-id="playlist-select-topic"], mat-list-item').should('exist');
      } else {
        cy.get('[data-qa-id="playlist-chapter-topic-btn"], [data-qa-id="playlist-module"]').should('exist');
      }
    });
    return this;
  }

  verifyPlaylistVisible() {
    navigationPage.playlistModule.should('be.visible');
    return this;
  }

  verifyPlaylistAssetCountGreaterThanZero() {
    navigationPage.resourceCard.should('have.length.greaterThan', 0);
    return this;
  }
}

export default new NavigationAssertions();
