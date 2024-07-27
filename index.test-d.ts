const wifiController = require("wifi-controller");

// Test the types
async function testWifiController() {
  await wifiController.on();
  await wifiController.off();
  await wifiController.toggle();
  await wifiController.toggle(true);
  await wifiController.restart();
  const isOn: boolean = await wifiController.isOn();
  const device: string = await wifiController.device();
}
