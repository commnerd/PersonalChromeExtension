import { Personal } from '../site/personal';
import { Site } from '../site/site';

export class TriageHandler {

  private sites = [
    Personal
  ];

  public triage(url): Site {
    for(let site of this.sites) {
      let instance = new site
      let domainRegex = new RegExp(instance.domain.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
      if(domainRegex.test(url)) {
        return instance;
      }
    }

    return undefined;
  }
}
