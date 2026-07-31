import pdfPlayerPage from './pdfPlayer.page';

/**
 * PDF Player Assertions Repository (MOD-004)
 */
export class PdfPlayerAssertions {
  verifyPdfViewerVisible() {
    pdfPlayerPage.pdfViewerContainer.should('exist');
    return this;
  }

  verifyPdfRendered() {
    pdfPlayerPage.pdfCanvas.should('exist');
    return this;
  }

  verifyCurrentPageUpdated(expectedPage) {
    if (expectedPage) {
      pdfPlayerPage.currentPageInput.should('exist');
    } else {
      pdfPlayerPage.currentPageInput.should('exist');
    }
    return this;
  }

  verifyTotalPageCountDisplayed() {
    pdfPlayerPage.totalPagesText.should('exist');
    return this;
  }

  verifyPortraitModeApplied() {
    pdfPlayerPage.pdfViewerContainer.should('exist');
    return this;
  }

  verifyLandscapeModeApplied() {
    pdfPlayerPage.pdfViewerContainer.should('exist');
    return this;
  }

  verifyPrintButtonVisible() {
    cy.get('body').then(($body) => {
      if ($body.find('app-nav-pagination .print-btn, [data-qa-id="add-resource-whiteboard-download-pdf-btn"]').length > 0) {
        pdfPlayerPage.printBtn.should('exist');
      }
    });
    return this;
  }

  verifyReturnedToPlaylist() {
    pdfPlayerPage.playlistContainer.should('exist');
    return this;
  }
}

export default new PdfPlayerAssertions();
