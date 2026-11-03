The final exam covers all three units of Communication Systems. Numeric answers are accepted within about 1%.

```quiz
? An AM transmitter with $\mu = 1$ radiates 3 kW total. How much power is in the sidebands, in kW?
= 1 | 0.001 | kW
> Sideband fraction $\mu^2/(2 + \mu^2) = 1/3$.
```

```quiz
? Broadcast FM uses 75 kHz deviation and 15 kHz audio. What is the modulation index?
= 5 | 0.001 |
> $75/15$.
```

```quiz
? What is the Carson's-rule bandwidth of that signal, in kHz?
= 180 | 0.001 | kHz
> $2(75 + 15)$.
```

```quiz
? An AM superhet (455 kHz IF, high-side LO) is tuned to 600 kHz. What is the LO frequency, in kHz?
= 1055 | 0.001 | kHz
> $600 + 455$.
```

```quiz
? And what is the image frequency, in kHz?
= 1510 | 0.001 | kHz
> $600 + 910$.
```

```quiz
? A stage with noise factor 1.5 and gain 100 is followed by one with noise factor 21. What is the total noise factor (linear)?
= 1.7 | 0.001 |
> $1.5 + 20/100$.
```

```quiz
? What is the minimum baseband bandwidth for 8 Msym/s with zero ISI, in MHz?
= 4 | 0.001 | MHz
> Nyquist: $R_s/2$.
```

```quiz
? 16-QAM at 2.5 Msym/s carries what bit rate, in Mb/s?
= 10 | 0.001 | Mb/s
> $4 \times 2.5$.
```

```quiz
? A BPSK link has $E_b/N_0 = 4.5$ (linear). What is its bit-error rate?
= 0.00135 | 0.01 |
> $Q(3)$.
```

```quiz
? A link's SNR is 13 dB in a 2 MHz bandwidth, at 4 Mb/s. What is $E_b/N_0$, in dB?
= 9.99 | 0.005 | dB
> $13 + 10\log_{10}(2/4) = 13 - 3.01$.
```

```quiz
? What is the capacity of a 3 kHz channel with 30 dB SNR, in kb/s?
= 29.9 | 0.005 | kb/s
> $3000\log_2(1001) = 29.9$ kb/s.
```

```quiz
? What is the entropy of a binary source with $P(1) = 0.5$, in bits?
= 1 | 0.001 | bits
> The maximum for a binary source.
```

```quiz
? A (3, 1) repetition code is used with raw error probability 0.01. What is the decoded bit-error rate?
= 0.000298 | 0.01 |
> $3(0.01)^2(0.99) + (0.01)^3 = 2.98\times10^{-4}$.
```

```quiz
? A Wi-Fi channel of 20 MHz uses a 64-point FFT. What is the subcarrier spacing, in kHz?
= 312.5 | 0.001 | kHz
> $20\ \text{MHz}/64$.
```

```quiz
? Which technique lets several data streams share the same bandwidth at the same time using multiple antennas?
+ spatial multiplexing (MIMO)
- frequency hopping
- cyclic prefix
- pre-emphasis
> With $N_t$ and $N_r$ antennas, up to $\min(N_t, N_r)$ streams.
```
