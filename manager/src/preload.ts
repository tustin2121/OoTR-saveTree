// oxlint-disable eslint-plugin-unicorn/no-empty-file
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('saveManager', {
	chooseDirectory: (title: string) =>ipcRenderer.invoke('directory:choose', title) as Promise<string | null>,
	listSaves: (root: string) => ipcRenderer.invoke('saves:list', root) as Promise<SaveEntry[]>,
	listSlots: (gameDir: string) => ipcRenderer.invoke('slots:list', gameDir) as Promise<SaveSlot[]>,
	installSave: (sourceDir: string, saveId: string, gameDir: string, slotId: string) =>
		ipcRenderer.invoke('saves:install', sourceDir, saveId, gameDir, slotId) as Promise<{ caption: boolean; progress: boolean }>,
});
