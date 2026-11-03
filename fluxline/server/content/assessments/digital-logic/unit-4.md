Covers Lessons 4.1–4.2: Verilog for combinational and sequential logic, and FPGAs.

```quiz
? What is the value of `8'hC3` in decimal?
= 195 | 0 |
> $12 \cdot 16 + 3 = 195$.
```

```quiz
? What is `{4'b1111, 4'b0000}` in decimal?
= 240 | 0 |
> $1111\,0000_2 = 240$.
```

```quiz
? Which assignment operator belongs in a combinational `always @(*)` block?
+ `=` (blocking)
- `<=` (non-blocking)
- `assign`
- `==`
> Use `=` in combinational blocks and `<=` in clocked blocks.
```

```quiz
? How many bits of configuration does a 5-input LUT store?
= 32 | 0 | bits
> $2^5 = 32$.
```

```quiz
? A 4-bit counter with enable held high is at 15. What is its value after 3 more clock edges?
= 2 | 0 |
> $15 \to 0 \to 1 \to 2$: it wraps at 16.
```

```quiz
? A combinational `always @(*)` block uses a `case` statement with no `default`, and some cases don't assign the output. What happens?
- Nothing; unassigned cases output 0
+ Synthesis infers an unintended latch
- The simulator reports a syntax error
- The output becomes a flip-flop clocked by `clk`
> Add a `default` branch or a default assignment at the top of the block.
```
