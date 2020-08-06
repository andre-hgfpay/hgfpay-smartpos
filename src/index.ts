import {app, Tray, Menu, BrowserWindow, dialog, ipcMain,shell} from 'electron';
import * as path from 'path';
import {bootstrap} from "./backend/app";
import {MainWindow} from "./windows/MainWindow";
import {INestApplicationContext} from "@nestjs/common";
import * as fs from 'fs'
import * as util from "util";
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow;
let nestContext: INestApplicationContext;

const createNestApp = async () => {
    nestContext = await bootstrap();
};

app.commandLine.appendSwitch('--autoplay-policy', 'no-user-gesture-required');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    try {
        fs.readFile(path.join(__dirname, '../.env'), async (err, data) => {
            if (err == null) {
                await createNestApp();
                //await MainWindow.create();
                //mainWindow = MainWindow.getInstance();
                const contextMenu = Menu.buildFromTemplate([
                    {
                        label: 'Versão v'+app.getVersion(), type: 'normal',
                    },
                    {
                        label: 'Status: On', type: 'normal',
                    },

                    {type: 'separator'},
                    {
                        label: 'Restart Service',
                        type: 'normal',
                        click: async () => {
                           app.relaunch()
                        }
                    },
                    {
                        label: 'Buscar Frensista',
                        type: 'normal',
                        click: async () => {
                            await shell.openExternal('http://localhost:3454/v1/attendants/integration')
                        }
                    },
                    {
                        label: 'Sair', type: 'normal', click: async () => {
                            app.quit();
                        }
                    }
                ]);
                let appIcon = await new Tray(path.join(__dirname, '../src/assets/icons/icon.png'));
                appIcon.setToolTip('Hgfpay Smart POS');
                appIcon.setContextMenu(contextMenu);
                await shell.openExternal('http://localhost:3454/api-docs/')
                await shell.openExternal('http://localhost:3454/v1/attendants/integration')
            } else {
                dialogX();
            }
        })
    } catch (e) {
        dialogX();
    }

});

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (!mainWindow.isVisible()) mainWindow.show()
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', async () => {
    if (mainWindow != null) {
        mainWindow.close();
    }
});

app.on('activate', () => {
    if (app.requestSingleInstanceLock()) {
        app.exit()
    } else {
        MainWindow.getInstance().show()
    }
})

ipcMain.on('app_version', event => {
    event.sender.send('app_version', {version: app.getVersion()});
});
ipcMain.on('stop_api', () => {
    nestContext.close()
});
ipcMain.on('start_api', async () => {
    await createNestApp();
});


function dialogX() {
    const option = {
        type: 'error',
        title: 'Hgfpay SmartPOS',
        message: "Erro HG-1020 .env não encontrado",
        buttons: ['OK']
    }

    // @ts-ignore
    dialog.showMessageBox(null, option, (index:any) => {
        app.quit();
    })
}

let data =  new Date();
let name = data.getDay()+'-'+data.getMonth()+'-'+data.getFullYear()
let log_file = fs.createWriteStream(path.join(__dirname, '../logs/'+name+'.log'), { flags: 'a' });
log_file.write('-------------------------------------------\n')
let log_stdout = process.stdout;
console.log = (d: any) => {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

console.debug = (d: any) => {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

console.error = (d: any) => {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};