

export abstract class Reader {
	#idx = 0;
	#stack:Array<number> = [];
	
	constructor(public data:Buffer<ArrayBufferLike>) {}
	
	get offset() { return this.#idx; }
	set offset(val) { this.#idx = val; }
	
	skip(offset:number) { this.#idx += offset; return this; }
	push(addr:number) { this.#stack.push(this.#idx); this.#idx = addr; return this; }
	pop() { this.#idx = this.#stack.pop()!; return this; }
	readCStr(len = 0x40) {
		let str = this.data.subarray(this.#idx, this.#idx + len).toString('utf8');
		return str.slice(0, str.indexOf('\0'));
	}
	
	abstract readU8(): number;
	abstract readU16(): number;
	abstract readU32(): number;
	abstract readS8(): number;
	abstract readS16(): number;
	abstract readS32(): number;
	abstract readFloat(): number;
}

export class ReaderLE extends Reader {
	readU8()  { const idx = this.offset; this.offset += 1; return this.data.readUint8(idx); }
	readU16() { const idx = this.offset; this.offset += 2; return this.data.readUint16LE(idx); }
	readU32() { const idx = this.offset; this.offset += 4; return this.data.readUint32LE(idx); }
	readS8()  { const idx = this.offset; this.offset += 1; return this.data.readInt8(idx); }
	readS16() { const idx = this.offset; this.offset += 2; return this.data.readInt16LE(idx); }
	readS32() { const idx = this.offset; this.offset += 4; return this.data.readInt32LE(idx); }
	readFloat() { const idx = this.offset; this.offset += 4; return this.data.readFloatLE(idx); }
	// readAny32() {
	// 	const idx = this.offset; this.offset += 4;
	// 	return {
	// 		x: this.data.readUint32LE(idx).toString(16),
	// 		si: this.data.readInt32LE(idx),
	// 		ui: this.data.readUint32LE(idx),
	// 		f: this.data.readFloatLE(idx),
	// 	};
	// }
}

export class ReaderBE extends Reader {
	readU8()  { const idx = this.offset; this.offset += 1; return this.data.readUint8(idx); }
	readU16() { const idx = this.offset; this.offset += 2; return this.data.readUint16BE(idx); }
	readU32() { const idx = this.offset; this.offset += 4; return this.data.readUint32BE(idx); }
	readS8()  { const idx = this.offset; this.offset += 1; return this.data.readInt8(idx); }
	readS16() { const idx = this.offset; this.offset += 2; return this.data.readInt16BE(idx); }
	readS32() { const idx = this.offset; this.offset += 4; return this.data.readInt32BE(idx); }
	readFloat() { const idx = this.offset; this.offset += 4; return this.data.readFloatBE(idx); }
	// readAny32() {
	// 	const idx = this.offset; this.offset += 4;
	// 	return {
	// 		x: this.data.readUint32BE(idx).toString(16),
	// 		si: this.data.readInt32BE(idx),
	// 		ui: this.data.readUint32BE(idx),
	// 		f: this.data.readFloatBE(idx),
	// 	};
	// }
}

type VarTypes = 'bool'|'float'|'uint'|'int'|'cstr'|'vec3'|'img';
type Vector3 = [number, number, number];

export class SaveFileCaption {
	private BE = false;
	private varMap = new Map<number, Buffer<ArrayBuffer>>;
	public readonly sessionId: number;
	private _imgCache?: Blob = undefined;
	
	constructor(private data:Buffer<ArrayBuffer>) {
		this.BE = data.readUint32LE() !== 0x01020304;
		if (this.BE) {
			this.sessionId = data.readUint32BE(4);
			const varStop = data.readUint32BE(8);
			for (let i = 0x28; i < varStop; i++) {
				const key = data.readUint32BE(i);
				const val = data.subarray(i+4, i+8);
				if (key === 0) continue;
				this.varMap.set(key, val);
			}
		} else {
			this.sessionId = data.readUint32LE(4);
			const varStop = data.readUint32LE(8);
			for (let i = 0x28; i < varStop; i++) {
				const key = data.readUint32LE(i);
				const val = data.subarray(i+4, i+8);
				if (key === 0) continue;
				this.varMap.set(key, val);
			}
		}
	}
	
	getData(id: number, type:'bool'): boolean;
	getData(id: number, type:'float'|'uint'|'int'): number;
	getData(id: number, type:'cstr'): string
	getData(id: number, type:'vec3'): Vector3;
	getData(id: number, type:'img'): Buffer<ArrayBuffer>; // TODO
	getData(id:number, type:VarTypes) {
		const val = this.varMap.get(id)!;
		if (!this.BE) {
			switch(type) {
				case 'bool': 
					return val.readUInt32LE() !== 0;
				case 'uint':
				case 'int':
					return val.readUInt32LE();
				case 'float':
					return val.readFloatLE();
				case 'cstr': {
					const ptr = val.readUint32LE();
					let str = this.data.subarray(ptr, ptr+0x40).toString('utf8');
					return str.slice(0, str.indexOf('\n'));
				}
				case 'vec3': {
					const ptr = val.readUint32LE();
					return [
						this.data.readFloatLE(ptr + 0),
						this.data.readFloatLE(ptr + 4),
						this.data.readFloatLE(ptr + 8),
					];
				}
				case 'img': {
					const ptr = val.readUint32LE();
					return this.data.subarray(ptr);
				}
			}
		} else {
			switch(type) {
				case 'bool': 
					return val.readUInt32BE() !== 0;
				case 'uint':
				case 'int':
					return val.readUInt32BE();
				case 'float':
					return val.readFloatBE();
				case 'cstr': {
					const ptr = val.readUint32BE();
					let str = this.data.subarray(ptr, ptr+0x40).toString('utf8');
					return str.slice(0, str.indexOf('\n'));
				}
				case 'vec3': {
					const ptr = val.readUint32BE();
					return [
						this.data.readFloatBE(ptr + 0),
						this.data.readFloatBE(ptr + 4),
						this.data.readFloatBE(ptr + 8),
					];
				}
				case 'img': {
					const ptr = val.readUint32BE();
					return this.data.subarray(ptr);
				}
			}
		}
	}
	
	get progress_stone_forest() { return this.getData(0xFB112756, 'bool'); }
	get progress_stone_fire()   { return this.getData(0x50C6BEDF, 'bool'); }
	get progress_stone_water()  { return this.getData(0x2F61AB71, 'bool'); }
	
	get progress_medal_light()  { return this.getData(0x059CE596, 'bool'); }
	get progress_medal_forest() { return this.getData(0x75BD1ECF, 'bool'); }
	get progress_medal_fire()   { return this.getData(0x10DC0608, 'bool'); }
	get progress_medal_water()  { return this.getData(0xE1CA50C6, 'bool'); }
	get progress_medal_shadow() { return this.getData(0x89AE7032, 'bool'); }
	get progress_medal_spirit() { return this.getData(0xBA6A1B74, 'bool'); }
	
	get file_saved_second() { return this.getData(0x5EE50BED, 'uint'); }
	get file_saved_minute() { return this.getData(0x27853BF7, 'uint'); }
	get file_saved_hour()   { return this.getData(0x23F3D75E, 'uint'); }
	get file_saved_day()    { return this.getData(0xBD46F485, 'uint'); }
	get file_saved_month()  { return this.getData(0xDFD840D3, 'uint'); }
	get file_saved_year()   { return this.getData(0x9811A3F7, 'uint'); }
	
	get heath_max()     { return this.getData(0x74BD05D0, 'uint'); }
	get heath_curr()    { return this.getData(0x1E55ECC5, 'uint'); }
	get magic_max()     { return this.getData(0x943F8EC3, 'uint'); }
	get magic_curr()    { return this.getData(0x19F26B6A, 'uint'); }
	get double_defense(){ return this.getData(0xE8BD6759, 'bool'); }
	get rupee_count()   { return this.getData(0xA9557547, 'uint'); }
	get gs_count()      { return this.getData(0xDC941483, 'uint'); }
	get field_music()   { return this.getData(0x7C5B03DC, 'bool'); }
	get post_game()     { return this.getData(0xC72044FC, 'bool'); }
	
	get song_zelda()       { return this.getData(0x238AE327, 'bool'); }
	get song_saria()       { return this.getData(0x0F941212, 'bool'); }
	get song_epona()       { return this.getData(0x91288ADC, 'bool'); }
	get song_suns()        { return this.getData(0xFB2B5F6B, 'bool'); }
	get song_time()        { return this.getData(0x380A5616, 'bool'); }
	get song_storms()      { return this.getData(0xAB6B5962, 'bool'); }
	get song_scarecrow()   { return this.getData(0x00000000, 'bool'); } // TODO
	get song_warp_forest() { return this.getData(0x99B50B91, 'bool'); }
	get song_warp_fire()   { return this.getData(0x17464EB8, 'bool'); }
	get song_warp_water()  { return this.getData(0x85F5194D, 'bool'); }
	get song_warp_light()  { return this.getData(0xF9D63FD4, 'bool'); }
	get song_warp_shadow() { return this.getData(0x574AEF59, 'bool'); }
	get song_warp_spirit() { return this.getData(0x83254520, 'bool'); }
	
	get autosave() { return this.getData(0x25F03CAA, 'bool'); }
	get map_path() { return this.getData(0x0cccc6cd, 'cstr'); }
	get map_name() { return this.getData(0xf74e0e8e, 'cstr'); }
	get link_pos() { return this.getData(0x8b26618e, 'vec3'); }
	get link_rot() { return this.getData(0xaccbda17, 'float'); }
	
	get thumbnail(){ 
		if (this._imgCache === undefined) {
			this._imgCache = new Blob([this.getData(0x63696a32, 'img')], { type:'image/jpeg' }); 
		}
		return this._imgCache;
	}
}

function parseSaveFile(sav:Buffer<ArrayBufferLike>) {
	let data: Reader;
	if (sav.readUint32LE() === 0x01020304) {
		data = new ReaderLE(sav);
	} else {
		data = new ReaderBE(sav);
	}
	
	const varMap = new Map<number, any>();
	
	
}
