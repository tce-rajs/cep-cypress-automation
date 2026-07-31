import { playlistLocators } from './playlist.locators';

/**
 * Playlist Page Object
 * Encapsulates element retrieval using Cypress commands
 */
class PlaylistPage {
  get playlistModule() {
    return cy.get(playlistLocators.playlistModule, { timeout: 15000 });
  }

  get resourcesWrapper() {
    return cy.get(playlistLocators.resourcesWrapper, { timeout: 15000 });
  }

  get assetCard() {
    return cy.get(playlistLocators.assetCard, { timeout: 15000 });
  }

  get assetTitle() {
    return cy.get(playlistLocators.assetTitle, { timeout: 15000 });
  }

  get assetTypeIcon() {
    return cy.get(playlistLocators.assetTypeIcon, { timeout: 15000 });
  }

  get assetThumbnail() {
    return cy.get(playlistLocators.assetThumbnail, { timeout: 15000 });
  }

  get selectedAssetCard() {
    return cy.get(playlistLocators.selectedAssetCard, { timeout: 15000 });
  }

  get resourceCloseIconBtn() {
    return cy.get(playlistLocators.resourceCloseIconBtn, { timeout: 15000 });
  }

  get noResourcesState() {
    return cy.get(playlistLocators.noResourcesState, { timeout: 15000 });
  }
}

export default new PlaylistPage();
