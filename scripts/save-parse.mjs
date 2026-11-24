#!/usr/bin/env node

import FS from "node:fs/promises";
import { createWriteStream } from "node:fs";
import PATH from "node:path";

//-----------------------------------------------------------------------------
//#region Known Data

const KNOWN_VARS_CAPTION = new Map([
	[0xFB112756, 'Kokiri Emerald'],
	[0x50C6BEDF, 'Goron Ruby'],
	[0x2F61AB71, 'Zora Sapphire'],
	
	[0x059CE596, 'Light Medallion'],
	[0x75BD1ECF, 'Forest Medallion'],
	[0x10DC0608, 'Fire Medallion'],
	[0xE1CA50C6, 'Water Medallion'],
	[0x89AE7032, 'Shadow Medallion'],
	[0xBA6A1B74, 'Spirit Medallion'],
	
	[0x5EE50BED, 'File Saved: Second'],
	[0x27853BF7, 'File Saved: Minute'],
	[0x23F3D75E, 'File Saved: Hour'],
	[0xBD46F485, 'File Saved: Day'],
	[0xDFD840D3, 'File Saved: Month'],
	[0x9811A3F7, 'File Saved: Year'],
	
	[0x74BD05D0, 'Health Max'],
	[0x1E55ECC5, 'Health Curr'],
	[0x943F8EC3, 'Magic Max'],
	[0x19F26B6A, 'Magic Curr'],
	[0xE8BD6759, 'Double Defense'],
	[0xA9557547, 'Rupee Count'],
	[0xDC941483, 'GS Count'],
	[0x7C5B03DC, 'Field Music Start'],
	[0xC72044FC, 'Post Game'],
	
	[0x238AE327, 'Song Zelda'],
	[0x0F941212, 'Song Saria'],
	[0x91288ADC, 'Song Epona'],
	[0xFB2B5F6B, 'Song Suns'],
	[0x380A5616, 'Song Time'],
	[0xAB6B5962, 'Song Storms'],
	[0x00000000, 'Song Scarecrow'],
	[0x99B50B91, 'Song Forest Warp'],
	[0x17464EB8, 'Song Fire Warp'],
	[0x85F5194D, 'Song Water Warp'],
	[0xF9D63FD4, 'Song Light Warp'],
	[0x574AEF59, 'Song Shadow Warp'],
	[0x83254520, 'Song Spirit Warp'],
	
	[0x25F03CAA, 'Is Autosave'],
]);

const KNOWN_VARS_PROGRESS = new Map([
	[0, ''],
]);


//#endregion
//-----------------------------------------------------------------------------
//#region Readers

class ReaderLE {
	constructor(data) {
		/** @type {Buffer<ArrayBufferLike>} */
		this.data = data;
		this.idx = 0;
	}
	get offset() { return this.idx; }
	skip(num) { this.idx += num; return this; }
	readU8()  { const idx = this.idx; this.idx += 1; return this.data.readUint8(idx); }
	readU16() { const idx = this.idx; this.idx += 2; return this.data.readUint16LE(idx); }
	readU32() { const idx = this.idx; this.idx += 4; return this.data.readUint32LE(idx); }
	readS8()  { const idx = this.idx; this.idx += 1; return this.data.readInt8(idx); }
	readS16() { const idx = this.idx; this.idx += 2; return this.data.readInt16LE(idx); }
	readS32() { const idx = this.idx; this.idx += 4; return this.data.readInt32LE(idx); }
}

class ReaderBE {
	constructor(data) {
		/** @type {Buffer<ArrayBufferLike>} */
		this.data = data;
		this.idx = 0;
	}
	get offset() { return this.idx; }
	skip(num) { this.idx += num; return this; }
	readU8()  { const idx = this.idx; this.idx += 1; return this.data.readUint8(idx); }
	readU16() { const idx = this.idx; this.idx += 2; return this.data.readUint16BE(idx); }
	readU32() { const idx = this.idx; this.idx += 4; return this.data.readUint32BE(idx); }
	readS8()  { const idx = this.idx; this.idx += 1; return this.data.readInt8(idx); }
	readS16() { const idx = this.idx; this.idx += 2; return this.data.readInt16BE(idx); }
	readS32() { const idx = this.idx; this.idx += 4; return this.data.readInt32BE(idx); }
}

/** @param {Buffer<ArrayBufferLike>} data */
function Reader(data) {
	if (data.readUint32LE() === 0x01020304) {
		return new ReaderLE(data);
	}
	else {
		return new ReaderBE(data);
	}
}

//#endregion
//-----------------------------------------------------------------------------

const dir = process.argv[2] ?? PATH.resolve("../saves");

let numFilesErrored = 0;
let numFilesProcessed = 0;
for (const entry of await FS.readdir(dir, { withFileTypes: true, recursive: true })) {
	if (!entry.isFile()) continue;
	if (!entry.name.endsWith('.sav')) continue;
	
	const KNOWN_VARS = (()=>{
		if (entry.name === 'caption.sav') return KNOWN_VARS_CAPTION;
		if (entry.name === 'progress.sav') return KNOWN_VARS_PROGRESS;
		return new Map([[0,'']]);
	})();
	const file = PATH.join(entry.parentPath, entry.name);
	
	try {
		console.log(`Reading ${file}...`);
		let idx = 0;
		const data = Reader(await FS.readFile(file));
		/** @type {Map<number, number>} */
		const varMap = new Map();
		
		if (data.readU32() !== 0x01020304) throw "Invalid file: magic header wrong.";
		
		const logWriter = createWriteStream(PATH.join(entry.parentPath, `${entry.name}.log`), { autoClose:true, encoding:'utf8', flush:true });
		try {
			const log = new console.Console(logWriter);
			log.checkFor = function(input, comp) {
				if (input !== comp) this.log(`Unexpected: ${input} !== ${comp}`);
			};
			
			log.log(`Session number: 0x${data.readU32().toString(16)}`);
			const varStop = data.readU32();
			log.log(`Variable data stops at 0x${varStop.toString(16)}`);
			
			// Header?
			for (let i = 0; i < 7; i++) {
				log.checkFor(data.readU32(), 0);
			}
			
			while (data.offset < varStop) {
				const key = data.readU32();
				const val = data.readS32();
				if (key == 0) continue;
				varMap.set(key, val);
			}
			
			log.log(`\nVariable List:`);
			const list = [...varMap.keys()].sort();
			for (const key of list) {
				const val = varMap.get(key);
				const desc = KNOWN_VARS.get(key) ?? "????"
				// log.log(`Var 0x${('00000000'+key.toString(16)).slice(-8)} = ${val} [${desc}]`);
				log.log(`Var 0x${(key.toString(16)).slice(-8)} = ${val} [${desc}]`);
			}
			
			log.log(`\nOutput stopped at ${data.offset}`);
		} finally {
			logWriter.close();
		}
		
	} catch (error) {
		// if (error.code !== "ENOENT") throw error;
		console.error(`Error during file read:`, error);
		numFilesErrored++;
	}
}

