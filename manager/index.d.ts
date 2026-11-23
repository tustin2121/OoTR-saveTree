
declare interface SaveEntry {
  id: string;
  name: string;
  location: string;
  description: string;
  hasCaption: boolean;
  hasProgress: boolean;
  image: string | null;
  readme: string;
}

declare interface SaveSlot {
  id: string;
  hasCaption: boolean;
  hasProgress: boolean;
}

declare global {
  interface Window {
    saveManager: {
      chooseDirectory: (title: string) => Promise<string | null>;
      listSaves: (root: string) => Promise<SaveEntry[]>;
      listSlots: (gameDir: string) => Promise<SaveSlot[]>;
      installSave: (sourceDir: string, saveId: string, gameDir: string, slotId: string) => Promise<{ caption: boolean; progress: boolean }>;
    };
  }
}
