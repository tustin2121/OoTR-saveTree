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
| XXXX | | Start of the data table (used by pointers) |

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
| key | description |
|---|---|
| 0xF9D63FD4 | 1 = Learned Prelude of Light |
| 0x574AEF59 | 1 = Learned Nocturne of Shadow |
| 0xAB6B5962 | 1 = Learned Song of Storms |
| 0x99B50B91 | 1 = Learned Minuet of Forest |
| 0x1EDA08D5 | 0 = ??? |
| 0x2F793671 | 0 = ??? |
| 0x50C6BEDF | 1 = Have Goron Ruby |
| 0xE1CA50C6 | 1 = Have Water Medallion |
| 0x17464EB8 | 1 = Learned Bolaro of Fire |
| 0x380A5616 | 1 = Learned Song of Time |
| 0x7C5B03DC | 1 = Talked to Keapora Geabora? |
| 0x91288ADC | 1 = Learned Epona's Song |
| 0x85F5194D | 1 = Learned Serenade of Water |
| 0x83254520 | 1 = Learned Requium of Spirit |
| 0x10DC0608 | 1 = Have Fire Medallion |
| 0x059CE596 | 1 = Have Light Medallion |
| 0xBA6A1B74 | 1 = Have Spirit Medallion |
| 0x25F03CAA | 0 = Manual Save, 1 = Auto Save |
| 0xFB112756 | 1 = Have Kokiri Emerald |
| 0x2F61AB71 | 1 = Have Zora Sapphire |
| 0x75BD1ECF | 1 = Have Forest Medallion |
| 0x89AE7032 | 1 = Have Shadow Medallion |
| 0x238AE327 | 1 = Learned Zelda's Lullaby |
| 0xC72044FC | 1 = Finished Main Game |
| 0x0F941212 | 1 = Learned Saria's Song |
| 0xFB2B5F6B | 01 00 00 00 |
| 0xE8BD6759 | Double Defense |
| 0xDC941483 | Gold Skultula Count |
| 0xDFD840D3 | File saved time: Month |
| 0x5EE50BED | File saved time: Seconds |
| 0x19F26B6A | Curr Magic |
| 0x27853BF7 | File saved time: minute |
| 0xBD46F485 | File saved time: day |
| 0x943F8EC3 | Max Magic |
| 0x23F3D75E | File saved time: Hour |
| 0xA9557547 | Rupee Count |
| 0x74BD05D0 | Max Hearts |
| 0x1E55ECC5 | Curr Hearts |
| 0x9811A3F7 | File saved time: Year|
| 0xACCBDA17 | C1 0B 2F C3 Some sort of counter? |
| 0x8B26618E | Pointer to float[3], Link's position |
| 0xF74E0E8E | Pointer to char[0x40], Map name |
| 0x0CCCC6CD | Pointer to char[0x40], Map path |
| 0x47C0901E | 2C 03 00 00 |
| 0x63696A32 | Pointer to JFIF, Thumbnail |
| 0x51C58419 | 00 00 00 00 |
| Not always present? 0x26F3523B| 20 00 00 00 |



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

