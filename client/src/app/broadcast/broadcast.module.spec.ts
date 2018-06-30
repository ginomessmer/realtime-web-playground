import { BroadcastModule } from './broadcast.module';

describe('BroadcastModule', () => {
  let broadcastModule: BroadcastModule;

  beforeEach(() => {
    broadcastModule = new BroadcastModule();
  });

  it('should create an instance', () => {
    expect(broadcastModule).toBeTruthy();
  });
});
