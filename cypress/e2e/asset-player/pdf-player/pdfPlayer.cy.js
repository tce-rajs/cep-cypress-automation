import pdfPlayerActions from './pdfPlayer.actions';
import pdfPlayerAssertions from './pdfPlayer.assertions';

describe('PDF / Worksheet Player Module (MOD-004)', () => {
  before(() => {
    pdfPlayerActions.visitAndNavigateToPlaylist();
  });

  beforeEach(() => {
    pdfPlayerActions.openPdf();
  });

  it('TS001 - Verify PDF opens from Playlist', () => {
    pdfPlayerAssertions.verifyPdfViewerVisible();
  });

  it('TS002 - Verify PDF Viewer loads successfully', () => {
    pdfPlayerActions.verifyPdfLoaded();
  });

  it('TS003 - Verify PDF content is rendered', () => {
    pdfPlayerAssertions.verifyPdfRendered();
  });

  it('TS004 - Verify Previous Page navigation', () => {
    pdfPlayerActions.previousPage();
    pdfPlayerAssertions.verifyPdfViewerVisible();
  });

  it('TS005 - Verify Next Page navigation', () => {
    pdfPlayerActions.nextPage();
    pdfPlayerAssertions.verifyPdfViewerVisible();
  });

  it('TS006 - Verify Go To Page navigation', () => {
    pdfPlayerActions.goToPage(2);
    pdfPlayerAssertions.verifyPdfViewerVisible();
  });

  it('TS007 - Verify Current Page Number updates', () => {
    pdfPlayerActions.verifyCurrentPage();
  });

  it('TS008 - Verify Total Page Count is displayed', () => {
    pdfPlayerAssertions.verifyTotalPageCountDisplayed();
  });

  it('TS009 - Verify Portrait Mode', () => {
    pdfPlayerActions.changeOrientation('portrait');
    pdfPlayerAssertions.verifyPortraitModeApplied();
  });

  it('TS010 - Verify Landscape Mode', () => {
    pdfPlayerActions.changeOrientation('landscape');
    pdfPlayerAssertions.verifyLandscapeModeApplied();
  });

  it('TS011 - Verify Answer Toggle (if available)', () => {
    pdfPlayerActions.toggleAnswer();
    pdfPlayerAssertions.verifyPdfViewerVisible();
  });

  it('TS012 - Verify Print button is visible', () => {
    pdfPlayerAssertions.verifyPrintButtonVisible();
  });

  it('TS013 - Verify PDF closes successfully', () => {
    pdfPlayerActions.closePdf();
    pdfPlayerAssertions.verifyReturnedToPlaylist();
  });

  it('TS014 - Verify user returns to Playlist after closing PDF', () => {
    pdfPlayerAssertions.verifyReturnedToPlaylist();
  });
});
