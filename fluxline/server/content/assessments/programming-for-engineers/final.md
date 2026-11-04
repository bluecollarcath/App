The final exam covers all three units of Programming for Engineers.

```quiz
? In Python, what is `2 ** 10`?
= 1024 | 0.001 |
> Exponentiation.
```

```quiz
? What is the last element of `[k**2 for k in range(4)]`?
= 9 | 0.001 |
> `range(4)` stops at 3.
```

```quiz
? What is `np.max(np.abs(np.array([-7, 3, 5])))`?
= 7 | 0.001 |
> The largest magnitude.
```

```quiz
? What is the last element of `np.cumsum([1, 2, 3, 4])`?
= 10 | 0.001 |
> A running sum.
```

```quiz
? What is `np.trapezoid([0, 1, 2, 3], dx=1)`?
= 4.5 | 0.001 |
> The area under a line from 0 to 3 over 3 units.
```

```quiz
? `np.polyfit([1, 2, 3], [2, 4, 6], 1)` returns `[slope, intercept]`. What is the slope?
= 2 | 0.001 |
> The points lie on $y = 2x$.
```

```quiz
? A simulated RC circuit ($\tau = 1$ ms) charges toward 3.3 V. What should it read at 3 ms, in V?
= 3.1357 | 0.002 | V
> $3.3(1 - e^{-3})$.
```

```quiz
? A 32-bit timer counting at 1 MHz overflows after how many seconds?
= 4294.97 | 0.002 | s
> $2^{32}$ µs.
```

```quiz
? What is `0xF0 >> 4` in decimal?
= 15 | 0.001 |
> `0x0F`.
```

```quiz
? A register holds `0b1011` (11). What is it after toggling bit 1 with `^= (1u << 1)`?
= 9 | 0.001 |
> `1011 ^ 0010 = 1001`.
```

```quiz
? A `uint32_t *p` holds address 2000. What address does `p + 5` hold?
= 2020 | 0.001 |
> 5 elements of 4 bytes.
```

```quiz
? An $O(n\log n)$ sort takes 0.5 s for $10^6$ items. Roughly how long for $10^7$, in s?
= 5.833 | 0.02 | s
> $10 \times 7/6 \times 0.5$.
```

```quiz
? Which memory region holds a function's local variables?
+ the stack
- the heap
- flash memory only
- the register file only
> Locals vanish when the function returns.
```

```quiz
? A C program writes past the end of an array. What does the language guarantee?
+ nothing: C does no bounds checking, so memory is silently corrupted
- a compile-time error
- an exception is thrown
- the array grows automatically
> Buffer overflows are the most common C bug.
```

```quiz
? Continuous integration (CI) means:
+ automatically running the test suite on every push or pull request
- committing directly to the main branch
- merging without code review
- integrating hardware and software at the end of a project
> Breakage is caught before it's merged.
```
