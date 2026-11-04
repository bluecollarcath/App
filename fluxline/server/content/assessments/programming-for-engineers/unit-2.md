Covers Lessons 2.1–2.4: C fundamentals, pointers and memory, bitwise operations, and structs, files and modular code.

```quiz
? A `uint8_t` holds 200. What does it hold after adding 100?
= 44 | 0.001 |
> $300 \bmod 256$.
```

```quiz
? In C, what is `9 / 4` with integer operands?
= 2 | 0.001 |
> Truncating division.
```

```quiz
? What is `0x55 ^ 0xFF` in decimal?
= 170 | 0.001 |
> XOR with all ones inverts: `0xAA`.
```

```quiz
? Starting from 0, a register gets `r |= (1u << 3) | (1u << 0);`. What is its value?
= 9 | 0.001 |
> $8 + 1$.
```

```quiz
? What is `(0x1234 & 0x0F00) >> 8`?
= 2 | 0.001 |
> The mask keeps `0x0200`; shifting gives 2.
```

```quiz
? `int a[4] = {5, 10, 15, 20}; int *p = a; p += 2;` What is `*(p - 1)`?
= 10 | 0.001 |
> `p` points to `a[2]`; `p - 1` to `a[1]`.
```

```quiz
? In integer arithmetic, what is `(1000u * 3300u) / 4096u`?
= 805 | 0.001 |
> $3\,300\,000/4096 = 805.7$, truncated.
```

```quiz
? A module's internal helper function should be declared:
+ `static`, so it's private to its source file
- `extern`, in the header
- `volatile`
- in every source file that uses the module
> Only the public interface belongs in the header.
```
