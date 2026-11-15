# Save Tree Graph
Click on a node below to go to its save files folder.

```mermaid
flowchart TD
	classDef todo stroke-dasharray: 5 5, shape: braces
	
	000000{Game Start} --> 000100
	click 000000 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/000000_GameStart"
	
	subgraph ChildKokiri_01 [Kokiri Forest]
		000100[Talked to Saria] --> 000210 
		click 000100 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/000100_PostSaria"
		
		000210[Bought Deku Shield] --> 000220
		click 000210 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/000210_DekuShield"
		
		000220[Got Sword] --> 000250
		click 000220 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/000220_KokiriSword"
		
		000250[Passed Mido] -- Deku Tree's Task --> 000300
		click 000250 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/000250_PastMido"
		
		000300[Before Deku Tree] --> 000310
		click 000300 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/000300_BeforeDeku"
		
		subgraph DekuTree_01 [Deku Tree]
			000310[Inside Deku Tree] --> 000400
			click 000310 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/000310_InsideDeku"
			
			000400[Before Ghoma] --> 000450
			click 000400 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/000400_BeforeGhoma"
			
			000450[After Ghoma] 
			click 000450 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/000450_AfterGhoma"
		end
		
		000500[Deku Tree Died] --> 000510
		000450 -- Deku Tree Dies --> 000500
		click 000500 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/000500_DekuDead"
		
		000510[After Mido runs off] --> 000520
		click 000510 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/000510_PostMido"
		
		000520[Before Saria's Cutscene]
		click 000510 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/000520_PreSaria"
	end
	
	001100[Hyrule Field Pre-Owl] -- Kaepora Gaebora --> 001110
	000520 --> 001100
	click 000520 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/001100_HFPreOwl"
	
	001110[Hyrule Field Post-Owl] --> 001150
	click 001110 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/001110_HFPostOwl"
	
	001150{Hyrule Field} --> 002000
	click 001150 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/001150_HyruleField"
	
	subgraph CastleTown_01 [Hyrule Castle Town]
		002000[Entering Hyrule Castle Town] --> 002100
		click 002000 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/002000_CastleTown"
		
		subgraph Castle_01 [Hyrule Castle]
			002100[Entering the Castle Grounds] --> 002110
			click 002100 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/002100_CastleEnter"
			
			002110[After Waking Talon] --> 002200
			click 002110 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/002110_TalonWoken"
			
			002200[Before Meeting Zelda] -- Meeting Zelda --> 002210
			click 002200 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/002200_BeforeZelda"
			
			002210[After Meeting Zelda] --> 002220
			click 002210 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/002210_AfterZelda"
			
			002220[After Learning Zelda's Lullaby]
			click 002220 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/002220_ZLLearned"
		end
	end
	
	003000(Start of the Spiritual Stone Quest) --> 003100
	002220 --> 003000
	click 003000 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003000_StoneQuest"
	
	subgraph Kakariko_01 [Kakariko Village]
		003100[Kakariko Village] --> 003110
		click 003100 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003100_KakarikoEnter"
		
		003110[Starting Cuckoo Quest] --> 003112
		click 003110 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003110_CuckooQuest1"
		
		003112[Cuckoo Quest Bottle] --> 003120
		click 003112 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003112_CuckooQuest2"
		
		003120["Guard Opened Gate (skipped Happy Mask Dialog)"] --> 003130
		003100 -.-> 003120
		click 003120 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003120_AfterGuard"
		
		003130["Graveyard Shield"]
		003120 -.-> 003130
		click 003130 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003130_GraveyardShield"
	end
	
	subgraph LonLon_01 [Lon Lon Ranch]
		003900[Lon Lon Ranch]
		class 003900 todo;
	%%	click 003900 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/001150_HyruleField"
	end
	003000 -.-> 003900
	
	subgraph DeathMountain_01 [Death Mountain]
		003200["Enter Death Mountain Trail"] --> 003300
		003130 --> 003200
		003120 -.-> 003200
		click 003200 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003200_DMTEnter"
		
		subgraph GoronCity_01 [Goron City]
			003300["Enter Goron City"] -- Darunia's Crash Out --> 003310
			click 003300 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003300_GCEnter"
			
			003310["After Darunia"]
			click 003310 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003310_Darunia"
		end
	end
	003310 --> 003320
	
	subgraph LostWoods_01 [Lost Woods]
		003320["Enter Sacred Grove"] --> 003330
		click 003320 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003320_SFMEnter"
		
		003330["Before Saria's Song"] --> 003331
		click 003330 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003330_BeforeSong"
		
		003331["After Saria's Song"]
		click 003331 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003331_AfterSong"
	end
	003331 --> 003400
	003310 -.-> 003400
	
	subgraph DeathMountain_01 [Death Mountain]
		subgraph GoronCity_01 [Goron City]
			003400["Return to Goron City"] -- Darunia's Dance --> 003410
			click 003400 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003400_GCEnter"
			
			003410["Goron Bracelet Get"]
			click 003400 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/003410_PostDance"
		end
		
		004000["DC Opened"] --> 004100
		003410 --> 004000
		click 004000 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/004000_DCOpened"
		
		subgraph Dodongos_01 [Dodongo Cavern]
			004100["Dodongo Cavern Start"] --> 004110
			click 004100 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/004100_DCStart"
			
			004110["Get Bomb Bag"] --> 004120
			click 004110 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/004110_DCBombBag"
			
			004120["Before King Dodongo"] --> 004130
			click 004120 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/004120_DCBeforeBoss"
			
			004130["After King Dodongo"]
			click 004130 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/004130_DCAfterBoss"
		end
		004130 -- Darunia's Apology --> 004150
		
		004150["Spiritual Stone of Fire"]
		click 004150 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/004150_FireStone"
	end
	004150 -- "(Ignoring House of Skultula)" --> 005000
	
	subgraph ZorasRiver_01 [Zora's River]
		A05000[Enter Zora's River]
		class A05000 todo;
	end
	004110 -.-> A05000
	
	subgraph DeathMountain_02 [Death Mountain]
		subgraph Dodongos_02 [Dodongo Cavern]
			A04120["Before King Dodongo"] --> A04130
			class A04120 todo;
		%%	click A04120 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/A04120_DCBeforeBoss"
			
			A04130["After King Dodongo"]
			class A04130 todo;
		%%	click A04130 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/A04130_DCAfterBoss"
		end
		A04130 -- Darunia's Apology --> A04150
		
		A04150["Spiritual Stone of Fire"]
		class A04150 todo;
		%%click A04150 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/A04150_FireStone"
	end
	ZorasRiver_01 --> A04120
	
	subgraph ZorasRiver_02 [Zora's River]
		005000[Enter Zora's River] --> 005100
		click 005000 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/005000_ZoraRiverStart"
		
		005100[Enter Zora's Domain] --> 005110
		click 005100 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/005100_ZDEnter"
		
		005110[Silver Scale] --> 005120
		click 005110 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/005110_SilverScale"
	end
	
	subgraph LakeHylia_02 [Lake Hylia]
		005120[Lake Hylia Enter] --> 005130
		click 005120 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/005120_LHEnter"
	end
	
	subgraph ZorasRiver_02 [Zora's River]
		005130[Before King Zora] -- Mweep Mweep --> 005140
		click 005130 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/005130_BeforeKing"
		
		005140[Enter Zora's Fountain]
		click 005140 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/005140_AfterKing"
	end
	
	
	
	
	
	
	
	
	004150 -- "(Forgot Magic)" --> M05000
	subgraph ZorasRiver_02NoMagic ["Zora's River (Forgot Magic)"]
		M05000[Enter Zora's River] --> M05100
		click M05000 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/M05000_ZoraRiverStart"
		
		M05100[Enter Zora's Domain] --> M05110
		click M05100 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/M05100_ZDEnter"
		
		M05110[Silver Scale] --> M05120
		click M05110 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/M05110_SilverScale"
	
		subgraph LakeHylia_02NoMagic [Lake Hylia]
			M05120[Lake Hylia Enter] --> M05130
			click M05120 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/M05120_LHEnter"
		end
	
		M05130[Before King Zora] -- Mweep Mweep --> M05140
		click M05130 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/M05130_BeforeKing"
		
		M05140[Enter Zora's Fountain] -- "Oh, forgot magic" --> M05160
		click M05140 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/M05140_AfterKing"
		
		M05160[After Getting Din's Fire] --> M05170
		click M05160 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/M05160_DMCOops"
		
		M05170["Before Getting Spin Attack (Malon at Castle)"] --> M05180
		click M05170 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/M05170_CastleOops"
		
		M05180["After Getting Spin Attack (No Impa)"]
		click M05180 href "https://github.com/tustin2121/OoTR-saveTree/blob/main/saves/M05180_CastleOops"
	end
	
```
