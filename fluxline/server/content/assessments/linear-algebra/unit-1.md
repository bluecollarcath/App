Covers Lessons 1.1–1.3: linear systems, matrix algebra, and LU factorization.

```quiz
? Solve $x + y = 7$, $x - y = 1$. What is $y$?
= 3 | 0.001 |
> Adding gives $x = 4$.
```

```quiz
? What is the (1, 2) entry of $\begin{bmatrix} 1 & 3 \\ 2 & 0 \end{bmatrix}\begin{bmatrix} 2 & 1 \\ 1 & 4 \end{bmatrix}$?
= 13 | 0.001 |
> Row 1 · column 2: $1 + 12$.
```

```quiz
? What is the (1, 2) entry of the inverse of $\begin{bmatrix} 2 & 5 \\ 1 & 3 \end{bmatrix}$?
= -5 | 0.001 |
> Determinant 1; the off-diagonal is negated.
```

```quiz
? Node equations $\begin{bmatrix} 0.5 & -0.1 \\ -0.1 & 0.3\end{bmatrix}\mathbf v = \begin{bmatrix} 2 \\ 0\end{bmatrix}$. What is $v_1$, in V?
= 4.286 | 0.002 | V
> $\det = 0.14$; $v_1 = 0.3 \times 2/0.14$.
```

```quiz
? $A = \begin{bmatrix} 4 & 2 \\ 8 & 7 \end{bmatrix} = LU$. What is the (2, 2) entry of $U$?
= 3 | 0.001 |
> Multiplier 2; $7 - 2 \times 2$.
```

```quiz
? A matrix has condition number $10^5$. About how many significant digits can be lost?
= 5 | 0.001 |
> $\log_{10}\kappa$.
```

```quiz
? During elimination you reach $[0\ 0 \mid 0]$ in a 2-unknown system with one other independent row. The system has:
+ infinitely many solutions
- no solution
- exactly one solution
- exactly two solutions
> One equation for two unknowns leaves a free variable.
```
