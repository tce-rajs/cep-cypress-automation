import { navigationLocators } from './navigation.locators';

/**
 * Navigation Page Object
 * Encapsulates element retrieval using Cypress commands
 */
class NavigationPage {
  get loginModal() {
    return cy.get(navigationLocators.loginModal, { timeout: 15000 });
  }

  pinInput(index) {
    return cy.get(navigationLocators.pinInput(index), { timeout: 15000 });
  }

  get welcomeBackTitle() {
    return cy.get(navigationLocators.welcomeBackTitle, { timeout: 15000 });
  }

  get welcomeBackContainer() {
    return cy.get(navigationLocators.welcomeBackContainer, { timeout: 15000 });
  }

  get currentGradeSubjectBtn() {
    return cy.get(navigationLocators.currentGradeSubjectBtn, { timeout: 15000 });
  }

  get gradeSubjectChapterTpBtn() {
    return cy.get(navigationLocators.gradeSubjectChapterTpBtn, { timeout: 15000 });
  }

  get recentClassesTab() {
    return cy.contains('.mdc-tab, .mat-mdc-tab, [role="tab"], [data-qa-id="playlist-recently-selected-class-tab"]', 'Recent Classes', { timeout: 15000 });
  }

  get recentClassItem() {
    return cy.get(navigationLocators.recentClassItem, { timeout: 15000 });
  }

  get allClassesTab() {
    return cy.contains('.mdc-tab, .mat-mdc-tab, [role="tab"], [data-qa-id="playlist-select-class-tab"]', 'All My Classes', { timeout: 15000 });
  }

  get selectGradeBtn() {
    return cy.get(navigationLocators.selectGradeBtn, { timeout: 15000 });
  }

  get selectLevelBtn() {
    return cy.get(navigationLocators.selectLevelBtn, { timeout: 15000 });
  }

  get selectDivisionBtn() {
    return cy.get(navigationLocators.selectDivisionBtn, { timeout: 15000 });
  }

  get selectSubjectBtn() {
    return cy.get(navigationLocators.selectSubjectBtn, { timeout: 15000 });
  }

  get chapterTopicBtn() {
    return cy.get(navigationLocators.chapterTopicBtn, { timeout: 15000 });
  }

  get chapterTpPopup() {
    return cy.get(navigationLocators.chapterTpPopup, { timeout: 15000 });
  }

  get contentsSelector() {
    return cy.get(navigationLocators.contentsSelector, { timeout: 15000 });
  }

  get selectChapter() {
    return cy.get(navigationLocators.selectChapter, { timeout: 15000 });
  }

  get selectTopic() {
    return cy.get(navigationLocators.selectTopic, { timeout: 15000 });
  }

  get navTopicLeft() {
    return cy.get(navigationLocators.navTopicLeft, { timeout: 15000 });
  }

  get navTopicRight() {
    return cy.get(navigationLocators.navTopicRight, { timeout: 15000 });
  }

  get playlistModule() {
    return cy.get(navigationLocators.playlistModule, { timeout: 15000 });
  }

  get resourcesWrapper() {
    return cy.get(navigationLocators.resourcesWrapper, { timeout: 15000 });
  }

  get resourceCard() {
    return cy.get(navigationLocators.resourceCard, { timeout: 15000 });
  }

  get userAvatar() {
    return cy.get(navigationLocators.userAvatar, { timeout: 15000 });
  }

  get profileSignoutBtn() {
    return cy.get(navigationLocators.profileSignoutBtn, { timeout: 15000 });
  }
}

export default new NavigationPage();
