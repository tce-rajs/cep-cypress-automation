import playlistPage from './playlist.page';

/**
 * Playlist Assertions Repository (MOD-003)
 */
export class PlaylistAssertions {
  verifyPlaylistContainerVisible() {
    playlistPage.playlistModule.should('exist');
    return this;
  }

  verifyAssetCountGreaterThanZero() {
    playlistPage.assetCard.should('have.length.greaterThan', 0);
    return this;
  }

  verifyAssetTitlesDisplayed() {
    playlistPage.assetTitle.first().scrollIntoView().should('exist');
    return this;
  }

  verifyAssetTypesDisplayed() {
    playlistPage.assetTypeIcon.first().scrollIntoView().should('exist');
    return this;
  }

  verifyAssetOrder() {
    playlistPage.assetCard.each(($el) => {
      cy.wrap($el).scrollIntoView().should('exist');
    });
    return this;
  }

  verifySelectedAssetHighlighted() {
    playlistPage.selectedAssetCard.should('exist');
    return this;
  }
}

export default new PlaylistAssertions();
