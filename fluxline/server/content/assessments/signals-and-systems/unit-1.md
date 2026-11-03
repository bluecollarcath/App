Covers Lessons 1.1–1.2: signal classification and operations, and system properties.

```quiz
? What is the energy of $x(t) = 2e^{-3t}u(t)$?
= 0.6667 | 0.01 |
> $\int_0^\infty 4e^{-6t}\,dt = 4/6 = 0.667$.
```

```quiz
? What is the average power of $x(t) = 3\cos(5t)$?
= 4.5 | 0.01 |
> $A^2/2 = 9/2 = 4.5$.
```

```quiz
? $x(t)$ is nonzero only on $[0, 3]$. On what interval is $x(3t - 3)$ nonzero? Enter the right endpoint.
= 2 | 0.001 |
> $0 \le 3t - 3 \le 3 \Rightarrow 1 \le t \le 2$.
```

```quiz
? What is the fundamental period of $x(t) = \cos(4\pi t) + \sin(6\pi t)$, in seconds?
= 1 | 0.001 | s
> The periods are 0.5 s and 1/3 s; the smallest time that's a whole number of both is 1 s.
```

```quiz
? Which property does $y(t) = \cos\big(x(t)\big)$ lack?
+ Linearity
- Time invariance
- Causality
- Stability
> Doubling $x$ doesn't double $\cos(x)$. It is time-invariant, causal, and stable ($|y| \le 1$).
```

```quiz
? Is $y[n] = n\,x[n]$ time-invariant?
- Yes, because it is linear
+ No, the gain depends on the time index $n$
- Yes, because it is causal
- Only for $n \ge 0$
> Shifting the input by $k$ gives $n\,x[n-k]$, but shifting the output gives $(n-k)\,x[n-k]$.
```
