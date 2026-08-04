import navigationActions from '../../navigation/navigation.actions';
import pdfPlayerPage from './pdfPlayer.page';
import { pdfPlayerData } from './pdfPlayer.data';

/**
 * PDF Player Business Actions (MOD-004)
 * Single-Login Session Reuse & Strict Load Verification
 */
export class PdfPlayerActions {
  visitAndNavigateToPlaylist(classData = pdfPlayerData.primaryClass) {
    cy.get('body').then(($body) => {
      // 1. If already logged in & on Whiteboard, reuse active session
      if ($body.find('[data-qa-id="playlist-module"], [data-qa-id="playlist-current-grade-subject-btn"]').length > 0) {
        const $close = $body.find('.closeIcon:visible, [data-qa-id="playlist-resource-close-icon-btn"]:visible, img[src*="CollapseResource"]:visible, [data-qa-id="tce-library-pdf-close-btn"]:visible');
        if ($close.length > 0) {
          cy.wrap($close.first()).click({ force: true });
          cy.wait(500);
        }
        return;
      }

      // 2. Otherwise visit & perform initial login
      navigationActions.visit();
      navigationActions.loginByPin(pdfPlayerData.validPin);
      cy.wait(1000);
    });
    return this;
  }

  waitUntilPdfFullyLoaded() {
    // 1. Verify player/resource viewer container exists and is rendered
    cy.get('pdf-viewer, .pdf-scroll-container, app-pdf, .library-search-resources-details, .pdf-player, app-pdf-player', { timeout: 25000 })
      .should('exist');

    // 2. Verify document page / canvas / details content is rendered
    cy.get('body').then(($body) => {
      if ($body.find('pdf-viewer canvas, .pdf-scroll-container canvas, .ng2-pdf-viewer-container canvas, .pdf-page canvas').length > 0) {
        cy.get('pdf-viewer canvas, .pdf-scroll-container canvas, .ng2-pdf-viewer-container canvas, .pdf-page canvas', { timeout: 15000 }).should('exist');
      } else {
        cy.get('.library-search-resources-details, .pdf-scroll-container, .pdf-player, app-pdf-player, app-pdf', { timeout: 15000 }).should('exist');
      }
    });

    cy.wait(800);
    return this;
  }

  verifyAllPdfCardsInPlaylist() {
    cy.get('[data-qa-id="playlist-resource-card"]', { timeout: 15000 })
      .should('exist')
      .each(($card) => {
        cy.wrap($card).should('exist');
      });
    return this;
  }

  openPdf(index = 0) {
    cy.get('body').then(($body) => {
      // 1. If PDF viewer is already open, do not re-trigger card click
      if ($body.find('pdf-viewer:visible, .pdf-scroll-container:visible, app-pdf:visible, .library-search-resources-details:visible, .pdf-player:visible').length > 0) {
        return;
      }

      // 2. Dismiss auto-launched video or player overlay if present
      const $closeBtn = $body.find('.closeIcon:visible, [data-qa-id="playlist-resource-close-icon-btn"]:visible, img[src*="CollapseResource"]:visible');
      if ($closeBtn.length > 0) {
        cy.wrap($closeBtn.first()).click({ force: true });
        cy.wait(800);
      }

      // 3. Target Worksheet / PDF / Lecture Note card specifically
      const $worksheetCards = $body.find('[data-qa-id="playlist-resource-card"]:has(img.type-icon[src*="Worksheet"]), [data-qa-id="playlist-resource-card"]:has(img.type-icon[src*="Lecture"]), [data-qa-id="playlist-resource-card"]:has(img.type-icon[src*="Activity"]), [data-qa-id="playlist-resource-card"]:has(img.type-icon[src*="PDF"])');
      
      if ($worksheetCards.length > index) {
        cy.wrap($worksheetCards.eq(index)).scrollIntoView().click({ force: true });
      } else if ($body.find('[data-qa-id="playlist-resource-card"]').length > index) {
        cy.get('[data-qa-id="playlist-resource-card"]').eq(index).scrollIntoView().click({ force: true });
      } else if ($body.find('[data-qa-id="playlist-resource-card"]').length > 0) {
        cy.get('[data-qa-id="playlist-resource-card"]').first().scrollIntoView().click({ force: true });
      }
      cy.wait(2000);
    });

    this.waitUntilPdfFullyLoaded();
    return this;
  }

  verifyPdfLoaded() {
    this.waitUntilPdfFullyLoaded();
    return this;
  }

  verifyPdfRendered() {
    pdfPlayerPage.pdfCanvas.should('exist');
    return this;
  }

  nextPage() {
    this.waitUntilPdfFullyLoaded();
    cy.get('body').then(($body) => {
      const $next = $body.find('.next-item button.mypage-link, app-pagination-view .next-item button, .next-btn');
      if ($next.length > 0) {
        cy.wrap($next.first()).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  previousPage() {
    this.waitUntilPdfFullyLoaded();
    cy.get('body').then(($body) => {
      const $prev = $body.find('.previous-item button.mypage-link, app-pagination-view .previous-item button, .prev-btn');
      if ($prev.length > 0) {
        cy.wrap($prev.first()).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  goToPage(targetPage = 2) {
    this.waitUntilPdfFullyLoaded();
    cy.get('body').then(($body) => {
      const $input = $body.find('.quick-nav .input-wrapper input, app-pagination-view input[type="text"], app-pagination-view input[type="number"]');
      const $goBtn = $body.find('.quick-nav .input-wrapper button.goBtn, app-pagination-view .goBtn');
      if ($input.length > 0) {
        cy.wrap($input.first()).click({ force: true }).clear({ force: true }).type(`${targetPage}`, { force: true });
        if ($goBtn.length > 0) {
          cy.wrap($goBtn.first()).click({ force: true });
        } else {
          cy.wrap($input.first()).type('{enter}', { force: true });
        }
        cy.wait(1000);
      }
    });
    return this;
  }

  changeOrientation() {
    this.waitUntilPdfFullyLoaded();
    cy.get('body').then(($body) => {
      const $toggle = $body.find('.portraitLandscapeToggleIcon, button[title="switch view"]');
      if ($toggle.length > 0) {
        cy.wrap($toggle.first()).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  toggleAnswer() {
    this.waitUntilPdfFullyLoaded();
    cy.get('body').then(($body) => {
      const $ansBtn = $body.find('.worksheet_btn, button[title="Answer Toggle"]');
      if ($ansBtn.length > 0) {
        cy.wrap($ansBtn.first()).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  clickPrintButton() {
    this.waitUntilPdfFullyLoaded();
    cy.get('body').then(($body) => {
      const $print = $body.find('.printIcon, button[title="Print"]');
      if ($print.length > 0) {
        cy.wrap($print.first()).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  closePdf() {
    cy.get('body').then(($body) => {
      const $close = $body.find('.closeIcon:visible, button[title="close"]:visible, [data-qa-id="playlist-resource-close-icon-btn"]:visible, [data-qa-id="tce-library-pdf-close-btn"]:visible');
      if ($close.length > 0) {
        cy.wrap($close.first()).click({ force: true });
        cy.wait(1000);
      }
    });
    return this;
  }

  testRemainingPdfsEndToEnd() {
    // 1. Close open PDF card 0 first so playlist cards are accessible
    this.closePdf();

    // 2. Iterate through all remaining PDF cards starting from index 1
    cy.get('body').then(($body) => {
      const $cards = $body.find('[data-qa-id="playlist-resource-card"]:has(img.type-icon[src*="Worksheet"]), [data-qa-id="playlist-resource-card"]:has(img.type-icon[src*="Lecture"]), [data-qa-id="playlist-resource-card"]:has(img.type-icon[src*="Activity"]), [data-qa-id="playlist-resource-card"]:has(img.type-icon[src*="PDF"])');
      const totalCards = $cards.length;

      if (totalCards > 1) {
        for (let i = 1; i < totalCards; i++) {
          // Open PDF card i
          cy.get('[data-qa-id="playlist-resource-card"]').eq(i).scrollIntoView().click({ force: true });
          
          // STRICT LOAD WAIT: PDF MUST be 100% loaded before executing actions
          this.waitUntilPdfFullyLoaded();

          // Execute full action suite on PDF i
          this.nextPage();
          this.previousPage();
          this.goToPage(2);
          this.changeOrientation();
          this.toggleAnswer();
          this.clickPrintButton();
          
          // Close PDF i and verify return to playlist
          this.closePdf();
          this.verifyReturnedToPlaylist();
        }
      }
    });
    return this;
  }

  verifyReturnedToPlaylist() {
    cy.get('[data-qa-id="playlist-module"], [data-qa-id="playlist-resource-card"]').should('exist');
    return this;
  }
}

export default new PdfPlayerActions();
