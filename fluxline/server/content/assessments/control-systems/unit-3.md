Covers Lessons 3.1–3.3: the root locus, PID and lead/lag compensation, and frequency-response stability margins.

```quiz
? $G(s) = \dfrac{K(s + 4)}{s(s + 2)(s + 6)}$. Where is the centroid of the asymptotes?
= -2 | 0.001 |
> $\big[(0 - 2 - 6) - (-4)\big]/2 = -2$, with asymptotes at $\pm90°$.
```

```quiz
? $G(s) = \dfrac{K}{s(s + 6)}$. Where is the breakaway point?
= -3 | 0.001 |
> $dK/ds = -(2s + 6) = 0$.
```

```quiz
? $G(s) = \dfrac{K}{s(s + 2)(s + 3)}$. At what frequency does the locus cross the imaginary axis, in rad/s?
= 2.449 | 0.005 | rad/s
> $s^3 + 5s^2 + 6s + K$: crossing at $K = 30$, where $5s^2 + 30 = 0$ gives $\omega = \sqrt6$.
```

```quiz
? A loop oscillates at $K_u = 20$ with $T_u = 1.5$ s. What integral gain $K_i$ does Ziegler–Nichols PID tuning give?
= 16 | 0.001 |
> $K_p = 12$, $T_i = 0.75$ s, so $K_i = K_p/T_i = 16$.
```

```quiz
? At gain crossover, $\angle L = -135°$. What is the phase margin, in degrees?
= 45 | 0.001 | °
> $180° - 135° = 45°$.
```

```quiz
? At phase crossover, $|L| = 0.1$. What is the gain margin, in dB?
= 20 | 0.001 | dB
> $20\log_{10}10 = 20$ dB.
```

```quiz
? A stable open loop ($P = 0$) has a Nyquist plot that circles $-1$ twice clockwise. How many closed-loop poles lie in the right half-plane?
= 2 | 0 |
> $Z = N + P = 2$.
```

```quiz
? Which controller term removes steady-state error to a step in a type-0 plant?
+ integral
- proportional
- derivative
- a lead compensator
> The integrator raises the system type by one.
```
