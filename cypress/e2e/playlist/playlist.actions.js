import navigationActions from '../navigation/navigation.actions';
import playlistPage from './playlist.page';
import { playlistData } from './playlist.data';

/**
 * Playlist Reusable Business Actions (MOD-003)
 */
export class PlaylistActions {
  visitAndSetupTopic(classData = playlistData.primaryClass) {
    navigationActions.visit();
    navigationActions.loginByPin(playlistData.validPin);
    navigationActions.openContents();
    navigationActions.selectChapter(classData.chapter);
    navigationActions.selectTopic(classData.topic);
    cy.wait(1500);
    return this;
  }

  verifyPlaylist() {
    playlistPage.playlistModule.should('exist');
    return this;
  }

  getAssetCount() {
    return playlistPage.assetCard.its('length');
  }

  getAssetTitles() {
    return playlistPage.assetTitle;
  }

  getAssetTypes() {
    return playlistPage.assetTypeIcon;
  }

  clickAsset(index = 0) {
    playlistPage.assetCard.eq(index).scrollIntoView().should('exist').click({ force: true });
    cy.wait(1000);
    return this;
  }

  verifySelectedAsset() {
    playlistPage.selectedAssetCard.should('exist');
    return this;
  }
}

export default new PlaylistActions();
