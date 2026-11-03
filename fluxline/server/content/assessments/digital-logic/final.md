The final exam covers all four units of Digital Logic Design. Work each problem on paper.

```quiz
? What is $\text{3C}_{16}$ in decimal?
= 60 | 0 |
> $3 \cdot 16 + 12 = 60$.
```

```quiz
? What is the most negative value an 8-bit two's-complement number can represent?
= -128 | 0 |
> $-2^7 = -128$.
```

```quiz
? Simplify $ABC + AB\overline{C}$.
+ $AB$
- $ABC$
- $A + B$
- $C$
> $AB(C + \overline{C}) = AB$.
```

```quiz
? Simplify $F(A, B, C, D) = \sum m(0, 1, 2, 3, 8, 9, 10, 11)$.
- $\overline{A}$
+ $\overline{B}$
- $\overline{C}$
- $\overline{A}\,\overline{B}$
> Every listed minterm has $B = 0$, and those are all of them.
```

```quiz
? How many select lines does a 32-to-1 multiplexer need?
= 5 | 0 |
> $2^5 = 32$.
```

```quiz
? A 3-to-8 decoder receives $011$. Which output (decimal) is active?
= 3 | 0 |
> $011_2 = 3$.
```

```quiz
? Compute the 4-bit difference $0110 - 0010$ using two's complement, as a decimal number.
= 4 | 0 |
> $0110 + 1110 = (1)0100$; dropping the carry gives 4.
```

```quiz
? Which 4-bit two's-complement addition overflows?
+ $0111 + 0001$
- $1111 + 0001$
- $0011 + 0010$
- $1000 + 0111$
> $7 + 1 = 8$ exceeds +7 and appears as $1000 = -8$.
```

```quiz
? A critical path passes through 4 gates of 0.5 ns each, with no other overhead. What is the maximum operating frequency, in MHz?
= 500 | 0.01 | MHz
> $1/(2\ \text{ns}) = 500$ MHz.
```

```quiz
? A T flip-flop with $T = 1$ starts at $Q = 0$. What is $Q$ after 4 clock edges?
= 0 | 0 |
> Four toggles return it to 0.
```

```quiz
? How many flip-flops does a counter need to count from 0 to 999?
= 10 | 0 |
> 1000 states need $\lceil\log_2 1000\rceil = 10$ bits.
```

```quiz
? A 4-bit shift register holds $1100$ and shifts left once with a serial input of 1 entering on the right. What does it hold, in decimal?
= 9 | 0 |
> $1100 \to 1001 = 9$: the leftmost 1 shifts out and a 1 enters on the right.
```

```quiz
? A binary-encoded FSM has 5 states. How many flip-flops does it need?
= 3 | 0 |
> $\lceil\log_2 5\rceil = 3$.
```

```quiz
? What is `{2'b11, 2'b01}` in decimal?
= 13 | 0 |
> $1101_2 = 13$.
```

```quiz
? In Verilog, which operator should assign to registers inside `always @(posedge clk)`?
- `=`
+ `<=`
- `assign`
- `:=`
> Non-blocking assignment models every flip-flop updating together at the clock edge.
```
