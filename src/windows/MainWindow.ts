import { BrowserWindow,app} from "electron";
const path = require('path');

export class MainWindow {
    private static instance: BrowserWindow;

    private constructor() {
        if (process.mas) app.setName('HGFPAY Smart POS');
    }

    public static create(): MainWindow {
        return this.instance = this.createWindow();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = this.createWindow();
        } else {
            return this.instance;
        }
    }

    public static isInitialized() {
        return !!this.instance;
    }

    private static createWindow(): BrowserWindow {
        // Create the browser window.
        const mainWindow = new BrowserWindow({
            width: 1000,
            height: 670,
            minHeight: 670,
            maxHeight: 670,
            minWidth: 1000,
            maxWidth: 1000,
            center: true,
            icon: path.join(__dirname, '../../src/assets/icons/icon.png'),
            title: 'HGFPAY SmartPOS',
            // transparent: true,
            // backgroundColor: '#00FFFFFF',
        });
        // and load the index.html of the app.
        mainWindow.loadFile(path.join(__dirname, '../../src/index.html'));

        // Open the DevTools.
       // mainWindow.webContents.openDevTools();

        // mainWindow.webContents.clearHistory();
        // mainWindow.webContents.on('did-finish-load', () => {
        //     mainWindow.webContents.clearHistory();
        // });

        // Emitted when the window is closed.

        mainWindow.on('close', e => {
            if (mainWindow.webContents.isFocused() && mainWindow.isVisible()) {
                e.preventDefault();
                mainWindow.hide();
            }
        });

        return mainWindow;
    }
}


