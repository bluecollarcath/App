Covers Lessons 1.1–1.3: schematic symbols and conventions, reading a real schematic, and using datasheets to select components.

```quiz
? A resistor is marked "4k7" on a schematic. What is its value, in Ω?
= 4700 | 0.001 | Ω
> The letter marks the decimal point and multiplier.
```

```quiz
? A resistor is marked "2R2." What is its value, in Ω?
= 2.2 | 0.001 | Ω
> R marks the decimal point.
```

```quiz
? A red LED (2.1 V drop) is driven from 5 V through a 470 Ω resistor. What is the LED current, in mA?
= 6.17 | 0.005 | mA
> $(5 - 2.1)/470$.
```

```quiz
? A linear regulator drops 5 V to 3.3 V at 150 mA. How much power does it dissipate, in W?
= 0.255 | 0.001 | W
> $(5 - 3.3)(0.15)$.
```

```quiz
? That regulator has $\theta_{JA} = 180$ °C/W in 35 °C ambient. What is its junction temperature, in °C?
= 80.9 | 0.001 | °C
> $35 + 0.255 \times 180$.
```

```quiz
? 3.3 V is applied across a 220 Ω, 0603 resistor rated 0.1 W. What fraction of its rating does it dissipate?
= 0.495 | 0.005 |
> $P = 3.3^2/220 = 49.5$ mW: right at the 50% derating limit.
```

```quiz
? A regulator's datasheet lists "absolute maximum input: 24 V" and "recommended input: 4.5–18 V." What is the right design input range?
+ 4.5–18 V, with margin below the absolute maximum for transients
- up to 24 V continuously
- anything below 30 V
- exactly 24 V
> Absolute maximum ratings are limits, not operating conditions.
```

```quiz
? A pin is labeled nRST and has a 10 kΩ resistor to +3V3 and nothing else driving it. The chip is:
+ running, because the active-low reset is held high (deasserted)
- held in reset
- unpowered
- in a test mode
> Active-low signals are asserted when low.
```

```quiz
? Two wires on different sheets both carry the net label "UART_TX." They are:
+ the same net
- different nets, because they're on different sheets
- connected through a buffer
- connected only if a bus line joins them
> Same name, same net.
```
