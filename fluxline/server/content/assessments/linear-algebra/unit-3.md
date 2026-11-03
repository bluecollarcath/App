Covers Lessons 3.1–3.4: determinants, eigenvalues, diagonalization and the matrix exponential, and the SVD.

```quiz
? What is $\det\begin{bmatrix} 2 & 0 & 1 \\ 1 & 3 & 2 \\ 0 & 1 & 1 \end{bmatrix}$?
= 3 | 0.001 |
> $2(3 - 2) - 0 + 1(1 - 0)$.
```

```quiz
? What is the larger eigenvalue of $\begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}$?
= 6 | 0.001 |
> $\lambda^2 - 7\lambda + 6 = 0$: 1 and 6.
```

```quiz
? $\dot{\mathbf x} = \begin{bmatrix} 0 & 1 \\ -6 & -5 \end{bmatrix}\mathbf x$. What is the slower (smaller-magnitude) eigenvalue?
= -2 | 0.001 |
> $\lambda^2 + 5\lambda + 6 = 0$: $-2$ and $-3$.
```

```quiz
? A matrix has eigenvalues 0.9 and 0.5. What is the larger eigenvalue of $A^{10}$?
= 0.3487 | 0.002 |
> $0.9^{10}$.
```

```quiz
? $A^TA$ has eigenvalues 25 and 4. What is $A$'s condition number?
= 2.5 | 0.001 |
> $\sigma = 5, 2$; $5/2$.
```

```quiz
? What is the rank of a matrix with singular values 7, 3, 0 and 0?
= 2 | 0.001 |
> Two nonzero singular values.
```

```quiz
? A continuous-time system $\dot{\mathbf x} = A\mathbf x$ is stable if:
+ every eigenvalue of $A$ has a negative real part
- every eigenvalue has magnitude less than 1
- the determinant of $A$ is positive
- $A$ is symmetric
> $|\lambda| < 1$ is the discrete-time condition.
```
