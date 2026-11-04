The final exam covers all four units of Differential Equations. Numeric answers are accepted within about 1%.

```quiz
? An RL circuit has $R = 100\ \Omega$ and $L = 50$ mH. What is its time constant, in ms?
= 0.5 | 0.001 | ms
> $L/R$.
```

```quiz
? Solve $y' + y = 5$, $y(0) = 1$. What is $y(1)$?
= 3.5285 | 0.002 |
> $y = 5 - 4e^{-t}$.
```

```quiz
? Solve $y' = -ty$ with $y(0) = 4$. What is $y(2)$?
= 0.5413 | 0.002 |
> $y = 4e^{-t^2/2}$; $4e^{-2}$.
```

```quiz
? What is the unstable equilibrium of $y' = y(2 - y)$?
= 0 | 0 |
> $f'(0) = 2 > 0$; $y = 2$ is stable.
```

```quiz
? $y'' + 6y' + 9y = 0$ with $y(0) = 1$, $y'(0) = 0$ has $y = (1 + 3t)e^{-3t}$. What is $y(1)$?
= 0.1991 | 0.002 |
> $4e^{-3}$.
```

```quiz
? For $y'' + 2y' + 2y = 0$, what is the damped oscillation frequency, in rad/s?
= 1 | 0.001 | rad/s
> $s = -1 \pm j$.
```

```quiz
? $y'' + 3y' + 2y = 5\cos t$ has $y_p = A\cos t + B\sin t$. What is $B$?
= 1.5 | 0.001 |
> $A + 3B = 5$, $B = 3A$: $A = 0.5$, $B = 1.5$.
```

```quiz
? A series RLC has $L = 25$ mH, $C = 1$ µF and $R = 50\ \Omega$. What is its $Q$?
= 3.162 | 0.002 |
> $(1/50)\sqrt{25\,000}$.
```

```quiz
? What is the bandwidth of that circuit, in rad/s?
= 2000 | 0.001 | rad/s
> $\omega_0/Q = R/L = 50/0.025$.
```

```quiz
? What is $\mathcal L\{e^{-2t}\sin3t\}$ at $s = 0$?
= 0.2308 | 0.002 |
> $3/((s + 2)^2 + 9) = 3/13$.
```

```quiz
? $F(s) = \dfrac{8(s + 1)}{s(s + 2)(s + 4)}$. What is $f(\infty)$?
= 1 | 0.001 |
> $8(1)/(2 \times 4)$.
```

```quiz
? $Y = \dfrac{3}{(s + 1)(s + 4)}$. What is $y(0.5)$?
= 0.4712 | 0.002 |
> $y = e^{-t} - e^{-4t}$.
```

```quiz
? $A = \begin{bmatrix} -4 & 1 \\ 1 & -4\end{bmatrix}$. What is its slower eigenvalue?
= -3 | 0.001 |
> Eigenvalues $-3$ (vector $(1, 1)$) and $-5$.
```

```quiz
? RK4 is used with step $h$. If $h$ is reduced to $h/3$, by what factor does the error shrink?
= 81 | 0.001 |
> $3^4$.
```

```quiz
? A stiff system is best integrated with:
+ an implicit method such as backward Euler or the trapezoidal rule
- forward Euler with a large step
- no numerical method at all
- the final value theorem
> Implicit methods remain stable with large steps.
```
