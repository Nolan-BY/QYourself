const { app, BrowserWindow, globalShortcut } = require('electron')
const { autoUpdater, AppUpdater  } = require("electron-updater")

require('update-electron-app')()

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

// if (app.isPackaged) {
//   const server = 'https://your-deployment-url.com'
//   const url = `${server}/update/${process.platform}/${app.getVersion()}`

//   autoUpdater.setFeedURL({ url })

//   setInterval(() => {
//     autoUpdater.checkForUpdates()
//   }, 60000)
// }

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: __dirname + '/assets/images/logo.ico',
    webPreferences: { devTools: false }
  })

  win.loadFile('index.html')
  win.setMenuBarVisibility(false)
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  autoUpdater.checkForUpdates();
  // curWindow.showMessage(`Checking for updates. Current version ${app.getVersion()}`);
});

/*New Update Available*/
autoUpdater.on("update-available", (info) => {
  // curWindow.showMessage(`Update available. Current version ${app.getVersion()}`);
  autoUpdater.downloadUpdate();
  // curWindow.showMessage(pth);
});

// autoUpdater.on("update-not-available", (info) => {
//   curWindow.showMessage(`No update available. Current version ${app.getVersion()}`);
// });

// /*Download Completion Message*/
// autoUpdater.on("update-downloaded", (info) => {
//   curWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
// });

// autoUpdater.on("error", (info) => {
//   curWindow.showMessage(info);
// });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});

app.on('browser-window-focus', function () {
  globalShortcut.register("CommandOrControl+R", () => {});
  globalShortcut.register("F5", () => {});
});

app.on('browser-window-blur', function () {
  globalShortcut.unregister('CommandOrControl+R');
  globalShortcut.unregister('F5');
});


autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Redémarrer', 'Plus tard'],
    title: 'Mise à jour de QYourself',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail:
      "Une nouvelle version de QYourself est disponible. Redémarrez l'application pour la mettre à jour."
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('error', (message) => {
  console.error('Il y a eu un problème lors de la mise à jour')
  console.error(message)
})