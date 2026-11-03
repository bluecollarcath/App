The final exam covers all four units of Control Systems. Work each problem on paper; numeric answers are accepted within about 1%.

```quiz
? $G(s) = \dfrac{12}{s + 3}$ with unity feedback. What is the closed-loop DC gain?
= 0.8 | 0.001 |
> $T(0) = 12/15$.
```

```quiz
? $T(s) = \dfrac{49}{s^2 + 7s + 49}$. What is the percent overshoot?
= 16.3 | 0.01 | %
> $\zeta = 0.5$, so $100e^{-0.5\pi/\sqrt{0.75}} = 16.3\%$.
```

```quiz
? What is the 2% settling time of that system, in seconds?
= 1.143 | 0.005 | s
> $4/(\zeta\omega_n) = 4/3.5$.
```

```quiz
? For $s^3 + 2s^2 + 4s + K = 0$, what is the largest $K$ for stability?
= 8 | 0.001 |
> The $s^1$ row is $(8 - K)/2$.
```

```quiz
? $G(s) = \dfrac{100}{s(s + 5)(s + 10)}$ with unity feedback (stable). What is $e_{ss}$ for a unit ramp?
= 0.5 | 0.001 |
> $K_v = 100/50 = 2$.
```

```quiz
? $G(s) = \dfrac{K}{s(s + 3)(s + 6)}$. Where is the centroid of the asymptotes?
= -3 | 0.001 |
> $(0 - 3 - 6)/3$.
```

```quiz
? For the same $G$, at what gain $K$ does the locus cross the imaginary axis?
= 162 | 0.001 |
> $s^3 + 9s^2 + 18s + K$: the $s^1$ row vanishes at $K = 9 \times 18 = 162$ (crossing at $\pm j4.24$).
```

```quiz
? For the same $G$, where is the breakaway point?
= -1.268 | 0.005 |
> $3s^2 + 18s + 18 = 0 \Rightarrow s = -3 \pm \sqrt3$. Only $-1.27$ lies on the segment between 0 and $-3$.
```

```quiz
? By what factor does the lag compensator $C = (s + 0.2)/(s + 0.02)$ raise the low-frequency gain?
= 10 | 0.001 |
> $0.2/0.02 = 10$.
```

```quiz
? A loop has $\angle L(j\omega_c) = -120°$. What is the phase margin, in degrees?
= 60 | 0.001 | °
> $180° - 120°$, suggesting $\zeta \approx 0.6$.
```

```quiz
? At phase crossover $|L| = 0.5$. What is the gain margin, in dB?
= 6.02 | 0.01 | dB
> $20\log_{10}2 = 6.02$ dB.
```

```quiz
? Double integrator with state feedback: what $k_1$ gives $\omega_n = 4$ rad/s and $\zeta = 0.5$?
= 16 | 0.001 |
> The target is $s^2 + 4s + 16$, so $K = [16 \ \ 4]$.
```

```quiz
? The pole $s = -3$ sampled at $T = 0.1$ s maps to what $z$?
= 0.7408 | 0.001 |
> $e^{-0.3} = 0.741$.
```

```quiz
? Which derivative-term problem does differentiating $-y$ instead of the error $e$ avoid?
+ a spike in $u$ when the setpoint steps
- integrator windup
- steady-state error
- loss of phase margin from sampling
> A setpoint step makes $de/dt$ huge for an instant; $y$ can't jump, so $dy/dt$ stays finite.
```

```quiz
? You can estimate every state from the output if and only if:
+ the observability matrix $[\mathbf C;\ \mathbf{CA};\ \ldots;\ \mathbf{CA}^{n-1}]$ has full rank
- the controllability matrix has full rank
- $\mathbf A$ is stable
- $\mathbf C$ is square
> Observability is the dual of controllability.
```
