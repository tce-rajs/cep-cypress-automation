import pdfPlayerActions from './pdfPlayer.actions';
import pdfPlayerAssertions from './pdfPlayer.assertions';

describe('PDF / Worksheet Player Module (MOD-004)', () => {
  beforeEach(() => {
    pdfPlayerActions.visitAndNavigateToPlaylist();
    pdfPlayerActions.openPdf();
  });

  it('TS001 - Verify all PDF/Worksheet asset cards are present in Playlist', () => {
    pdfPlayerActions.verifyAllPdfCardsInPlaylist();
    pdfPlayerAssertions.verifyPdfViewerVisible();
  });

  it('TS002 - Verify PDF Viewer container loads successfully', () => {
    pdfPlayerActions.verifyPdfLoaded();
  });

  it('TS003 - Verify PDF Document Canvas is rendered', () => {
    pdfPlayerAssertions.verifyPdfRendered();
  });

  it('TS004 - Verify Previous Page button click action', () => {
    pdfPlayerActions.previousPage();
    pdfPlayerAssertions.verifyPdfViewerVisible();
  });

  it('TS005 - Verify Next Page button click action', () => {
    pdfPlayerActions.nextPage();
    pdfPlayerAssertions.verifyPdfViewerVisible();
  });

  it('TS006 - Verify Go To Page input box typing and GO button click action', () => {
    pdfPlayerActions.goToPage(2);
    pdfPlayerAssertions.verifyPdfViewerVisible();
  });

  it('TS007 - Verify Go To Page input box is visible and interactable', () => {
    pdfPlayerAssertions.verifyPageInputBoxVisible();
  });

  it('TS008 - Verify Total Page Count & pagination bar is displayed', () => {
    pdfPlayerAssertions.verifyTotalPageCountDisplayed();
  });

  it('TS009 - Verify Portrait Mode button click action', () => {
    pdfPlayerActions.changeOrientation();
    pdfPlayerAssertions.verifyOrientationToggleApplied();
  });

  it('TS010 - Verify Landscape Mode button click action', () => {
    pdfPlayerActions.changeOrientation();
    pdfPlayerAssertions.verifyOrientationToggleApplied();
  });

  it('TS011 - Verify Answer Toggle button click action', () => {
    pdfPlayerActions.toggleAnswer();
    pdfPlayerAssertions.verifyAnswerToggleApplied();
  });

  it('TS012 - Verify Print button click action', () => {
    pdfPlayerActions.clickPrintButton();
    pdfPlayerAssertions.verifyPrintButtonVisible();
  });

  it('TS013 - Verify Close PDF button click action closes viewer', () => {
    pdfPlayerActions.closePdf();
    pdfPlayerAssertions.verifyPdfClosedAndReturnedToPlaylist();
  });

  it('TS014 - Verify user returns to Playlist container after closing PDF', () => {
    pdfPlayerActions.closePdf();
    pdfPlayerAssertions.verifyReturnedToPlaylist();
  });

  it('TS015 - Verify complete action suite on all remaining PDF cards in playlist (excluding card 0)', () => {
    pdfPlayerActions.testRemainingPdfsEndToEnd();
  });
});
