# Ocarina of Time Remake Save Tree
For the purposes of flag research, I'm going to start making a save tree (eg, a branching timeline of saves, not unlike what you'd see in Papers Please), so someone can import a save from any part of the game and test from there.

It looks like the game saves are as such:
```
- slot_00 (every slot has the following:)
   - caption.sav (37.4kb)
   - progress.sav (117kb)
- slot_01
- slot_02
- slot_03
- slot_04
- slot_05
- account.sav
- option.sav
```
So every save slot only has two file needed for a save slot, so this project will only keep those two files per save. Repo Link: [to come]

Incidentally, if anyone has graphing software in mind to help visualize the save tree in the repo, please feel free to suggest. The preview image is a mermaid mockup. I personally like Obsidian's canvases, but I don't know if they can be displayed easily on github.