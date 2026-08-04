/**
 * PDF / Worksheet Player Locators Repository (MOD-004)
 * Standard: Exact Angular Component & Core-Lib DOM Selectors
 */
export const pdfPlayerLocators = {
  // Playlist Resource Trigger Cards
  playlistPdfCard: '[data-qa-id="playlist-resource-card"]',
  playlistResourcePlayer: '[data-qa-id="playlist-resource-player"]',

  // PDF Viewer & Canvas Containers
  pdfViewerContainer: 'pdf-viewer, .pdf-scroll-container, app-pdf, .library-search-resources-details, .pdf-player, app-pdf-player',
  pdfCanvas: 'pdf-viewer canvas, canvas, .ng2-pdf-viewer-container',
  loadingSpinner: 'ngx-spinner, .pdf-loading-spinner',
  pdfTitle: '.library-search-resources-details-title, .pdf-title',

  // Pagination & Navigation Controls (core-lib pagination-view.component.html)
  prevPageBtn: '.previous-item button.mypage-link, app-pagination-view .previous-item button',
  nextPageBtn: '.next-item button.mypage-link, app-pagination-view .next-item button',
  activePageItem: 'li.page-item.number-item button.mypage-link.selected',
  goToPageInput: '.quick-nav .input-wrapper input, app-pagination-view input[type="text"], app-pagination-view input[type="number"]',
  goToPageBtn: '.quick-nav .input-wrapper button.goBtn, app-pagination-view .goBtn',

  // View & Mode Controls (core-lib worksheet-action-nav.component.html)
  portraitBtn: '.portraitLandscapeToggleIcon',
  landscapeBtn: '.portraitLandscapeToggleIcon',
  toggleAnsBtn: '.worksheet_btn',
  printBtn: '.printIcon',
  closeBtn: '.closeIcon, [data-qa-id="playlist-resource-close-icon-btn"], [data-qa-id="tce-library-pdf-close-btn"]',

  // Playlist Return Container (Visible DOM Card/Module Container)
  playlistContainer: '[data-qa-id="playlist-module"], [data-qa-id="playlist-resource-card"]'
};
