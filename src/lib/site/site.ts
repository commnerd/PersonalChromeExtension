import { TabInfo } from '../../interfaces/tab-info';

export abstract class Site {
  public abstract readonly domain: string
  protected initialized: boolean = false;

  constructor() {}

  public executeLifeCycle() {
    this.init();
  }

  public init() {
    this.initialized = true;
  }

  public injectJS(js: string) {
    chrome.tabs.query({active: true}, (tabs: chrome.tabs.Tab[]) => {
      let currentTab = tabs[0];
      chrome.tabs.executeScript(currentTab.id, {
        code: js
      }, (result: any[]) => {});
    });
  }
}
