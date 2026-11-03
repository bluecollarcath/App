Covers Lessons 2.1–2.3: transient specifications, Routh–Hurwitz stability, and steady-state error.

```quiz
? $T(s) = \dfrac{25}{s^2 + 6s + 25}$. What is the damping ratio $\zeta$?
= 0.6 | 0.001 |
> $\omega_n = 5$ and $2\zeta\omega_n = 6$.
```

```quiz
? What is the percent overshoot of that system?
= 9.48 | 0.01 | %
> $100e^{-0.6\pi/0.8} = 9.48\%$.
```

```quiz
? What is its 2% settling time, in seconds?
= 1.333 | 0.005 | s
> $4/(\zeta\omega_n) = 4/3$.
```

```quiz
? What is its peak time, in seconds?
= 0.7854 | 0.005 | s
> $\pi/(\omega_n\sqrt{1 - \zeta^2}) = \pi/4$.
```

```quiz
? For $s^3 + 5s^2 + 6s + K = 0$, what is the largest $K$ for stability?
= 30 | 0.001 |
> The $s^1$ row is $(30 - K)/5$, so $0 < K < 30$.
```

```quiz
? $G(s) = \dfrac{40}{s(s + 8)}$ with unity feedback. What is $e_{ss}$ for a unit ramp?
= 0.2 | 0.001 |
> $K_v = 40/8 = 5$, so $e_{ss} = 0.2$.
```

```quiz
? $G(s) = \dfrac{24}{(s + 2)(s + 3)}$ with unity feedback. What is $e_{ss}$ for a unit step?
= 0.2 | 0.001 |
> $K_p = 24/6 = 4$, so $e_{ss} = 1/5$.
```

```quiz
? In a Routh array, the number of right-half-plane roots equals:
+ the number of sign changes in the first column
- the number of negative coefficients in the polynomial
- the number of rows
- the number of zero entries
> That's the core result of the Routh–Hurwitz criterion.
```
