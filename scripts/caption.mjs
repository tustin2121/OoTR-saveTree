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
	RupeeCount:       0xA9557547,
	GSCount:          0xDC941483,
	FieldMusicStart:  0x7C5B03DC, // Talked with Keapora Geapbora
	PostGame:         0xC72044FC,
	
	SongZelda:        0x238AE327,
	SongSaria:        0x0F941212,
	SongEpona:        0x91288ADC,
	SongSuns:         0xFB2B5F6B,
	SongTime:         0x380A5616,
	SongStorms:       0xAB6B5962,
	SongScarecrow:    0x00000000,
	SongForest:       0x99B50B91,
	SongFire:         0x17464EB8,
	SongWater:        0x85F5194D,
	SongLight:        0xF9D63FD4,
	SongShadow:       0x574AEF59,
	SongSpirit:       0x83254520,
	
	AutoSaveMarker:   0x25F03CAA,
};
const reverseInfo = new Map(Object.entries(INFO).map(([x,y])=>[y,x]));

const dir = process.argv[2] ?? PATH.resolve("../saves");

let numFilesSkipped = 0;
let numFilesErrored = 0;
let numFilesProcessed = 0;
for (const entry of await FS.readdir(dir, { withFileTypes: true, recursive: true })) {
	// if (!entry.isDirectory()) continue;
	// const folder = PATH.join(dir, entry.name);
	// const caption = PATH.join(folder, "caption.sav");
	if (!entry.isFile() || entry.name !== 'caption.sav') {
		// console.log(`Skipping ${entry.parentPath}/${entry.name}`);
		numFilesSkipped++;
		continue;
	}
	const folder = PATH.join(entry.parentPath);
	const caption = PATH.join(folder, entry.name);
	
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
			if (infoMap.get(INFO.LightMedallion)) readme += `💡`;
			if (infoMap.get(INFO.ForestMedallion)) readme += `🌲`;
			if (infoMap.get(INFO.FireMedallion)) readme += `🔥`;
			if (infoMap.get(INFO.WaterMedallion)) readme += `🌊`;
			if (infoMap.get(INFO.ShadowMedallion)) readme += `🥷`;
			if (infoMap.get(INFO.SpiritMedallion)) readme += `👻`;
			readme += `] `;
			if (infoMap.get(INFO.PostGame)) readme += `⭐️`;
			readme += `  \n`
			readme += `${infoMap.get(INFO.DoubleDefense)?'💗':'❤️'} ${infoMap.get(INFO.HeartsCurr)}/${infoMap.get(INFO.HeartsMax)}  \n`;
			if (infoMap.get(INFO.MagicMax) > 0) readme += `❇️ ${infoMap.get(INFO.MagicCurr)}/${infoMap.get(INFO.MagicMax)}  \n`;
			readme += `💀 ${infoMap.get(INFO.GSCount)} 💰️ ${infoMap.get(INFO.RupeeCount)}  \n`;
			readme += `Songs: [`;
			if (infoMap.get(INFO.SongZelda)) readme += `💤`;
			if (infoMap.get(INFO.SongSaria)) readme += `🌲`;
			if (infoMap.get(INFO.SongEpona)) readme += `🐴`;
			if (infoMap.get(INFO.SongSuns)) readme += `☀️`;
			if (infoMap.get(INFO.SongTime)) readme += `🕔️`;
			if (infoMap.get(INFO.SongStorms)) readme += `⛈️`;
			if (infoMap.get(INFO.SongScarecrow)) readme += `🪶`;
			readme += `|`;
			if (infoMap.get(INFO.SongLight)) readme += `⛪️`;
			if (infoMap.get(INFO.SongForest)) readme += `🌲`;
			if (infoMap.get(INFO.SongFire)) readme += `🌋`;
			if (infoMap.get(INFO.SongWater)) readme += `🛶`;
			if (infoMap.get(INFO.SongShadow)) readme += `🪦`;
			if (infoMap.get(INFO.SongSpirit)) readme += `🏜️`;
			readme += `]  \n`;
			
			readme += `\n![](${THUMBNAIL})\n`;
			
			readme += `\n\n<!-- ${infoMap.size} entries:\n`;
			for (const [k, v] of infoMap) {
				readme += `  0x${Number(k).toString(16)} ${reverseInfo.get(k)??''} =  ${v}\n`;
			}
			readme += `-->`;
			
			FS.writeFile(PATH.join(folder, 'README.md'), readme);
		}
		
		// data is a Uint8Array-compatible Buffer ready for processing.
		console.log(`Processed ${caption}`);
		numFilesProcessed++;
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
		console.error(`File not found: ${caption}`);
		numFilesErrored++;
	}
	// if (numFilesProcessed > 5) break;
}
if (numFilesProcessed === 0) {
	console.log(`Processed no files at ${dir}. Skipped ${numFilesSkipped}.`);
}
if (numFilesErrored > 0) {
	console.log(`Completed with ${numFilesErrored} errors.`);
} else {
	console.log(`Complete.`);
}

/**
 * TODO:
 * - Make README.md with jfif file embedded
 * - Put colored unicode or other icons as the stones/medallions
 * - Hash save file to avoid reprocessing? Store in frontmatter
 * - Time and date
 * - Display autosave flag and/or make a version with manual save flag set
 */