/**
 * Navigation Locators Repository
 * Standard: Uses data-qa-id attributes with Angular Material fallbacks
 */
export const navigationLocators = {
  // Login Dependency
  loginModal: '[data-qa-id="login-auth-modal-container"]',
  loginAuthToggleButton: '[data-qa-id="login-auth-toggle-button"]',
  loginAuthExpandIcon: '[data-qa-id="login-auth-expand-icon"]',
  pinInput: (index) => `[data-qa-id="login-pin-digit-input-${index}"]`,
  passwordLoginLink: '[data-qa-id="login-pin-password-link"]',
  usernameInput: '[data-qa-id="login-pwd-username-input"]',
  passwordInput: '[data-qa-id="login-pwd-password-input"]',
  submitButton: '[data-qa-id="login-pwd-submit-button"]',
  pinErrorMessage: '[data-qa-id="login-pin-error-message"]',
  
  // Dashboard & Whiteboard Header
  welcomeBackTitle: '[data-qa-id="wb-welcome-back-title"]',
  welcomeBackContainer: '[data-qa-id="wb-welcome-back-container"]',
  
  // Class Selection Triggers & Modal
  currentGradeSubjectBtn: '[data-qa-id="playlist-current-grade-subject-btn"]',
  gradeSubjectChapterTpBtn: '[data-qa-id="playlist-grade-subject-chapter-tp-btn"]',
  recentClassesTab: '[data-qa-id="playlist-recently-selected-class-tab"]',
  recentClassItem: '[data-qa-id="playlist-recently-selected-class-btn"]',
  allClassesTab: '[data-qa-id="playlist-select-class-tab"]',
  
  // Grade, Level, Division & Subject Selectors (Common Selector)
  selectGradeBtn: '[data-qa-id="common-select-grade-btn"]',
  selectLevelBtn: '[data-qa-id="common-select-level-btn"]',
  selectDivisionBtn: '[data-qa-id="common-select-division-btn"]',
  selectSubjectBtn: '[data-qa-id="common-select-subject-btn"]',
  
  // Contents / Chapter & Topic Selector
  chapterTopicBtn: '[data-qa-id="playlist-chapter-topic-btn"], [data-qa-id="playlist-contents-selector"], app-content-nav',
  chapterTpPopup: '[data-qa-id="playlist-chapter-tp-popup"], .contents-selector--item, .chapter-tp-dialog, .modal--select-content-menu',
  contentsSelector: '[data-qa-id="playlist-contents-selector"], app-content-nav',
  selectChapter: '[data-qa-id="playlist-select-chapter"], mat-list-item, .chapter-item',
  selectTopic: '[data-qa-id="playlist-select-topic"], mat-list-item, .topic-item',
  navTopicLeft: '[data-qa-id="playlist-nav-topic-left"]',
  navTopicRight: '[data-qa-id="playlist-nav-topic-right"]',
  
  // Playlist Container & Cards
  playlistModule: '[data-qa-id="playlist-module"]',
  resourcesWrapper: '[data-qa-id="playlist-resources-wrapper"]',
  resourceCard: '[data-qa-id="playlist-resource-card"]',
  noResourcesState: '[data-qa-id="playlist-no-resources"]',
  
  // User Profile / Sign Out
  userAvatar: '[data-qa-id="toolbar-user-avatar"]',
  profileSignoutBtn: '[data-qa-id="toolbar-profile-signout-btn"]'
};
