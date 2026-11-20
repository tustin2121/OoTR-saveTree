#!/usr/bin/env node

import FS from "node:fs/promises";
import PATH from "node:path";

const THUMBNAIL = `caption.jpg`;
const INFO = {
	KokiriEmerald:    0xFB112756,
	GoronRuby:        0x50C6BEDF,
	ZoraSapphire:     0x2F61AB71,
	
	LightMedallion:   0x059CE596,
	ForestMedallion:  0x75BD1ECF,
	FireMedallion:    0x10DC0608,
	WaterMedallion:   0xE1CA50C6,
	ShadowMedallion:  0x89AE7032,
	SpiritMedallion:  0xBA6A1B74,
	
	FileSaved_Second: 0x5EE50BED,
	FileSaved_Minute: 0x27853BF7,
	FileSaved_Hour:   0x23F3D75E,
	FileSaved_Day:    0xBD46F485,
	FileSaved_Month:  0xDFD840D3,
	FileSaved_Year:   0x9811A3F7,
	
	HeartsMax:        0x74BD05D0,
	HeartsCurr:       0x1E55ECC5,
	MagicMax:         0x943F8EC3,
	MagicCurr:        0x19F26B6A,
	DoubleDefense:    0xE8BD6759,
	
	AutoSaveMarker:   0x25F03CAA,
};
const reverseInfo = new Map(Object.entries(INFO).map(([x,y])=>[y,x]));

const dir = PATH.resolve("../saves");

let numFilesProcessed = 0;
for (const entry of await FS.readdir(dir, { withFileTypes: true })) {
	if (!entry.isDirectory()) continue;
	const folder = PATH.join(dir, entry.name);
	const caption = PATH.join(folder, "caption.sav");
	
	try {
		const data = await FS.readFile(caption);
		
		const infoMap = new Map();
		for (let i = 0x28; i < 0x2A0; i += 8) {
			const key = data.readUInt32LE(i);
			const val = data.readUint32LE(i+4);
			if (key === 0) continue;
			infoMap.set(key, val);
		}
		
		let mapName = data.toString('utf8', 0x02AC, 0x02AC+0x40);
		let mapPath = data.toString('utf8', 0x02EC, 0x02EC+0x40);
		
		mapName = mapName.slice(0, mapName.indexOf('\0'));
		mapPath = mapPath.slice(0, mapPath.indexOf('\0'));
		
		mapName = mapName.replaceAll(/[A-Z]/g, " $&");
		
		{ // Grab thumbnail
			const length = data.readUint32LE(0x0570);
			const thumb = data.subarray(0x0574, 0x574 + length);
			FS.writeFile(PATH.join(folder, THUMBNAIL), thumb);
		}
		{ // write README.md
			let readme = `## ${mapName}\n`
			readme += `(${mapPath})\n\n`
			readme += `${infoMap.get(INFO.AutoSaveMarker)?'Autosaved':'Manually saved'} at ${infoMap.get(INFO.FileSaved_Year)}/${('00'+infoMap.get(INFO.FileSaved_Month)).slice(-2)}/${('00'+infoMap.get(INFO.FileSaved_Day)).slice(-2)} at ${infoMap.get(INFO.FileSaved_Hour)}:${('00'+infoMap.get(INFO.FileSaved_Minute)).slice(-2)}:${('00'+infoMap.get(INFO.FileSaved_Second)).slice(-2)}  \n`;
			
			readme += `Progress: [`;
			if (infoMap.get(INFO.KokiriEmerald)) readme += `🟢`;
			if (infoMap.get(INFO.GoronRuby)) readme += `🟥`;
			if (infoMap.get(INFO.ZoraSapphire)) readme += `💙`;
			readme += `|`;
			if (infoMap.get(INFO.LightMedallion)) readme += `☀️`;
			if (infoMap.get(INFO.ForestMedallion)) readme += `🌲`;
			if (infoMap.get(INFO.FireMedallion)) readme += `🔥`;
			if (infoMap.get(INFO.WaterMedallion)) readme += `🌊`;
			if (infoMap.get(INFO.ShadowMedallion)) readme += `🥷`;
			if (infoMap.get(INFO.SpiritMedallion)) readme += `👻`;
			readme += `]  \n`;
			readme += `${infoMap.get(INFO.DoubleDefense)?'💗':'❤️'} ${infoMap.get(INFO.HeartsCurr)}/${infoMap.get(INFO.HeartsMax)}  \n`;
			if (infoMap.get(INFO.MagicMax) > 0) readme += `❇️ ${infoMap.get(INFO.MagicCurr)}/${infoMap.get(INFO.MagicMax)}\n`;
			
			readme += `\n![](${THUMBNAIL})\n`;
			
			
			readme += `\n\n<!-- ${infoMap.size} entries:\n`;
			for (const [k, v] of infoMap) {
				readme += `  0x${Number(k).toString(16)} ${reverseInfo.get(k)??''} =  ${v}\n`;
			}
			readme += `-->`;
			
			FS.writeFile(PATH.join(folder, 'README.md'), readme);
		}
		
		// data is a Uint8Array-compatible Buffer ready for processing.
		console.log(`${entry.name}: ${data.length} bytes`);
		numFilesProcessed++;
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
	}
	if (numFilesProcessed > 5) break;
}

/**
 * TODO:
 * - Make README.md with jfif file embedded
 * - Put colored unicode or other icons as the stones/medallions
 * - Hash save file to avoid reprocessing? Store in frontmatter
 * - Time and date
 * - Display autosave flag and/or make a version with manual save flag set
 */