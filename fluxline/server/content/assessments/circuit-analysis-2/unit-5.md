Covers Lessons 5.1–5.3: Bode plots, passive and active filters, and two-port networks.

```quiz
? A gain of 1000 is how many decibels?
= 60 | 0.01 | dB
> $20\log_{10}1000 = 60$ dB.
```

```quiz
? What is the magnitude slope of a transfer function with two poles at the origin and nothing else, in dB/decade?
= -40 | 0.01 | dB/dec
> Each pole at the origin contributes −20 dB/decade.
```

```quiz
? What is the cutoff frequency of an RC low-pass filter with $R = 1$ kΩ and $C = 1\ \mu$F, in Hz?
= 159.2 | 0.01 | Hz
> $f_c = 1/(2\pi RC) = 159.2$ Hz.
```

```quiz
? A first-order low-pass filter is driven at 10 times its cutoff frequency. What is its gain, in dB?
= -20.04 | 0.01 | dB
> $20\log_{10}\left(1/\sqrt{1 + 100}\right) = -20.04$ dB.
```

```quiz
? A series RLC band-pass has $R = 5\ \Omega$, $L = 1$ mH and $C = 1\ \mu$F. What is its quality factor?
= 6.325 | 0.01 |
> $\omega_0 = 31\,623$ rad/s, $B = R/L = 5000$ rad/s, $Q = \omega_0/B = 6.32$.
```

```quiz
? A two-port is a series 5 Ω impedance followed by a shunt admittance of 0.1 S. What is its ABCD parameter $A$?
= 1.5 | 0.01 |
> $\begin{bmatrix}1&5\\0&1\end{bmatrix}\begin{bmatrix}1&0\\0.1&1\end{bmatrix} = \begin{bmatrix}1.5&5\\0.1&1\end{bmatrix}$.
```
