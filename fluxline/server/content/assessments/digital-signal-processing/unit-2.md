Covers Lessons 2.1–2.3: the DFT, the FFT, and windowing.

```quiz
? A 4096-point DFT of audio sampled at 44.1 kHz has what bin spacing, in Hz?
= 10.77 | 0.005 | Hz
> $44100/4096$.
```

```quiz
? What is $X[0]$ for $x = [1, 3, -2, 5, 1]$?
= 8 | 0.001 |
> The sum of the samples.
```

```quiz
? What is the speed-up of a 2048-point radix-2 FFT over a direct DFT, in complex multiplications?
= 372.4 | 0.005 |
> $2048^2/(1024 \times 11) = 372$.
```

```quiz
? To linearly convolve sequences of length 300 and 125 using FFTs, what is the smallest power-of-2 FFT size?
= 512 | 0.001 |
> Need at least $300 + 125 - 1 = 424$ points; the next power of 2 is 512.
```

```quiz
? What is the highest sidelobe of the rectangular window, in dB?
= -13 | 0.03 | dB
> The first sinc sidelobe is about $-13.3$ dB.
```

```quiz
? To resolve two tones 1 Hz apart with a Hann window (about a 2-bin requirement), how long must the record be, in seconds?
= 2 | 0.001 | s
> Bins of 0.5 Hz are needed: $T = 1/0.5$.
```

```quiz
? Which change actually improves frequency resolution?
+ recording more samples at the same sampling rate
- zero padding
- applying a Blackman window
- raising the sampling rate with the same number of samples
> Resolution is set by the record duration.
```
