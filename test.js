const test = require('ava');
const WifiController = require('./index');

test('turn Wi-Fi on', async t => {
  await t.notThrowsAsync(async () => {
    await WifiController.on();
  });
});

test('turn Wi-Fi off', async t => {
  await t.notThrowsAsync(async () => {
    await WifiController.off();
  });
});

test('toggle Wi-Fi state', async t => {
  await t.notThrowsAsync(async () => {
    const initialState = await WifiController.isOn();
    console.log('Initial Wi-Fi state:', initialState);

    await WifiController.toggle();
    const newState = await WifiController.isOn();
    console.log('New Wi-Fi state:', newState);

    t.not(initialState, newState);

    // Restore the initial state
    await WifiController.toggle(initialState);
    const restoredState = await WifiController.isOn();
    console.log('Restored Wi-Fi state:', restoredState);

    t.is(restoredState, initialState);
  });
});

test('restart Wi-Fi', async t => {
  await t.notThrowsAsync(async () => {
    await WifiController.restart();
    const isOn = await WifiController.isOn();
    t.true(isOn);
  });
});

test('check if Wi-Fi is on', async t => {
  await t.notThrowsAsync(async () => {
    const isOn = await WifiController.isOn();
    t.true(typeof isOn === 'boolean');
  });
});

test('get Wi-Fi device name', async t => {
  await t.notThrowsAsync(async () => {
    const device = await WifiController.device();
    t.true(typeof device === 'string');
  });
});
