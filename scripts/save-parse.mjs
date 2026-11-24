#!/usr/bin/env node

import FS from "node:fs/promises";
import { createWriteStream } from "node:fs";
import PATH from "node:path";

//-----------------------------------------------------------------------------
//#region Known Data

const KNOWN_VARS_CAPTION = new Map([
	[0xFB112756, { t:'bool',  lbl: 'Kokiri Emerald' }],
	[0x50C6BEDF, { t:'bool',  lbl: 'Goron Ruby' }],
	[0x2F61AB71, { t:'bool',  lbl: 'Zora Sapphire' }],
	
	[0x059CE596, { t:'bool',  lbl: 'Light Medallion' }],
	[0x75BD1ECF, { t:'bool',  lbl: 'Forest Medallion' }],
	[0x10DC0608, { t:'bool',  lbl: 'Fire Medallion' }],
	[0xE1CA50C6, { t:'bool',  lbl: 'Water Medallion' }],
	[0x89AE7032, { t:'bool',  lbl: 'Shadow Medallion' }],
	[0xBA6A1B74, { t:'bool',  lbl: 'Spirit Medallion' }],
	
	[0x5EE50BED, { t:'uint',  lbl: 'File Saved: Second' }],
	[0x27853BF7, { t:'uint',  lbl: 'File Saved: Minute' }],
	[0x23F3D75E, { t:'uint',  lbl: 'File Saved: Hour' }],
	[0xBD46F485, { t:'uint',  lbl: 'File Saved: Day' }],
	[0xDFD840D3, { t:'uint',  lbl: 'File Saved: Month' }],
	[0x9811A3F7, { t:'uint',  lbl: 'File Saved: Year' }],
	
	[0x74BD05D0, { t:'uint',  lbl: 'Health Max' }],
	[0x1E55ECC5, { t:'uint',  lbl: 'Health Curr' }],
	[0x943F8EC3, { t:'uint',  lbl: 'Magic Max' }],
	[0x19F26B6A, { t:'uint',  lbl: 'Magic Curr' }],
	[0xE8BD6759, { t:'bool',  lbl: 'Double Defense' }],
	[0xA9557547, { t:'bool',  lbl: 'Rupee Count' }],
	[0xDC941483, { t:'uint',  lbl: 'GS Count' }],
	[0x7C5B03DC, { t:'bool',  lbl: 'Field Music Start' }],
	[0xC72044FC, { t:'bool',  lbl: 'Post Game' }],
	
	[0x238AE327, { t:'bool',  lbl: 'Song Zelda' }],
	[0x0F941212, { t:'bool',  lbl: 'Song Saria' }],
	[0x91288ADC, { t:'bool',  lbl: 'Song Epona' }],
	[0xFB2B5F6B, { t:'bool',  lbl: 'Song Suns' }],
	[0x380A5616, { t:'bool',  lbl: 'Song Time' }],
	[0xAB6B5962, { t:'bool',  lbl: 'Song Storms' }],
	[0x00000000, { t:'bool',  lbl: 'Song Scarecrow' }],
	[0x99B50B91, { t:'bool',  lbl: 'Song Forest Warp' }],
	[0x17464EB8, { t:'bool',  lbl: 'Song Fire Warp' }],
	[0x85F5194D, { t:'bool',  lbl: 'Song Water Warp' }],
	[0xF9D63FD4, { t:'bool',  lbl: 'Song Light Warp' }],
	[0x574AEF59, { t:'bool',  lbl: 'Song Shadow Warp' }],
	[0x83254520, { t:'bool',  lbl: 'Song Spirit Warp' }],
	
	[0x25F03CAA, { t:'bool',  lbl: 'Is Autosave' }],
	[0x63696a32, { t:'img',   lbl: 'Thumbnail' }],
	[0x0cccc6cd, { t:'cstr',  lbl: 'Map Path' }],
	[0xf74e0e8e, { t:'cstr',  lbl: 'Map Name' }],
	[0x8b26618e, { t:'vec3',  lbl: "Link's Position" }],
	[0xaccbda17, { t:'float', lbl: "Link's Rotation" }],
]);

const KNOWN_VARS_PROGRESS = new Map([
	[0xe53eb6d1, { t:'uint',  lbl: 'Game Timer 1' }],
	[0xe573f564, { t:'uint',  lbl: 'Game Timer 2' }],
	[0x1ea93bd8, { t:undefined, lbl: '???? Movement Related' }],
	
	
	[0x008d7f0c, { t:'cstr',  lbl: 'Equipped Armor' }],
	[0x2342b619, { t:'cstr',  lbl: 'Equipped Shield (Child)' }],
	[0xee463235, { t:'cstr',  lbl: 'Equipped Shield (Adult)' }],
	[0xfb117672, { t:'cstr',  lbl: 'Equipped Shield (Adult) 2?' }],
	[0xa1f7ee2b, { t:'cstr',  lbl: 'Equipped Sword (Child)' }],
	[0xa95a3521, { t:'cstr',  lbl: 'Equipped Sword (Adult)' }],
	[0xd107a85d, { t:'cstr',  lbl: 'Equipped Boots Slot (Adult)' }],
	[0x59d9c7b3, { t:'cstr',  lbl: 'Equipped Head Slot' }],
	
	[0x0da3a7a7, { t:'cstr',  lbl: 'Current Nut Bag' }],
	[0x2808ee1c, { t:'cstr',  lbl: 'Current Stick Bag' }],
	[0xd732dd7f, { t:'cstr',  lbl: 'Current Bullet Bag' }],
	[0x3e42affa, { t:'cstr',  lbl: 'Current Wallet' }],
	[0xb6294119, { t:'cstr',  lbl: 'Current Quiver' }],
	[0xa835e3b0, { t:'cstr',  lbl: 'Current Bomb Bag' }],
	[0x7ce1cb81, { t:'cstr',  lbl: 'Current Gauntlet' }],
	[0xb72cd3fc, { t:'cstr',  lbl: 'Current Ocarina' }],
	[0x72c4152b, { t:'cstr',  lbl: 'Double Defense' }],
	
	[0x0f4e78bc, { t:'cstr',  lbl: 'Spirit Medal?' }],
	[0x874c7ed4, { t:'cstr',  lbl: 'Meet_GreatFairy?' }],
	
	// [0x0cccc6cd, { t:'cstr',  lbl: 'Map Path' }],
	[0x4a6bdb7d, { t:'cstr',  lbl: 'Map Name 1?' }],
	[0x1d6189da, { t:'cstr',  lbl: 'Map Name 2?' }],
	[0x64e56387, { t:'cstr',  lbl: 'Permanent Map Name 3? (Prev Map)' }], // eg Kak if in Dream World
	[0xb09fbd99, { t:'cstr',  lbl: 'Map Name 4???' }],
	[0xbbfa47d8, { t:'cstr',  lbl: 'Map Name 5????' }],
	[0xea129426, { t:'cstr',  lbl: 'Map Name 6?????' }],
	[0xc89c20f7, { t:'cstr',  lbl: 'Permanent Map Path?' }],
	[0x8086a1b1, { t:'cstr',  lbl: 'Permanent Map Json File Path?' }],
	[0x8773f02d, { t:'vec3',  lbl: "Link's Position" }],
	[0xc884818d, { t:'vec3',  lbl: "Link's Position 2?" }],
	// [0xaccbda17, { t:'float', lbl: "Link's Rotation" }],
	
	[0x20b1faac, { t:'vec4',  lbl: "????" }], // 0,0,0
	[0x3e8bf898, { t:'vec4',  lbl: "????" }], // decent numbers
	[0x408b4faf, { t:'vec4',  lbl: "????" }], // almost zero
	[0x6fd5a495, { t:'vec3',  lbl: "????" }], // 0,0,0
	[0x757f914f, { t:'vec3',  lbl: "????" }], // big numbers
	[0x960ad56a, { t:'vec3',  lbl: "????" }], // big numbers
	[0xdeba7eaa, { t:'vec3',  lbl: "????" }], // 0,0,1
	[0xe2deee0c, { t:'vec3',  lbl: "????" }], // big numbers
	[0x09503195, { t:'vec3',  lbl: "????" }], // decent numbers
	[0x53b79aef, { t:'vec3',  lbl: "????" }], // decent numbers
	
	[0x3c963910, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x3c88f63c, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x3eee3ba4, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x4c1c7531, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x44155af8, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x4dbd92bf, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x4f915a70, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x4f16f21e, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x52133f0c, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x7d08d629, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x502ced9d, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x5c398d2e, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x5906f86b, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x547eddfd, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x5d4872a9, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x6970f6be, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x43af9d2a, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x762ad0a6, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x56180912, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x6c61106a, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x77c10bc7, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x756d7e51, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x780252cc, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x5f3ef81b, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x6d1b0866, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x6d212526, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x6cf895ad, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x6e4dc4be, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x6c0d0c18, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x7f8b5a45, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x89c89392, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x7a2672c1, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x4a8874e1, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x8ca235b4, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x9bdee709, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x7fcbee4e, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x8fe0f602, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x971a9cd9, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x9b639ecf, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x42a02959, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x80f5d04c, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x968b0995, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x9ca6acb7, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x9d082041, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x941f0a67, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x97ff41a8, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x9c6f774f, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x95c2d86c, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xa5815a92, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x9e398867, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x921c0e40, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x9eddacb8, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x9f807b7b, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xa4e1d14d, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xa175ccc7, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xae2d0724, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xa812e8cb, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x9ec15f10, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xa058ddd4, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x3ff0b914, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xc26ba0dd, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xb1203c67, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xbb5e5647, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xb4401c7e, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xc823a663, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xc4bcc681, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xe5fb818c, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xb593a258, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xe83b32fa, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xbd037554, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xc356bce1, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xc699cd20, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xc85c3c81, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xc8b58e05, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xcd0d44c6, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xc8e3fe34, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xc9846d3b, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xc91030c2, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xcf34de8d, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xbf7950de, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xd1d20495, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xb27f9801, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x089b69cf, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xef4934e0, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xbe05abfd, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xfd8f2c79, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xd362979d, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xd3661a77, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xef6c50c1, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xef9c85ee, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xfcbc8527, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xcedc627b, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xf5598dc2, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x06c003d3, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xd5489065, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x1cb35f2a, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xf499a38b, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x02a85ddf, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x06ef3a20, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xd78a1778, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x1c20081f, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x05aaa9de, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x1e380063, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x14147b5b, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x0d6fa416, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x06d45a1f, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x0460b29a, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xb26122ce, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x113914c1, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x250a65c2, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x11c6eb58, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x1cfb7e99, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x2779cf25, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xf88e0d45, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x29417c67, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x2411f567, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x2c9e87cb, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x32823af2, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x2ec47150, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x2fe4b82e, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x32d2e894, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x36b57640, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xfafcd94b, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xfb121336, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0xf8c21db6, { t:'array', lbl: "???? [-1. -1] " }], // [-1. -1]
	[0x4cc6c4de, { t:'array', lbl: "???? [1. 1] " }], // [1. 1]
	[0xde68a6b5, { t:'array', lbl: "???? [4. 4] " }], // [4. 4]
	[0x6a245fd8, { t:'array', lbl: "???? [6. 6] " }], // [6. 6]
	[0x5f789675, { t:'array', lbl: "???? [6. 6] " }], // [6. 6]
	[0x4194be97, { t:'array', lbl: "???? [6. 6] " }], // [6. 6]
	
	// [0xe1a508c4, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x5630032d, { t:'array', lbl: "???? arr[3]" }], // arr[3]
	[0xc458f1eb, { t:'array', lbl: "???? arr[4]" }], // arr[4]
	[0x5ead6f00, { t:'array', lbl: "???? arr[3]" }], // arr[3]
	[0x3f31ad53, { t:'array', lbl: "???? arr[7]" }], // arr[7]
	[0xcc535536, { t:'array', lbl: "???? arr[8]" }], // arr[8]
	[0x3eadec36, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x2b38e761, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x23bc3488, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x23f001ff, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x2e525419, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x2ae6283f, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x88043afb, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xc180adf7, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x0607438d, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xacac7495, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xbbf85fd5, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xf4505b59, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x06f4c635, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x61312875, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xddfd5a47, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x1daf6cb4, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x0b1df444, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xffc11580, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x1ccec764, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x02319ac5, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xc0775abf, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x0a529580, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xdcd9f005, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xc0be46bc, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xfee5cd77, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xf8544897, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xf80ed57f, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xfec02192, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xbf41c181, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xb783ce4c, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xd3f678c6, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xe87b2b0b, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xd87ae331, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xec52c09a, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xe40c4d39, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xd426c271, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xfbf44df2, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xcea848b6, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xd7ed8f9d, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xa810bc1b, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xd2ddb868, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xb7176706, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xaf9f1f49, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xaabf3198, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xafe462c3, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x5dd10d95, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x73c83bd4, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x7bde80e9, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x7f47145c, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x877f32f3, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x899c0abd, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x40772671, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x7c9d566d, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x8641b84a, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x83ae5e22, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x7aa74837, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x9e10d432, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x452edf9d, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x4a3a814e, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x5f2dfcfa, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x4eb384ce, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x54115fad, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0xc8454f7c, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x682e195f, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x4c368f29, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x0edd22b8, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x54049354, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x114b097d, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x10d564d7, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x48bfcf08, { t:'array', lbl: "???? arr[10]" }], // arr[10]
	[0x8f76b998, { t:'array', lbl: "???? arr[32]" }], // arr[32]
	[0x4cf1ec50, { t:'array', lbl: "???? arr[256]" }], // arr[256]
	[0x8d4bc9a1, { t:'array', lbl: "???? arr[256]" }], // arr[256]
	[0xc64a20e2, { t:'array', lbl: "???? arr[256]" }], // arr[256]
	[0x9152eef8, { t:'array', lbl: "???? arr[256]" }], // arr[256]
	[0xc83297f2, { t:'array', lbl: "???? arr[256]" }], // arr[256]
	[0x12a65f19, { t:'array', lbl: "???? arr[256]" }], // arr[256]
	[0x129e7387, { t:'array', lbl: "???? arr[256]" }], // arr[256]
	[0x78de635f, { t:'array', lbl: "???? arr[256]" }], // arr[256]
	[0x0e71cf92, { t:'array', lbl: "???? arr[256]" }], // arr[256]
	[0x9c162b17, { t:'array', lbl: "???? arr[256]" }], // arr[256]
	[0x28c71158, { t:'array', lbl: "???? arr[256]" }], // arr[256]
	[0x0744746a, { t:'array', lbl: "???? arr[936]" }], // arr[936]
]);


//#endregion
//-----------------------------------------------------------------------------
//#region Readers

class Reader {
	#idx = 0;
	#sav = [];
	constructor(data) {
		/** @type {Buffer<ArrayBufferLike>} */
		this.data = data;
	}
	get offset() { return this.#idx; }
	set offset(val) { this.#idx = val; }
	skip(num) { this.#idx += num; return this; }
	push(addr) { this.#sav.push(this.#idx); this.#idx = addr; return this; }
	pop() { this.#idx = this.#sav.pop(); return this; }
	readCStr(len = 0x40) {
		let str = this.data.subarray(this.#idx, this.#idx + len).toString('utf8');
		return str.slice(0, str.indexOf('\0'));
	}
}

class ReaderLE extends Reader {
	constructor(data){ super(data); }
	readU8()  { const idx = this.offset; this.offset += 1; return this.data.readUint8(idx); }
	readU16() { const idx = this.offset; this.offset += 2; return this.data.readUint16LE(idx); }
	readU32() { const idx = this.offset; this.offset += 4; return this.data.readUint32LE(idx); }
	readS8()  { const idx = this.offset; this.offset += 1; return this.data.readInt8(idx); }
	readS16() { const idx = this.offset; this.offset += 2; return this.data.readInt16LE(idx); }
	readS32() { const idx = this.offset; this.offset += 4; return this.data.readInt32LE(idx); }
	readFloat() { const idx = this.offset; this.offset += 4; return this.data.readFloatLE(idx); }
	readAny32() {
		const idx = this.offset; this.offset += 4;
		return {
			x: this.data.readUint32LE(idx).toString(16),
			si: this.data.readInt32LE(idx),
			ui: this.data.readUint32LE(idx),
			f: this.data.readFloatLE(idx),
		};
	}
}

class ReaderBE extends Reader {
	constructor(data){ super(data); }
	readU8()  { const idx = this.offset; this.offset += 1; return this.data.readUint8(idx); }
	readU16() { const idx = this.offset; this.offset += 2; return this.data.readUint16BE(idx); }
	readU32() { const idx = this.offset; this.offset += 4; return this.data.readUint32BE(idx); }
	readS8()  { const idx = this.offset; this.offset += 1; return this.data.readInt8(idx); }
	readS16() { const idx = this.offset; this.offset += 2; return this.data.readInt16BE(idx); }
	readS32() { const idx = this.offset; this.offset += 4; return this.data.readInt32BE(idx); }
	readFloat() { const idx = this.offset; this.offset += 4; return this.data.readFloatBE(idx); }
	readAny32() {
		const idx = this.offset; this.offset += 4;
		return {
			x: this.data.readUint32BE(idx).toString(16),
			si: this.data.readInt32BE(idx),
			ui: this.data.readUint32BE(idx),
			f: this.data.readFloatBE(idx),
		};
	}
}

/** @param {Buffer<ArrayBufferLike>} data */
function makeReader(data) {
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
		return KNOWN_VARS_CAPTION;
	})();
	const file = PATH.join(entry.parentPath, entry.name);
	
	try {
		console.log(`Reading ${file}...`);
		let idx = 0;
		const data = makeReader(await FS.readFile(file));
		/** @type {Map<number, {si:number|number[], ui:number|number[], f:number|number[], x:string}>} */
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
			
			// https://zeldamods.org/wiki/Save_Files
			while (data.offset < varStop) {
				const key = data.readU32();
				const val = data.readAny32();
				//*/
				if (key === 0) continue;
				varMap.set(key, val);
				/*/
				// Check if it's already a thing, because apparently arrays show up repeatedly
				if (varMap.has(key)) {
					let prev = varMap.get(key);
					if (!Array.isArray(prev.f)) {
						prev.f = [prev.f];
						prev.si = [prev.si];
						prev.ui = [prev.ui];
					}
					prev.f.push(val.f);
					prev.si.push(val.si);
					prev.ui.push(val.ui);
					prev.x += val.x;
					varMap.set(key, prev);
				} else {
					varMap.set(key, val);
				}
				//*/
			}
			
			log.log(`\nVariable List:`);
			const list = [...varMap.keys()].sort((a, b)=>{
				const aa = KNOWN_VARS.get(a);
				const bb = KNOWN_VARS.get(b);
				if (aa !== undefined && bb === undefined) return -1;
				if (aa === undefined && bb !== undefined) return 1;
				if (aa !== undefined && bb !== undefined) {
					if (aa.lbl.startsWith('??') && !bb.lbl.startsWith('??')) return 1;
					if (!aa.lbl.startsWith('??') && bb.lbl.startsWith('??')) return -1;
					return aa.lbl.localeCompare(bb.lbl);
				}
				return a - b;
			});
			for (const key of list) {
				const val = varMap.get(key);
				const desc = KNOWN_VARS.get(key);
				if (desc !== undefined && desc.t !== undefined) {
					let out = `Var 0x${('00000000'+key.toString(16)).slice(-8)} = [${desc.lbl}] 0x${val.x} | `;
					switch (desc.t) {
						case 'bool': out += (val.ui)? 'true' : 'false'; break;
						case 'uint': out += `${val.ui} | ${val.si}`; break;
						case 'float': out += `${val.f}`; break;
						case 'cstr': {
							data.push(val.ui);
							out += `"${data.readCStr()}"`;
							data.pop();
						} break;
						case 'img': {
							data.push(val.ui);
							out += `[${data.data.readUInt32LE(val.ui)} bytes]`;
							data.pop();
						} break;
						case 'vec2': {
							data.push(val.ui);
							out += `(${data.readFloat()}, ${data.readFloat()})`;
							data.pop();
						} break;
						case 'vec3': {
							data.push(val.ui);
							out += `(${data.readFloat()}, ${data.readFloat()}, ${data.readFloat()})`;
							data.pop();
						} break;
						case 'vec4': {
							data.push(val.ui);
							out += `(${data.readFloat()}, ${data.readFloat()}, ${data.readFloat()}), ${data.readFloat()})`;
							data.pop();
						} break;
						case 'array': {
							data.push(val.ui);
							let n = data.readS32();
							out += `[`;
							try {
								do {
									out += `${data.readS32()}`;
									n--;
									if (n == 0) break;
									out += `, `;
								} while (n > 0);
							} catch (err) {
								if (err instanceof RangeError) {
									out += "FILE OVERRUN";
									break;
								}
								throw err;
							}
							out += `]`;
							data.pop();
						} break;
					}
					log.log(out);
				} else {
					log.log(`Var 0x${('00000000'+key.toString(16)).slice(-8)} = [${desc?.lbl ?? "????"}]  0x${val.x} | ${val.si} | ${val.ui} | ${val.f} `);
					if (val.ui >= varStop && val.ui < data.data.byteLength) {
						// This might be a pointer into the data table at the end
						const str = data.data.subarray(val.ui, val.ui + 0x40);
						log.log(`--> Could be a pointer to: [${str.toString('hex')}]`);
						log.log(`--> Could be a pointer to: [${str.readFloatLE(0)}, ${str.readFloatLE(4)}, ${str.readFloatLE(8)}, ${str.readFloatLE(12)}, ${str.readFloatLE(16)}, ${str.readFloatLE(20)}, ${str.readFloatLE(24)}, ${str.readFloatLE(28)}]`);
						log.log(`--> Could be a pointer to: [${str.readInt32LE(0)}, ${str.readInt32LE(4)}, ${str.readInt32LE(8)}, ${str.readInt32LE(12)}, ${str.readInt32LE(16)}, ${str.readInt32LE(20)}, ${str.readInt32LE(24)}, ${str.readInt32LE(28)}]`);
						log.log(`--> Could be a pointer to: [${str.toString('utf8')}]`);
					}
				}
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
