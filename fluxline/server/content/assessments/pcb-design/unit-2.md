Covers Lessons 2.1–2.3: how PCBs are made, schematic capture with symbols and footprints, and component placement.

```quiz
? How thick is 0.5 oz copper, in µm?
= 17.5 | 0.001 | µm
> Half of 35 µm.
```

```quiz
? A 2.0 mm board's fabricator allows a 10:1 aspect ratio. What is the smallest drill, in mm?
= 0.2 | 0.001 | mm
> $2.0/10$.
```

```quiz
? A QFN-64 has 16 pins per side at 0.5 mm pitch. What is the center-to-center distance from the first to the last pin on one side, in mm?
= 7.5 | 0.001 | mm
> $15 \times 0.5$.
```

```quiz
? Which surface finish is best suited to fine-pitch parts and BGAs?
+ ENIG, because it is flat and durable
- HASL, because it is thick
- bare copper
- silkscreen
> HASL leaves uneven solder on pads.
```

```quiz
? A laser-drilled via that connects only adjacent layers is a:
+ microvia
- buried through-hole via
- thermal relief
- castellated hole
> Microvias are the basis of HDI boards.
```

```quiz
? You find a wrong connection while routing. Where should you fix it?
+ in the schematic, then update the PCB from it
- by editing the copper in the PCB only
- in the Gerber files
- in the BOM
> The schematic is the source of truth.
```

```quiz
? A board's MCU works on the bench but resets randomly in the product. Its 100 nF decoupling capacitors were placed 3 cm away. What is the most likely improvement?
+ place each decoupling capacitor right at its power pin with a short loop to ground
- use larger resistors on the I/O pins
- move the crystal near the board edge
- remove the ground plane
> Decoupling only works with a small loop.
```

```quiz
? What should be placed first on a new layout?
+ connectors, mounting holes and parts fixed by the enclosure
- pull-up resistors
- test points
- silkscreen logos
> Mechanical constraints come first.
```
