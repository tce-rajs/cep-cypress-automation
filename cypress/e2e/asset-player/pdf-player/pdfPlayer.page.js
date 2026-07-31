import { pdfPlayerLocators } from './pdfPlayer.locators';

/**
 * PDF Player Page Object
 * Encapsulates element getters for PDF viewer controls
 */
class PdfPlayerPage {
  get playlistPdfCard() {
    return cy.get(pdfPlayerLocators.playlistPdfCard, { timeout: 15000 });
  }

  get pdfViewerContainer() {
    return cy.get(pdfPlayerLocators.pdfViewerContainer, { timeout: 15000 });
  }

  get pdfCanvas() {
    return cy.get(pdfPlayerLocators.pdfCanvas, { timeout: 15000 });
  }

  get prevPageBtn() {
    return cy.get(pdfPlayerLocators.prevPageBtn, { timeout: 15000 });
  }

  get nextPageBtn() {
    return cy.get(pdfPlayerLocators.nextPageBtn, { timeout: 15000 });
  }

  get currentPageInput() {
    return cy.get(pdfPlayerLocators.currentPageInput, { timeout: 15000 });
  }

  get totalPagesText() {
    return cy.get(pdfPlayerLocators.totalPagesText, { timeout: 15000 });
  }

  get goToPageInput() {
    return cy.get(pdfPlayerLocators.goToPageInput, { timeout: 15000 });
  }

  get portraitBtn() {
    return cy.get(pdfPlayerLocators.portraitBtn, { timeout: 15000 });
  }

  get landscapeBtn() {
    return cy.get(pdfPlayerLocators.landscapeBtn, { timeout: 15000 });
  }

  get toggleAnsBtn() {
    return cy.get(pdfPlayerLocators.toggleAnsBtn, { timeout: 15000 });
  }

  get printBtn() {
    return cy.get(pdfPlayerLocators.printBtn, { timeout: 15000 });
  }

  get closeBtn() {
    return cy.get(pdfPlayerLocators.closeBtn, { timeout: 15000 });
  }

  get playlistContainer() {
    return cy.get(pdfPlayerLocators.playlistContainer, { timeout: 15000 });
  }
}

export default new PdfPlayerPage();
