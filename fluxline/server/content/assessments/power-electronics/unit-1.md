Covers Lessons 1.1–1.3: volt-second balance, the buck, boost and buck-boost converters, and isolated converters.

```quiz
? A buck converts 5 V to 1.8 V. What is its duty cycle?
= 0.36 | 0.001 |
> $D = V_o/V_{in}$.
```

```quiz
? That buck uses $L = 2.2\ \mu$H at 1 MHz. What is the inductor ripple, in A?
= 0.5236 | 0.005 | A
> $(5 - 1.8)(0.36)/(2.2\times10^{-6} \times 10^6)$.
```

```quiz
? A boost converter raises 12 V to 36 V. What is $D$?
= 0.6667 | 0.002 |
> $1 - 12/36$.
```

```quiz
? That boost delivers 3 A. What is its average inductor current, in A?
= 9 | 0.001 | A
> $I_o/(1 - D) = 3/(1/3)$.
```

```quiz
? A flyback with $n = 1/5$ converts 160 V to 19 V. What is $D$?
= 0.3725 | 0.005 |
> $D/(1 - D) = 19/32$.
```

```quiz
? What voltage must that flyback's switch block (ignoring leakage spikes), in V?
= 255 | 0.001 | V
> $160 + 19/0.2$.
```

```quiz
? Volt-second balance on an inductor in steady state means:
+ the average inductor voltage over a switching period is zero
- the average inductor current is zero
- the capacitor voltage is constant
- the duty cycle is 50%
> Otherwise the inductor current would grow without bound.
```
