import navigationActions from './navigation.actions';
import navigationAssertions from './navigation.assertions';
import { navigationData } from './navigation.data';

describe('Navigation Module (MOD-002)', () => {
  beforeEach(() => {
    navigationActions.visit();
    navigationActions.loginByPin(navigationData.validPin);
  });

  it('TS001 - Verify Dashboard opens after PIN Login', () => {
    navigationAssertions.verifyDashboardVisible();
  });

  it('TS002 - Verify Current Class is displayed', () => {
    navigationAssertions.verifyCurrentClassDisplayed();
  });

  it('TS003 - Verify Recent Classes opens by default', () => {
    navigationActions.openClassPopup();
    navigationAssertions.verifyRecentClassesActive();
  });

  it('TS004 - Verify All My Classes tab', () => {
    navigationActions.openClassPopup();
    navigationActions.openAllClasses();
    navigationAssertions.verifyAllClassesTabActive();
  });

  it('TS005 - Verify Grade Selection', () => {
    navigationActions.openClassPopup();
    navigationActions.openAllClasses();
    navigationActions.selectGrade(navigationData.defaultClass.grade);
    navigationAssertions.verifyGradeSelected(navigationData.defaultClass.grade);
  });

  it('TS006 - Verify Division Selection', () => {
    navigationActions.openClassPopup();
    navigationActions.openAllClasses();
    navigationActions.selectGrade(navigationData.defaultClass.grade);
    navigationActions.selectDivision(navigationData.defaultClass.division);
    navigationAssertions.verifyDivisionSelected(navigationData.defaultClass.division);
  });

  it('TS007 - Verify Subject Selection', () => {
    navigationActions.openClassPopup();
    navigationActions.openAllClasses();
    navigationActions.selectGrade(navigationData.defaultClass.grade);
    navigationActions.selectDivision(navigationData.defaultClass.division);
    navigationActions.selectSubject(navigationData.defaultClass.subject);
    navigationAssertions.verifySubjectSelected(navigationData.defaultClass.subject);
  });

  it('TS008 - Verify Default Chapter is loaded', () => {
    navigationAssertions.verifyDashboardVisible();
    navigationAssertions.verifyPlaylistVisible();
  });

  it('TS009 - Verify Default Topic is loaded', () => {
    navigationAssertions.verifyDashboardVisible();
    navigationAssertions.verifyPlaylistVisible();
  });

  it('TS010 - Verify Contents popup opens', () => {
    navigationActions.openContents();
    navigationAssertions.verifyContentsPopupVisible();
  });

  it('TS011 - Verify Chapter Selection', () => {
    navigationActions.openContents();
    navigationActions.selectChapter(navigationData.defaultClass.chapter);
    navigationAssertions.verifyChapterUpdated(navigationData.defaultClass.chapter);
  });

  it('TS012 - Verify Topic Selection', () => {
    navigationActions.openContents();
    navigationActions.selectChapter(navigationData.defaultClass.chapter);
    navigationActions.selectTopic(navigationData.defaultClass.topic);
    navigationAssertions.verifyTopicUpdated(navigationData.defaultClass.topic);
  });

  it('TS013 - Verify Playlist refreshes', () => {
    navigationAssertions.verifyPlaylistVisible();
  });

  it('TS014 - Verify Current Class updates', () => {
    navigationActions.openClassPopup();
    navigationActions.openAllClasses();
    navigationActions.selectGrade(navigationData.secondaryClass.grade);
    navigationActions.selectDivision(navigationData.secondaryClass.division);
    navigationActions.selectSubject(navigationData.secondaryClass.subject);
    navigationAssertions.verifyCurrentClassDisplayed(navigationData.secondaryClass.grade);
  });
});
