import { TriageHandler } from '../triage-handler/triage-handler';
import { TabInfo } from '../../interfaces/tab-info';
import { Site } from '../site/site';

export class TabHandler {
  private triageHandler: TriageHandler = new TriageHandler();
  private currentTab: chrome.tabs.Tab;
  private currentSite: Site;

  static init() {
    let tabHandler = new TabHandler()

    chrome.tabs.onActivated.addListener(tabHandler.tabChange.bind(tabHandler))
  }

  private tabChange(activeInfo: TabInfo) {
    chrome.tabs.query({active: true}, (tabs: chrome.tabs.Tab[]) => {
      this.currentTab = tabs[0];
      this.currentSite = this.triageHandler.triage(this.currentTab.url);
      this.currentSite?.executeLifeCycle();
    });
  }
}
