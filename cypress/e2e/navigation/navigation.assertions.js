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
    // Subject selection submits the selection and updates the header display
    navigationPage.currentGradeSubjectBtn.should('be.visible').and('contain.text', subjectName);
    return this;
  }

  verifyContentsPopupVisible() {
    navigationPage.chapterTpPopup.should('be.visible');
    return this;
  }

  verifyChapterUpdated(chapterName) {
    navigationPage.selectChapter.contains(chapterName).should('be.visible');
    return this;
  }

  verifyTopicUpdated(topicName) {
    navigationPage.selectTopic.contains(topicName).should('be.visible');
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
