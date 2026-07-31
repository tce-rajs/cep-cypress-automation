# CEP V2 - PDF / Worksheet Player Module

## Module Information

| Field | Value |
|-------|-------|
| Module | PDF / Worksheet Player |
| Module ID | MOD-004 |
| Status | In Progress |
| Priority | High |
| Dependency | PIN Login → Navigation → Playlist |

---

# Objective

Verify that a PDF or Worksheet asset can be opened from the playlist and that all available PDF player controls function correctly.

---

# Scope

## In Scope

- Open PDF / Worksheet from Playlist
- PDF Viewer Loading
- PDF Rendering
- Previous Page Navigation
- Next Page Navigation
- Go To Page Navigation
- Current Page Validation
- Total Page Count Validation
- Portrait Mode
- Landscape Mode
- Answer Toggle (if available)
- Print Button
- Close PDF
- Return to Playlist

---

## Out of Scope

- PDF Download
- Annotation
- Whiteboard Tools
- Offline PDFs
- Performance Testing
- Negative & Edge Cases (covered later)

---

# Business Flow

```text
PIN Login
      ↓
Navigation
      ↓
Open Playlist
      ↓
Select PDF / Worksheet Asset
      ↓
PDF Opens inside Whiteboard
      ↓
Verify PDF Viewer
      ↓
Perform PDF Navigation
      ↓
Close PDF
      ↓
Return to Playlist
```

---

# Business Rules

- PDF opens inside the Whiteboard.
- PDF usually opens from Page 1.
- Last viewed page is not remembered after reopening.
- Print button is always visible.
- Loading spinner appears while PDF loads.
- Closing the PDF returns the user to the same playlist.
- Invalid page numbers do not perform any action.
- Page numbers greater than total pages can be entered.
- Answer Toggle is available only for supported worksheets.

---

# Feature Coverage

| Feature | Covered |
|----------|----------|
| Open PDF | ✅ |
| Render PDF | ✅ |
| Previous Page | ✅ |
| Next Page | ✅ |
| Go To Page | ✅ |
| Portrait Mode | ✅ |
| Landscape Mode | ✅ |
| Answer Toggle | ✅ (If Available) |
| Print | ✅ |
| Close PDF | ✅ |
| Return to Playlist | ✅ |

---

# Test Data

Data inherited from Navigation & Playlist sections:
- **Valid PIN**: `75583`
- **Class**: Class 9 | Section A | History | Chapter: The French Revolution | Topic: Big Idea: The French Revolution
- **Class (Secondary)**: Class 11 | Section A | Computer Science | Chapter: Computer System | Topic: Introduction to Computer System

---

# Positive Test Scenarios

| ID | Scenario |
|----|----------|
| TS001 | Verify PDF opens from Playlist |
| TS002 | Verify PDF Viewer loads successfully |
| TS003 | Verify PDF content is rendered |
| TS004 | Verify Previous Page navigation |
| TS005 | Verify Next Page navigation |
| TS006 | Verify Go To Page navigation |
| TS007 | Verify Current Page Number updates |
| TS008 | Verify Total Page Count is displayed |
| TS009 | Verify Portrait Mode |
| TS010 | Verify Landscape Mode |
| TS011 | Verify Answer Toggle (if available) |
| TS012 | Verify Print button is visible |
| TS013 | Verify PDF closes successfully |
| TS014 | Verify user returns to Playlist after closing PDF |

---

# Validations

- PDF Viewer is displayed.
- PDF content is rendered.
- Current page number is visible.
- Total page count is displayed.
- Previous button works.
- Next button works.
- Go To Page works.
- Portrait mode changes layout.
- Landscape mode changes layout.
- Print button is visible.
- PDF closes successfully.
- Playlist is displayed after closing.

---

# Assertions

- PDF viewer should be visible.
- PDF should render successfully.
- Current page number should update.
- Total page count should be greater than zero.
- Previous Page button should navigate correctly.
- Next Page button should navigate correctly.
- Go To Page should navigate to the requested page.
- Portrait Mode should be applied.
- Landscape Mode should be applied.
- Print button should be visible.
- Close button should return to the playlist.

---

# Required Locators

| ID | UI Element | Purpose | Locator |
|----|------------|---------|---------|
| PDF-001 | PDF / Worksheet Asset Card | Open PDF | `[data-qa-id="playlist-resource-card"], [data-qa-id="playlist-resource-player"]` |
| PDF-002 | PDF Viewer Container | Verify viewer opened | `.pdf-scroll-container, pdf-viewer` |
| PDF-003 | PDF Canvas | Verify PDF rendered | `pdf-viewer canvas, .ng2-pdf-viewer-container` |
| PDF-004 | Previous Page Button | Navigate previous page | `app-nav-pagination .prev-btn, app-nav-pagination button.page-prev` |
| PDF-005 | Next Page Button | Navigate next page | `app-nav-pagination .next-btn, app-nav-pagination button.page-next` |
| PDF-006 | Current Page Number | Verify page | `app-nav-pagination .page-input, app-nav-pagination input[type="number"]` |
| PDF-007 | Total Page Count | Verify total pages | `app-nav-pagination .total-pages, app-nav-pagination .page-count-text` |
| PDF-008 | Go To Page Input | Enter page | `app-nav-pagination input.page-input` |
| PDF-009 | Go Button | Navigate page | `app-nav-pagination .go-btn` or `Enter Key` |
| PDF-010 | Portrait Button | Portrait Mode | `app-nav-pagination .portrait-btn, app-nav-pagination [title*="Portrait"]` |
| PDF-011 | Landscape Button | Landscape Mode | `app-nav-pagination .landscape-btn, app-nav-pagination [title*="Landscape"]` |
| PDF-012 | Answer Toggle | Show/Hide Answers | `app-nav-pagination .toggle-ans-btn, app-nav-pagination button.ans-toggle` |
| PDF-013 | Print Button | Print PDF | `app-nav-pagination .print-btn, [data-qa-id="add-resource-whiteboard-download-pdf-btn"]` |
| PDF-014 | Close Button | Close PDF | `[data-qa-id="tce-library-pdf-close-btn"], app-nav-pagination .close-btn` |

---

# Optional Locators (Future Automation)

| ID | UI Element | Locator |
|----|------------|---------|
| PDF-015 | Loading Spinner | `ngx-spinner, .pdf-loading-spinner` |
| PDF-016 | PDF Title | `.library-search-resources-details-title, .pdf-title` |
| PDF-017 | Zoom Percentage | `app-nav-pagination .zoom-text, .zoom-level` |
| PDF-018 | Error Message | `.pdf-error-banner, .error-message` |
| PDF-019 | Disabled Previous Button | `app-nav-pagination .prev-btn[disabled], .prev-btn.disabled` |
| PDF-020 | Disabled Next Button | `app-nav-pagination .next-btn[disabled], .next-btn.disabled` |

---

# Reusable Functions

```text
openPdf()

verifyPdfLoaded()

verifyPdfRendered()

nextPage()

previousPage()

goToPage(pageNumber)

verifyCurrentPage()

verifyTotalPages()

changeOrientation(mode)

toggleAnswer()

verifyPrintButton()

closePdf()

verifyReturnedToPlaylist()
```

---

# Automation Files

```text
cypress/e2e/asset-player/pdf-player/
├── pdfPlayer.cy.js
├── pdfPlayer.page.js
├── pdfPlayer.actions.js
├── pdfPlayer.locators.js
├── pdfPlayer.data.js
└── pdfPlayer.md
```

---

# Definition of Done

- [x] Business flow documented
- [x] Business rules documented
- [x] Test data prepared
- [x] Positive scenarios documented
- [x] Required locators identified
- [x] Assertions documented
- [x] Reusable methods identified
- [ ] POM created
- [ ] Automation completed
- [ ] All tests passing
- [ ] Allure Report generated
- [ ] Code reviewed
- [ ] Documentation updated
