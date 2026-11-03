Covers Lessons 5.1–5.3: capacitors and inductors, first-order RC and RL transients, and switched circuits.

```quiz
? How much energy is stored in a 470 µF capacitor charged to 25 V, in J?
= 0.1469 | 0.01 | J
> $\tfrac12 Cv^2 = 0.5 \times 470\times10^{-6} \times 625 = 0.147$ J.
```

```quiz
? The current in a 20 mH inductor rises steadily from 0 to 3 A in 6 ms. What voltage appears across it during the ramp, in V?
= 10 | 0.01 | V
> $v = L\frac{di}{dt} = 0.02 \times \frac{3}{0.006} = 10$ V.
```

```quiz
? What is the time constant of an RL circuit with $L = 200$ mH and $R = 50\ \Omega$, in ms?
= 4 | 0.01 | ms
> $\tau = L/R = 0.2/50 = 4$ ms.
```

```quiz
? A capacitor charged to 12 V discharges through a resistor with $\tau = 2$ ms. How long until it reaches 3 V, in ms?
= 2.773 | 0.01 | ms
> $12e^{-t/\tau} = 3 \Rightarrow t = \tau\ln 4 = 2.77$ ms.
```

```quiz
? A capacitor voltage starts at −5 V and heads toward a final value of 10 V with $\tau = 1$ s. What is it at $t = 0.5$ s, in V?
= 0.902 | 0.02 | V
> $v = 10 + (-5 - 10)e^{-0.5} = 10 - 9.10 = 0.90$ V.
```

```quiz
? Which quantity can change instantaneously when a switch operates?
- The voltage across a capacitor
- The current through an inductor
+ The current through a capacitor
- The energy stored in an inductor
> Capacitor current $C\,dv/dt$ can jump; capacitor voltage, inductor current, and stored energy cannot.
```
