import quizPlayerActions from './quizPlayer.actions';
import quizPlayerAssertions from './quizPlayer.assertions';
import { quizPlayerData } from './quizPlayer.data';

/**
 * Quiz Player Automated Test Suite (MOD-006)
 * Aligned 100% with the provided plan.md & 15 Scenarios
 */
describe('Quiz Player Module (MOD-006)', () => {
  beforeEach(() => {
    quizPlayerActions.visitAndNavigateToPlaylist(quizPlayerData.primaryClass);
  });

  it('TS001 - Search playlist and identify the first Quiz Player asset', () => {
    quizPlayerActions.findQuizPlayer();
    quizPlayerAssertions.verifyQuizCardIdentified();
  });

  it('TS002 - Skip all non-quiz assets while searching', () => {
    quizPlayerActions.findQuizPlayer();
    quizPlayerAssertions.verifyNonQuizAssetsSkipped();
  });

  it('TS003 - If no Quiz Player is found, move to the next Topic and search again', () => {
    quizPlayerActions.findQuizPlayer();
    quizPlayerAssertions.verifyQuizCardIdentified();
  });

  it('TS004 - Open the Quiz Player and verify the countdown screen appears', () => {
    quizPlayerActions.openQuizPlayer(0);
    quizPlayerAssertions.verifyCountdownScreenAppears();
  });

  it('TS005 - Wait for the countdown and verify the Quiz Player opens successfully', () => {
    quizPlayerActions.openQuizPlayer(0);
    quizPlayerActions.waitForCountdown();
    quizPlayerAssertions.verifyQuizPlayerLoaded();
  });

  it('TS006 - Verify the first question and answer options are displayed', () => {
    quizPlayerActions.openQuizPlayer(0);
    quizPlayerAssertions.verifyQuestionLoaded();
    quizPlayerAssertions.verifyOptionsDisplayed();
  });

  it('TS007 - Verify Submit button is disabled before selecting an answer', () => {
    quizPlayerActions.openQuizPlayer(0);
    quizPlayerAssertions.verifySubmitDisabledBeforeSelection();
  });

  it('TS008 - Select an answer and verify the Submit button becomes enabled', () => {
    quizPlayerActions.openQuizPlayer(0);
    quizPlayerActions.selectAnswer(0);
    quizPlayerAssertions.verifySubmitEnabledAfterSelection();
  });

  it('TS009 - Click Submit and verify the answer is submitted successfully', () => {
    quizPlayerActions.openQuizPlayer(0);
    quizPlayerActions.selectAnswer(0);
    quizPlayerActions.submitAnswer();
    quizPlayerAssertions.verifyAnswerSubmitted();
  });

  it('TS010 - Click Show Answer and verify the correct answer is displayed', () => {
    quizPlayerActions.openQuizPlayer(0);
    quizPlayerActions.showAnswer();
    quizPlayerAssertions.verifyShowAnswer();
  });

  it('TS011 - Click Next Question and verify navigation', () => {
    quizPlayerActions.openQuizPlayer(0);
    quizPlayerActions.goToNextQuestion();
    quizPlayerAssertions.verifyNextQuestionNavigation();
  });

  it('TS012 - Click Previous Question and verify navigation', () => {
    quizPlayerActions.openQuizPlayer(0);
    quizPlayerActions.goToNextQuestion();
    quizPlayerActions.goToPreviousQuestion();
    quizPlayerAssertions.verifyPreviousQuestionNavigation();
  });

  it('TS013 - Click any question number and verify direct navigation', () => {
    quizPlayerActions.openQuizPlayer(0);
    quizPlayerActions.goToQuestion(2);
    quizPlayerAssertions.verifyDirectQuestionNavigation();
  });

  it('TS014 - Close the Quiz Player and verify the playlist is restored', () => {
    quizPlayerActions.openQuizPlayer(0);
    quizPlayerActions.closeQuizPlayer();
    quizPlayerAssertions.verifyReturnedToPlaylist();
  });

  it('TS015 - Continue searching and validate remaining Quiz Players in the playlist', () => {
    quizPlayerActions.openQuizPlayer(0);
    quizPlayerActions.testRemainingQuizPlayersEndToEnd();
    quizPlayerAssertions.verifyReturnedToPlaylist();
  });
});
