Covers Lessons 3.1–3.3: power semiconductor devices, magnetics design, and converter modeling and control.

```quiz
? A MOSFET with $R_{DS(on)} = 10$ mΩ carries 15 A RMS. What is its conduction loss, in W?
= 2.25 | 0.001 | W
> $15^2 \times 0.01$.
```

```quiz
? An IGBT hard-switches 600 V and 30 A with $t_r + t_f = 60$ ns at 20 kHz. What is its switching loss, in W?
= 10.8 | 0.001 | W
> $\tfrac12(600)(30)(60\times10^{-9})(2\times10^4)$.
```

```quiz
? A device dissipating 12 W has $\theta_{jc} = 0.5$, $\theta_{cs} = 0.3$ and $\theta_{sa} = 2.5$ °C/W in 35 °C air. What is $T_j$, in °C?
= 74.6 | 0.001 | °C
> $35 + 12(3.3)$.
```

```quiz
? An inductor needs 22 µH at 6 A peak on a core with $A_c = 0.5$ cm² and $B_{max} = 0.3$ T. What is the minimum number of turns?
= 8.8 | 0.005 |
> $22\times10^{-6}(6)/(0.3 \times 0.5\times10^{-4})$, so 9 turns.
```

```quiz
? A transformer primary sees a 300 V square wave at 200 kHz, with $A_c = 0.6$ cm² and $B_{peak} = 0.1$ T. How many turns are needed?
= 62.5 | 0.002 |
> $300/(4 \times 2\times10^5 \times 0.1 \times 0.6\times10^{-4})$, so 63 turns.
```

```quiz
? A buck's output filter has $L = 22\ \mu$H and $C = 47\ \mu$F. What is its double-pole frequency, in kHz?
= 4.949 | 0.005 | kHz
> $1/(2\pi\sqrt{22\times10^{-6} \times 47\times10^{-6}})$.
```

```quiz
? A boost with $R = 10\ \Omega$, $D = 0.6$ and $L = 15\ \mu$H has its RHP zero at what frequency, in kHz?
= 16.98 | 0.005 | kHz
> $10(0.4)^2/15\times10^{-6} = 1.07\times10^5$ rad/s.
```
