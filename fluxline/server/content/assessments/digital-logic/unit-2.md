Covers Lessons 2.1–2.3: multiplexers, decoders and encoders; arithmetic circuits; timing and hazards.

```quiz
? How many select lines does an 8-to-1 multiplexer need?
= 3 | 0 |
> $2^3 = 8$.
```

```quiz
? A 4-to-16 decoder receives $1011$. Which output (decimal) is active?
= 11 | 0 |
> $1011_2 = 11$.
```

```quiz
? A full adder has $A = 1$, $B = 1$, $C_{in} = 0$. What is $C_{out}$?
= 1 | 0 |
> Two of the three inputs are 1, so the carry is 1 (and the sum is 0).
```

```quiz
? Add $1001 + 0111$ in a 4-bit adder. What are the 4 sum bits, as a decimal number?
= 0 | 0 |
> $9 + 7 = 16 = 1\,0000_2$: the sum bits are $0000$ with a carry out of 1.
```

```quiz
? An 8-bit ripple-carry adder needs 3 gate delays per carry stage. How many gate delays is the worst-case carry path?
= 24 | 0 |
> $8 \times 3 = 24$.
```

```quiz
? Which term removes the static-1 hazard in $F = \overline{A}B + AC$?
- $A\overline{B}$
- $\overline{B}C$
+ $BC$
- $\overline{A}\,\overline{C}$
> The consensus of $\overline{A}B$ and $AC$ is $BC$.
```

```quiz
? A critical path passes through gates with 2, 3, and 4 ns delays, plus 1 ns of flip-flop overhead. What is the maximum clock frequency, in MHz?
= 100 | 0.01 | MHz
> $1/(10\ \text{ns}) = 100$ MHz.
```
