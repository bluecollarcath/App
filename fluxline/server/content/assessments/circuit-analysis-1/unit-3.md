Covers Lessons 3.1–3.3: Thévenin and Norton equivalents, superposition and source transformation, and maximum power transfer. Questions 1–4 use this circuit: a 20 V source in series with 5 Ω, feeding a 20 Ω resistor; the output terminals are across the 20 Ω resistor.

```quiz
? What is the Thévenin voltage at the output terminals, in V?
= 16 | 0.01 | V
> Open-circuit voltage from the divider: $20 \cdot \frac{20}{25} = 16$ V.
```

```quiz
? What is the Thévenin resistance, in Ω?
= 4 | 0.01 | Ω
> Short the source: $5 \parallel 20 = 4\ \Omega$.
```

```quiz
? What is the maximum power this circuit can deliver to a load, in W?
= 16 | 0.01 | W
> $V_{th}^2/(4R_{th}) = 256/16 = 16$ W, into a 4 Ω load.
```

```quiz
? What is the Norton current of this circuit, in A?
= 4 | 0.01 | A
> $I_N = V_{th}/R_{th} = 16/4 = 4$ A. (Directly: shorting the output leaves $20/5 = 4$ A.)
```

```quiz
? A 6 V source in series with 3 Ω connects to node A. A 2 A source also injects current into A, and a 6 Ω resistor connects A to ground. Using superposition, what is $v_A$, in V?
= 8 | 0.01 | V
> 6 V alone: $6 \cdot \frac{6}{9} = 4$ V. 2 A alone: $2 \cdot (3 \parallel 6) = 4$ V. Total 8 V.
```

```quiz
? What is the efficiency when $R_L = 9R_{th}$, as a percentage?
= 90 | 0.01 | %
> $\eta = \frac{R_L}{R_{th} + R_L} = \frac{9}{10} = 90\%$.
```
