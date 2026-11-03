Covers Lessons 1.1–1.2: transfer functions, block diagrams, feedback, and state-space models.

```quiz
? $G(s) = \dfrac{10}{s + 2}$ with unity negative feedback. What is the closed-loop DC gain?
= 0.8333 | 0.005 |
> $T = \dfrac{10}{s + 12}$, so $T(0) = 10/12 = 0.833$.
```

```quiz
? Where is the closed-loop pole of that system?
= -12 | 0.001 |
> $1 + G = 0 \Rightarrow s + 2 + 10 = 0$.
```

```quiz
? Blocks $\dfrac{2}{s + 1}$ and $\dfrac{3}{s + 4}$ are in series. What is the DC gain of the cascade?
= 1.5 | 0.001 |
> $2 \cdot 3/(1 \cdot 4) = 1.5$; series blocks multiply.
```

```quiz
? A loop has $GH = 99$ at low frequency. What fraction of an output disturbance remains once the loop is closed?
= 0.01 | 0.001 |
> The sensitivity is $1/(1 + GH) = 1/100$.
```

```quiz
? $\mathbf A = \begin{bmatrix} 0 & 1 \\ -2 & -3 \end{bmatrix}$. Enter the eigenvalue farther from zero.
= -2 | 0.001 |
> $s^2 + 3s + 2 = (s + 1)(s + 2)$.
```

```quiz
? $\mathbf A = \begin{bmatrix} 0 & 1 \\ -6 & -5 \end{bmatrix}$, $\mathbf B = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$, $\mathbf C = [1 \ \ 0]$. What is the DC gain $G(0)$?
= 0.1667 | 0.005 |
> In this companion form $G(s) = 1/(s^2 + 5s + 6)$, so $G(0) = 1/6$.
```

```quiz
? How many state variables does a third-order differential equation need?
= 3 | 0 |
> One per order: $y$, $\dot y$ and $\ddot y$.
```
