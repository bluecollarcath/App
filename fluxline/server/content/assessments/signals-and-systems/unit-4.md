Covers Lessons 4.1–4.3: Laplace analysis of systems, the z-transform, and sampling.

```quiz
? A system obeys $y'' + 5y' + 6y = 2x$. What is its DC gain?
= 0.3333 | 0.01 |
> $H(s) = \frac{2}{s^2 + 5s + 6}$, so $H(0) = 2/6$.
```

```quiz
? That same causal system ($s^2 + 5s + 6$ in the denominator) is:
+ stable, with poles at $-2$ and $-3$
- unstable, with poles at $+2$ and $+3$
- marginally stable
- non-causal
> Both poles are in the left half-plane.
```

```quiz
? For $y[n] = 0.8\,y[n-1] + x[n]$, what is the impulse response sample $h[2]$?
= 0.64 | 0.001 |
> $h[n] = 0.8^n$.
```

```quiz
? What is the DC gain of $y[n] = 0.8\,y[n-1] + x[n]$?
= 5 | 0.001 |
> $H(1) = 1/(1 - 0.8) = 5$.
```

```quiz
? A signal is bandlimited to 4 kHz. What is its Nyquist rate, in Hz?
= 8000 | 0.001 | Hz
> $2W = 8$ kHz.
```

```quiz
? A 7 kHz tone is sampled at 5 kHz. At what frequency does it appear, in Hz?
= 2000 | 0.001 | Hz
> $|7 - 5| = 2$ kHz, which lies below the 2.5 kHz Nyquist frequency.
```
