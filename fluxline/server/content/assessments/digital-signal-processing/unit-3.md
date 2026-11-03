Covers Lessons 3.1–3.3: FIR design, IIR design, and filter structures with finite word length.

```quiz
? A linear-phase FIR filter has 101 taps. What is its group delay, in samples?
= 50 | 0.001 | samples
> $(101 - 1)/2$.
```

```quiz
? Estimate the taps needed for 70 dB attenuation at $f_s = 48$ kHz with a 1 kHz transition band.
= 152.7 | 0.02 |
> $(70/22)(48) = 153$ taps.
```

```quiz
? How much is a 4th-order Butterworth filter attenuated at 3 times its cutoff, in dB?
= 38.17 | 0.005 | dB
> $10\log_{10}(1 + 3^8) = 38.2$ dB.
```

```quiz
? At $f_s = 44.1$ kHz, what analog frequency (in Hz) must a 5 kHz digital cutoff be pre-warped to?
= 5222.8 | 0.005 | Hz
> $2f_s\tan(\pi \cdot 5000/44100)/(2\pi) = 5223$ Hz.
```

```quiz
? A 12th-order IIR filter is built as biquads. How many sections?
= 6 | 0.001 |
> $12/2$.
```

```quiz
? Which filter type can have exactly linear phase?
+ FIR with symmetric coefficients
- Butterworth IIR
- elliptic IIR
- any filter designed with the bilinear transform
> IIR filters always have some phase nonlinearity.
```
