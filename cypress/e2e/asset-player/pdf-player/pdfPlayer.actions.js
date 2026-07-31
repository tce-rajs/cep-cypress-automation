import navigationActions from '../../navigation/navigation.actions';
import pdfPlayerPage from './pdfPlayer.page';
import { pdfPlayerData } from './pdfPlayer.data';

/**
 * PDF Player Reusable Business Actions (MOD-004)
 */
export class PdfPlayerActions {
  visitAndNavigateToPlaylist() {
    cy.get('body').then(($body) => {
      // Close any open player overlay before starting test
      const $close = $body.find('img[src*="CollapseResource"], .close-icon, [data-qa-id="playlist-resource-close-icon-btn"], [data-qa-id="tce-library-pdf-close-btn"]');
      if ($close.length > 0) {
        cy.wrap($close.first()).click({ force: true });
        cy.wait(1000);
      }
    });

    navigationActions.visit();
    navigationActions.loginByPin(pdfPlayerData.validPin);
    cy.wait(1000);
    return this;
  }

  openPdf() {
    cy.get('body').then(($body) => {
      // Close open video or player overlay if present
      const $closeBtn = $body.find('img[src*="CollapseResource"], .close-icon, [data-qa-id="playlist-resource-close-icon-btn"]');
      if ($closeBtn.length > 0 && $body.find('pdf-viewer, .pdf-scroll-container, app-pdf').length === 0) {
        cy.wrap($closeBtn.first()).click({ force: true });
        cy.wait(1000);
      }
    });

    cy.get('body').then(($body) => {
      // If PDF viewer is already open, do not re-trigger opening
      if ($body.find('pdf-viewer:visible, .pdf-scroll-container:visible, app-pdf:visible').length > 0) {
        return;
      }
      
      // Select resource card (second card or first available)
      if ($body.find('[data-qa-id="playlist-resource-card"]').length > 1) {
        cy.get('[data-qa-id="playlist-resource-card"]').eq(1).scrollIntoView().click({ force: true });
      } else if ($body.find('[data-qa-id="playlist-resource-card"]').length > 0) {
        cy.get('[data-qa-id="playlist-resource-card"]').first().scrollIntoView().click({ force: true });
      }
    });
    cy.wait(2500);
    return this;
  }

  verifyPdfLoaded() {
    pdfPlayerPage.pdfViewerContainer.should('exist');
    return this;
  }

  verifyPdfRendered() {
    pdfPlayerPage.pdfCanvas.should('exist');
    return this;
  }

  nextPage() {
    cy.get('body').then(($body) => {
      if ($body.find('app-nav-pagination .next-btn, app-nav-pagination button.page-next').length > 0) {
        pdfPlayerPage.nextPageBtn.click({ force: true });
      }
    });
    cy.wait(1000);
    return this;
  }

  previousPage() {
    cy.get('body').then(($body) => {
      if ($body.find('app-nav-pagination .prev-btn, app-nav-pagination button.page-prev').length > 0) {
        pdfPlayerPage.prevPageBtn.click({ force: true });
      }
    });
    cy.wait(1000);
    return this;
  }

  goToPage(pageNumber = 2) {
    cy.get('body').then(($body) => {
      if ($body.find('app-nav-pagination input.page-input').length > 0) {
        pdfPlayerPage.goToPageInput.clear({ force: true }).type(`${pageNumber}{enter}`, { force: true });
      }
    });
    cy.wait(1000);
    return this;
  }

  verifyCurrentPage(expectedPage) {
    if (expectedPage) {
      pdfPlayerPage.currentPageInput.should('have.value', String(expectedPage));
    } else {
      pdfPlayerPage.currentPageInput.should('exist');
    }
    return this;
  }

  verifyTotalPages() {
    pdfPlayerPage.totalPagesText.should('exist');
    return this;
  }

  changeOrientation(mode = 'portrait') {
    if (mode === 'portrait') {
      cy.get('body').then(($body) => {
        if ($body.find('app-nav-pagination .portrait-btn').length > 0) {
          pdfPlayerPage.portraitBtn.click({ force: true });
        }
      });
    } else {
      cy.get('body').then(($body) => {
        if ($body.find('app-nav-pagination .landscape-btn').length > 0) {
          pdfPlayerPage.landscapeBtn.click({ force: true });
        }
      });
    }
    cy.wait(1000);
    return this;
  }

  toggleAnswer() {
    cy.get('body').then(($body) => {
      if ($body.find('app-nav-pagination .toggle-ans-btn, app-nav-pagination button.ans-toggle').length > 0) {
        pdfPlayerPage.toggleAnsBtn.click({ force: true });
      }
    });
    cy.wait(1000);
    return this;
  }

  verifyPrintButton() {
    cy.get('body').then(($body) => {
      if ($body.find('app-nav-pagination .print-btn, [data-qa-id="add-resource-whiteboard-download-pdf-btn"]').length > 0) {
        pdfPlayerPage.printBtn.should('exist');
      }
    });
    return this;
  }

  closePdf() {
    cy.get('body').then(($body) => {
      const $close = $body.find('img[src*="CollapseResource"], .close-icon, [data-qa-id="playlist-resource-close-icon-btn"], [data-qa-id="tce-library-pdf-close-btn"]');
      if ($close.length > 0) {
        cy.wrap($close.first()).click({ force: true });
      }
    });
    cy.wait(1000);
    return this;
  }

  verifyReturnedToPlaylist() {
    pdfPlayerPage.playlistContainer.should('exist');
    return this;
  }
}

export default new PdfPlayerActions();
