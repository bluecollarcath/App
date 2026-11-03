Covers Lessons 2.1–2.4: MOSFET I–V characteristics, biasing, the small-signal model, and the three single-transistor amplifiers.

```quiz
? An NMOS with $k_n = 2$ mA/V² and $V_t = 0.5$ V is in saturation with $V_{GS} = 1.3$ V. What is $I_D$ (ignore $\lambda$), in mA?
= 0.64 | 0.001 | mA
> $V_{ov} = 0.8$ V; $I_D = \tfrac12 \cdot 2 \cdot 0.8^2 = 0.64$ mA.
```

```quiz
? The same device ($k_n = 2$ mA/V², $V_t = 0.5$ V) has $V_{GS} = 1.5$ V and $V_{DS} = 0.3$ V. What is $I_D$, in mA?
= 0.51 | 0.001 | mA
> $V_{DS} < V_{ov} = 1$ V, so it's in triode: $I_D = k_n\big(V_{ov}V_{DS} - V_{DS}^2/2\big) = 2(0.3 - 0.045) = 0.51$ mA.
```

```quiz
? An NMOS has $k_n = 2$ mA/V², $V_t = 1$ V, $V_G = 3$ V, and $R_S = 1$ kΩ to ground. What is $I_D$, in mA?
= 1 | 0.001 | mA
> $I_D = \tfrac12 k_n(V_G - I_DR_S - V_t)^2 = (2 - I_D)^2$, so $I_D^2 - 5I_D + 4 = 0$ and $I_D = 1$ or $4$ mA. At 4 mA, $V_{GS} = -1$ V < $V_t$, so that root is rejected.
```

```quiz
? A MOSFET is biased at $I_D = 0.5$ mA with $V_{ov} = 0.25$ V. What is $g_m$, in mS?
= 4 | 0.001 | mS
> $g_m = 2I_D/V_{ov} = 4$ mS.
```

```quiz
? At $I_D = 0.5$ mA with $\lambda = 0.02\ \text{V}^{-1}$, what is $r_o$, in kΩ?
= 100 | 0.001 | kΩ
> $r_o = 1/(\lambda I_D) = 1/(0.01\ \text{mA/V}) = 100$ kΩ.
```

```quiz
? A common-source stage has $g_m = 2$ mS, $R_D = 10$ kΩ, $r_o = 100$ kΩ and $R_L = 10$ kΩ. What is $A_v$?
= -9.524 | 0.005 |
> $R_D \parallel r_o \parallel R_L = 4.76$ kΩ, so $A_v = -2 \times 4.76 = -9.52$.
```

```quiz
? A source follower has $g_m = 5$ mS and a total load $R_L' = 2$ kΩ. What is its gain?
= 0.909 | 0.005 |
> $g_mR_L'/(1 + g_mR_L') = 10/11 = 0.909$.
```

```quiz
? Which configuration has an input resistance of about $1/g_m$?
+ common gate
- common source
- common drain
- all three
> The signal enters at the source, which looks like $1/g_m$. CS and CD take their input at the gate, where the resistance is very high.
```
