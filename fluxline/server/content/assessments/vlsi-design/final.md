The final exam covers all three units of VLSI Design. Numeric answers are accepted within about 1%.

```quiz
? A node of 10 fF with $\alpha = 0.25$ switches at 3 GHz on 0.8 V. What is its dynamic power, in µW?
= 4.8 | 0.001 | µW
> $0.25 \times 10^{-14} \times 0.64 \times 3\times10^9$.
```

```quiz
? How many transistors does an OAI22 gate, $\overline{(A + B)(C + D)}$, need in static CMOS?
= 8 | 0.001 |
> Four inputs, one NMOS and one PMOS each.
```

```quiz
? Sized for equal drive to a 1:2 inverter, what is the logical effort of a NOR3 (NMOS 1, PMOS 6)?
= 2.333 | 0.002 |
> Input capacitance 7 over 3.
```

```quiz
? What is the Poisson yield of a 0.5 cm² die at $D_0 = 0.4$ cm⁻²?
= 0.8187 | 0.002 |
> $e^{-0.2}$.
```

```quiz
? A NAND2 ($g = 4/3$, $p = 2$) drives a load 6 times its input. What is its delay, in τ?
= 10 | 0.001 | τ
> $(4/3)(6) + 2$.
```

```quiz
? A unit inverter must drive 4096 times its input capacitance. What is the optimal number of inverter stages?
= 6 | 0.001 |
> $\log_44096$.
```

```quiz
? Lowering $V_{DD}$ from 1.0 to 0.8 V and the clock by the same 20% reduces dynamic power to what fraction?
= 0.512 | 0.001 |
> $0.8^3$.
```

```quiz
? A 3 mm wire with $r = 0.5\ \Omega$/µm and $c = 0.2$ fF/µm has what Elmore delay, in ps?
= 450 | 0.001 | ps
> $\tfrac12(1500)(600\ \text{fF})$.
```

```quiz
? A wire has 30 fF of coupling to a neighbor switching the same direction. What is its effective coupling capacitance, in fF?
= 0 | 0 | fF
> Miller factor 0: no voltage change across the coupling capacitor.
```

```quiz
? With $t_{pcq} = 60$, $t_{setup} = 40$ and skew 50 ps, how long may the logic take at 2 GHz, in ps?
= 350 | 0.001 | ps
> $500 - 150$.
```

```quiz
? A memory has $2^{30}$ words. How many address bits does it need?
= 30 | 0.001 | bits
> One per power of two.
```

```quiz
? A DRAM cell of 15 fF shares charge with a 135 fF bitline at 0.6 V. What is the signal, in mV?
= 60 | 0.001 | mV
> $0.6 \times 15/150$.
```

```quiz
? A path's hold requirement is 50 ps and its shortest arrival is 35 ps. What is the hold slack, in ps?
= -15 | 0.001 | ps
> $35 - 50$: buffers must be added.
```

```quiz
? With \$4M NRE, \$6 ASICs and \$26 FPGAs, what is the break-even volume?
= 200000 | 0.001 | units
> $4\times10^6/20$.
```

```quiz
? Which technique reduces leakage power in idle blocks?
+ power gating
- clock gating
- adding repeaters
- raising the clock frequency
> Cutting the supply stops leakage; stopping the clock doesn't.
```
