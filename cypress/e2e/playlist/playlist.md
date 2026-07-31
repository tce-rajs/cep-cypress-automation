# CEP V2 - Playlist Module

## Module Information

| Field | Value |
|-------|-------|
| Module | Playlist |
| Module ID | MOD-003 |
| Status | In Progress |
| Priority | High |
| Dependency | PIN Login + Navigation |

---

# Objective

Verify that the correct playlist is loaded according to the selected Grade, Division, Subject, Chapter, and Topic.

---

# Preconditions

- User is logged in successfully using PIN.
- Navigation module is completed.
- Grade, Division, Subject, Chapter, and Topic are selected.
- Playlist data is available for the selected topic.

---

# Scope

## In Scope

- Playlist loading
- Playlist refresh
- Asset visibility
- Asset count
- Asset order
- Different asset types
- Asset selection/highlight

## Out of Scope

- Asset Player
- Whiteboard
- Annotation
- Download
- Share
- Asset functionality (PDF, Video, Quiz, Worksheet, etc.)

---

# Business Flow

```text
Login
    ↓
Navigate to Class
    ↓
Select Chapter
    ↓
Select Topic
    ↓
Playlist Loads
    ↓
Verify Playlist
    ↓
Verify Assets
```

---

# Business Rules

- Playlist loads after Topic selection.
- Playlist refreshes when Chapter changes.
- Playlist refreshes when Topic changes.
- Assets are displayed in curriculum-defined order.
- Playlist should not be empty for valid curriculum.
- Asset type depends on the curriculum.
- Selecting an asset highlights the selected asset.
- Clicking an asset should trigger the asset opening event (player validation is covered in a separate module).

---

# Test Data

| Grade | Division | Subject | Chapter | Topic |
|--------|----------|----------|----------|--------|
| Class 11 | A | Computer Science | Computer System | Introduction to Computer System |
| Class 9 | A | History | The French Revolution | Big Idea: The French Revolution |

---

# Positive Test Scenarios

| ID | Scenario |
|----|----------|
| TS001 | Verify playlist loads after topic selection |
| TS002 | Verify playlist refreshes after chapter change |
| TS003 | Verify playlist refreshes after topic change |
| TS004 | Verify assets are displayed |
| TS005 | Verify asset count is greater than zero |
| TS006 | Verify asset order |
| TS007 | Verify different asset types are displayed |
| TS008 | Verify asset can be selected/highlighted |

---

# Validations

- Playlist container is visible.
- Playlist is loaded successfully.
- Asset count is greater than zero.
- Correct chapter is displayed.
- Correct topic is displayed.
- Assets are displayed in the expected order.
- Selected asset is highlighted.

---

# Assertions

- Playlist container is visible.
- Asset count is greater than zero.
- Asset title is displayed.
- Asset type/icon is displayed.
- Selected asset is highlighted.

---

# Required Locators

| Element | Locator | Description |
|----------|---------|-------------|
| Playlist Container | `[data-qa-id="playlist-module"]` | Playlist root container |
| Asset Card | `[data-qa-id="playlist-resource-card"]` | Resource / Asset card item |
| Asset Title | `[data-qa-id="playlist-resource-card"] .title` | Resource title element |
| Asset Type/Icon | `[data-qa-id="playlist-resource-card"] .type-icon` | Resource type icon image |
| Asset Thumbnail | `[data-qa-id="playlist-resource-card"] .image` | Resource card thumbnail image |
| Selected Asset | `[data-qa-id="playlist-resource-card"] .resource-card.active` | Highlighted active card element |

---

# Reusable Functions

```text
verifyPlaylist()

getAssetCount()

getAssetTitles()

getAssetTypes()

clickAsset()

verifySelectedAsset()
```

---

# Automation Files

```text
playlist/

├── playlist.cy.js
├── playlist.page.js
├── playlist.actions.js
├── playlist.assertions.js
├── playlist.locators.js
├── playlist.data.js
└── playlist.md
```

---

# Definition of Done

- [x] Business rules documented
- [x] Test data finalized
- [x] Locators identified
- [ ] Positive scenarios automated
- [ ] Assertions implemented
- [ ] Tests passing successfully
- [ ] Allure report generated
- [ ] Documentation updated
