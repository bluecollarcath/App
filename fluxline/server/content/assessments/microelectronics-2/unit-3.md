Covers Lessons 3.1–3.2: feedback topologies, stability, and frequency compensation.

```quiz
? An amplifier with $A = 5000$ has feedback $\beta = 0.02$. What is $A_f$?
= 49.50 | 0.005 |
> $5000/(1 + 100) = 49.5$.
```

```quiz
? An op-amp with a 5 MHz gain–bandwidth product is set for a closed-loop gain of 20. What is its bandwidth, in kHz?
= 250 | 0.001 | kHz
> $5\ \text{MHz}/20$.
```

```quiz
? A series–shunt amplifier has $R_i = 20$ kΩ before feedback and a loop gain of 49. What is its input resistance, in kΩ?
= 1000 | 0.001 | kΩ
> Series mixing multiplies: $20 \times 50 = 1000$ kΩ.
```

```quiz
? The loop gain has a phase of $-110°$ at unity-gain crossover. What is the phase margin, in degrees?
= 70 | 0.001 | °
> $180° - 110°$.
```

```quiz
? A Miller-compensated op-amp has $g_{m1} = 0.2$ mS and $C_c = 1$ pF. What is its unity-gain frequency, in MHz?
= 31.83 | 0.005 | MHz
> $g_{m1}/(2\pi C_c) = 31.8$ MHz.
```

```quiz
? With $g_{m1} = 0.5$ mS, $g_{m6} = 5$ mS and $C_L = 4$ pF, what minimum $C_c$ (in pF) gives about $60°$ phase margin?
= 0.88 | 0.005 | pF
> $C_c = 2.2(g_{m1}/g_{m6})C_L = 2.2(0.1)(4) = 0.88$ pF.
```

```quiz
? The right-half-plane zero in a Miller-compensated op-amp:
+ adds gain like a zero but phase lag like a pole
- adds phase lead and improves stability
- has no effect below the unity-gain frequency
- is removed by increasing $C_c$
> Its phase lag erodes the margin; a nulling resistor moves it away.
```
