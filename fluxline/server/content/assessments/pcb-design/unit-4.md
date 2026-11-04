Covers Lessons 4.1–4.2: design checks and manufacturing files, and assembly, bring-up and debugging.

```quiz
? A via has a 0.5 mm pad and a 0.25 mm drill. What is its annular ring, in mm?
= 0.125 | 0.001 | mm
> $(0.5 - 0.25)/2$.
```

```quiz
? How many Gerber files does a six-layer board need, with mask, silkscreen and paste on both sides plus an outline?
= 13 | 0.001 |
> 6 copper + 2 mask + 2 silk + 2 paste + 1 outline.
```

```quiz
? During bring-up, a board pulls 0.4 A from a 12 V bench supply. How much power is it dissipating, in W?
= 4.8 | 0.001 | W
> $12 \times 0.4$.
```

```quiz
? DRC passes with zero errors. What can you still not be sure of?
+ that the circuit and footprints are correct
- that traces meet the minimum width
- that copper clears the board edge
- that all nets are routed
> DRC checks geometry, not intent.
```

```quiz
? An assembler's preview shows every SOT-23 rotated 90° from the silkscreen. What is the likely cause?
+ a rotation mismatch between the library's zero orientation and the assembler's
- a wrong drill file
- missing paste layers
- the wrong solder-mask color
> Check and correct rotations in the centroid file.
```

```quiz
? Small chip resistors stand up on one end after reflow. This defect is called:
+ tombstoning
- bridging
- voiding
- wicking
> Usually caused by unbalanced pad heating.
```

```quiz
? Before applying power to a brand-new board, you should:
+ inspect it and measure each rail's resistance to ground
- program the firmware
- run it at the maximum supply voltage
- start emissions testing
> Find shorts first.
```

```quiz
? Which document records the problems found on rev A so they're fixed on rev B?
+ the errata list
- the pick-and-place file
- the Gerber outline
- the stencil drawing
> Tie every issue to the board revision.
```
