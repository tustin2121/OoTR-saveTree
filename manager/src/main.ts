import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

async function exists(filePath: string): Promise<boolean> {
  try { await fs.access(filePath); return true; } catch { return false; }
}

async function readSaveEntry(root: string, id: string): Promise<SaveEntry | null> {
  const dir = path.join(root, id);
  const stats = await fs.stat(dir).catch(() => null);
  if (!stats?.isDirectory()) return null;

  const readmePath = path.join(dir, 'README.md');
  const readme = await fs.readFile(readmePath, 'utf8').catch(() => '');
  const heading = readme.match(/^##\s+(.+)$/m)?.[1].trim();
  const location = readme.match(/^\(([^)]+)\)$/m)?.[1].trim();
  const name = heading || id.replace(/_/g, ' ').replace(/^[A-Z0-9]+\s*/, '') || id;

  const hasCaption = await exists(path.join(dir, 'caption.sav'));
  const hasProgress = await exists(path.join(dir, 'progress.sav'));
  const imagePath = path.join(dir, 'caption.jpg');
  const image = await exists(imagePath) ? imagePath : null;

  return { id, name, location: location || '', description: readme.split('\n').filter((line) => line && !line.startsWith('#') && !line.startsWith('!') && !line.startsWith('<!--')).slice(0, 2).join(' ').trim(), hasCaption, hasProgress, image, readme };
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 640,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#0b1710',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.handle('directory:choose', async (_event, title: string) => {
  const result = await dialog.showOpenDialog({ title, properties: ['openDirectory'] });
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('saves:list', async (_event, root: string) => {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const saves: SaveEntry[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const save = await readSaveEntry(root, entry.name);
    if (save && (save.hasCaption || save.hasProgress)) saves.push(save);
  }
  return saves.sort((a, b) => a.id.localeCompare(b.id));
});

ipcMain.handle('slots:list', async (_event, gameDir: string) => {
  const slots = [];
  for (let i = 0; i < 6; i++) {
    const slotId = `slot_${String(i).padStart(2, '0')}`;
    const dir = path.join(gameDir, slotId);
    const caption = path.join(dir, 'caption.sav');
    const progress = path.join(dir, 'progress.sav');
    slots.push({ id: slotId, hasCaption: await exists(caption), hasProgress: await exists(progress) });
  }
  return slots;
});

ipcMain.handle('saves:install', async (_event, sourceDir: string, saveId: string, gameDir: string, slotId: string) => {
  const from = path.join(sourceDir, saveId);
  const to = path.join(gameDir, slotId);
  await fs.mkdir(to, { recursive: true });
  const caption = path.join(from, 'caption.sav');
  const progress = path.join(from, 'progress.sav');
  if (await exists(caption)) await fs.copyFile(caption, path.join(to, 'caption.sav'));
  if (await exists(progress)) await fs.copyFile(progress, path.join(to, 'progress.sav'));
  return { caption: await exists(caption), progress: await exists(progress) };
});

ipcMain.handle('image:path', async (_event, filePath: string) => filePath);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
