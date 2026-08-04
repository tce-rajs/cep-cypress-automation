/**
 * Video Player Locators Repository (MOD-005)
 * Includes VideoJS controls, #nav-playButton, #nav-pauseButton, .nav-pauseIcon, #nav-Interactiveslider, #myMuteIcon, #nav-muteButton
 */
export const videoPlayerLocators = {
  playlistContainer: '[data-qa-id="playlist-module"], .playlist-wrapper, .playlist-container',
  playlistAssetCards: '[data-qa-id="playlist-resource-card"]',
  videoAssetCard: '[data-qa-id="playlist-resource-card"]:has(img[src*="AVMediaVideo"]), [data-qa-id="playlist-resource-card"]:has(img[src*="Video"]), [data-qa-id="playlist-resource-card"]:has(img[src*="video"])',
  videoPlayerContainer: '.video-wrapper, app-video-player, #player-wrapper, #player-viewer, .player-container',
  videoElement: 'video.video-js, video, iframe',
  playButton: '#nav-playButton, .nav-playIcon, .vjs-big-play-button, button.vjs-play-control, #play_pause',
  pauseButton: '#nav-pauseButton, .nav-pauseIcon, button.vjs-play-control.vjs-playing, .vjs-icon-pause',
  muteButton: '#myMuteIcon, .myMuteIcon, [id="myMuteIcon"], button.vjs-mute-control, .vjs-volume-panel button, #nav-muteButton, .nav-muteIcon, .vjs-icon-volume-high, .vjs-icon-volume-mute',
  interactiveSlider: '#nav-Interactiveslider, .vjs-progress-control, input[type="range"]',
  closeButton: '.video-js-close-btn, img.video-js-close-btn, [data-qa-id="playlist-resource-close-icon-btn"], .closeIcon'
};
