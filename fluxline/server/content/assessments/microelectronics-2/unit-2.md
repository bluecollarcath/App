Covers Lessons 2.1–2.2: high-frequency device models, the Miller effect and open-circuit time constants.

```quiz
? A MOSFET has $g_m = 4$ mS and $C_{gs} + C_{gd} = 50$ fF. What is $f_T$, in GHz?
= 12.73 | 0.005 | GHz
> $4\times10^{-3}/(2\pi \cdot 50\times10^{-15}) = 12.7$ GHz.
```

```quiz
? A BJT has $f_T = 5$ GHz and $\beta_0 = 100$. What is its beta cutoff frequency, in MHz?
= 50 | 0.001 | MHz
> $f_\beta = f_T/\beta_0$.
```

```quiz
? $C_{gd} = 10$ fF bridges a stage with gain $-30$. What Miller capacitance appears at the input, in fF?
= 310 | 0.001 | fF
> $10(1 + 30) = 310$ fF.
```

```quiz
? $R_{sig} = 20$ kΩ drives a total input capacitance of 100 fF. Estimate $f_H$, in MHz.
= 79.58 | 0.005 | MHz
> $1/(2\pi \cdot 2\times10^4 \cdot 10^{-13}) = 79.6$ MHz.
```

```quiz
? In a CS stage with $R_{sig} = 10$ kΩ, $g_m = 1$ mS, $R_L' = 20$ kΩ and $C_{gd} = 4$ fF, what is $C_{gd}$'s open-circuit time constant, in ns?
= 0.92 | 0.005 | ns
> $R = 10(1 + 20) + 20 = 230$ kΩ; $230\ \text{k}\Omega \times 4\ \text{fF} = 0.92$ ns.
```

```quiz
? A long-channel MOSFET's overdrive is doubled at the same channel length. By what factor does $f_T$ change?
= 2 | 0.001 |
> $f_T \approx 3\mu_nV_{ov}/(4\pi L^2)$ is proportional to $V_{ov}$.
```

```quiz
? Which change most directly reduces the Miller multiplication of $C_{gd}$ in a common-source amplifier?
+ adding a cascode transistor above it
- increasing $R_{sig}$
- increasing the load resistance
- adding a larger coupling capacitor
> The cascode keeps the CS drain gain near $-1$.
```
