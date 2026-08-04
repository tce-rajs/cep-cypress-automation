import { quizPlayerLocators } from './quizPlayer.locators';

/**
 * Quiz Player Page Object (MOD-006)
 * Encapsulates element retrieval using Cypress commands
 */
class QuizPlayerPage {
  get quizCard() {
    return cy.get(quizPlayerLocators.quizCard, { timeout: 15000 });
  }

  get quizCardCloseBtn() {
    return cy.get(quizPlayerLocators.quizCardCloseBtn, { timeout: 15000 });
  }

  get quizPlayerContainer() {
    return cy.get(quizPlayerLocators.quizPlayerContainer, { timeout: 25000 });
  }

  get airCardCountdownScreen() {
    return cy.get(quizPlayerLocators.airCardCountdownScreen, { timeout: 15000 });
  }

  get countdownNumber() {
    return cy.get(quizPlayerLocators.countdownNumber, { timeout: 15000 });
  }

  get launchAirCardBtn() {
    return cy.get(quizPlayerLocators.launchAirCardBtn, { timeout: 15000 });
  }

  get questionContainer() {
    return cy.get(quizPlayerLocators.questionContainer, { timeout: 25000 });
  }

  get questionText() {
    return cy.get(quizPlayerLocators.questionText, { timeout: 15000 });
  }

  get optionContainer() {
    return cy.get(quizPlayerLocators.optionContainer, { timeout: 15000 });
  }

  get individualOption() {
    return cy.get(quizPlayerLocators.individualOption, { timeout: 15000 });
  }

  get submitAnswerBtn() {
    return cy.get(quizPlayerLocators.submitAnswerBtn, { timeout: 15000 });
  }

  get showAnswerBtn() {
    return cy.get(quizPlayerLocators.showAnswerBtn, { timeout: 15000 });
  }

  get previousQuestionBtn() {
    return cy.get(quizPlayerLocators.previousQuestionBtn, { timeout: 15000 });
  }

  get nextQuestionBtn() {
    return cy.get(quizPlayerLocators.nextQuestionBtn, { timeout: 15000 });
  }

  get questionNumberNav() {
    return cy.get(quizPlayerLocators.questionNumberNav, { timeout: 15000 });
  }

  get activeQuestionNumber() {
    return cy.get(quizPlayerLocators.activeQuestionNumber, { timeout: 15000 });
  }

  get closeQuizBtn() {
    return cy.get(quizPlayerLocators.closeQuizBtn, { timeout: 15000 });
  }

  get playlistContainer() {
    return cy.get(quizPlayerLocators.playlistContainer, { timeout: 15000 });
  }
}

export default new QuizPlayerPage();
