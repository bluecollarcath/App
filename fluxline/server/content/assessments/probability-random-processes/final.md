The final exam covers all three units of Probability & Random Processes. Use $4kT = 1.6\times10^{-20}$ J and $Q(1) = 0.1587$, $Q(2) = 0.0228$, $Q(3) = 0.00135$. Numeric answers are accepted within about 1%.

```quiz
? Two fair dice are rolled. What is the probability the sum is 7?
= 0.16667 | 0.002 |
> 6 of the 36 outcomes.
```

```quiz
? 1% of transmitted packets are corrupted. A checksum catches 99% of corrupted packets and wrongly rejects 0.5% of good ones. Given a rejection, what is the probability the packet was really corrupted?
= 0.6667 | 0.005 |
> $0.0099/(0.0099 + 0.00495) = 0.667$.
```

```quiz
? A link has bit-error probability $10^{-4}$. Using the Poisson approximation, what is the probability that a 10,000-bit frame has no errors?
= 0.3679 | 0.002 |
> $\lambda = 1$; $e^{-1}$.
```

```quiz
? 20 independent trials each succeed with probability 0.1. What is the expected number of successes?
= 2 | 0.001 |
> $np$.
```

```quiz
? What is the variance of that number of successes?
= 1.8 | 0.001 |
> $np(1 - p) = 20(0.1)(0.9)$.
```

```quiz
? $X \sim \mathcal N(10, 9)$. What is $P(X > 16)$?
= 0.0228 | 0.005 |
> $\sigma = 3$: $Q(2)$.
```

```quiz
? A "0" is sent as $-2$ V and a "1" as $+2$ V, with a threshold at 0 and Gaussian noise of $\sigma = 2/3$ V. What is the bit error probability?
= 0.00135 | 0.01 |
> $Q(2/(2/3)) = Q(3)$.
```

```quiz
? Independent $X$ and $Y$ have variances 2 and 7. What is the standard deviation of $X + Y$?
= 3 | 0.001 |
> $\sqrt{9} = 3$.
```

```quiz
? $X$ is uniform on $[0, 1]$. What is $E[X^3]$?
= 0.25 | 0.001 |
> $\int_0^1 x^3\,dx = 1/4$.
```

```quiz
? To cut measurement noise by a factor of 5 (in RMS), how many independent readings must be averaged?
= 25 | 0.001 |
> $\sigma/\sqrt n$, so $n = 25$.
```

```quiz
? $X(t) = 4\cos(\omega_0t + \Theta)$ with uniform random phase. What is its average power?
= 8 | 0.001 |
> $A^2/2$.
```

```quiz
? A process has PSD 0.01 V²/Hz for $|f| < 1$ kHz and zero elsewhere. What is its RMS value, in V?
= 4.472 | 0.002 | V
> Power $= 0.01 \times 2000 = 20$ V², RMS $= \sqrt{20} = 4.47$ V.
```

```quiz
? What is the kT/C noise of a 4 pF capacitor at room temperature, in µV RMS?
= 31.62 | 0.005 | µV
> $\sqrt{4\times10^{-21}/4\times10^{-12}} = 31.6\ \mu$V.
```

```quiz
? A 100 kΩ resistor's thermal noise is measured in a 20 kHz bandwidth. What is its RMS value, in µV?
= 5.657 | 0.005 | µV
> $\sqrt{1.6\times10^{-20} \times 10^5 \times 2\times10^4} = 5.66\ \mu$V.
```

```quiz
? The PSD of a WSS process is:
+ the Fourier transform of its autocorrelation function
- the Fourier transform of one sample function
- the derivative of its CDF
- the square of its mean
> That's the Wiener–Khinchin theorem.
```
