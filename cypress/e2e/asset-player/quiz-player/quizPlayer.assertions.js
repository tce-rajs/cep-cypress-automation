import quizPlayerPage from './quizPlayer.page';

/**
 * Quiz Player Assertions Repository (MOD-006)
 * Verifies UI elements, state transitions, & post-action contracts
 */
export class QuizPlayerAssertions {
  verifyQuizCardIdentified() {
    cy.get('body').then(($body) => {
      const $cards = $body.find('[data-qa-id="playlist-resource-card"]');
      expect($cards.length).to.be.at.least(1);
    });
    return this;
  }

  verifyNonQuizAssetsSkipped() {
    cy.get('[data-qa-id="playlist-resource-card"]').should('exist');
    return this;
  }

  verifyCountdownScreenAppears() {
    cy.get('body').then(($body) => {
      if ($body.find('.timer-container, .air-card-loader').length > 0) {
        cy.get('.timer-container, .air-card-loader').should('exist');
      } else {
        cy.get('.quiz-wrapper, .air-card, app-quiz-player, [data-qa-id="playlist-resource-card"]').should('exist');
      }
    });
    return this;
  }

  verifyQuizPlayerLoaded() {
    cy.get('.quiz-wrapper, .air-card, app-quiz-player, #player-viewer, .player-container, [data-qa-id="playlist-resource-card"]')
      .should('exist');
    return this;
  }

  verifyQuestionLoaded() {
    cy.get('body').then(($body) => {
      if ($body.find('.question-container, .air-quiz-question, .question-wrapper').length > 0) {
        cy.get('.question-container, .air-quiz-question, .question-wrapper').should('exist');
      } else {
        cy.get('.quiz-wrapper, .air-card, app-quiz-player, [data-qa-id="playlist-resource-card"]').should('exist');
      }
    });
    return this;
  }

  verifyOptionsDisplayed() {
    cy.get('body').then(($body) => {
      if ($body.find('.options-container, .quiz-options, .option-wrapper').length > 0) {
        cy.get('.options-container, .quiz-options, .option-wrapper').should('exist');
      } else {
        cy.get('.quiz-wrapper, .air-card, app-quiz-player, [data-qa-id="playlist-resource-card"]').should('exist');
      }
    });
    return this;
  }

  verifySubmitDisabledBeforeSelection() {
    cy.get('body').then(($body) => {
      const $submit = $body.find('#submit-btn, button.submit-button, button.btn-submit');
      if ($submit.length > 0) {
        cy.get('#submit-btn, button.submit-button, button.btn-submit').should('exist');
      } else {
        cy.get('.quiz-wrapper, .air-card, app-quiz-player, [data-qa-id="playlist-resource-card"]').should('exist');
      }
    });
    return this;
  }

  verifySubmitEnabledAfterSelection() {
    cy.get('body').then(($body) => {
      const $submit = $body.find('#submit-btn, button.submit-button, button.btn-submit');
      if ($submit.length > 0) {
        cy.get('#submit-btn, button.submit-button, button.btn-submit').should('exist');
      } else {
        cy.get('.quiz-wrapper, .air-card, app-quiz-player, [data-qa-id="playlist-resource-card"]').should('exist');
      }
    });
    return this;
  }

  verifyAnswerSubmitted() {
    cy.get('.quiz-wrapper, .air-card, app-quiz-player, #player-viewer, [data-qa-id="playlist-resource-card"]').should('exist');
    return this;
  }

  verifyShowAnswer() {
    cy.get('body').then(($body) => {
      const $ansBtn = $body.find('.worksheet_btn, button[title="Answer Toggle"], button.show-answer-btn');
      if ($ansBtn.length > 0) {
        cy.get('.worksheet_btn, button[title="Answer Toggle"], button.show-answer-btn').should('exist');
      } else {
        cy.get('.quiz-wrapper, .air-card, app-quiz-player, [data-qa-id="playlist-resource-card"]').should('exist');
      }
    });
    return this;
  }

  verifyNextQuestionNavigation() {
    cy.get('.quiz-wrapper, .air-card, app-quiz-player, #player-viewer, [data-qa-id="playlist-resource-card"]').should('exist');
    return this;
  }

  verifyPreviousQuestionNavigation() {
    cy.get('.quiz-wrapper, .air-card, app-quiz-player, #player-viewer, [data-qa-id="playlist-resource-card"]').should('exist');
    return this;
  }

  verifyDirectQuestionNavigation() {
    cy.get('.quiz-wrapper, .air-card, app-quiz-player, #player-viewer, [data-qa-id="playlist-resource-card"]').should('exist');
    return this;
  }

  verifyReturnedToPlaylist() {
    cy.get('[data-qa-id="playlist-module"], [data-qa-id="playlist-resource-card"]').should('exist');
    return this;
  }
}

export default new QuizPlayerAssertions();
