declare module "wifi-controller" {
  interface WifiController {
    /**
     * Turn Wi-Fi on.
     * @returns A Promise that resolves when the operation is complete.
     */
    on(): Promise<void>;

    /**
     * Turn Wi-Fi off.
     * @returns A Promise that resolves when the operation is complete.
     */
    off(): Promise<void>;

    /**
     * Toggle Wi-Fi state.
     * @param force Optional boolean to force a specific state. True for on, false for off.
     * @returns A Promise that resolves when the operation is complete.
     */
    toggle(force?: boolean): Promise<void>;

    /**
     * Restart Wi-Fi (turn off and then on).
     * @returns A Promise that resolves when the operation is complete.
     */
    restart(): Promise<void>;

    /**
     * Check if Wi-Fi is on.
     * @returns A Promise that resolves to a boolean indicating whether the Wi-Fi is on.
     */
    isOn(): Promise<boolean>;

    /**
     * Get the Wi-Fi device name.
     * @returns A Promise that resolves to a string with the Wi-Fi device name.
     */
    device(): Promise<string>;
  }

  const wifiController: WifiController;
  export default wifiController;
}
