Covers Lessons 1.1–1.4: instruction set architecture, assembly programming, pipelining, and the memory hierarchy.

```quiz
? A program runs $2\times10^9$ instructions at a CPI of 1.2 on a 2 GHz processor. How long does it take, in seconds?
= 1.2 | 0.001 | s
> $2\times10^9 \times 1.2/2\times10^9$.
```

```quiz
? How many bytes can a 20-bit address bus address?
= 1048576 | 0.001 | bytes
> $2^{20}$ = 1 MiB.
```

```quiz
? After `addi t0, zero, 5` and `slli t1, t0, 3`, what is in `t1`?
= 40 | 0.001 |
> $5 \times 8$.
```

```quiz
? Stage delays are 150, 200, 275, 200 and 75 ps with no register overhead. What is the pipelined speed-up over single-cycle?
= 3.273 | 0.005 |
> $900/275$.
```

```quiz
? 30% of instructions are loads, 30% of which cause a 1-cycle load-use stall. What is the CPI?
= 1.09 | 0.001 |
> $1 + 0.3 \times 0.3$.
```

```quiz
? L1: 1-cycle hit, 10% miss. L2: 8-cycle hit, 30% local miss. Memory: 120 cycles. What is the AMAT, in cycles?
= 5.4 | 0.001 | cycles
> $1 + 0.1(8 + 0.3 \times 120)$.
```

```quiz
? A 64 KB, 2-way cache with 64-byte blocks has how many sets?
= 512 | 0.001 |
> $65536/64/2$.
```

```quiz
? In the RISC-V ABI, which registers must a called function preserve?
+ `sp` and `s0`–`s11`
- `t0`–`t6`
- `a0`–`a7`
- `ra` only
> Saved registers are callee-saved.
```
