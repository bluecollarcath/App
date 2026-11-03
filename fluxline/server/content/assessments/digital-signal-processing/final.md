The final exam covers all four units of Digital Signal Processing. Numeric answers are accepted within about 1%.

```quiz
? A signal has content up to 22 kHz. What is the minimum sampling rate to avoid aliasing, in kHz?
= 44 | 0.001 | kHz
> Twice the highest frequency.
```

```quiz
? A 30 kHz tone is sampled at 48 kHz. At what frequency does it appear, in kHz?
= 18 | 0.001 | kHz
> $48 - 30 = 18$ kHz.
```

```quiz
? What is the ideal SQNR of a 16-bit converter with a full-scale sine, in dB?
= 98.08 | 0.002 | dB
> $6.02(16) + 1.76$.
```

```quiz
? What is the DC gain of $y[n] = 0.75\,y[n-1] + x[n]$?
= 4 | 0.001 |
> $1/(1 - 0.75)$.
```

```quiz
? At $f_s = 1$ kHz, what frequency (in Hz) corresponds to $\omega = \pi/2$?
= 250 | 0.001 | Hz
> $f_s/4$.
```

```quiz
? A 1024-point DFT at $f_s = 2.048$ kHz has what bin spacing, in Hz?
= 2 | 0.001 | Hz
> $2048/1024$.
```

```quiz
? In that DFT, which bin holds a 100 Hz tone?
= 50 | 0.001 |
> $100/2$.
```

```quiz
? How many complex multiplications does a 256-point radix-2 FFT need?
= 1024 | 0.001 |
> $\tfrac{256}{2}\log_2256 = 128 \times 8$.
```

```quiz
? In a 16-point FFT, input sample 1 is stored at which bit-reversed position?
= 8 | 0.001 |
> 0001 reversed is 1000 = 8.
```

```quiz
? A symmetric 41-tap FIR runs at 8 kHz. What is its delay, in ms?
= 2.5 | 0.001 | ms
> 20 samples / 8 kHz.
```

```quiz
? What is the minimum Butterworth order for 60 dB of attenuation at 10 times the cutoff?
= 3 | 0.001 |
> $\log_{10}(10^6 - 1)/2 = 3.0$, and each order gives 20 dB/decade.
```

```quiz
? A 5th-order Butterworth filter is how many dB down at twice its cutoff?
= 30.10 | 0.005 | dB
> $10\log_{10}(1 + 2^{10}) = 30.1$ dB.
```

```quiz
? 48 kHz audio is converted to 32 kHz. In lowest terms, what is $M$ in $L/M$?
= 3 | 0.001 |
> $32/48 = 2/3$: upsample by 2, downsample by 3.
```

```quiz
? Why do high-order IIR filters use cascaded second-order sections?
+ To reduce the sensitivity of pole locations to coefficient rounding
- To make the phase linear
- To reduce the filter order
- Because FFTs require it
> Each biquad's poles depend on only two coefficients.
```
