# Save Format
Format is little-endian.

### caption.sav
| offset | format | description |
|---|---|---|
| 0000 | 04 03 02 01 | Magic number? |
| 0004 | EB 80 | |
| 0006 | 2D 00 | |
| 0008 | A0 02 | |
| 000A | (Length 0x1F) | All 0s |
| 0028 | D4 3F D6 F9 | 0xF9D63FD4 |
| 002C | int32 | 1 = ??? |
| 0030 | 59 EF 4A 57 | 0x574AEF59 |
| 0034 | int32 | 1 = ??? |
| 0038 | 62 59 6B AB | 0xAB6B5962 |
| 003C | int32 | 1 = ??? |
| 0040 | 91 0B B5 99 | 0x99B50B91 |
| 0044 | int32 | 1 = ??? |
| 0048 | D5 08 DA 1E | 0x1EDA08D5 |
| 004C | int32 | 0 = ??? |
| 0050 | 71 36 79 2F | 0x2F793671 |
| 0054 | int32 | 0 = ??? |
| 0058 | DF BE C6 50 | 0x50C6BEDF |
| 005C | int32 | 1 = Have Goron Ruby |
| 0060 | C6 50 CA E1 | 0xE1CA50C6 |
| 0064 | int32 | 1 = Have Water Medallion |
| 0068 | B8 4E 46 17 | 0x17464EB8 |
| 006C | int32 | 1 = ??? |
| 0070 | 16 56 0A 38 | 0x380A5616 |
| 0074 | int32 | 1 = ??? |
| 0078 | DC 03 5B 7C | 0x7C5B03DC |
| 007C | int32 | 1 = ??? |
| 0080 | DC 8A 28 91 | 0x91288ADC |
| 0084 | int32 | 1 = ??? |
| 0088 | 4D 19 F5 85 | 0x85F5194D |
| 008C | int32 | 1 = ??? |
| 0090 | 20 45 25 83 | 0x83254520 |
| 0094 | int32 | 1 = ??? |
| 0098 | 08 06 DC 10 | 0x10DC0608 |
| 009C | int32 | 1 = Have Fire Medallion |
| 00A0 | 96 E5 9C 05 | 0x059CE596 |
| 00A4 | int32 | 1 = Have Light Medallion |
| 00A8 | 74 1B 6A BA | 0xBA6A1B74 |
| 00AC | int32 | 1 = Have Spirit Medallion |
| 00B0 | AA 3C F0 25 | Auto Save Marker |
| 00B4 | int32 | 0 = Manual Save, 1 = Auto Save |
| 00B8 | 56 27 11 FB | 0xFB112756 |
| 00BC | int32 | 1 = Have Kokiri Emerald |
| 00C0 | 71 AB 61 2F | 0x2F61AB71 |
| 00C4 | int32 | 1 = Have Zora Sapphire |
| 00C8 | CF 1E BD 75 | 0x75BD1ECF |
| 00CC | int32 | 1 = Have Forest Medallion |
| 00D0 | 32 70 AE 89 | 0x89AE7032 |
| 00D4 | int32 | 1 = Have Shadow Medallion |
| 00D8 | 27 E3 8A 23 | 0x238AE327 |
| 00DC | int32 | 01 00 00 00 |
| 00E0 | FC 44 20 C7 | 0x |
| 00E4 | int32 | 00 00 00 00 |
| 00E8 | 12 12 94 0F | 0x |
| 00EC | int32 | 01 00 00 00 |
| 00F0 | 6B 5F 2B FB | 0x |
| 00F4 | int32 | 01 00 00 00 |
| 00F8 | 59 67 BD E8 | 0xE8BD6759 |
| 00FC | int32 | Double Defense |
| 0100 | 00 00 00 00 | 0x |
| 0104 | int32 | 01 00 00 00 |
| 0108 | 00 00 00 00 | 0x |
| 010C | int32 | 02 00 00 00 |
| 0110 | 83 14 94 DC | 0xDC941483 |
| 0114 | int32 | 16 00 00 00 |
| 0118 | D3 40 D8 DF | 0xDFD840D3 |
| 011C | int32 | File saved time: Month |
| 0120 | ED 0B E5 5E | 0x5EE50BED |
| 0124 | int32 | File saved time: Seconds |
| 0128 | 6A 6B F2 19 | 0x19F26B6A |
| 012C | int32 | Curr Magic |
| 0130 | F7 3B 85 27 | 0x27853BF7 |
| 0134 | int32 | File saved time: minute |
| 0138 | 85 F4 46 BD | 0xBD46F485 |
| 013C | int32 | File saved time: day |
| 0140 | C3 8E 3F 94 | 0x943F8EC3 |
| 0144 | int32 | Max Magic |
| 0148 | 5E D7 F3 23 | 0x23F3D75E  |
| 014C | int32 | File saved time: Hour |
| 0150 | 47 75 55 A9 | 0xA9557547 |
| 0154 | int32 | FE 00 00 00 (Possibly playtime?) |
| 0158 | D0 05 BD 74 | 0x74BD05D0 |
| 015C | int32 | Max Hearts |
| 0160 | C5 EC 55 1E | 0x1E55ECC5 |
| 0164 | int32 | Curr Hearts |
| 0168 | F7 A3 11 98 | 0x9811A3F7 |
| 016C | int32 | File saved time: Year|
| 0170 | 00 00 00 00 | |
| 0174 | int32 | 03 00 00 00 |
| 0178 | 00 00 00 00 | |
| 017C | int32 | 04 00 00 00 |
| 0180 | 17 DA CB AC | Some sort of counter? 0xACCBDA17 |
| 0184 | int32 | C1 0B 2F C3 |
| 0188 | 00 00 00 00 | |
| 018C | int32 | 05 00 00 00 |
| 0190 | 00 00 00 00 | |
| 0194 | int32 | 06 00 00 00 |
| 0198 | 00 00 00 00 | |
| 019C | int32 | 07 00 00 00 |
| 01A0 | 00 00 00 00 | |
| 01A4 | int32 | 08 00 00 00 |
| 01A8 | 00 00 00 00 | |
| 01AC | int32 | 09 00 00 00 |
| 01B0 | 00 00 00 00 | Not always present? 0x8B26618E |
| 01B4 | int32 | 0A 00 00 00 |
| 01B8 | 8E 61 26 8B | |
| 01BC | int32 | A0 02 00 00 |
| 01C0 | 00 00 00 00 | |
| 01C4 | int32 | 0B 00 00 00 |
| 01C8 | 00 00 00 00 | |
| 01CC | int32 | 0C 00 00 00 |
| 01D0 | 00 00 00 00 | |
| 01D4 | int32 | 0D 00 00 00 |
| 01D8 | 00 00 00 00 | |
| 01DC | int32 | 0E 00 00 00 |
| 01E0 | 00 00 00 00 | |
| 01E4 | int32 | 0F 00 00 00 |
| 01E8 | 00 00 00 00 | |
| 01EC | int32 | 10 00 00 00 |
| 01F0 | 8E 0E 4E F7 | 0xF74E0E8E |
| 01F4 | int32 | AC 02 00 00 |
| 01F8 | CD C6 CC 0C | 0x0CCCC6CD |
| 01FC | int32 | EC 02 00 00 |
| 0200 | 00 00 00 00 | |
| 0204 | int32 | 11 00 00 00 |
| 0208 | 1E 90 C0 47 | 0x47C0901E |
| 020C | int32 | 2C 03 00 00 |
| 0210 | 00 00 00 00 | |
| 0214 | int32 | 12 00 00 00 |
| 0218 | 32 6A 69 63 | 0x63696A32 |
| 021C | int32 | 70 05 00 00 |
| 0220 | 00 00 00 00 | |
| 0224 | int32 | 13 00 00 00 |
| 0228 | 00 00 00 00 | |
| 022C | int32 | 14 00 00 00 |
| 0230 | 19 84 C5 51 | 0x51C58419 |
| 0234 | int32 | 00 00 00 00 |
| 0238 | 00 00 00 00 | |
| 023C | int32 | 15 00 00 00 |
| 0240 | 00 00 00 00 | |
| 0244 | int32 | 16 00 00 00 |
| 0248 | 00 00 00 00 | |
| 024C | int32 | 17 00 00 00 |
| 0250 | 00 00 00 00 | |
| 0254 | int32 | 18 00 00 00 |
| 0258 | 00 00 00 00 | |
| 025C | int32 | 19 00 00 00 |
| 0260 | 00 00 00 00 | |
| 0264 | int32 | 1A 00 00 00 |
| 0268 | 00 00 00 00 | |
| 026C | int32 | 1B 00 00 00 |
| 0270 | 00 00 00 00 | |
| 0274 | int32 | 1C 00 00 00 |
| 0278 | 00 00 00 00 | |
| 027C | int32 | 1D 00 00 00 |
| 0280 | 00 00 00 00 | |
| 0284 | int32 | 1E 00 00 00 |
| 0288 | 00 00 00 00 | |
| 028C | int32 | 1F 00 00 00 |
| 0290 | 00 00 00 00 | Not always present? 0x26F3523B|
| 0294 | int32 | 20 00 00 00 |
| 0298 | 3B 52 F3 26 | |
| 029C | int32 | 00 00 00 00 |
| 02A0 | 50 B9 43 42 | 12DA9640, 0293A840, DFDBFBC2 |
| 02A4 | 00 80 C8 42 | D391FF42, 18A8FD42, F86ABC42 |
| 02A8 | 21 38 86 C2 | 23097DC3, 0AAB6DC3, 6CA22841 |
| 02AC | char[0x40] | Name of map? (null terminated) |
| 02EC | char[0x40] | Name of map file? (null terminated) |
| 032C | int32 | 9 = ??? |
| 0330 | (length 0x244) | padding? Mostly 0s |
| 0570 | F0 85 00 00 | Length of Thumbnail Data|
| 0574 | JFIF Image | Thumbnail Data |



### progress.sav
| offset | format | description |
|---|---|---|





