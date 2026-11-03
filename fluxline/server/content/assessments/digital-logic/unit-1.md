Covers Lessons 1.1–1.3: number systems, Boolean algebra and gates, canonical forms and Karnaugh maps.

```quiz
? What is $\text{A7}_{16}$ in decimal?
= 167 | 0 |
> $10 \cdot 16 + 7 = 167$.
```

```quiz
? What decimal value does the 8-bit two's-complement pattern $1110\,1100$ represent?
= -20 | 0 |
> Invert and add 1: $0001\,0100 = 20$, so the value is $-20$.
```

```quiz
? By De Morgan's law, $\overline{AB}$ equals:
+ $\overline{A} + \overline{B}$
- $\overline{A}\,\overline{B}$
- $A + B$
- $\overline{A + B}$
> Break the bar and change AND to OR.
```

```quiz
? Simplify $\overline{A}B + AB$.
- $A$
+ $B$
- $AB$
- $A + B$
> $(\overline{A} + A)B = B$.
```

```quiz
? Simplify $F(A, B, C) = \sum m(1, 3, 5, 7)$.
- $A$
- $B$
+ $C$
- $\overline{C}$
> Those are exactly the rows with $C = 1$.
```

```quiz
? How many rows does a 6-input truth table have?
= 64 | 0 |
> $2^6 = 64$.
```

```quiz
? In a 4-variable K-map, a group of 8 cells produces a term with how many literals?
= 1 | 0 |
> $8 = 2^3$ cells eliminates 3 of the 4 variables.
```
