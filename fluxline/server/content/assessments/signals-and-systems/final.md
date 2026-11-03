The final exam covers all four units of Signals & Systems. Work each problem on paper; numeric answers are accepted within about 1%.

```quiz
? What is the energy of $x(t) = e^{-t}u(t)$?
= 0.5 | 0.01 |
> $\int_0^\infty e^{-2t}\,dt = 1/2$.
```

```quiz
? Is the system $y(t) = x(t) + 3$ linear?
- Yes
+ No
- Only for positive inputs
- Only if it is causal
> A zero input gives a nonzero output.
```

```quiz
? An LTI system has $h(t) = 3e^{-3t}u(t)$. For a unit step input, what is $y(1/3)$?
= 0.6321 | 0.01 |
> $y(t) = 1 - e^{-3t}$, so $y(1/3) = 1 - e^{-1} = 0.632$.
```

```quiz
? Convolve $[1, 2]$ with $[1, 2]$. What is the middle output sample?
= 4 | 0 |
> $[1, 2] * [1, 2] = [1, 4, 4]$, so $y[1] = 1 \cdot 2 + 2 \cdot 1 = 4$.
```

```quiz
? A 10-sample sequence is convolved with a 6-sample sequence. How many output samples are there?
= 15 | 0 |
> $10 + 6 - 1 = 15$.
```

```quiz
? In a square wave's Fourier series, what is the ratio of the 3rd harmonic's amplitude to the fundamental's?
= 0.3333 | 0.01 |
> Harmonic amplitudes fall as $1/k$.
```

```quiz
? The Gibbs overshoot at a jump is approximately what percentage of the jump?
= 9 | 0.1 | %
> About 9%, however many terms are kept.
```

```quiz
? A signal with 1 kHz bandwidth is compressed in time by a factor of 4. What is its new bandwidth, in Hz?
= 4000 | 0.001 | Hz
> Compressing in time stretches the spectrum by the same factor.
```

```quiz
? Which statement describes the convolution property of the Fourier transform?
+ Convolution in time becomes multiplication in frequency
- Multiplication in time becomes addition in frequency
- Convolution in time becomes convolution in frequency
- Convolution in time has no frequency-domain equivalent
> That's why filtering is multiplication of spectra: $Y = HX$.
```

```quiz
? What is the magnitude of the two-point average $h = [\tfrac12, \tfrac12]$ at $\omega = \pi$?
= 0 | 0.001 |
> $|\cos(\pi/2)| = 0$: the fastest alternating signal is cancelled.
```

```quiz
? What is the DC gain of $H(s) = \dfrac{10}{s + 5}$?
= 2 | 0.001 |
> $H(0) = 10/5$.
```

```quiz
? A causal continuous-time LTI system is stable exactly when:
+ all of its poles are in the left half of the s-plane
- all of its zeros are in the left half-plane
- its DC gain is less than 1
- it has no poles at the origin or in the left half-plane
> Each pole contributes $e^{p t}$, which decays only if $\operatorname{Re}\{p\} < 0$.
```

```quiz
? A causal discrete-time system has a single pole at $z = 0.9$ and $h[0] = 1$. What is $h[2]$?
= 0.81 | 0.001 |
> $h[n] = 0.9^n$.
```

```quiz
? A signal contains frequencies up to 15 kHz. What is its Nyquist rate, in Hz?
= 30000 | 0.001 | Hz
> $2 \times 15$ kHz.
```

```quiz
? What is the linear gain of a zero-order hold at $f = f_s/2$?
= 0.6366 | 0.01 |
> $|\operatorname{sinc}(0.5)| = 2/\pi = 0.637$, which is −3.9 dB.
```
