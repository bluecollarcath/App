Covers Lessons 1.1–1.3: current mirrors, differential pairs, and multistage op-amp internals.

```quiz
? A MOSFET mirror has $I_{REF} = 50\ \mu$A and $(W/L)_2 = 3(W/L)_1$. What is $I_{OUT}$, in µA?
= 150 | 0.001 | µA
> The current scales with the aspect ratio.
```

```quiz
? A cascode mirror's devices have $g_m = 2$ mS and $r_o = 50$ kΩ. Estimate its output resistance, in MΩ.
= 5 | 0.001 | MΩ
> $g_mr_o^2 = 2\times10^{-3} \times (5\times10^4)^2 = 5$ MΩ.
```

```quiz
? A matched BJT mirror has $\beta = 50$. What is $I_{OUT}/I_{REF}$?
= 0.9615 | 0.001 |
> $1/(1 + 2/50) = 0.962$.
```

```quiz
? A differential pair has $I_{SS} = 0.5$ mA, $V_{ov} = 0.25$ V and $R_D = 8$ kΩ. What is its differential-output gain?
= 16 | 0.001 |
> $g_m = 2(0.25\ \text{mA})/0.25 = 2$ mS; $A_d = g_mR_D = 16$.
```

```quiz
? A pair with $g_m = 2$ mS has a tail resistance of 200 kΩ. What is its single-ended CMRR, in dB?
= 52.04 | 0.005 | dB
> $g_mR_{SS} = 400$, which is 52.0 dB.
```

```quiz
? An actively loaded pair has $g_{m1} = 1$ mS and $r_{o2} = r_{o4} = 80$ kΩ. What is its gain?
= 40 | 0.001 |
> $1\ \text{mS} \times 40\ \text{k}\Omega = 40$.
```

```quiz
? An op-amp has a 50 µA tail current and $C_c = 2.5$ pF. What is its slew rate, in V/µs?
= 20 | 0.001 | V/µs
> $50\ \mu\text{A}/2.5\ \text{pF} = 2\times10^7$ V/s.
```

```quiz
? An op-amp with $V_{OS} = 1$ mV is used in a non-inverting amplifier with $R_2/R_1 = 99$. What output offset results, in mV?
= 100 | 0.001 | mV
> $V_{OS}(1 + R_2/R_1) = 100$ mV.
```
