#!/usr/bin/env node

import FS from "node:fs/promises";
import PATH from "node:path";

const THUMBNAIL = `caption.jpg`;

const dir = PATH.resolve("../saves");

for await (const entry of FS.readdir(dir, { withFileTypes: true })) {
	if (!entry.isDirectory()) continue;
	const folder = PATH.join(dir, entry.name);
	const caption = PATH.join(folder, "caption.sav");
	
	try {
		const data = await FS.readFile(caption);
		
		const infoMap = new Map();
		for (let i = 0x28; i < 0x2A0; i += 8) {
			const key = data.readUInt32LE(i);
			const val = data.readUint32LE(i+4);
			infoMap.set(key, val);
		}
		
		{ // Grab thumbnail
			const length = data.readUint32LE(0x0570);
			const thumb = data.subarray(0x0574, 0x574 + length);
			FS.writeFile(PATH.join(folder, THUMBNAIL), thumb);
		}
		{ // write README.md
			const readme = `![](${THUMBNAIL})`;
			FS.writeFile(PATH.join(folder, 'README.md'), readme);
		}
		
		// data is a Uint8Array-compatible Buffer ready for processing.
		console.log(`${entry.name}: ${data.length} bytes`);
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
	}
}

/**
 * TODO:
 * - Make README.md with jfif file embedded
 * - Put colored unicode or other icons as the stones/medallions
 * - Hash save file to avoid reprocessing? Store in frontmatter
 * - Time and date
 * - Display autosave flag and/or make a version with manual save flag set
 */