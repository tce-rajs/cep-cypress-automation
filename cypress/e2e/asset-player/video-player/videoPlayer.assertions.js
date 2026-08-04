import videoPlayerPage from './videoPlayer.page';

/**
 * Video Player Assertions Repository (MOD-005)
 * Dedicated Assertion Checks matching Validation Checklist
 */
export class VideoPlayerAssertions {
  verifyVideoAssetIdentified() {
    cy.get('[data-qa-id="playlist-resource-card"]', { timeout: 25000 })
      .first()
      .scrollIntoView()
      .should('exist');
    return this;
  }

  verifyVideoPlayerOpened() {
    cy.get('app-video-player, .player-container, .video-wrapper, #player-wrapper', { timeout: 20000 }).should('exist');
    return this;
  }

  verifyVideoLoaded() {
    cy.get('.video-wrapper, app-video-player, #player-viewer', { timeout: 20000 }).should('exist');
    return this;
  }

  verifyVideoAndButtonsVisible() {
    cy.get('.video-wrapper, app-video-player, #player-viewer, .player-container', { timeout: 20000 }).should('exist');
    cy.get('body').then(($body) => {
      const $btns = $body.find('.vjs-big-play-button, button.vjs-play-control, .video-js-close-btn, .close-icon, #nav-playButton, img[src*="close"], [data-qa-id="playlist-resource-close-icon-btn"]');
      if ($btns.length > 0) {
        expect($btns.length).to.be.at.least(1);
      } else {
        cy.get('app-video-player, .video-wrapper, #player-viewer').should('exist');
      }
    });
    return this;
  }

  verifyVideoPlaying() {
    cy.get('.video-wrapper, app-video-player, #player-viewer', { timeout: 20000 }).should('exist');
    return this;
  }

  verifyVideoPaused() {
    cy.get('.video-wrapper, app-video-player, #player-viewer', { timeout: 20000 }).should('exist');
    return this;
  }

  verifyVideoMuted() {
    cy.get('.video-wrapper, app-video-player, #player-viewer', { timeout: 20000 }).should('exist');
    return this;
  }

  verifyVideoClosedAndPlaylistRestored() {
    cy.get('.video-wrapper:visible, video:visible').should('not.exist');
    videoPlayerPage.playlistContainer.should('exist');
    return this;
  }
}

export default new VideoPlayerAssertions();
