# Save Format
Format is little-endian.

### Shared
| offset | format | description |
|---|---|---|
| 0000 | 04 03 02 01 | Magic number / Endian Marker |
| 0004 | EB 80 2D 00 | Some sort of save ID number? |
| 0008 | A0 02 00 00 | Index where Variable Map ends |
| 000C | 00 00 00 00 | Header?  |
| 0010 | 00 00 00 00 | Header?  |
| 0014 | 00 00 00 00 | Header?  |
| 0018 | 00 00 00 00 | Header?  |
| 001C | 00 00 00 00 | Header?  |
| 0020 | 00 00 00 00 | Header?  |
| 0024 | 00 00 00 00 | Header?  |
| 0028 | | Start of the Variable Map |

The variable map is a list U32 -> S32 key-value pairs.
This map is unordered, and the keys seem random and opaque.

### caption.sav
| offset | format | description |
|---|---|---|
| 0000 | Header | Header, see above |
| 0028 | | Start of the Variable Map |
| 02A0 | 50 B9 43 42 | 12DA9640, 0293A840, DFDBFBC2 |
| 02A4 | 00 80 C8 42 | D391FF42, 18A8FD42, F86ABC42 |
| 02A8 | 21 38 86 C2 | 23097DC3, 0AAB6DC3, 6CA22841 |
| 02AC | char[0x40] | Name of map? (null terminated) |
| 02EC | char[0x40] | Name of map file? (null terminated) |
| 032C | int32 | 9 = ??? |
| 0330 | (length 0x244) | padding? Mostly 0s |
| 0570 | F0 85 00 00 | Length of Thumbnail Data|
| 0574 | JFIF Image | Thumbnail Data |


Known variables in map:
| key hex LE | key | description |
|---|---|---|
| D4 3F D6 F9 | 0xF9D63FD4 | 1 = Learned Prelude of Light |
| 59 EF 4A 57 | 0x574AEF59 | 1 = Learned Nocturne of Shadow |
| 62 59 6B AB | 0xAB6B5962 | 1 = Learned Song of Storms |
| 91 0B B5 99 | 0x99B50B91 | 1 = Learned Minuet of Forest |
| D5 08 DA 1E | 0x1EDA08D5 | 0 = ??? |
| 71 36 79 2F | 0x2F793671 | 0 = ??? |
| DF BE C6 50 | 0x50C6BEDF | 1 = Have Goron Ruby |
| C6 50 CA E1 | 0xE1CA50C6 | 1 = Have Water Medallion |
| B8 4E 46 17 | 0x17464EB8 | 1 = Learned Bolaro of Fire |
| 16 56 0A 38 | 0x380A5616 | 1 = Learned Song of Time |
| DC 03 5B 7C | 0x7C5B03DC | 1 = Talked to Keapora Geabora? |
| DC 8A 28 91 | 0x91288ADC | 1 = Learned Epona's Song |
| 4D 19 F5 85 | 0x85F5194D | 1 = Learned Serenade of Water |
| 20 45 25 83 | 0x83254520 | 1 = Learned Requium of Spirit |
| 08 06 DC 10 | 0x10DC0608 | 1 = Have Fire Medallion |
| 96 E5 9C 05 | 0x059CE596 | 1 = Have Light Medallion |
| 74 1B 6A BA | 0xBA6A1B74 | 1 = Have Spirit Medallion |
| AA 3C F0 25 | 0x25F03CAA | 0 = Manual Save, 1 = Auto Save |
| 56 27 11 FB | 0xFB112756 | 1 = Have Kokiri Emerald |
| 71 AB 61 2F | 0x2F61AB71 | 1 = Have Zora Sapphire |
| CF 1E BD 75 | 0x75BD1ECF | 1 = Have Forest Medallion |
| 32 70 AE 89 | 0x89AE7032 | 1 = Have Shadow Medallion |
| 27 E3 8A 23 | 0x238AE327 | 1 = Learned Zelda's Lullaby |
| FC 44 20 C7 | 0xC72044FC | 1 = Finished Main Game |
| 12 12 94 0F | 0x0F941212 | 1 = Learned Saria's Song |
| 6B 5F 2B FB | 0xFB2B5F6B | 01 00 00 00 |
| 59 67 BD E8 | 0xE8BD6759 | Double Defense |
| 00 00 00 00 | 0x | 01 00 00 00 |
| 00 00 00 00 | 0x | 02 00 00 00 |
| 83 14 94 DC | 0xDC941483 | Gold Skultula Count |
| D3 40 D8 DF | 0xDFD840D3 | File saved time: Month |
| ED 0B E5 5E | 0x5EE50BED | File saved time: Seconds |
| 6A 6B F2 19 | 0x19F26B6A | Curr Magic |
| F7 3B 85 27 | 0x27853BF7 | File saved time: minute |
| 85 F4 46 BD | 0xBD46F485 | File saved time: day |
| C3 8E 3F 94 | 0x943F8EC3 | Max Magic |
| 5E D7 F3 23 | 0x23F3D75E | File saved time: Hour |
| 47 75 55 A9 | 0xA9557547 | Rupee Count |
| D0 05 BD 74 | 0x74BD05D0 | Max Hearts |
| C5 EC 55 1E | 0x1E55ECC5 | Curr Hearts |
| F7 A3 11 98 | 0x9811A3F7 | File saved time: Year|
| 00 00 00 00 | | 03 00 00 00 |
| 00 00 00 00 | | 04 00 00 00 |
| 17 DA CB AC | 0xACCBDA17 | C1 0B 2F C3 Some sort of counter? |
| 00 00 00 00 | | 05 00 00 00 |
| 00 00 00 00 | | 06 00 00 00 |
| 00 00 00 00 | | 07 00 00 00 |
| 00 00 00 00 | | 08 00 00 00 |
| 00 00 00 00 | | 09 00 00 00 |
| 00 00 00 00 | 0x8B26618E | 0A 00 00 00 Not always present? |
| 8E 61 26 8B | | A0 02 00 00 |
| 00 00 00 00 | | 0B 00 00 00 |
| 00 00 00 00 | | 0C 00 00 00 |
| 00 00 00 00 | | 0D 00 00 00 |
| 00 00 00 00 | | 0E 00 00 00 |
| 00 00 00 00 | | 0F 00 00 00 |
| 00 00 00 00 | | 10 00 00 00 |
| 8E 0E 4E F7 | 0xF74E0E8E | AC 02 00 00 |
| CD C6 CC 0C | 0x0CCCC6CD | EC 02 00 00 |
| 00 00 00 00 | | 11 00 00 00 |
| 1E 90 C0 47 | 0x47C0901E | 2C 03 00 00 |
| 00 00 00 00 | | 12 00 00 00 |
| 32 6A 69 63 | 0x63696A32 | 70 05 00 00 |
| 00 00 00 00 | | 13 00 00 00 |
| 00 00 00 00 | | 14 00 00 00 |
| 19 84 C5 51 | 0x51C58419 | 00 00 00 00 |
| 00 00 00 00 | | 15 00 00 00 |
| 00 00 00 00 | | 16 00 00 00 |
| 00 00 00 00 | | 17 00 00 00 |
| 00 00 00 00 | | 18 00 00 00 |
| 00 00 00 00 | | 19 00 00 00 |
| 00 00 00 00 | | 1A 00 00 00 |
| 00 00 00 00 | | 1B 00 00 00 |
| 00 00 00 00 | | 1C 00 00 00 |
| 00 00 00 00 | | 1D 00 00 00 |
| 00 00 00 00 | | 1E 00 00 00 |
| 00 00 00 00 | | 1F 00 00 00 |
| 00 00 00 00 | Not always present? 0x26F3523B| 20 00 00 00 |
| 3B 52 F3 26 | | 00 00 00 00 |





### progress.sav
| offset | format | description |
|---|---|---|
| 000000 | Header | Header, see above |
| 000028 | | Start of the Variable Map |
| 015360 | 07 00 00 00 | 00 00 00 00 |
|| 0A 00 00 00 | 4F 00 00 00 |
|| 05 00 00 00 | 00 00 00 00 |
|| 0A 00 00 00 | 00 00 00 00 |
|| 06 00 00 00 | 00 00 00 00 |
|| 0A 00 00 00 | B0 03 00 00 |
|| 00 01 00 00 | 00 00 00 00 |
||| Lots of 0s |
| 015794 | 02 00 00 00 |  |
| 015798 | ??? | Some sort of bitmap? |
| 01843C | 0A 00 00 00 | Key? |
| 018440 | 09 DE EE B6 | Repeating pattern |
| 018518 | 00 01 00 00 | Key? |
| 01851C | ED C3 25 C5 | Repeating pattern |
| 01891C | 00 01 00 00 | Key? |
| 018920 | ED C3 25 C5 | Repeating pattern |
| 0192E0 | 4C 70 6F 42 | ??? |
| 0192E4 | 50 E3 EA 42 | ??? |
| 0192E8 | E5 BF 89 41 | ??? |
| 0192EC | char[0x60] | Start of String Table |
| 01934C | char[0x40] | Double Defense |
|        | char[0x40] | Wallet |
|        | char[0x40] | Kokiri Sword |
|        | char[0x40] | Mask (Keaton?) |
|        | char[0x40] | Bomb bag |
|        | char[0x40] | Some location? |
|        | char[0x40] | Empty |
|        | char[0x40] | Gauntlet |
|        | char[0x40] | A Map File Path .json |
|        | char[0x40] | Current Map File Name |
|        | char[0x40] | Tunic |
|        | char[0x40] | Another map file name? |
|        | char[0x40] | Quiver |
|        | char[0x40] | Empty |
|        | char[0x40] | Bullet Bag |
|        | char[0x40] | Master Sword |
|        | char[0x40] | Mask child? |
|        | char[0x40] | Stick Bag |
|        | char[0x40] | Nut Bag |
|        | char[0x40] | Current Mission? |
|        | char[0x40] | Deku Shield |
|        | char[0x40] | The same map file name? |
|        | char[0x40] | Hover Boots |
|        | char[0x40] | Mirror Shield |
|        | char[0x40] | empty |
|        | char[0x40] | Ocarina of Time |
|        | char[0x40] | Spirit Medal |
|        | char[0x40] | empty a bunch |
| 019D10 | 0A 00 00 00 | ??? |
|        | char[0x40] | Epona |
| 01A09C | uint32 | Length of next segment |
|        | data | Binary |
| 01EC58 | 00 00 00 00 |  |
| 01EC5C | 0A 00 00 00 | ?? |
| 01FEA4 | Data start | Last variable data |


Known variables in map:
| key hex LE | key | description |
|---|---|---|
| 14 71 DB A3 | A4 FE 01 00 | Last variable in the map, offset of some large block of data |

