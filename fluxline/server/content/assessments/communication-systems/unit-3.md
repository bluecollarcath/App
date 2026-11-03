Covers Lessons 3.1–3.3: entropy and channel capacity, error-control coding, and OFDM and MIMO.

```quiz
? A source emits symbols with probabilities $\tfrac12, \tfrac14, \tfrac14$. What is its entropy, in bits/symbol?
= 1.5 | 0.001 |
> $\tfrac12(1) + \tfrac14(2) + \tfrac14(2)$.
```

```quiz
? What is the capacity of a 2 MHz channel with SNR = 255 (linear), in Mb/s?
= 16 | 0.001 | Mb/s
> $2\log_2256 = 16$ Mb/s.
```

```quiz
? What SNR (in dB) is needed for 4 b/s/Hz on an AWGN channel?
= 11.76 | 0.005 | dB
> $2^4 - 1 = 15$, or 11.8 dB.
```

```quiz
? A block code has $d_{min} = 7$. How many errors can it correct per codeword?
= 3 | 0.001 |
> $\lfloor 6/2 \rfloor$.
```

```quiz
? An OFDM system has 30 kHz subcarrier spacing. What is its useful symbol time, in µs?
= 33.33 | 0.005 | µs
> $1/30\ \text{kHz}$.
```

```quiz
? A $4\times4$ MIMO link at 5 MHz bandwidth and 20 dB SNR per stream (ideal). Using $C \approx \min(N_t, N_r)B\log_2(1 + \text{SNR})$, what is its capacity, in Mb/s?
= 133.2 | 0.005 | Mb/s
> $4 \times 5 \times \log_2101 = 4 \times 33.3 = 133$ Mb/s.
```

```quiz
? The cyclic prefix in OFDM is there to:
+ absorb multipath echoes so they don't cause intersymbol interference
- carry pilot tones
- increase the data rate
- reduce the peak-to-average power ratio
> It must be longer than the channel's delay spread.
```
