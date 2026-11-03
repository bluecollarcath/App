Covers Lessons 4.1–4.2: controllability and pole placement, observers, and digital control.

```quiz
? $\mathbf A = \begin{bmatrix} 0 & 1 \\ -3 & -4 \end{bmatrix}$, $\mathbf B = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$. You want poles at $-4 \pm j3$. What is $k_1$?
= 22 | 0.001 |
> $\det(sI - A + BK) = s^2 + (4 + k_2)s + (3 + k_1)$. Target $s^2 + 8s + 25$: $k_1 = 22$, $k_2 = 4$.
```

```quiz
? Same system and target. What is $k_2$?
= 4 | 0.001 |
> $4 + k_2 = 8$.
```

```quiz
? $\mathbf A = \begin{bmatrix} 1 & 1 \\ 0 & 2 \end{bmatrix}$, $\mathbf B = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$. Is the system controllable?
+ No: $[\mathbf B \ \ \mathbf{AB}]$ has two identical columns, so its rank is 1
- Yes: $\mathbf A$ is invertible
- Yes: both entries of $\mathbf B$ are nonzero
- It can't be decided without $\mathbf C$
> $\mathbf{AB} = [2 \ \ 2]^T = 2\mathbf B$, so the columns are dependent.
```

```quiz
? An observer for the double integrator ($\mathbf C = [1 \ \ 0]$) should have poles at $-6, -6$. What is $\ell_2$?
= 36 | 0.001 |
> $(s + 6)^2 = s^2 + 12s + 36$, so $\ell_1 = 12$ and $\ell_2 = 36$.
```

```quiz
? $\dot x = -4x + u$ is discretized with a zero-order hold at $T = 0.05$ s. What is $\Gamma$?
= 0.04532 | 0.005 |
> $\Phi = e^{-0.2} = 0.8187$, and $\Gamma = (1 - \Phi)/4 = 0.0453$.
```

```quiz
? The pole $s = -2$ sampled at $T = 0.25$ s maps to what $z$?
= 0.6065 | 0.001 |
> $e^{-0.5} = 0.6065$.
```

```quiz
? A loop has a closed-loop bandwidth of 5 Hz. By the 10–30× rule, what is the minimum sample rate, in Hz?
= 50 | 0.001 | Hz
> $10 \times 5 = 50$ Hz.
```

```quiz
? The separation principle says that, with $u = -K\hat{\mathbf x}$ and a Luenberger observer:
+ the closed-loop poles are $\text{eig}(\mathbf A - \mathbf{BK})$ together with $\text{eig}(\mathbf A - \mathbf{LC})$
- the observer poles must equal the controller poles
- $K$ must be redesigned once $L$ is chosen
- the observer adds no poles
> So $K$ and $L$ can be designed independently.
```
