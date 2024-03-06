const { app, BrowserWindow } = require('electron');
const { dialog } = require('electron');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false, // Permitir acesso ao contexto do nodeIntegration
        //sandbox: false, // Desativar a sandbox
        //preload: `${__dirname}/preload.js`,
    }
  });
  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
