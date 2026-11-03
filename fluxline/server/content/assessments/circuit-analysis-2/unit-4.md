Covers Lessons 4.1–4.2: s-domain circuit analysis, transfer functions, poles and zeros.

```quiz
? A 0.5 H inductor is in series with a 2 F capacitor. What is their s-domain impedance at $s = 2$, in Ω?
= 1.25 | 0.01 | Ω
> $sL + \frac{1}{sC} = 1 + \frac{1}{4} = 1.25\ \Omega$.
```

```quiz
? Use the final value theorem on $F(s) = \dfrac{5(s + 4)}{s(s + 2)(s + 10)}$. What is $f(\infty)$?
= 1 | 0.01 |
> $\lim_{s\to0} sF(s) = \frac{5 \cdot 4}{2 \cdot 10} = 1$.
```

```quiz
? A current has transform $I(s) = \dfrac{6}{s(s + 3)}$. What is $i(t)$ at $t = 0.5$ s, in A?
= 1.554 | 0.01 | A
> Partial fractions: $\frac{2}{s} - \frac{2}{s+3}$, so $i(t) = 2(1 - e^{-3t})$ and $i(0.5) = 2(1 - e^{-1.5}) = 1.55$ A.
```

```quiz
? A circuit's characteristic polynomial is $s^2 + 4s + 13$. At what frequency, in rad/s, does its natural response oscillate?
= 3 | 0.01 | rad/s
> Roots $-2 \pm j3$: the response is $e^{-2t}\cos(3t + \phi)$.
```

```quiz
? A transfer function has poles at $-1$ and $-2 \pm j5$. The system is:
+ stable
- marginally stable
- unstable
- impossible to classify
> All poles have negative real parts.
```

```quiz
? What is the DC gain of $H(s) = \dfrac{s + 6}{s^2 + 5s + 6}$?
= 1 | 0.01 |
> $H(0) = 6/6 = 1$.
```
