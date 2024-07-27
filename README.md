# Wifi Controller

[![NPM version](https://img.shields.io/npm/v/wifi-controller.svg)](https://www.npmjs.com/package/wifi-controller)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`wifi-controller` is a Node.js module that allows you to manage Wi-Fi on and off states programmatically on macOS and Windows. It provides a simple API to turn Wi-Fi on, off, toggle the state, and restart the Wi-Fi adapter.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install `wifi-controller` using npm:

```bash
npm install wifi-controller
```

## Usage

Here is a simple example to demonstrate how to use wifi-controller:

```javascript
const WifiController = require("wifi-controller");

(async () => {
  await WifiController.off();
  console.log("Wi-Fi is off");

  await WifiController.on();
  console.log("Wi-Fi is on");

  const name = await WifiController.device();
  console.log(`Wi-Fi device name: ${name}`);

  const isOn = await WifiController.isOn();
  console.log(`Wi-Fi is ${isOn ? "on" : "off"}`);
})();
```

## API

`WifiController`

All methods return a Promise.

`on()`

Turns the Wi-Fi on.

`off()`

Turns the Wi-Fi off.

`toggle(force)`

Toggles the Wi-Fi state. Optionally pass a boolean to force a state.

`restart()`

Restarts the Wi-Fi (turns it off and then on).

`isOn()`

Returns a Promise<boolean> indicating whether the Wi-Fi is on.

`device()`

Returns a Promise<string> with the Wi-Fi device name.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
