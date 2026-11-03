Covers Lessons 1.1–1.3: diode models, rectifiers and filters, Zener regulators, clippers and clampers.

```quiz
? A diode has $I_S = 10^{-14}$ A and $n = 1$, at room temperature ($V_T = 25.85$ mV). What current flows at $V_D = 0.7$ V, in mA?
= 5.76 | 0.02 | mA
> $I = I_Se^{V_D/V_T} = 10^{-14}e^{27.08} = 5.76$ mA.
```

```quiz
? For an ideal diode ($n = 1$, $V_T = 25.85$ mV), how much does $V_D$ rise when the current increases tenfold, in mV?
= 59.5 | 0.01 | mV
> $\Delta V = V_T\ln 10 = 59.5$ mV, the familiar "60 mV per decade".
```

```quiz
? A 5 V source drives a silicon diode through 1 kΩ. Using the 0.7 V constant-drop model, what is the diode current, in mA?
= 4.3 | 0.001 | mA
> $(5 - 0.7)/1\ \text{k}\Omega = 4.3$ mA.
```

```quiz
? A full-wave rectifier on 60 Hz mains has $V_p = 12$ V, $R_L = 200\ \Omega$ and $C = 1000\ \mu$F. What is the peak-to-peak ripple, in V?
= 0.5 | 0.01 | V
> $V_r = V_p/(2fR_LC) = 12/(120 \cdot 200 \cdot 0.001) = 0.5$ V.
```

```quiz
? A 5.1 V Zener is fed from 12 V through 200 Ω and supplies a 20 mA load. What current flows in the Zener, in mA?
= 14.5 | 0.01 | mA
> $I_R = (12 - 5.1)/200 = 34.5$ mA, and $34.5 - 20 = 14.5$ mA goes through the Zener.
```

```quiz
? A clamper circuit:
+ shifts the DC level of a waveform without changing its shape
- cuts off the part of the waveform above a set level
- converts AC to DC with low ripple
- regulates the output voltage against load changes
> A clamper adds a DC offset (stored on its capacitor). Cutting off part of the waveform is a clipper's job.
```
