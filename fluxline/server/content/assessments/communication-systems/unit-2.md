Covers Lessons 2.1–2.3: pulse shaping and ISI, digital modulation, and optimum detection.

```quiz
? A 3 Msym/s signal uses raised-cosine pulses with $\alpha = 0.35$. What RF bandwidth does it occupy, in MHz?
= 4.05 | 0.002 | MHz
> $(1 + 0.35) \times 3$.
```

```quiz
? A 6 MHz RF channel with $\alpha = 0.2$ carries 64-QAM. What is the maximum bit rate, in Mb/s?
= 30 | 0.001 | Mb/s
> $R_s = 6/1.2 = 5$ Msym/s; $\times 6$ bits $= 30$ Mb/s.
```

```quiz
? How many bits per symbol does 1024-QAM carry?
= 10 | 0.001 |
> $\log_21024$.
```

```quiz
? A BPSK link has $E_b/N_0 = 8$ dB. What is its bit-error rate?
= 0.000191 | 0.02 |
> $E_b/N_0 = 6.31$; $Q(\sqrt{12.62}) = Q(3.55) = 1.9\times10^{-4}$.
```

```quiz
? Received power is $10^{-13}$ W at 100 kb/s, and $N_0 = 4\times10^{-21}$ W/Hz. What is $E_b/N_0$, in dB?
= 23.98 | 0.005 | dB
> $E_b = 10^{-18}$ J; $E_b/N_0 = 250$, or 24.0 dB.
```

```quiz
? Moving from QPSK to 16-QAM at the same symbol rate:
+ doubles the bit rate but needs more SNR for the same error rate
- doubles the bandwidth
- halves the bit rate
- improves the bit-error rate at the same SNR
> More points in the same energy budget sit closer together.
```
