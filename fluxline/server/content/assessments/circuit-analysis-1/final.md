The final exam covers all five units of Circuit Analysis I. Take your time and work each problem on paper. Numeric answers are accepted within about 1%.

```quiz
? A 1500 W space heater runs on 120 V. What current does it draw, in A?
= 12.5 | 0.01 | A
> $i = p/v = 1500/120 = 12.5$ A.
```

```quiz
? What is the resistance of 100 m of copper wire with a 1 mm² cross-section ($\rho = 1.72\times10^{-8}\ \Omega\cdot$m), in Ω?
= 1.72 | 0.01 | Ω
> $R = \rho\ell/A = 1.72\times10^{-8} \times 100 / 10^{-6} = 1.72\ \Omega$.
```

```quiz
? A 24 V source drives 2 Ω, 4 Ω and 6 Ω in series. What is the voltage across the 6 Ω resistor, in V?
= 12 | 0.01 | V
> $i = 24/12 = 2$ A; $v = 6 \times 2 = 12$ V.
```

```quiz
? You need 3.3 V from a 5 V supply with a voltage divider whose bottom resistor is 10 kΩ. What top resistor is needed, in kΩ?
= 5.152 | 0.01 | kΩ
> $3.3 = 5\frac{10}{R + 10} \Rightarrow R = 10\left(\frac{5}{3.3} - 1\right) = 5.15$ kΩ.
```

```quiz
? A 1 A source injects into node 1 and a 0.5 A source injects into node 2. Resistors: 10 Ω from node 1 to ground, 10 Ω between nodes 1 and 2, and 20 Ω from node 2 to ground. What is $v_2$, in V?
= 10 | 0.01 | V
> Nodal: $0.2v_1 - 0.1v_2 = 1$ and $-0.1v_1 + 0.15v_2 = 0.5$ give $v_1 = v_2 = 10$ V (so no current flows between the nodes).
```

```quiz
? Mesh 1 has a 10 V source (driving clockwise) and 2 Ω, and shares 3 Ω with mesh 2. Mesh 2 also has 1 Ω and a 5 V source that opposes its clockwise current. What is the mesh current $i_1$, in A?
= 2.273 | 0.01 | A
> $5i_1 - 3i_2 = 10$ and $-3i_1 + 4i_2 = -5$ give $i_1 = 2.27$ A, $i_2 = 0.455$ A.
```

```quiz
? A Norton equivalent has $I_N = 2$ mA and $R_N = 5$ kΩ. What is its Thévenin voltage, in V?
= 10 | 0.01 | V
> $V_{th} = I_NR_N = 10$ V.
```

```quiz
? A balanced Y network has 15 Ω in each arm. What is each resistor of the equivalent Δ, in Ω?
= 45 | 0.01 | Ω
> $R_\Delta = 3R_Y = 45\ \Omega$.
```

```quiz
? A source has $V_{th} = 12$ V and $R_{th} = 8\ \Omega$. What is the maximum power it can deliver, in W?
= 4.5 | 0.01 | W
> $144/(4 \times 8) = 4.5$ W.
```

```quiz
? What is the gain of a non-inverting amplifier with $R_f = 39$ kΩ and $R_g = 1$ kΩ?
= 40 | 0.01 |
> $1 + 39/1 = 40$.
```

```quiz
? A stage with gain 10 drives a stage with gain −0.5 (ideal op-amps). What is the overall gain?
= -5 | 0.01 |
> Ideal stages multiply: $10 \times (-0.5) = -5$.
```

```quiz
? A 4.7 µF and a 2.2 µF capacitor are connected in parallel. What is the total capacitance, in µF?
= 6.9 | 0.01 | µF
> Parallel capacitances add.
```

```quiz
? What is the time constant of a 22 kΩ resistor with a 4.7 µF capacitor, in ms?
= 103.4 | 0.01 | ms
> $\tau = RC = 22\,000 \times 4.7\times10^{-6} = 0.1034$ s.
```

```quiz
? A 1 H inductor carrying 2 A is switched across a 100 Ω resistor at $t = 0$. What is its current at $t = 10$ ms, in A?
= 0.7358 | 0.01 | A
> $\tau = 10$ ms, so $i = 2e^{-1} = 0.736$ A.
```

```quiz
? Two independent sources each, acting alone, produce 3 W in a resistor. Which statement about the actual power in that resistor is correct?
- It is exactly 6 W
- It is exactly 3 W
+ It cannot be found by adding powers; add the currents first, then compute power
- It is always zero
> Power is quadratic in current. Depending on directions, the true power could be anywhere from 0 W to 12 W.
```
