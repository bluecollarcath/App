Covers Lessons 2.1–2.2: convolution in continuous and discrete time.

```quiz
? An LTI system has $h(t) = e^{-t}u(t)$. For the input $x(t) = u(t)$, what is $y(2)$?
= 0.8647 | 0.01 |
> $y(t) = 1 - e^{-t}$ for $t \ge 0$, so $y(2) = 1 - e^{-2} = 0.865$.
```

```quiz
? A 5 ms pulse is convolved with an impulse response lasting 2 ms. How long does the output last, in ms?
= 7 | 0 | ms
> Widths add.
```

```quiz
? Convolve $x = [1, -1, 2]$ with $h = [2, 1]$ (both starting at $n = 0$). What is $y[2]$?
= 3 | 0 |
> $y[2] = x[1]h[1] + x[2]h[0] = -1 + 4 = 3$. The full output is $[2, -1, 3, 2]$.
```

```quiz
? An 8-sample signal passes through a 4-tap FIR filter. How many output samples are there?
= 11 | 0 |
> $8 + 4 - 1 = 11$.
```

```quiz
? A system has impulse response $h(t) = \delta(t - 3)$. What does it do?
+ Delays the input by 3
- Multiplies the input by 3
- Advances the input by 3
- Integrates the input over 3 seconds
> Convolving with a shifted impulse shifts the signal.
```

```quiz
? $x(t)$ has area 2 and $h(t)$ has area 4. What is the area of $x * h$?
= 8 | 0.001 |
> Areas multiply.
```
