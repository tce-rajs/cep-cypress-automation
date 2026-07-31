/**
 * Playlist Locators Repository (MOD-003)
 * Standard: Uses data-qa-id attributes exclusively
 */
export const playlistLocators = {
  // Playlist Containers
  playlistModule: '[data-qa-id="playlist-module"]',
  resourcesWrapper: '[data-qa-id="playlist-resources-wrapper"]',
  noResourcesState: '[data-qa-id="playlist-no-resources"]',
  tryAgainResourcesBtn: '[data-qa-id="playlist-try-again-resources"]',

  // Asset Cards & Components
  assetCard: '[data-qa-id="playlist-resource-card"]',
  assetTitle: '[data-qa-id="playlist-resource-card"] .title',
  assetTypeIcon: '[data-qa-id="playlist-resource-card"] .type-icon',
  assetThumbnail: '[data-qa-id="playlist-resource-card"] .image',
  selectedAssetCard: '[data-qa-id="playlist-resource-card"] .resource-card.active',

  // Action Controls
  resourcePlayerLaunchBtn: '[data-qa-id="playlist-resource-player"]',
  resourceCloseIconBtn: '[data-qa-id="playlist-resource-close-icon-btn"]'
};
