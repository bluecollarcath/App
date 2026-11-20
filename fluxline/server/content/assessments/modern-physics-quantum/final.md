Covers the whole course: photons and matter waves, atomic spectra, wavefunctions and the uncertainty principle, the Schrödinger equation, wells, oscillators and tunneling, quantum numbers and spin, energy bands, doping, optoelectronics and qubits. Useful values: $E = 1240/\lambda$ eV·nm; electrons: $\lambda = 1.226/\sqrt{V}$ nm, $\hbar^2/2m = 0.0381$ eV·nm², $h^2/8m = 0.376$ eV·nm²; $kT = 0.0259$ eV at 300 K.

```quiz
? What is the energy of a 520 nm green photon, in eV?
= 2.384 | 0.005 | eV
> $1240/520 = 2.38$ eV.
```

```quiz
? Potassium has a work function of 2.30 eV. What is the maximum kinetic energy of electrons ejected by 350 nm light, in eV?
= 1.242 | 0.01 | eV
> $1240/350 = 3.54$ eV, minus 2.30 eV: 1.24 eV.
```

```quiz
? Which observation could the wave theory of light NOT explain?
+ No electrons are ejected below a threshold frequency, however bright the light.
- Light bends around small obstacles.
- Light from two slits forms bright and dark fringes.
- Light reflects from mirrors.
> The threshold frequency only makes sense if light arrives in photons of energy $hf$.
```

```quiz
? An electron is accelerated through 64 V. What is its wavelength, in nm?
= 0.1533 | 0.005 | nm
> $1.226/\sqrt{64} = 0.153$ nm.
```

```quiz
? A hydrogen electron drops from $n = 4$ to $n = 1$. What wavelength is emitted, in nm?
= 97.24 | 0.005 | nm
> $\Delta E = 13.6(1 - 1/16) = 12.75$ eV; $\lambda = 1240/12.75 = 97.2$ nm (ultraviolet).
```

```quiz
? An electron is in the ground state of a box. What's the probability of finding it in the left half?
= 0.5 | 0.001 |
> By symmetry, exactly one half.
```

```quiz
? An electron is confined to 0.2 nm. What is the minimum spread in its speed, in km/s?
= 289.4 | 0.01 | km/s
> $\Delta v = \dfrac{\hbar}{2m\Delta x} = \dfrac{1.055 \times 10^{-34}}{2(9.109 \times 10^{-31})(0.2 \times 10^{-9})} = 2.89 \times 10^5$ m/s.
```

```quiz
? Estimate the confinement energy of an electron squeezed into 0.25 nm, in eV.
= 0.6096 | 0.01 | eV
> $0.0381/0.25^2 = 0.61$ eV.
```

```quiz
? What is the $n = 2$ energy of an electron in a 0.6 nm box, in eV?
= 4.178 | 0.005 | eV
> $0.376 \times 4/0.36 = 4.18$ eV.
```

```quiz
? Which change makes a quantum dot emit bluer light?
+ Making the dot smaller
- Making the dot larger
- Cooling the dot
- Making the dot from heavier atoms of the same material
> Smaller confinement raises the energy levels ($E \propto 1/L^2$), giving higher-energy photons.
```

```quiz
? A harmonic oscillator has $\hbar\omega = 0.30$ eV. What is its zero-point energy, in eV?
= 0.15 | 0.002 | eV
> $E_0 = \tfrac{1}{2}\hbar\omega = 0.15$ eV.
```

```quiz
? An electron meets a barrier 1.5 eV above its energy and 0.6 nm thick. What is the approximate tunneling probability? (Give it in units of $10^{-3}$.)
= 0.537 | 0.02 | × 10⁻³
> $\kappa = \sqrt{1.5/0.0381} = 6.27$ nm⁻¹; $T \approx e^{-2(6.27)(0.6)} = e^{-7.53} = 5.4 \times 10^{-4}$.
```

```quiz
? Why did chipmakers replace SiO₂ gate insulators with hafnium oxide?
+ A physically thicker high-κ layer gives the same gate control with exponentially less tunneling leakage.
- Hafnium oxide is a better conductor.
- SiO₂ became too expensive to make.
- High-κ materials eliminate the need for transistors.
> Tunneling depends exponentially on thickness; the thicker high-κ film cuts leakage dramatically.
```

```quiz
? How many orbitals are there in a 4f subshell?
= 7 | 0.001 |
> f means $l = 3$, so $m_l = -3 \ldots 3$: seven orbitals (holding 14 electrons).
```

```quiz
? Phosphorus is added to silicon. What does each phosphorus atom contribute?
+ One extra electron to the conduction band (a donor), making n-type silicon
- One hole (an acceptor), making p-type silicon
- Nothing, since it has the same number of valence electrons
- Two extra electrons
> Phosphorus has 5 valence electrons; four bond and the fifth is easily freed.
```

```quiz
? Silicon is doped with $10^{15}$ boron atoms per cm³. What is the electron concentration, in cm⁻³?
= 100000 | 0.001 | cm⁻³
> $n = n_i^2/p = 10^{20}/10^{15} = 10^5$ cm⁻³.
```

```quiz
? A blue InGaN LED has a 2.6 eV bandgap. What wavelength does it emit, in nm?
= 476.9 | 0.005 | nm
> $1240/2.6 = 477$ nm.
```

```quiz
? A photodiode with quantum efficiency 0.75 receives 850 nm light. What is its responsivity, in A/W?
= 0.5142 | 0.005 | A/W
> $R = 0.75 \times 850/1240 = 0.514$ A/W.
```

```quiz
? How many amplitudes describe the state of 30 qubits?
= 1073741824 | 0.001 |
> $2^{30} \approx 1.07 \times 10^9$.
```

```quiz
? Why must superconducting qubits be kept near 15 millikelvin?
+ So that thermal energy $kT$ is far smaller than the qubit's energy step and doesn't scramble its state.
- Because superconductors melt at room temperature.
- To make the qubits heavier.
- To slow down the speed of light in the chip.
> A 5 GHz qubit's step is about 20 µeV; room-temperature $kT$ is about 26,000 µeV, but at 15 mK it's only about 1.3 µeV.
```
