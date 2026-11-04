Covers Lessons 3.1–3.4: routing and trace sizing, grounding and decoupling, high-speed signals and controlled impedance, and power, thermal and EMC layout.

```quiz
? From IPC-2221, about what width does a 2 A, 1 oz external trace need for a 10 °C rise, in mm?
= 0.78 | 0.02 | mm
> About 31 mil.
```

```quiz
? A 0.2 mm wide, 1 oz trace is 30 mm long. With 0.5 mΩ/□, what is its resistance, in Ω?
= 0.075 | 0.001 | Ω
> 150 squares × 0.5 mΩ.
```

```quiz
? A 10 nF capacitor has 0.8 nH of mounted inductance. What is its self-resonant frequency, in MHz?
= 56.3 | 0.005 | MHz
> $1/(2\pi\sqrt{0.8\times10^{-9}\times10^{-8}})$.
```

```quiz
? A 1.0 V processor core may vary 3% with a 5 A load step. What is the target impedance, in Ω?
= 0.006 | 0.001 | Ω
> $1.0 \times 0.03/5$: 6 mΩ, which takes many capacitors and planes.
```

```quiz
? A signal has a 0.7 ns rise time on a microstrip with $t_{pd} = 6.06$ ps/mm. What is the critical length, in mm?
= 57.8 | 0.005 | mm
> $700/(2 \times 6.06)$.
```

```quiz
? A 30 Ω load terminates a 50 Ω line. What is the reflection coefficient?
= -0.25 | 0.001 |
> $(30 - 50)/(30 + 50)$.
```

```quiz
? Twelve thermal vias, each 174 °C/W, are in parallel. What is their combined thermal resistance, in °C/W?
= 14.5 | 0.001 | °C/W
> $174/12$.
```

```quiz
? A mixed-signal board has a single ADC. What ground strategy is usually best?
+ one solid ground plane, with analog and digital circuits partitioned by placement
- separate analog and digital planes joined by a long trace
- no ground plane
- a ground plane only under the digital section
> Splits create return-path detours.
```

```quiz
? In a buck converter layout, the input capacitor should be:
+ right at the IC's VIN and GND pins, to minimize the hot loop
- near the output connector
- on the opposite side of the board, far from the IC
- omitted if the bulk capacitor is large
> The hot loop carries the switched current.
```
