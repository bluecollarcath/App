Covers Lessons 4.1–4.2: first-order linear systems and numerical methods.

```quiz
? $A = \begin{bmatrix} -1 & 2 \\ 0 & -4\end{bmatrix}$. What is its slower eigenvalue?
= -1 | 0.001 |
> Triangular: eigenvalues on the diagonal.
```

```quiz
? $A = \begin{bmatrix} 0 & 1 \\ -9 & -2\end{bmatrix}$. What is the real part of its eigenvalues?
= -1 | 0.001 |
> $\lambda^2 + 2\lambda + 9 = 0$: $-1 \pm j\sqrt8$.
```

```quiz
? A $2 \times 2$ system has trace $-5$ and determinant 4. What is its faster eigenvalue?
= -4 | 0.001 |
> $\lambda^2 + 5\lambda + 4 = 0$: $-1$, $-4$; a stable node.
```

```quiz
? Two Euler steps with $h = 0.1$ on $y' = -5y$, $y(0) = 1$: what is $y_2$?
= 0.25 | 0.001 |
> Each step multiplies by 0.5.
```

```quiz
? What is the largest stable forward-Euler step for $y' = -200y$, in ms?
= 10 | 0.001 | ms
> $2/200$ s.
```

```quiz
? A phase portrait with eigenvalues $2$ and $-3$ is a:
+ saddle
- stable node
- center
- stable spiral
> Real eigenvalues of opposite sign.
```
