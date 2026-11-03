Covers Lessons 2.1–2.4: GPIO, interrupts, timers and PWM, and ADCs and DACs.

```quiz
? A yellow LED (1.8 V) on a 3.3 V pin should carry 15 mA. What resistor is needed, in Ω?
= 100 | 0.001 | Ω
> $(3.3 - 1.8)/0.015$.
```

```quiz
? What value does `x &= ~(1u << 3)` leave when `x` starts at 15?
= 7 | 0.001 |
> Clearing bit 3 of 0b1111 gives 0b0111.
```

```quiz
? A Cortex-M has 12-cycle interrupt latency at 100 MHz. What is it, in ns?
= 120 | 0.001 | ns
> $12/10^8$ s.
```

```quiz
? An ISR of 1000 cycles runs 300 times a second on a 50 MHz CPU. What CPU load does it add, in %?
= 0.6 | 0.001 | %
> $300 \times 1000/5\times10^7$.
```

```quiz
? A 72 MHz timer with PSC = 35 and ARR = 999 overflows at what rate, in Hz?
= 2000 | 0.001 | Hz
> $72\times10^6/(36 \times 1000)$.
```

```quiz
? A 64 MHz clock generates 50 kHz PWM. What is the duty-cycle resolution, in bits?
= 10.32 | 0.005 | bits
> $\log_2(1280)$.
```

```quiz
? What is the LSB of a 10-bit ADC with a 3.3 V reference, in mV?
= 3.223 | 0.005 | mV
> $3.3/1024$.
```

```quiz
? An ADC has 74 dB SINAD. What is its ENOB?
= 12 | 0.002 | bits
> $(74 - 1.76)/6.02$.
```
