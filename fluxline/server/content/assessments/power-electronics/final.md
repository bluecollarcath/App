The final exam covers all three units of Power Electronics. Numeric answers are accepted within about 1%.

```quiz
? A buck converts 48 V to 12 V. What duty cycle does it need?
= 0.25 | 0.001 |
> $12/48$.
```

```quiz
? That buck switches at 250 kHz with $L = 33\ \mu$H. What is the inductor ripple, in A?
= 1.091 | 0.005 | A
> $(36)(0.25)/(33\times10^{-6} \times 2.5\times10^5)$.
```

```quiz
? With a 100 µF output capacitor (no ESR), what is the output ripple, in mV?
= 5.455 | 0.005 | mV
> $1.091/(8 \times 10^{-4} \times 2.5\times10^5)$.
```

```quiz
? A boost converts 3.7 V to 5 V. What is $D$?
= 0.26 | 0.001 |
> $1 - 3.7/5$.
```

```quiz
? A buck-boost at $D = 0.4$ from 15 V gives what output, in V?
= -10 | 0.001 | V
> $-15(0.4/0.6)$.
```

```quiz
? A forward converter with $n = 1/3$ converts 48 V to 5 V. What is $D$?
= 0.3125 | 0.002 |
> $5/(48/3)$.
```

```quiz
? A three-phase diode bridge on 480 V line-to-line gives what DC output, in V?
= 648.2 | 0.005 | V
> $1.3505 \times 480$.
```

```quiz
? A load draws current with 60% THD and unity displacement factor. What is its power factor?
= 0.8575 | 0.005 |
> $1/\sqrt{1.36}$.
```

```quiz
? A three-phase SPWM inverter on a 650 V bus runs at $m_a = 0.85$. What is its line-to-line RMS output, in V?
= 338.3 | 0.005 | V
> $0.6124 \times 0.85 \times 650$.
```

```quiz
? A MOSFET with $R_{DS(on)} = 25$ mΩ carries 8 A RMS and switches 400 V/8 A with $t_r + t_f = 30$ ns at 65 kHz. What is its total loss, in W?
= 4.72 | 0.005 | W
> Conduction 1.6 W + switching $\tfrac12(400)(8)(30\times10^{-9})(65\,000) = 3.12$ W.
```

```quiz
? A device dissipating 20 W must keep $T_j \le 125$ °C in 45 °C air. What is the maximum total thermal resistance, in °C/W?
= 4 | 0.001 | °C/W
> $(125 - 45)/20$.
```

```quiz
? A gapped inductor of 30 turns on a 1.5 cm² core has a 1 mm gap. What is its inductance, in µH?
= 169.6 | 0.005 | µH
> $4\pi\times10^{-7}(900)(1.5\times10^{-4})/10^{-3} = 170\ \mu$H.
```

```quiz
? What is $Q$ for a buck filter with $L = 10\ \mu$H, $C = 40\ \mu$F and a 1 Ω load?
= 2 | 0.001 |
> $R\sqrt{C/L} = \sqrt4$.
```

```quiz
? A boost has $R = 25\ \Omega$, $D = 0.5$, $L = 50\ \mu$H. What is its RHP zero frequency, in kHz?
= 19.89 | 0.005 | kHz
> $25(0.25)/(5\times10^{-5}) = 1.25\times10^5$ rad/s.
```

```quiz
? Which device is best suited to a compact 100 W, 1 MHz USB-C charger?
+ GaN transistor
- thyristor
- silicon IGBT
- mercury-arc rectifier
> GaN's tiny capacitances and no reverse recovery allow MHz switching with low loss.
```
