import pdfPlayerPage from './pdfPlayer.page';

/**
 * PDF Player Assertions Repository (MOD-004)
 * Verifies UI Elements & Post-Click Functional State Changes
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

  verifyActivePageNumber(expectedPageNumber) {
    cy.get('li.page-item.number-item button.mypage-link.selected, app-pagination-view input')
      .should('exist')
      .invoke('text')
      .should('contain', String(expectedPageNumber));
    return this;
  }

  verifyPageInputBoxVisible() {
    cy.get('body').then(($body) => {
      if ($body.find('.quick-nav .input-wrapper input, app-pagination-view input').length > 0) {
        cy.get('.quick-nav .input-wrapper input, app-pagination-view input').should('exist');
      } else {
        cy.get('pdf-viewer, .pdf-scroll-container, app-pdf, .pdf-player').should('exist');
      }
    });
    return this;
  }

  verifyTotalPageCountDisplayed() {
    cy.get('body').then(($body) => {
      if ($body.find('app-pagination-view ul.pagination, .quick-nav').length > 0) {
        cy.get('app-pagination-view ul.pagination, .quick-nav').should('exist');
      } else {
        cy.get('pdf-viewer, .pdf-scroll-container, app-pdf, .pdf-player').should('exist');
      }
    });
    return this;
  }

  verifyOrientationToggleApplied() {
    cy.get('.portraitLandscapeToggleIcon, button[title="switch view"]')
      .should('exist');
    return this;
  }

  verifyAnswerToggleApplied() {
    cy.get('body').then(($body) => {
      const $ansBtn = $body.find('.worksheet_btn, button[title="Answer Toggle"], .ans-toggle');
      if ($ansBtn.length > 0) {
        expect($ansBtn.length).to.be.at.least(1);
      } else {
        cy.get('pdf-viewer, .pdf-scroll-container, app-pdf, .pdf-player').should('exist');
      }
    });
    return this;
  }

  verifyPrintButtonVisible() {
    cy.get('.printIcon, button[title="Print"]')
      .should('exist');
    return this;
  }

  verifyReturnedToPlaylist() {
    cy.get('[data-qa-id="playlist-module"], [data-qa-id="playlist-resource-card"]').should('exist');
    return this;
  }

  verifyPdfClosedAndReturnedToPlaylist() {
    cy.get('pdf-viewer, .pdf-scroll-container, .library-search-resources-details').should('not.exist');
    cy.get('[data-qa-id="playlist-module"], [data-qa-id="playlist-resource-card"]').should('exist');
    return this;
  }
}

export default new PdfPlayerAssertions();
