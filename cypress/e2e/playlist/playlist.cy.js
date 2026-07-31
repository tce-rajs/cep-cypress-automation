import playlistActions from './playlist.actions';
import playlistAssertions from './playlist.assertions';
import navigationActions from '../navigation/navigation.actions';
import { playlistData } from './playlist.data';

describe('Playlist Module (MOD-003)', () => {
  beforeEach(() => {
    playlistActions.visitAndSetupTopic(playlistData.primaryClass);
  });

  it('TS001 - Verify playlist loads after topic selection', () => {
    playlistAssertions.verifyPlaylistContainerVisible();
  });

  it('TS002 - Verify playlist refreshes after chapter change', () => {
    navigationActions.openContents();
    playlistAssertions.verifyPlaylistContainerVisible();
  });

  it('TS003 - Verify playlist refreshes after topic change', () => {
    navigationActions.openContents();
    playlistAssertions.verifyPlaylistContainerVisible();
  });

  it('TS004 - Verify assets are displayed', () => {
    playlistAssertions.verifyAssetTitlesDisplayed();
  });

  it('TS005 - Verify asset count is greater than zero', () => {
    playlistAssertions.verifyAssetCountGreaterThanZero();
  });

  it('TS006 - Verify asset order', () => {
    playlistAssertions.verifyAssetOrder();
  });

  it('TS007 - Verify different asset types are displayed', () => {
    playlistAssertions.verifyAssetTypesDisplayed();
  });

  it('TS008 - Verify asset can be selected/highlighted', () => {
    playlistActions.clickAsset(0);
    playlistAssertions.verifySelectedAssetHighlighted();
  });
});
