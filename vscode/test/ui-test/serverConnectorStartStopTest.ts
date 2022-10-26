import { expect } from 'chai';
import {SideBarView, ViewControl, ActivityBar, DefaultTreeSection} from 'vscode-extension-tester';

/**
 * @author Oleksii Korniienko <olkornii@redhat.com>
 */
export function serverConnectorStartStopTest(): void {
  describe("Verify Community Server connector can be started and stoped", () => {
    let view: ViewControl;
    let sideBar: SideBarView;
    let section: DefaultTreeSection;

    beforeEach(async function () {
      this.timeout(10000);
      view = await new ActivityBar().getViewControl('Explorer');
      sideBar = await view.openView();
      const content = sideBar.getContent();
      section = (await content.getSection('Servers')) as DefaultTreeSection;
    });

    it('Start/stop server connector test', async function () {
      this.timeout(45000);
      await section.expand();
      await sleep(5000); // waiting for load server connectors

      const serverItem = await section.findItem('Community Server Connector');
      expect(serverItem).not.undefined;

      const serverFirstContextMenu = await serverItem.openContextMenu();
      expect(await serverFirstContextMenu.hasItem("Stop RSP Provider")).to.be.true;
      await serverFirstContextMenu.select("Stop RSP Provider");
      await sleep(5000); // waiting for stop

      const serverSecondContextMenu = await serverItem.openContextMenu();
      expect(await serverSecondContextMenu.hasItem("Start / Connect to RSP Provider")).to.be.true;
      await serverSecondContextMenu.select("Start / Connect to RSP Provider");
      await sleep(5000); // waiting for start

      const serverThirdContextMenu = await serverItem.openContextMenu();
      expect(await serverThirdContextMenu.hasItem("Stop RSP Provider")).to.be.true;
      serverThirdContextMenu.close();
    });

    after(async () => {
      if (sideBar && (await sideBar.isDisplayed()) && view) {
        await view.closeView();
      }
    });
  });
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));