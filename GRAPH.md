# Save Tree Graph
Click on a node below to go to its save files folder.

```mermaid
flowchart TD
	000000{Game Start} --> 000100
	click 000000 href "saves/000000_GameStart"
	
	subgraph G01 [Kokiri Forest]
		000100[Talked to Saria]        --> 000210 
		click 000100 href "saves/000100_PostSaria"
		
		000210[Bought Deku Shield]     --> 000220
		click 000100 href "saves/000210_DekuShield"
		
		000220[Got Sword]              --> 000250
		click 000100 href "saves/000220_KokiriSword"
		
		000250[Passed Mido]            -- Deku Tree Cutscene --> 000300
		click 000100 href "saves/000250_PastMido"
		
		000300[Before Deku Tree]       --> 000310
		click 000100 href "saves/000300_BeforeDeku"
		
		000310[Inside Deku Tree]       --> 000400
		click 000100 href "saves/000310_InsideDeku"
		
		000400[Before Ghoma]           --> 000450
		click 000100 href "saves/000400_BeforeGhoma"
		
		000450[After Ghoma]            -- Deku Tree Dies Cutscene --> 000500
		click 000100 href "saves/000450_AfterGhoma"
		
		000500[Deku Tree Died]         --> 000510
		click 000100 href "saves/000500_DekuDead"
		
		000510[After Mido runs off]
		click 000100 href "saves/000510_PostMido"
	end
	G01@{  }
	
	001100[001100 ]
```
