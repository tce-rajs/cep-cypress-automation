import { videoPlayerLocators } from './videoPlayer.locators';

/**
 * Video Player Page Object Repository (MOD-005)
 * Encapsulates element retrieval using Cypress commands
 */
class VideoPlayerPage {
  get playlistContainer() {
    return cy.get(videoPlayerLocators.playlistContainer, { timeout: 15000 });
  }

  get playlistAssetCards() {
    return cy.get(videoPlayerLocators.playlistAssetCards, { timeout: 15000 });
  }

  get videoAssetCard() {
    return cy.get(videoPlayerLocators.videoAssetCard, { timeout: 15000 });
  }

  get videoPlayerContainer() {
    return cy.get(videoPlayerLocators.videoPlayerContainer, { timeout: 20000 });
  }

  get videoElement() {
    return cy.get(videoPlayerLocators.videoElement, { timeout: 20000 });
  }

  get playButton() {
    return cy.get(videoPlayerLocators.playButton, { timeout: 15000 });
  }

  get pauseButton() {
    return cy.get(videoPlayerLocators.pauseButton, { timeout: 15000 });
  }

  get muteButton() {
    return cy.get(videoPlayerLocators.muteButton, { timeout: 15000 });
  }

  get interactiveSlider() {
    return cy.get(videoPlayerLocators.interactiveSlider, { timeout: 15000 });
  }

  get closeButton() {
    return cy.get(videoPlayerLocators.closeButton, { timeout: 15000 });
  }
}

export default new VideoPlayerPage();
