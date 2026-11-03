Covers Lessons 1.1–1.2: sampling, aliasing and quantization; difference equations and z-domain analysis.

```quiz
? A 12 kHz tone is sampled at 10 kHz. At what frequency does it appear, in kHz?
= 2 | 0.001 | kHz
> It aliases to $|12 - 10| = 2$ kHz.
```

```quiz
? What is the ideal SQNR of a 12-bit ADC with a full-scale sine input, in dB?
= 74 | 0.002 | dB
> $6.02(12) + 1.76 = 74.0$ dB.
```

```quiz
? A 10-bit ADC spans 3.3 V. What is its step size, in mV?
= 3.223 | 0.005 | mV
> $3.3/1024$.
```

```quiz
? What is the gain of $y[n] = -0.8\,y[n-1] + x[n]$ at DC?
= 0.5556 | 0.002 |
> $H(1) = 1/(1 + 0.8)$.
```

```quiz
? Where must the poles of a stable causal digital filter lie?
+ inside the unit circle
- in the left half-plane
- on the unit circle
- outside the unit circle
> The discrete-time stability region is $|z| < 1$.
```

```quiz
? A filter has a pair of zeros on the unit circle at $\omega = \pm\pi/3$, and $f_s = 360$ Hz. Which frequency does it null, in Hz?
= 60 | 0.001 | Hz
> $f = (\pi/3)/(2\pi) \times 360 = 60$ Hz.
```
