The final exam covers all five units of Circuit Analysis II. Work each problem on paper; numeric answers are accepted within about 1%.

```quiz
? An underdamped RLC has $\alpha = 300$ Np/s and $\omega_0 = 500$ rad/s. What is the damped frequency $\omega_d$, in rad/s?
= 400 | 0.01 | rad/s
> $\sqrt{500^2 - 300^2} = 400$ rad/s.
```

```quiz
? For that same circuit, approximately how long does the step response take to settle within 2%, in ms?
= 13.33 | 0.01 | ms
> $t_s \approx 4/\alpha = 4/300$ s $= 13.3$ ms.
```

```quiz
? What is the magnitude of the phasor sum $10\angle0^\circ + 10\angle90^\circ$?
= 14.14 | 0.01 |
> $10 + j10$ has magnitude $10\sqrt2 = 14.14$.
```

```quiz
? A 10 Ω resistor is in parallel with an inductive impedance of $j10\ \Omega$. What is the magnitude of the combination, in Ω?
= 7.071 | 0.01 | Ω
> $\frac{10(j10)}{10 + j10} = 5 + j5$, magnitude 7.07 Ω.
```

```quiz
? A load draws $\mathbf I = 5\angle{-36.87^\circ}$ A rms from $\mathbf V = 230\angle0^\circ$ V rms. What real power does it absorb, in W?
= 920 | 0.01 | W
> $\mathbf S = \mathbf V\mathbf I^* = 1150\angle36.87^\circ = 920 + j690$ VA.
```

```quiz
? For that same load, what is the reactive power, in VAR?
= 690 | 0.01 | VAR
> The imaginary part of $\mathbf S$: 690 VAR (positive, so inductive).
```

```quiz
? A three-phase feeder at 13.8 kV line-to-line carries 100 A per line at 0.9 power factor. What real power does it deliver, in kW?
= 2151 | 0.01 | kW
> $\sqrt3 \times 13\,800 \times 100 \times 0.9 = 2.151$ MW.
```

```quiz
? A 50 kVA single-phase transformer is rated 2400/240 V. What is its rated secondary current, in A?
= 208.3 | 0.01 | A
> $50\,000/240 = 208.3$ A.
```

```quiz
? Use the initial value theorem on $F(s) = \dfrac{3s + 2}{s(s + 4)}$. What is $f(0^+)$?
= 3 | 0.01 |
> $\lim_{s\to\infty} sF(s) = \lim \frac{3s + 2}{s + 4} = 3$.
```

```quiz
? For that same $F(s)$, what is $f(\infty)$?
= 0.5 | 0.01 |
> $\lim_{s\to0} sF(s) = 2/4 = 0.5$.
```

```quiz
? A circuit has transfer function $H(s) = \dfrac{20}{s + 20}$. What is its time constant, in ms?
= 50 | 0.01 | ms
> The pole is at $-20$ s⁻¹, so $\tau = 1/20$ s $= 50$ ms.
```

```quiz
? What is the gain of $H(s) = \dfrac{1000}{s + 1000}$ at $\omega = 1000$ rad/s, in dB?
= -3.01 | 0.01 | dB
> At the corner, $|H| = 1/\sqrt2$, i.e. −3.01 dB.
```

```quiz
? What is the gain of a 2nd-order Butterworth low-pass at twice its cutoff frequency, in dB?
= -12.3 | 0.01 | dB
> $-10\log_{10}(1 + 2^4) = -12.3$ dB.
```

```quiz
? A unity-gain Sallen–Key low-pass uses $R_1 = R_2 = 10$ kΩ and $C_1 = C_2 = 10$ nF. What is its natural frequency $f_0$, in Hz?
= 1592 | 0.01 | Hz
> $f_0 = \frac{1}{2\pi RC} = 1592$ Hz. (Its $Q$ is only 0.5, below Butterworth.)
```

```quiz
? Several two-port stages are connected in cascade. The simplest way to find the overall two-port is to:
- add their z-parameter matrices
- add their y-parameter matrices
+ multiply their ABCD matrices in order
- average their h-parameters
> Cascade connections multiply transmission (ABCD) matrices.
```
