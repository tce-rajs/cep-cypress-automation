/**
 * Quiz Player Locators Repository (MOD-006)
 * Aligned with Section 10 of plan.md and real CEP V2 Angular components
 */
export const quizPlayerLocators = {
  // 1. Playlist Asset Card Trigger
  quizCard: '[data-qa-id="playlist-asset-card"]:has(img[src*="Quiz"]), .resource-card:has(img[src*="Quiz"]), .resource-playlist--item:has(img[src*="Quiz"])',
  quizCardCloseBtn: '[data-qa-id="playlist-quiz-close-icon-btn"], .close-icon, img[src*="CollapseResource"]',

  // 2. Quiz Player Containers
  quizPlayerContainer: '.player.quiz-wrapper, .air-card, app-quiz-player, #player-viewer, .player-container',
  
  // 3. AIR Card Countdown Screen
  airCardCountdownScreen: '.timer-container, .air-card-loader',
  countdownNumber: '.timer-container .number, .countdown-number',
  launchAirCardBtn: 'button.quiz-button, .timer-container button',
  loadingSpinner: 'ngx-spinner:visible, .vjs-loading-spinner',

  // 4. Question & Options
  questionContainer: '.question-container, .air-quiz-question, .question-wrapper',
  questionText: '.question-title, .question-text, .question-container .text',
  optionContainer: '.options-container, .quiz-options, .option-wrapper',
  individualOption: '.option-item, .quiz-option, input[type="radio"], .option-wrapper button',

  // 5. Submit & Action Buttons
  submitAnswerBtn: '#submit-btn, button.submit-button, button.btn-submit, button[type="submit"]',
  showAnswerBtn: '.worksheet_btn, button[title="Answer Toggle"], button.show-answer-btn',

  // 6. Navigation Controls
  previousQuestionBtn: '#prev, #nav-backButton, .nav-backIcon, button.prev-btn, .previous-item button',
  nextQuestionBtn: '#next, #nav-nextButton, .nav-nextIcon, button.next-btn, .next-item button',
  questionNumberNav: 'app-nav-pagination, .pagination-view, .quick-nav, ul.pagination',
  activeQuestionNumber: 'app-nav-pagination .selected, ul.pagination li.selected, #slideIndex',

  // 7. Future & Close Controls
  splitScreenBtn: '.split-screen-btn, button[title="Split Screen"]',
  closeQuizBtn: '[data-qa-id="playlist-quiz-close-icon-btn"], .close-icon, img[src*="CollapseResource"], .closeIcon',
  playlistContainer: '[data-qa-id="playlist-module"], .playlist-wrapper, .playlist-container'
};
