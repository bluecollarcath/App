The final exam covers all three units of Linear Algebra. Numeric answers are accepted within about 1%.

```quiz
? Solve $3x + 2y = 12$, $x - y = -1$. What is $x$?
= 2 | 0.001 |
> $x = y - 1$; $3y - 3 + 2y = 12$, $y = 3$.
```

```quiz
? What is the determinant of $\begin{bmatrix} 6 & 2 \\ 3 & 4 \end{bmatrix}$?
= 18 | 0.001 |
> $24 - 6$.
```

```quiz
? What is the (2, 2) entry of the inverse of $\begin{bmatrix} 6 & 2 \\ 3 & 4 \end{bmatrix}$?
= 0.3333 | 0.002 |
> $6/18$.
```

```quiz
? Approximately how many operations does dense LU of a $1000 \times 1000$ matrix take, in millions?
= 666.7 | 0.002 |
> $\tfrac23 \times 10^9$.
```

```quiz
? A $6 \times 9$ matrix has rank 5. What is the dimension of its null space?
= 4 | 0.001 |
> $9 - 5$.
```

```quiz
? What is the length of $(1, 2, 2, 4)$?
= 5 | 0.001 |
> $\sqrt{1 + 4 + 4 + 16}$.
```

```quiz
? Project $(0, 6)$ onto $(3, 4)$. What is the second component of the projection?
= 3.84 | 0.002 |
> $\frac{24}{25}(3, 4)$.
```

```quiz
? Fit a constant to the data 10, 12, 11, 15. What is the least-squares value?
= 12 | 0.001 |
> The mean.
```

```quiz
? $\det A = 2$ for a $4 \times 4$ matrix. What is $\det(3A)$?
= 162 | 0.001 |
> $3^4 \times 2$.
```

```quiz
? Using Cramer's rule on $2x + y = 3$, $x + 2y = 3$, what is $x$?
= 1 | 0.001 |
> $\det A = 3$; $\det A_x = 6 - 3 = 3$.
```

```quiz
? What is the larger eigenvalue of $\begin{bmatrix} 1 & 4 \\ 2 & 3 \end{bmatrix}$?
= 5 | 0.001 |
> $\lambda^2 - 4\lambda - 5 = 0$: 5 and $-1$.
```

```quiz
? A $3 \times 3$ matrix has eigenvalues 2, 3 and 4. What is its determinant?
= 24 | 0.001 |
> The product of the eigenvalues.
```

```quiz
? For $\dot{\mathbf x} = A\mathbf x$ with eigenvalues $-1$ and $-4$, the solution component $x_1 = 3e^{-t} - e^{-4t}$. What is $x_1(0.5)$?
= 1.6843 | 0.002 |
> $3(0.6065) - 0.1353$.
```

```quiz
? What is the largest singular value of $\begin{bmatrix} 3 & 0 \\ 0 & -5 \end{bmatrix}$?
= 5 | 0.001 |
> Singular values are non-negative: 5 and 3.
```

```quiz
? Which factorization exists for every real matrix, of any shape?
+ the singular value decomposition
- diagonalization $V\Lambda V^{-1}$
- the Cholesky factorization
- $LU$ without pivoting
> The SVD always exists.
```
