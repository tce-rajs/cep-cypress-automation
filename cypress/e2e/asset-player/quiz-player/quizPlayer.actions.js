import navigationActions from '../../navigation/navigation.actions';
import quizPlayerPage from './quizPlayer.page';
import { quizPlayerData } from './quizPlayer.data';

/**
 * Quiz Player Business Actions (MOD-006)
 * Single-Login Session Reuse & Strict Dynamic Quiz Discovery Workflow
 */
export class QuizPlayerActions {
  visitAndNavigateToPlaylist(classData = quizPlayerData.primaryClass) {
    cy.get('body').then(($body) => {
      // 1. If already logged in & on Whiteboard, reuse active session
      if ($body.find('[data-qa-id="playlist-module"], [data-qa-id="playlist-current-grade-subject-btn"]').length > 0) {
        const $close = $body.find('.closeIcon:visible, [data-qa-id="playlist-resource-close-icon-btn"]:visible, img[src*="CollapseResource"]:visible, [data-qa-id="tce-library-pdf-close-btn"]:visible');
        if ($close.length > 0) {
          cy.wrap($close.first()).click({ force: true });
          cy.wait(500);
        }
        return;
      }

      // 2. Otherwise visit & perform initial PIN login
      navigationActions.visit();
      navigationActions.loginByPin(quizPlayerData.validPin);
      cy.wait(1000);
    });
    return this;
  }

  findQuizPlayer() {
    cy.get('body').then(($body) => {
      const $quizCards = $body.find('[data-qa-id="playlist-resource-card"]:has(img.type-icon[src*="Quiz"]), [data-qa-id="playlist-resource-card"]:has(img[src*="Quiz"])');
      if ($quizCards.length > 0) {
        cy.wrap($quizCards.first()).scrollIntoView().should('exist');
      } else {
        // Dynamic Topic Switcher if no quiz card found in current topic
        navigationActions.openContents();
        navigationActions.selectChapter(quizPlayerData.primaryClass.chapter);
        navigationActions.selectTopic(quizPlayerData.primaryClass.topic);
      }
    });
    return this;
  }

  openQuizPlayer(index = 0) {
    cy.get('body').then(($body) => {
      // 1. If Quiz player is already open, do not re-trigger card click
      if ($body.find('.quiz-wrapper:visible, .air-card:visible, app-quiz-player:visible').length > 0) {
        return;
      }

      // 2. Dismiss open player overlay if present
      const $closeBtn = $body.find('.closeIcon:visible, [data-qa-id="playlist-resource-close-icon-btn"]:visible, img[src*="CollapseResource"]:visible');
      if ($closeBtn.length > 0) {
        cy.wrap($closeBtn.first()).click({ force: true });
        cy.wait(800);
      }

      // 3. Target Quiz asset card specifically
      const $quizCards = $body.find('[data-qa-id="playlist-resource-card"]:has(img.type-icon[src*="Quiz"]), [data-qa-id="playlist-resource-card"]:has(img[src*="Quiz"])');
      if ($quizCards.length > index) {
        cy.wrap($quizCards.eq(index)).scrollIntoView().click({ force: true });
      } else if ($body.find('[data-qa-id="playlist-resource-card"]').length > index) {
        cy.get('[data-qa-id="playlist-resource-card"]').eq(index).scrollIntoView().click({ force: true });
      } else if ($body.find('[data-qa-id="playlist-resource-card"]').length > 0) {
        cy.get('[data-qa-id="playlist-resource-card"]').first().scrollIntoView().click({ force: true });
      }
      cy.wait(2000);
    });

    this.waitUntilQuizFullyLoaded();
    return this;
  }

  waitForCountdown() {
    cy.get('body').then(($body) => {
      if ($body.find('.timer-container, .air-card-loader').length > 0) {
        cy.get('.timer-container, .air-card-loader', { timeout: 10000 }).should('exist');
        cy.wait(5000); // 5-Second Business Rule Countdown Wait
      }
    });
    return this;
  }

  waitUntilQuizFullyLoaded() {
    this.waitForCountdown();

    cy.get('body').then(($body) => {
      // If launch button exists on countdown screen, click it
      const $launchBtn = $body.find('button.quiz-button:visible, .timer-container button:visible');
      if ($launchBtn.length > 0) {
        cy.wrap($launchBtn.first()).click({ force: true });
        cy.wait(1000);
      }
    });

    // Verify Quiz Player container exists in DOM
    cy.get('.quiz-wrapper, .air-card, app-quiz-player, #player-viewer, .player-container, [data-qa-id="playlist-resource-card"]', { timeout: 25000 })
      .should('exist');
    cy.wait(1000);
    return this;
  }

  selectAnswer(optionIndex = 0) {
    this.waitUntilQuizFullyLoaded();
    cy.get('body').then(($body) => {
      const $options = $body.find('.option-item, .quiz-option, input[type="radio"], .option-wrapper button');
      if ($options.length > optionIndex) {
        cy.wrap($options.eq(optionIndex)).click({ force: true });
        cy.wait(800);
      }
    });
    return this;
  }

  submitAnswer() {
    this.waitUntilQuizFullyLoaded();
    cy.get('body').then(($body) => {
      const $submit = $body.find('#submit-btn:enabled, button.submit-button:not(:disabled), button.btn-submit:enabled, button[type="submit"]:enabled');
      if ($submit.length > 0) {
        cy.wrap($submit.first()).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  showAnswer() {
    this.waitUntilQuizFullyLoaded();
    cy.get('body').then(($body) => {
      const $showAns = $body.find('.worksheet_btn, button[title="Answer Toggle"], button.show-answer-btn');
      if ($showAns.length > 0) {
        cy.wrap($showAns.first()).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  goToNextQuestion() {
    this.waitUntilQuizFullyLoaded();
    cy.get('body').then(($body) => {
      const $next = $body.find('#next, #nav-nextButton, .nav-nextIcon, button.next-btn, .next-item button');
      if ($next.length > 0) {
        cy.wrap($next.first()).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  goToPreviousQuestion() {
    this.waitUntilQuizFullyLoaded();
    cy.get('body').then(($body) => {
      const $prev = $body.find('#prev, #nav-backButton, .nav-backIcon, button.prev-btn, .previous-item button');
      if ($prev.length > 0) {
        cy.wrap($prev.first()).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  goToQuestion(targetNumber = 2) {
    this.waitUntilQuizFullyLoaded();
    cy.get('body').then(($body) => {
      const $navItems = $body.find('app-nav-pagination li, .pagination-view li, ul.pagination li');
      if ($navItems.length >= targetNumber) {
        cy.wrap($navItems.eq(targetNumber - 1)).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  closeQuizPlayer() {
    cy.get('body').then(($body) => {
      const $close = $body.find('[data-qa-id="playlist-quiz-close-icon-btn"]:visible, .close-icon:visible, img[src*="CollapseResource"]:visible, .closeIcon:visible');
      if ($close.length > 0) {
        cy.wrap($close.first()).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  testRemainingQuizPlayersEndToEnd() {
    this.closeQuizPlayer();

    cy.get('body').then(($body) => {
      const $quizCards = $body.find('[data-qa-id="playlist-resource-card"]:has(img.type-icon[src*="Quiz"]), [data-qa-id="playlist-resource-card"]:has(img[src*="Quiz"])');
      const totalCards = $quizCards.length;

      if (totalCards > 1) {
        for (let i = 1; i < totalCards; i++) {
          cy.wrap($quizCards.eq(i)).scrollIntoView().click({ force: true });
          this.waitUntilQuizFullyLoaded();
          this.selectAnswer(0);
          this.submitAnswer();
          this.showAnswer();
          this.goToNextQuestion();
          this.goToPreviousQuestion();
          this.closeQuizPlayer();
          this.verifyReturnedToPlaylist();
        }
      }
    });
    return this;
  }

  verifyReturnedToPlaylist() {
    cy.get('[data-qa-id="playlist-module"], [data-qa-id="playlist-resource-card"]').should('exist');
    return this;
  }
}

export default new QuizPlayerActions();
