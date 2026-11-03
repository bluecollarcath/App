Covers Lessons 3.1–3.3: stationarity and autocorrelation, power spectral density, and random signals through LTI systems. Use $4kT = 1.6\times10^{-20}$ J at room temperature.

```quiz
? A WSS process has $R_X(\tau) = 4e^{-3|\tau|}$. What is its average power?
= 4 | 0.001 |
> $R_X(0)$.
```

```quiz
? $R_X(\tau) = e^{-|\tau|/2}$ (so $a = 0.5$). What is $S_X(0)$?
= 4 | 0.001 |
> $2a/a^2 = 2/a = 4$.
```

```quiz
? White noise with $N_0/2 = 10^{-8}$ W/Hz passes through an ideal 5 kHz lowpass filter. What is the output power, in W?
= 0.0001 | 0.001 | W
> $N_0B = 2\times10^{-8} \times 5000 = 10^{-4}$ W.
```

```quiz
? What is the noise-equivalent bandwidth of an RC filter with $R = 10$ kΩ and $C = 1\ \mu$F, in Hz?
= 25 | 0.001 | Hz
> $1/(4RC) = 1/0.04$.
```

```quiz
? What is the thermal noise of a 1 MΩ resistor in a 1 MHz bandwidth, in µV RMS?
= 126.5 | 0.005 | µV
> $\sqrt{1.6\times10^{-20} \times 10^{12}} = 126\ \mu$V.
```

```quiz
? A filter has $|H(f)| = 10$ across the band of a white input. By how many dB does the output PSD exceed the input PSD?
= 20 | 0.001 | dB
> $|H|^2 = 100$, which is 20 dB.
```

```quiz
? A process has constant mean and $R_X(t_1, t_2)$ that depends only on $t_2 - t_1$. It is:
+ wide-sense stationary
- necessarily ergodic
- necessarily white
- necessarily Gaussian
> That's the definition of WSS; ergodicity is a separate, stronger property.
```
