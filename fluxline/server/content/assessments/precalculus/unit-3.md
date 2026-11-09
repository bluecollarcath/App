Covers Lessons 3.1–3.2: exponential growth and decay, half-life, the number $e$ and the time constant; logarithms, the log rules, solving exponential equations, and decibels.

```quiz
? A population of 500 triples every hour. How large is it after 2 hours?
= 4500 | 0.001 |
> $500 \cdot 3^2 = 500 \cdot 9 = 4500$.
```

```quiz
? A \$20,000 car loses 15% of its value each year. What is it worth after 3 years, in dollars?
= 12282.5 | 0.001 | dollars
> Each year multiplies the value by $0.85$: $20000 \cdot 0.85^3 = 12282.50$.
```

```quiz
? A 64 g sample has a half-life of 5 years. How many grams remain after 20 years?
= 4 | 0.001 | g
> $20/5 = 4$ halvings: $64 \to 32 \to 16 \to 8 \to 4$ g.
```

```quiz
? A quantity decays as $e^{-t/\tau}$. What percentage remains after one time constant?
= 36.8 | 0.003 | %
> $e^{-1} \approx 0.368$: about 36.8% remains.
```

```quiz
? What is $\log_2 64$?
= 6 | 0.001 |
> $2^6 = 64$.
```

```quiz
? What is $\log_{10}(10^{-6})$?
= -6 | 0.001 |
> The log undoes the power of 10.
```

```quiz
? What is $\ln(e^{-3})$?
= -3 | 0.001 |
> ln undoes $e^x$.
```

```quiz
? Which is equal to $\log_{10}(100x)$?
+ $2 + \log_{10} x$
- $100 \log_{10} x$
- $2\log_{10} x$
- $\log_{10} 100 \cdot \log_{10} x$
> Product rule: $\log 100 + \log x = 2 + \log x$.
```

```quiz
? Solve $3^x = 50$, to two decimal places.
= 3.56 | 0.003 |
> $x = \dfrac{\ln 50}{\ln 3} \approx \dfrac{3.912}{1.099} \approx 3.56$.
```

```quiz
? A signal decays as $e^{-t/\tau}$ with $\tau = 10$ ms. After how many ms has it fallen to half?
= 6.931 | 0.003 | ms
> Solve $e^{-t/\tau} = 0.5$: $t = \tau \ln 2 \approx 10 \times 0.693 = 6.93$ ms.
```

```quiz
? A cable delivers $\tfrac{1}{1000}$ of the input power. What is its gain in dB?
= -30 | 0.001 | dB
> $10 \log_{10}(0.001) = 10 \times (-3) = -30$ dB.
```
