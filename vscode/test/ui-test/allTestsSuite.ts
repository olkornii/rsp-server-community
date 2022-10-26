import { extensionInstalledUITest } from './extensionInstalledUITest';
import { serverConnectorStartStopTest } from './serverConnectorStartStopTest';

describe('VSCode rsp-server-community - UI tests', () => {
  extensionInstalledUITest();
  serverConnectorStartStopTest();
});