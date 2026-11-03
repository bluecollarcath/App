The final exam covers all four units of Microelectronics II. Work each problem on paper; numeric answers are accepted within about 1%.

```quiz
? A MOSFET mirror with $I_{REF} = 200\ \mu$A has an output device four times wider. What is $I_{OUT}$, in µA?
= 800 | 0.001 | µA
> $4 \times 200$.
```

```quiz
? What is the current ratio of a matched BJT mirror with $\beta = 100$?
= 0.9804 | 0.001 |
> $1/(1 + 2/100)$.
```

```quiz
? A differential pair has $I_{SS} = 0.8$ mA, $V_{ov} = 0.2$ V and $R_D = 20$ kΩ. What is its differential-output gain?
= 80 | 0.001 |
> $g_m = 2(0.4)/0.2 = 4$ mS; $A_d = 4 \times 20 = 80$.
```

```quiz
? A pair with $g_m = 2$ mS has a 1 MΩ tail resistance. What is its single-ended CMRR, in dB?
= 66.02 | 0.005 | dB
> $g_mR_{SS} = 2000$, or 66.0 dB.
```

```quiz
? An op-amp has a 100 µA tail current and $C_c = 4$ pF. What is its slew rate, in V/µs?
= 25 | 0.001 | V/µs
> $100\ \mu\text{A}/4\ \text{pF}$.
```

```quiz
? An op-amp with a 2 V/µs slew rate must output an 8 V peak sine. What is the full-power bandwidth, in kHz?
= 39.79 | 0.005 | kHz
> $\text{SR}/(2\pi V_p) = 2\times10^6/(2\pi \cdot 8) = 39.8$ kHz.
```

```quiz
? A MOSFET has $g_m = 3$ mS and $C_{gs} + C_{gd} = 30$ fF. What is $f_T$, in GHz?
= 15.92 | 0.005 | GHz
> $3\times10^{-3}/(2\pi \cdot 30\times10^{-15})$.
```

```quiz
? A CS stage has gain $-40$, $C_{gs} = 20$ fF, $C_{gd} = 5$ fF and $R_{sig} = 5$ kΩ. Using the Miller approximation, estimate $f_H$, in MHz.
= 141.5 | 0.005 | MHz
> $C_{in} = 20 + 5(41) = 225$ fF; $1/(2\pi \cdot 5000 \cdot 225\times10^{-15}) = 141$ MHz.
```

```quiz
? An amplifier with $A = 10^5$ has $\beta = 0.1$. What is its closed-loop gain?
= 9.999 | 0.0005 |
> $10^5/(1 + 10^4) = 9.999$, essentially $1/\beta$.
```

```quiz
? A two-stage op-amp has $g_{m1} = 0.5$ mS and $C_c = 2$ pF. What is its unity-gain frequency, in MHz?
= 39.79 | 0.005 | MHz
> $g_{m1}/(2\pi C_c)$.
```

```quiz
? If the non-dominant pole sits at twice the unity-gain frequency (ignore the zero), what is the phase margin, in degrees?
= 63.43 | 0.005 | °
> $90° - \tan^{-1}(0.5) = 63.4°$.
```

```quiz
? A class B stage with $\pm12$ V supplies drives 4 Ω at full swing (12 V peak). What is the load power, in W?
= 18 | 0.001 | W
> $144/8 = 18$ W.
```

```quiz
? A Wien-bridge oscillator uses $R = 1.6$ kΩ and $C = 10$ nF. What is its frequency, in Hz?
= 9947 | 0.005 | Hz
> $1/(2\pi \cdot 1600 \cdot 10^{-8}) = 9.95$ kHz.
```

```quiz
? A crystal has motional parameters $L_m = 0.5$ mH and $C_m = 20$ fF. What is its series resonant frequency, in MHz?
= 50.33 | 0.005 | MHz
> $1/(2\pi\sqrt{0.5\times10^{-3} \cdot 20\times10^{-15}}) = 50.3$ MHz.
```

```quiz
? The Barkhausen criterion requires the loop gain at the oscillation frequency to have:
+ magnitude 1 and phase $0°$ (or $360°$)
- magnitude 1 and phase $-180°$
- magnitude 0 and any phase
- magnitude greater than 1 at all frequencies
> The fed-back signal must return with the same amplitude and phase.
```
