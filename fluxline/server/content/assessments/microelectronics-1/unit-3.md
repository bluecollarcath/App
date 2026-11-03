Covers Lessons 3.1–3.3: BJT operation, biasing and the small-signal model, and the CE, CB and CC amplifiers. Use $V_T = 25$ mV and $V_{BE} = 0.7$ V unless told otherwise.

```quiz
? A BJT in active mode has $\beta = 100$ and $I_B = 20\ \mu$A. What is $I_C$, in mA?
= 2 | 0.001 | mA
> $I_C = \beta I_B = 2$ mA.
```

```quiz
? What is $\alpha$ for a transistor with $\beta = 100$?
= 0.990 | 0.001 |
> $\alpha = \beta/(\beta + 1) = 100/101 = 0.990$.
```

```quiz
? A BJT has $\beta = 120$ and is biased at $I_C = 1$ mA. What is $r_\pi$, in kΩ?
= 3 | 0.001 | kΩ
> $g_m = 1/25 = 40$ mS, so $r_\pi = 120/40\ \text{mS} = 3$ kΩ.
```

```quiz
? Divider bias: $V_{CC} = 12$ V, $R_1 = 40$ kΩ (top), $R_2 = 10$ kΩ, $R_E = 1$ kΩ. Assuming $\beta$ is very large, what is $I_E$, in mA?
= 1.7 | 0.001 | mA
> $V_B = 12 \cdot 10/50 = 2.4$ V, $V_E = 1.7$ V, $I_E = 1.7$ mA.
```

```quiz
? The same bias circuit with $\beta = 100$: including the divider's Thévenin resistance ($8$ kΩ), what is $I_E$, in mA?
= 1.575 | 0.005 | mA
> $I_E = (\beta + 1)(V_{Th} - V_{BE})/\big(R_{Th} + (\beta + 1)R_E\big) = 101(1.7)/(8 + 101) = 1.575$ mA, within 8% of the stiff-divider estimate.
```

```quiz
? A common-emitter stage at $I_C = 1$ mA has $R_C = 5$ kΩ and $R_L = 5$ kΩ (ignore $r_o$). What is $A_v$?
= -100 | 0.001 |
> $A_v = -g_m(R_C \parallel R_L) = -40\ \text{mS} \times 2.5\ \text{k}\Omega = -100$.
```

```quiz
? The same stage ($g_m = 40$ mS, $R_C = 5$ kΩ, no load) with an unbypassed $R_E = 500\ \Omega$. What is $A_v$?
= -9.524 | 0.005 |
> $-g_mR_C/(1 + g_mR_E) = -200/21 = -9.52$, close to $-R_C/R_E = -10$.
```

```quiz
? The emitter follower (common collector) is used mainly as:
+ a buffer: high input resistance, low output resistance, gain near 1
- a high-gain voltage amplifier
- a current amplifier with low input resistance
- an inverting stage
> Its voltage gain is just under 1, but it isolates a high-impedance source from a heavy load.
```
