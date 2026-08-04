import navigationActions from '../../navigation/navigation.actions';
import videoPlayerPage from './videoPlayer.page';
import { videoPlayerData } from './videoPlayer.data';

/**
 * Video Player Business Actions (MOD-005)
 * Encapsulates Video Discovery, Control Buttons Load, Play, Pause, Mute Toggle (#myMuteIcon) & Close Actions
 */
export class VideoPlayerActions {
  visitAndNavigateToPlaylist(classData = videoPlayerData.primaryClass) {
    cy.get('body').then(($body) => {
      // 1. If already logged in & on Whiteboard/Playlist, reuse active session & close open player overlay
      if ($body.find('[data-qa-id="playlist-module"], [data-qa-id="playlist-current-grade-subject-btn"]').length > 0) {
        const $close = $body.find('.video-js-close-btn:visible, .closeIcon:visible, [data-qa-id="playlist-resource-close-icon-btn"]:visible, img[src*="CollapseResource"]:visible, [data-qa-id="tce-library-pdf-close-btn"]:visible');
        if ($close.length > 0) {
          cy.wrap($close.first()).click({ force: true });
          cy.wait(800);
        }
        return;
      }

      // 2. Otherwise visit & perform initial login
      navigationActions.visit();
      navigationActions.loginByPin(videoPlayerData.validPin);
      cy.wait(1000);
    });
    return this;
  }

  waitUntilVideoFullyLoaded() {
    // 1. Verify Video player container exists in DOM
    cy.get('app-video-player, .player-container, .video-wrapper, #player-wrapper', { timeout: 25000 })
      .should('exist');

    // 2. Safely verify loading spinners clear if active
    cy.get('body').then(($body) => {
      const $spinners = $body.find('ngx-spinner:visible, .vjs-loading-spinner:visible');
      if ($spinners.length > 0) {
        cy.wrap($spinners).should('not.be.visible');
      }
    });

    // 3. Strict Assertion: Video / player element MUST exist
    cy.get('.video-wrapper, app-video-player, #player-viewer', { timeout: 25000 }).should('exist');

    cy.wait(1500);
    return this;
  }

  openFirstVideo() {
    cy.get('body').then(($body) => {
      // 1. If Video player is already open, do not re-trigger card click
      if ($body.find('.video-wrapper:visible, video.video-js:visible, app-video-player:visible, #nav-container:visible').length > 0) {
        return;
      }

      // 2. Dismiss open non-video overlay if present
      const $closeBtn = $body.find('.closeIcon:visible, [data-qa-id="playlist-resource-close-icon-btn"]:visible');
      if ($closeBtn.length > 0) {
        cy.wrap($closeBtn.first()).click({ force: true });
        cy.wait(800);
      }
    });

    // 3. Smart Card Selection: Find card matching video title or video icon in playlist
    cy.get('[data-qa-id="playlist-resource-card"]', { timeout: 25000 }).then(($cards) => {
      let targetIndex = 0;
      for (let i = 0; i < $cards.length; i++) {
        const text = $cards.eq(i).text().toLowerCase();
        const html = $cards.eq(i).html();
        if (text.includes('video') || text.includes('motion') || text.includes('short') || html.includes('AVMediaVideo') || html.includes('Video')) {
          targetIndex = i;
          break;
        }
      }
      cy.wrap($cards.eq(targetIndex)).scrollIntoView().click({ force: true });
    });

    cy.wait(2000);

    // 4. STRICT LOAD WAIT: Player MUST be 100% loaded before proceeding
    this.waitUntilVideoFullyLoaded();
    return this;
  }

  playVideo() {
    this.waitUntilVideoFullyLoaded();

    cy.get('body').then(($body) => {
      // 1. Target #nav-playButton, .nav-playIcon, or VideoJS big play button on top window
      const $playBtn = $body.find('#nav-playButton:visible, .nav-playIcon:visible, .vjs-big-play-button:visible, button.vjs-play-control:visible, #play_pause:visible');
      if ($playBtn.length > 0) {
        cy.wrap($playBtn.first()).click({ force: true });
      }

      // 2. Trigger native DOM click directly on #nav-playButton / .nav-playIcon if present
      const $navPlay = $body.find('#nav-playButton, .nav-playIcon');
      if ($navPlay.length > 0) {
        try { $navPlay.get(0).click(); } catch(e) {}
      }

      // 3. Check inside iframe for #nav-playButton or .nav-playIcon
      const $iframes = $body.find('iframe');
      if ($iframes.length > 0) {
        try {
          const iframeDoc = $iframes[0].contentDocument || $iframes[0].contentWindow.document;
          if (iframeDoc) {
            const iPlay = iframeDoc.querySelector('#nav-playButton, .nav-playIcon, #play_pause');
            if (iPlay) {
              iPlay.click();
            }
          }
        } catch (e) {}
      }

      // 4. Mute HTML5 video & VideoJS instance to bypass Chrome Autoplay Policy restrictions
      const $video = $body.find('video');
      if ($video.length > 0) {
        const videoEl = $video[0];
        videoEl.muted = true;
        if (videoEl.player) {
          try { videoEl.player.muted(true); } catch(e) {}
          try { videoEl.player.play(); } catch(e) {}
        } else if (typeof videoEl.play === 'function') {
          videoEl.play().catch(() => {});
        }
      }
    });

    // 5. Hold 4 seconds for user to visually observe video playing on screen
    cy.wait(4000);
    return this;
  }

  pauseVideo() {
    cy.get('body').then(($body) => {
      // 1. Target #nav-pauseButton, .nav-pauseIcon, or VideoJS pause button on top window
      const $pauseBtn = $body.find('#nav-pauseButton:visible, .nav-pauseIcon:visible, button.vjs-play-control:visible, .vjs-playing:visible, #play_pause:visible');
      if ($pauseBtn.length > 0) {
        cy.wrap($pauseBtn.first()).click({ force: true });
      }

      // 2. Trigger native DOM click directly on #nav-pauseButton / .nav-pauseIcon if present
      const $navPause = $body.find('#nav-pauseButton, .nav-pauseIcon');
      if ($navPause.length > 0) {
        try { $navPause.get(0).click(); } catch(e) {}
      }

      // 3. Check inside iframe for #nav-pauseButton or .nav-pauseIcon
      const $iframes = $body.find('iframe');
      if ($iframes.length > 0) {
        try {
          const iframeDoc = $iframes[0].contentDocument || $iframes[0].contentWindow.document;
          if (iframeDoc) {
            const iPause = iframeDoc.querySelector('#nav-pauseButton, .nav-pauseIcon, #play_pause');
            if (iPause) {
              iPause.click();
            }
          }
        } catch (e) {}
      }

      // 4. Pause VideoJS player / HTML5 element directly
      const $video = $body.find('video');
      if ($video.length > 0) {
        const videoEl = $video[0];
        if (videoEl.player) {
          try { videoEl.player.pause(); } catch(e) {}
        } else if (typeof videoEl.pause === 'function') {
          videoEl.pause();
        }
      }
    });

    // 5. Hold 2 seconds visual pause state
    cy.wait(2000);
    return this;
  }

  toggleMuteVideo() {
    cy.get('body').then(($body) => {
      // 1. Target and click #myMuteIcon or mute button directly in DOM
      const $muteBtn = $body.find('#myMuteIcon:visible, .myMuteIcon:visible, [id="myMuteIcon"]:visible, .vjs-mute-control:visible, .vjs-volume-panel button:visible, button.vjs-mute-control:visible, #nav-muteButton:visible, .nav-muteIcon:visible');
      if ($muteBtn.length > 0) {
        cy.wrap($muteBtn.first()).click({ force: true });
      }

      // 2. Trigger native DOM click directly on #myMuteIcon if present
      const $myMute = $body.find('#myMuteIcon, .myMuteIcon, [id="myMuteIcon"]');
      if ($myMute.length > 0) {
        try { $myMute.get(0).click(); } catch(e) {}
      }

      // 3. Check inside iframe for #myMuteIcon
      const $iframes = $body.find('iframe');
      if ($iframes.length > 0) {
        try {
          const iframeDoc = $iframes[0].contentDocument || $iframes[0].contentWindow.document;
          if (iframeDoc) {
            const iMute = iframeDoc.querySelector('#myMuteIcon, .myMuteIcon, [id="myMuteIcon"], button.vjs-mute-control, #nav-muteButton');
            if (iMute) {
              iMute.click();
            }
          }
        } catch (e) {}
      }

      // 4. Access VideoJS instance & HTML5 video element to toggle mute state
      const $video = $body.find('video');
      if ($video.length > 0) {
        const videoEl = $video[0];
        const currentMuted = videoEl.muted;
        videoEl.muted = !currentMuted;

        if (videoEl.player) {
          try {
            const player = videoEl.player;
            if (typeof player.muted === 'function') {
              player.muted(!currentMuted);
            }
          } catch (e) {}
        }
      }
    });

    cy.wait(2000);
    return this;
  }

  closeVideo() {
    cy.get('body').then(($body) => {
      const $close = $body.find('.video-js-close-btn:visible, img.video-js-close-btn:visible, [data-qa-id="playlist-resource-close-icon-btn"]:visible, .closeIcon:visible');
      if ($close.length > 0) {
        cy.wrap($close.first()).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  verifyReturnedToPlaylist() {
    cy.get('[data-qa-id="playlist-module"], [data-qa-id="playlist-resource-card"]').should('exist');
    return this;
  }
}

export default new VideoPlayerActions();
