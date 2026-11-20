Covers Lessons 4.1–4.4: energy bands and bandgaps; conductors, insulators and semiconductors; the Fermi-Dirac distribution, holes, effective mass and doping; LEDs, lasers, solar cells and photodiodes; qubits and quantum computing. Use $kT = 0.0259$ eV at 300 K and $n_i = 10^{10}$ cm⁻³ for silicon.

```quiz
? What is the longest wavelength GaAs ($E_g = 1.42$ eV) can absorb, in nm?
= 873.1 | 0.005 | nm
> $\lambda = 1240/1.42 = 873$ nm.
```

```quiz
? Germanium has a bandgap of 0.66 eV. Out to what wavelength can a germanium photodetector respond, in nm?
= 1879 | 0.005 | nm
> $\lambda = 1240/0.66 = 1880$ nm, which is why germanium detects telecom infrared.
```

```quiz
? Why does a metal conduct electricity so well?
+ Its highest occupied band is only partly full, so electrons can move into nearby empty states.
- Its bandgap is very large.
- Its valence band is completely full.
- It has no electrons in bands.
> Empty states just above the filled ones let a small voltage shift electrons into moving states.
```

```quiz
? Two semiconductors differ only in bandgap: 1.1 eV and 3.3 eV. Which has more thermally excited carriers at room temperature?
+ The 1.1 eV one, by an enormous factor
- The 3.3 eV one
- They have the same number.
- Neither has any.
> Thermal excitation goes roughly as $e^{-E_g/2kT}$; the smaller gap wins by a factor of about $e^{42}$.
```

```quiz
? At 300 K, what is the occupation probability of a state 0.10 eV above the Fermi level?
= 0.02047 | 0.02 |
> $f = \dfrac{1}{1 + e^{0.10/0.0259}} = \dfrac{1}{1 + 47.6} \approx 0.020$.
```

```quiz
? At 300 K, what is the occupation probability of a state 0.05 eV below the Fermi level?
= 0.8737 | 0.01 |
> $f = \dfrac{1}{1 + e^{-0.05/0.0259}} = \dfrac{1}{1 + 0.145} \approx 0.874$.
```

```quiz
? Silicon is doped with $10^{17}$ phosphorus atoms per cm³. What is the hole concentration, in cm⁻³?
= 1000 | 0.001 | cm⁻³
> $p = n_i^2/n = 10^{20}/10^{17} = 10^3$ cm⁻³.
```

```quiz
? Silicon is doped with $10^{16}$ boron atoms per cm³. How far below the intrinsic level does the Fermi level sit, in eV?
= 0.3571 | 0.01 | eV
> $E_i - E_F = kT\ln(p/n_i) = 0.0259\ln(10^6) = 0.357$ eV.
```

```quiz
? An LED's material has a 2.0 eV bandgap. What wavelength does it emit, in nm?
= 620 | 0.005 | nm
> $\lambda = 1240/2.0 = 620$ nm (orange-red).
```

```quiz
? A silicon solar cell absorbs a 600 nm photon. How much of its energy becomes heat, in eV?
= 0.9464 | 0.01 | eV
> Photon: $1240/600 = 2.067$ eV; excess over 1.12 eV: 0.95 eV.
```

```quiz
? A photodiode with quantum efficiency 0.90 receives 1310 nm light. What is its responsivity, in A/W?
= 0.9509 | 0.005 | A/W
> $R = \dfrac{0.90 \times 1310}{1240} = 0.95$ A/W.
```

```quiz
? Above its threshold current, why does a laser diode's light output rise steeply?
+ Stimulated emission dominates, so each photon triggers copies of itself in the cavity.
- The diode gets hotter and glows like a light bulb.
- The bandgap shrinks.
- Spontaneous emission stops.
> Once the gain from population inversion beats the losses, stimulated emission amplifies the light in the mirror cavity.
```

```quiz
? A qubit is in the state $0.8\,|0\rangle + 0.6\,|1\rangle$. What is the probability of measuring 0?
= 0.64 | 0.001 |
> $P(0) = 0.8^2 = 0.64$.
```

```quiz
? Using $\tfrac{\pi}{4}\sqrt{N}$, about how many steps does Grover's algorithm need to search $10^8$ items?
= 7854 | 0.005 |
> $\tfrac{\pi}{4} \times 10^4 \approx 7854$, versus about 50 million on average classically.
```

```quiz
? Which claim about quantum computers is accurate?
+ They promise big speedups for specific problems, like simulating molecules, but not for everyday computing.
- They make every program exponentially faster.
- They can read out all $2^n$ amplitudes at once.
- They already outperform classical computers at most tasks.
> Advantages are problem-specific and depend on interference; general-purpose speedups don't exist.
```
