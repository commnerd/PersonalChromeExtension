import { Site } from './site';

export class Personal extends Site {
  public readonly domain: string = "michaeljmiller.net"

  private script: string = `
    alert('${this.domain}');
  `;

  constructor() {
    super();
  }

  public init() {
    super.init();
    this.injectJS(this.script);
  }
}
