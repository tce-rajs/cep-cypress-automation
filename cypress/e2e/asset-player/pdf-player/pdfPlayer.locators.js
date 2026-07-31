/**
 * PDF / Worksheet Player Locators Repository (MOD-004)
 * Standard: Uses data-qa-id and DOM element classes
 */
export const pdfPlayerLocators = {
  // Playlist Trigger
  playlistPdfCard: '[data-qa-id="playlist-resource-card"]',
  playlistResourcePlayer: '[data-qa-id="playlist-resource-player"]',

  // PDF Viewer & Canvas
  pdfViewerContainer: 'pdf-viewer, .pdf-scroll-container, app-pdf, .library-search-resources-details, .resources-player-wrapper',
  pdfCanvas: 'pdf-viewer canvas, canvas, .ng2-pdf-viewer-container',
  loadingSpinner: 'ngx-spinner, .pdf-loading-spinner',
  pdfTitle: '.library-search-resources-details-title, .pdf-title',

  // Pagination & Navigation Controls
  prevPageBtn: 'app-nav-pagination .prev-btn, app-nav-pagination button.page-prev, app-nav-pagination button:has(.material-icons:contains("chevron_left"))',
  nextPageBtn: 'app-nav-pagination .next-btn, app-nav-pagination button.page-next, app-nav-pagination button:has(.material-icons:contains("chevron_right"))',
  currentPageInput: 'app-nav-pagination .page-input, app-nav-pagination input[type="number"]',
  totalPagesText: 'app-nav-pagination .total-pages, app-nav-pagination .page-count-text',
  goToPageInput: 'app-nav-pagination input.page-input',
  goToPageBtn: 'app-nav-pagination .go-btn',

  // View & Mode Controls
  portraitBtn: 'app-nav-pagination .portrait-btn, app-nav-pagination [title*="Portrait"]',
  landscapeBtn: 'app-nav-pagination .landscape-btn, app-nav-pagination [title*="Landscape"]',
  toggleAnsBtn: 'app-nav-pagination .toggle-ans-btn, app-nav-pagination button.ans-toggle',
  printBtn: 'app-nav-pagination .print-btn, [data-qa-id="add-resource-whiteboard-download-pdf-btn"]',
  closeBtn: '[data-qa-id="tce-library-pdf-close-btn"], app-nav-pagination .close-btn, .resources-details-close, .close-icon, img[src*="CollapseResource"]',

  // Playlist Return Container
  playlistContainer: '[data-qa-id="playlist-module"]'
};
