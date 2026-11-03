The final exam covers all four units of Microelectronics I. Use $V_T = 25$ mV, $V_{BE} = 0.7$ V and a 0.7 V diode drop unless told otherwise. Numeric answers are accepted within about 1%.

```quiz
? Two silicon diodes in series are fed from 9 V through 2 kΩ. What current flows, in mA?
= 3.8 | 0.001 | mA
> $(9 - 1.4)/2\ \text{k}\Omega = 3.8$ mA.
```

```quiz
? A full-wave rectifier (60 Hz mains) with $V_p = 10$ V feeds 500 Ω with a 470 µF filter. What is the peak-to-peak ripple, in V?
= 0.3546 | 0.01 | V
> $10/(120 \cdot 500 \cdot 470\times10^{-6}) = 0.355$ V.
```

```quiz
? A 6.2 V Zener regulator runs from 15 V and must supply 30 mA while keeping at least 5 mA in the Zener. What series resistor is needed, in Ω?
= 251.4 | 0.01 | Ω
> $R = (15 - 6.2)/(35\ \text{mA}) = 251\ \Omega$.
```

```quiz
? A shunt clipper uses a diode in series with a 2 V battery across the output. Above what output voltage does it clip, in V?
= 2.7 | 0.001 | V
> The diode turns on when the output exceeds $2 + 0.7$ V.
```

```quiz
? An NMOS with $k_n = 4$ mA/V² is in saturation with $V_{ov} = 0.4$ V. What is $I_D$, in mA?
= 0.32 | 0.001 | mA
> $\tfrac12 \cdot 4 \cdot 0.16 = 0.32$ mA.
```

```quiz
? A MOSFET with $k_n = 3$ mA/V² is biased at $I_D = 0.75$ mA. What is $g_m$, in mS?
= 2.121 | 0.005 | mS
> $\sqrt{2k_nI_D} = \sqrt{4.5} = 2.12$ mS.
```

```quiz
? A MOSFET has $V_{GS} = 1.1$ V and $V_t = 0.5$ V. What is the minimum $V_{DS}$ for saturation, in V?
= 0.6 | 0.001 | V
> $V_{DS} \ge V_{ov} = 0.6$ V.
```

```quiz
? A device has $g_m = 4$ mS and $r_o = 50$ kΩ. What is its intrinsic gain?
= 200 | 0.001 |
> $g_mr_o = 200$.
```

```quiz
? A common-source stage has $g_m = 5$ mS, $R_D = 8$ kΩ and source degeneration $R_S = 200\ \Omega$ (no load, ignore $r_o$). What is $A_v$?
= -20 | 0.001 |
> $-g_mR_D/(1 + g_mR_S) = -40/2 = -20$.
```

```quiz
? What is $g_m$ of a BJT biased at $I_C = 2.5$ mA, in mS?
= 100 | 0.001 | mS
> $I_C/V_T = 2.5/0.025 = 100$ mS.
```

```quiz
? A BJT with Early voltage $V_A = 150$ V is biased at $I_C = 1.5$ mA. What is $r_o$, in kΩ?
= 100 | 0.001 | kΩ
> $V_A/I_C = 100$ kΩ.
```

```quiz
? What is the input resistance of a common-base stage at $I_C = 1$ mA, in Ω?
= 25 | 0.02 | Ω
> $R_{in} \approx r_e \approx V_T/I_C = 25\ \Omega$.
```

```quiz
? An emitter follower with $\beta = 100$ at $I_C = 1$ mA drives $R_L = 1$ kΩ. What is its input resistance (ignore bias resistors), in kΩ?
= 103.5 | 0.01 | kΩ
> $r_\pi + (\beta + 1)R_L = 2.5 + 101 = 103.5$ kΩ.
```

```quiz
? A coupling capacitor of 2.2 µF sits between a 2 kΩ source and an 18 kΩ input. What is its corner frequency, in Hz?
= 3.617 | 0.01 | Hz
> $1/\big(2\pi(20\ \text{k}\Omega)(2.2\ \mu\text{F})\big) = 3.62$ Hz.
```

```quiz
? A BJT used as a closed switch operates in which region?
+ saturation
- active
- cutoff
- reverse active
> In saturation both junctions are forward-biased and $V_{CE}$ is small (about 0.2 V).
```
