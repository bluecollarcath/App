Covers Lessons 4.1–4.2: amplifier models, loading and cascading, and low-frequency response.

```quiz
? An amplifier with $R_{in} = 40$ kΩ, $A_{vo} = 50$ and $R_{out} = 1$ kΩ is driven from a 10 kΩ source into a 4 kΩ load. What is the overall gain $v_o/v_s$?
= 32 | 0.001 |
> $\frac{40}{50} \cdot 50 \cdot \frac{4}{5} = 32$.
```

```quiz
? Two cascaded stages have loaded gains of 10 and 10. What is the total gain, in dB?
= 40 | 0.001 | dB
> $10 \times 10 = 100 = 40$ dB (gains in dB add: 20 + 20).
```

```quiz
? A 1 µF coupling capacitor sees 10 kΩ. What is its corner frequency, in Hz?
= 15.92 | 0.01 | Hz
> $1/(2\pi \cdot 10^4 \cdot 10^{-6}) = 15.9$ Hz.
```

```quiz
? A coupling capacitor sees $R_s + R_{in} = 8$ kΩ. What capacitance gives a 20 Hz corner, in µF?
= 0.995 | 0.01 | µF
> $C = 1/(2\pi \cdot 20 \cdot 8000) = 0.995\ \mu$F; use the next standard value up (1 µF).
```

```quiz
? An ideal voltage amplifier has:
+ infinite input resistance and zero output resistance
- zero input resistance and infinite output resistance
- equal input and output resistance
- zero input and output resistance
> Then neither the input nor the output divider loses any signal.
```

```quiz
? A photodiode produces a current, and you want a voltage out. Which amplifier type fits?
+ transresistance
- transconductance
- current
- voltage
> A transresistance amplifier converts input current to output voltage (gain in V/A).
```
