Covers Lessons 4.1–4.2: the ideal op-amp and op-amp building blocks. Assume ideal op-amps with negative feedback unless stated otherwise.

```quiz
? An inverting amplifier uses $R_1 = 4.7$ kΩ and $R_f = 47$ kΩ. What is its voltage gain?
= -10 | 0.01 |
> $-R_f/R_1 = -10$.
```

```quiz
? A non-inverting amplifier uses $R_g = 2$ kΩ and $R_f = 18$ kΩ. With a 0.3 V input, what is the output, in V?
= 3 | 0.01 | V
> Gain $= 1 + 18/2 = 10$, so $v_o = 3$ V.
```

```quiz
? An inverting amplifier with gain −20 runs from ±12 V rails, and its output can reach the rails. The input is 0.8 V. What is the output, in V?
= -12 | 0.01 | V
> The linear formula gives $-16$ V, beyond the rail, so the output saturates at $-12$ V.
```

```quiz
? A summing amplifier has $R_f = 30$ kΩ with inputs $v_1 = 0.2$ V through 10 kΩ, $v_2 = -0.3$ V through 15 kΩ, and $v_3 = 0.6$ V through 30 kΩ. What is $v_o$, in V?
= -0.6 | 0.01 | V
> $v_o = -30\text{k}\left(\frac{0.2}{10\text{k}} - \frac{0.3}{15\text{k}} + \frac{0.6}{30\text{k}}\right) = -(0.6 - 0.6 + 0.6) = -0.6$ V.
```

```quiz
? A difference amplifier has $R_1 = 2$ kΩ and $R_2 = 10$ kΩ (matched pairs). With $v_2 = 2.5$ V and $v_1 = 2.6$ V, what is $v_o$, in V?
= -0.5 | 0.01 | V
> $\frac{R_2}{R_1}(v_2 - v_1) = 5 \times (-0.1) = -0.5$ V.
```

```quiz
? Which amplifier draws (ideally) zero current from the signal source?
- Inverting amplifier
+ Non-inverting amplifier
- Summing amplifier
- Difference amplifier
> The source connects only to the non-inverting input, which draws no current. The others present finite input resistances.
```
