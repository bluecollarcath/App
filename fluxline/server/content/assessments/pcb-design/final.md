Covers the whole course: reading schematics and datasheets, PCB fabrication, schematic capture and placement, routing, grounding and decoupling, high-speed design, power and EMC layout, manufacturing files, and bring-up.

```quiz
? An LED with a 1.8 V drop is driven from a 3.3 V GPIO through 150 Ω. What is the LED current, in mA?
= 10 | 0.001 | mA
> $(3.3 - 1.8)/150$.
```

```quiz
? A linear regulator drops 12 V to 3.3 V at 50 mA, with $\theta_{JA} = 150$ °C/W in 25 °C ambient. What is its junction temperature, in °C?
= 90.25 | 0.002 | °C
> $P = 8.7 \times 0.05 = 0.435$ W; $25 + 0.435 \times 150$.
```

```quiz
? A 1.0 mm board's fabricator allows an 8:1 aspect ratio. What is the smallest drill, in mm?
= 0.125 | 0.001 | mm
> $1.0/8$.
```

```quiz
? From IPC-2221, about what width does a 1 A, 1 oz external trace need for a 10 °C rise, in mm?
= 0.3 | 0.02 | mm
> About 12 mil.
```

```quiz
? A 1 mm wide, 80 mm long, 1 oz trace (0.5 mΩ/□) carries 3 A. What voltage does it drop, in V?
= 0.12 | 0.001 | V
> 80 squares = 40 mΩ; $3 \times 0.04$.
```

```quiz
? A 100 nF capacitor with 0.5 nH of mounted inductance self-resonates at what frequency, in MHz?
= 22.5 | 0.005 | MHz
> $1/(2\pi\sqrt{0.5\times10^{-9}\times10^{-7}})$.
```

```quiz
? A 5 V rail may vary 2% with a 0.5 A load step. What is its target impedance, in Ω?
= 0.2 | 0.001 | Ω
> $5 \times 0.02/0.5$.
```

```quiz
? A stripline has $t_{pd} = 6.9$ ps/mm. What is the delay of a 100 mm trace, in ns?
= 0.69 | 0.001 | ns
> $100 \times 6.9$ ps.
```

```quiz
? A driver with 12 Ω output resistance drives a 50 Ω line. What series termination resistor is needed, in Ω?
= 38 | 0.001 | Ω
> $50 - 12$; use 39 Ω.
```

```quiz
? A 100 Ω load terminates a 50 Ω line. What is the reflection coefficient?
= 0.3333 | 0.002 |
> $(100 - 50)/(100 + 50)$.
```

```quiz
? An imperial "0603" chip capacitor has which metric size code?
+ 1608
- 0603
- 0201
- 3216
> 1.6 × 0.8 mm.
```

```quiz
? A 10 µF, 10 V X7R capacitor in 0603 sits on a 5 V rail. What should you check?
+ its DC-bias curve, since the effective capacitance may be far below 10 µF
- nothing; ceramic capacitance is constant
- that it is polarized correctly
- its ESR is high enough to be an electrolytic replacement
> Class II ceramics lose capacitance under DC bias.
```

```quiz
? A symbol's pin 2 is GND, but the footprint's pad 2 is the output of a SOT-23 regulator from a different manufacturer. What will happen?
+ the board will be wired wrong, because symbols and footprints are linked by pin number
- the EDA tool will reroute it automatically
- nothing, because pin names are matched
- the DRC will fix it
> Verify every footprint's pinout against the actual datasheet.
```

```quiz
? Where does a 100 MHz signal's return current flow?
+ in the adjacent reference plane, directly under the trace
- along the shortest straight path between ground pins
- uniformly through the board
- only through the power plane
> The path of least inductance.
```

```quiz
? Most of an EMC test failure is traced to radiation from a USB cable. What layout change helps most?
+ filter the signals at the connector (ferrite beads or a common-mode choke) and keep fast circuits away from it
- make the board thicker
- use a different solder-mask color
- remove the decoupling capacitors
> Common-mode current on cables radiates.
```

```quiz
? What is the last check you should make before ordering boards?
+ open the generated Gerber and drill files in a viewer
- reprint the schematic
- check the BOM prices
- rename the nets
> The Gerbers are exactly what will be built.
```
