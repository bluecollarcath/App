Covers Lessons 2.1–2.3: joint distributions, functions of random variables, and limit theorems.

```quiz
? $\text{Var}(X) = 16$, $\text{Var}(Y) = 25$ and $\text{Cov}(X, Y) = 10$. What is $\text{Var}(X - Y)$?
= 21 | 0.001 |
> $16 + 25 - 2(10) = 21$.
```

```quiz
? For the same variables, what is the correlation coefficient?
= 0.5 | 0.001 |
> $10/(4 \times 5)$.
```

```quiz
? Three independent noise sources of 4, 3 and 12 µV RMS are added. What is the total RMS noise, in µV?
= 13 | 0.001 | µV
> $\sqrt{16 + 9 + 144} = 13\ \mu$V.
```

```quiz
? $X$ has variance 4. What is the variance of $Y = -2X + 10$?
= 16 | 0.001 |
> $(-2)^2 \times 4$.
```

```quiz
? A sensor has noise $\sigma = 2$ mV. What is the standard deviation of the mean of 400 independent readings, in mV?
= 0.1 | 0.001 | mV
> $2/\sqrt{400} = 0.1$ mV.
```

```quiz
? 1000 independent Poisson(1) counts are added. Using the CLT, estimate the probability the total exceeds 1100.
= 0.00078 | 0.03 |
> Mean 1000, variance 1000, $\sigma = 31.6$: $Q(100/31.6) = Q(3.16) = 7.8\times10^{-4}$.
```

```quiz
? $X$ and $Y$ are independent. Then the PDF of $X + Y$ is:
+ the convolution of $f_X$ and $f_Y$
- the product $f_Xf_Y$
- the sum $f_X + f_Y$
- always Gaussian
> Sums of independent variables convolve their PDFs.
```
