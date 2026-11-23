# Ocarina of Time Remake Save Tree
This is a branching timeline of save files for the Ocarina of Time Remake. If you're ever in need of a save at a specific point in the game, this repo has got you covered.
- For main game progression as Nintended™, see [the main graph](saves/main/README.md).
- For any% saves, see [any%](saves/any-percent/README.md).

To use these saves, find where your game's saves are being kept. The folder structure should look something like this:
```
- account.sav
- option.sav
- slot_00/ (every slot has the following:)
   - caption.sav (37.4kb)
   - progress.sav (117kb-137kb)
- slot_01/
- slot_02/
- slot_03/
- slot_04/
- slot_05/
```

In order to use a save, choose one of the slots and replace the `caption.sav` and `progress.sav` files inside it. Your imported slot will be the last in the load list in-game, since the game sorts the list by date.

The `caption.sav` file is what the game reads to display in the load file list. It contains display info for the save and the thumbnail displayed. (For more in depth info, see [the docs](docs/SaveFormat.md).)

The `progress.sav` file is the actual save data to be loaded.

Note: this repo has a few saves that are from the middle of the collapse sequence. These are the game's internal temporary saves it makes automatically as you descend the tower, so if you die during the sequence, you don't have to start over from before Gannondorf. These saves don't have a caption file because the temporary saves are never seen by the player. They haven't been tested (yet) to see if they'll load up mid-collapse.

