const { exec } = require('child_process');

class WifiController {
  static getWifiInterface() {
    return new Promise((resolve, reject) => {
      const command = process.platform === 'darwin' ? 'networksetup -listallhardwareports' : null;
      if (!command) return resolve('en0'); // Default for non-macOS systems
      exec(command, (error, stdout) => {
        if (error) {
          return reject(error);
        }
        const match = stdout.match(/Hardware Port: Wi-Fi\nDevice: (en\d)/);
        if (match) {
          resolve(match[1]);
        } else {
          reject(new Error('Wi-Fi interface not found'));
        }
      });
    });
  }

  static async on() {
    const wifiInterface = await this.getWifiInterface();
    return new Promise((resolve, reject) => {
      const command = process.platform === 'win32' ? 'netsh interface set interface "Wi-Fi" admin=enable' :
        process.platform === 'darwin' ? `networksetup -setairportpower ${wifiInterface} on` :
          'nmcli radio wifi on';
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Error turning Wi-Fi on:', stderr);
          return reject(error);
        }
        console.log('Wi-Fi on stdout:', stdout);
        resolve();
      });
    });
  }

  static async off() {
    const wifiInterface = await this.getWifiInterface();
    return new Promise((resolve, reject) => {
      const command = process.platform === 'win32' ? 'netsh interface set interface "Wi-Fi" admin=disable' :
        process.platform === 'darwin' ? `networksetup -setairportpower ${wifiInterface} off` :
          'nmcli radio wifi off';
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Error turning Wi-Fi off:', stderr);
          return reject(error);
        }
        console.log('Wi-Fi off stdout:', stdout);
        resolve();
      });
    });
  }

  static async toggle(force) {
    console.log('Toggle force:', force);
    const isOn = await this.isOn();
    console.log('Current Wi-Fi state:', isOn);

    if (force !== undefined) {
      const action = force ? this.on() : this.off();
      await action;
      await new Promise(resolve => setTimeout(resolve, 3000));
      return action;
    }

    const action = isOn ? this.off() : this.on();
    await action;
    // Aggiungiamo un ritardo più lungo per garantire che il Wi-Fi abbia il tempo di spegnersi/accendersi
    await new Promise(resolve => setTimeout(resolve, 3000));
    return action;
  }

  static async restart() {
    await this.off();
    // Aggiungiamo un ritardo più lungo per garantire che il Wi-Fi sia spento prima di riaccenderlo
    console.log('Wi-Fi should be off now, waiting before turning it on...');
    await new Promise(resolve => setTimeout(resolve, 5000)); // Aumento del ritardo
    await this.on();
    console.log('Wi-Fi should be on now, checking status...');
    const isOn = await this.isOn();
    console.log('Wi-Fi state after restart:', isOn);
    return isOn;
  }

  static async isOn() {
    const wifiInterface = await this.getWifiInterface();
    return new Promise((resolve, reject) => {
      const command = process.platform === 'win32' ? 'netsh interface show interface "Wi-Fi"' :
        process.platform === 'darwin' ? `ifconfig ${wifiInterface}` :
          'nmcli radio wifi';
      exec(command, (error, stdout) => {
        if (error) {
          return reject(error);
        }
        console.log('isOn stdout:', stdout);

        const isOn = process.platform === 'win32' ? stdout.includes('Enabled') :
          process.platform === 'darwin' ? stdout.includes('status: active') :
            stdout.includes('enabled');
        resolve(isOn);
      });
    });
  }

  static async device() {
    return new Promise((resolve, reject) => {
      const command = process.platform === 'win32' ? 'netsh wlan show interfaces' :
        process.platform === 'darwin' ? 'networksetup -listallhardwareports' :
          'nmcli device status';
      exec(command, (error, stdout) => {
        if (error) {
          return reject(error);
        }
        console.log('device stdout:', stdout);

        const device = process.platform === 'win32' ? stdout.match(/^\s*Name\s*:\s*(.*)$/m)[1] :
          process.platform === 'darwin' ? stdout.match(/Hardware Port: Wi-Fi\nDevice: (en\d)/)[1] :
            stdout.match(/wifi\s+connected\s+(\S+)/)[1];
        resolve(device);
      });
    });
  }
}

module.exports = WifiController;
