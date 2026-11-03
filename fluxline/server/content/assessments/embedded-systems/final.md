The final exam covers all three units of Embedded Systems. Numeric answers are accepted within about 1%.

```quiz
? A program executes $5\times10^8$ instructions at CPI 2 on a 100 MHz MCU. How long does it take, in s?
= 10 | 0.001 | s
> $5\times10^8 \times 2/10^8$.
```

```quiz
? How many bytes does a 24-bit address space cover, in MiB?
= 16 | 0.001 | MiB
> $2^{24} = 16 \times 2^{20}$.
```

```quiz
? Pipeline stages take 300, 200, 250, 300 and 150 ps, plus 20 ps register overhead. What is the clock period, in ps?
= 320 | 0.001 | ps
> $300 + 20$.
```

```quiz
? 25% of instructions are branches, mispredicted 8% of the time with a 3-cycle penalty. How much CPI do they add?
= 0.06 | 0.001 |
> $0.25 \times 0.08 \times 3$.
```

```quiz
? A cache has a 1-cycle hit time, 3% miss rate and 150-cycle penalty. What is the AMAT, in cycles?
= 5.5 | 0.001 | cycles
> $1 + 0.03 \times 150$.
```

```quiz
? A direct-mapped 8 KB cache with 16-byte blocks uses how many index bits?
= 9 | 0.001 | bits
> 512 blocks.
```

```quiz
? A blue LED (3.0 V) runs from a 5 V pin at 10 mA. What resistor is needed, in Ω?
= 200 | 0.001 | Ω
> $2/0.01$.
```

```quiz
? An ISR of 300 cycles runs at 20 kHz on a 120 MHz CPU. What CPU load is that, in %?
= 5 | 0.001 | %
> $20000 \times 300/1.2\times10^8$.
```

```quiz
? A 16 MHz timer with PSC = 15 and ARR = 19999 overflows at what rate, in Hz?
= 50 | 0.001 | Hz
> $16\times10^6/(16 \times 20000)$, a servo frame rate.
```

```quiz
? With ARR = 19999 at a 1 MHz tick, what CCR gives a 1.5 ms pulse?
= 1500 | 0.001 |
> 1500 ticks of 1 µs.
```

```quiz
? A 12-bit ADC with 2.048 V reference reads code 3000. What is the input voltage, in V?
= 1.5 | 0.001 | V
> $3000 \times 2.048/4096$.
```

```quiz
? A UART at 1 Mbaud with 8N1 framing transfers how many bytes per second?
= 100000 | 0.001 |
> 10 bits per byte.
```

```quiz
? Two tasks have $(C, T)$ = (3, 10) and (4, 10) ms. What is their utilization?
= 0.7 | 0.001 |
> $0.3 + 0.4$, below the 2-task bound of 0.828.
```

```quiz
? Lowering $V_{DD}$ from 1.2 V to 0.9 V reduces dynamic power to what fraction?
= 0.5625 | 0.002 |
> $(0.9/1.2)^2$.
```

```quiz
? Why is `volatile` needed on a variable shared between an ISR and the main loop?
+ So the compiler always reads it from memory instead of keeping a stale copy in a register
- To make the variable atomic
- To place it in flash
- To give the ISR higher priority
> `volatile` prevents caching but does not make multi-byte access atomic.
```
