Covers Lessons 2.1–2.3: delay and logical effort, power dissipation, and interconnect.

```quiz
? An inverter drives a load 8 times its input capacitance. What is its delay, in τ (with $p = 1$)?
= 9 | 0.001 | τ
> $8 + 1$.
```

```quiz
? A path has path effort $F = 1024$. What is the optimal number of stages?
= 5 | 0.001 |
> $\log_41024$.
```

```quiz
? A chain of 4 inverters drives $H = 256$. What is the minimum delay, in τ?
= 20 | 0.001 | τ
> $\hat f = 4$; $D = 4(4) + 4$.
```

```quiz
? A chip switches 20 nF with $\alpha = 0.1$ at 0.9 V and 1.5 GHz. What is its dynamic power, in W?
= 2.43 | 0.002 | W
> $0.1 \times 20\times10^{-9} \times 0.81 \times 1.5\times10^9$.
```

```quiz
? Under DVFS, voltage and frequency both drop 25%. To what fraction does dynamic power fall?
= 0.4219 | 0.002 |
> $0.75^3$.
```

```quiz
? A 1.5 mm wire has $r = 0.8\ \Omega$/µm and $c = 0.25$ fF/µm. What is its Elmore delay, in ps?
= 225 | 0.001 | ps
> $\tfrac12(1200\ \Omega)(375\ \text{fF})$.
```

```quiz
? A wire's length doubles. Without repeaters, its delay:
+ quadruples
- doubles
- stays the same
- halves
> Distributed RC delay is proportional to $L^2$.
```
