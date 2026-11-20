Covers Lessons 2.1–2.4: wavefunctions, probability and normalization; the uncertainty principle and confinement energy; the Schrödinger equation and the particle in a box; finite wells and the quantum harmonic oscillator. Useful constants for electrons: $\hbar^2/2m = 0.0381$ eV·nm², $h^2/8m = 0.376$ eV·nm², $\hbar = 1.055 \times 10^{-34}$ J·s.

```quiz
? A particle is equally likely to be anywhere between $x = 0$ and $x = 16$ nm. What value of $A$ normalizes $\psi = A$ on that range? (Units: nm$^{-1/2}$.)
= 0.25 | 0.002 | nm^-1/2
> $A^2 \times 16 = 1$, so $A = 1/4$.
```

```quiz
? An electron is in the ground state of a box. Using $P = \left[\dfrac{x}{L} - \dfrac{1}{2\pi}\sin\dfrac{2\pi x}{L}\right]$ between the limits, what is the probability it's in the middle half, from $L/4$ to $3L/4$?
= 0.8183 | 0.005 |
> $0.5 - \dfrac{1}{2\pi}\left(\sin\dfrac{3\pi}{2} - \sin\dfrac{\pi}{2}\right) = 0.5 + \dfrac{2}{2\pi} = 0.818$.
```

```quiz
? An electron is in the $n = 2$ state of a box. What is the probability of finding it in the left half?
= 0.5 | 0.001 |
> $|\psi_2|^2$ is symmetric about the center, so each half holds exactly half the probability (even though the center itself is a node).
```

```quiz
? What does $|\psi(x)|^2\,\Delta x$ represent?
+ The probability of finding the particle in a small range $\Delta x$ around $x$
- The particle's energy at $x$
- The particle's speed at $x$
- The exact position of the particle
> $|\psi|^2$ is a probability per unit length; multiplying by a small width gives a probability.
```

```quiz
? An electron is confined to a region $\Delta x = 0.5$ nm. What is the minimum spread in its speed, in km/s?
= 115.8 | 0.01 | km/s
> $\Delta v = \dfrac{\hbar}{2m\Delta x} = \dfrac{1.055 \times 10^{-34}}{2(9.109 \times 10^{-31})(0.5 \times 10^{-9})} = 1.16 \times 10^5$ m/s.
```

```quiz
? Estimate the confinement energy of an electron squeezed into $\Delta x = 0.3$ nm, in eV.
= 0.4233 | 0.01 | eV
> $\dfrac{0.0381}{0.3^2} = 0.42$ eV.
```

```quiz
? An excited state lasts 1.0 ns. What is the minimum spread in its energy, in units of $10^{-7}$ eV?
= 3.29 | 0.01 | × 10⁻⁷ eV
> $\Delta E = \dfrac{\hbar}{2\Delta t} = 5.27 \times 10^{-26}$ J $= 3.29 \times 10^{-7}$ eV.
```

```quiz
? What is the ground-state energy of an electron in a 0.8 nm box, in eV?
= 0.5875 | 0.005 | eV
> $E_1 = 0.376/0.8^2 = 0.588$ eV.
```

```quiz
? An electron in a 1.5 nm box drops from $n = 2$ to $n = 1$. What wavelength is emitted, in nm?
= 2473 | 0.01 | nm
> $\Delta E = 0.376 \times 3/1.5^2 = 0.501$ eV, so $\lambda = 1240/0.501 \approx 2470$ nm (infrared).
```

```quiz
? How wide must a box be for an electron's ground-state energy to be 0.50 eV, in nm?
= 0.8672 | 0.005 | nm
> $L = \sqrt{0.376/0.50} = 0.867$ nm.
```

```quiz
? An electron's energy is 2.5 eV below the top of a barrier. What is its penetration depth into the barrier, in nm?
= 0.1235 | 0.01 | nm
> $\kappa = \sqrt{2.5/0.0381} = 8.10$ nm⁻¹, so $\delta = 1/\kappa = 0.123$ nm.
```

```quiz
? A quantum harmonic oscillator has $\hbar\omega = 0.15$ eV. What is the energy of its $n = 3$ state, in eV?
= 0.525 | 0.002 | eV
> $E_3 = (3 + \tfrac{1}{2})(0.15) = 0.525$ eV.
```

```quiz
? A molecule vibrates at $4.0 \times 10^{13}$ Hz. What infrared wavelength does it absorb, in µm? (Use $h = 4.136 \times 10^{-15}$ eV·s.)
= 7.495 | 0.01 | µm
> $hf = 0.1654$ eV, so $\lambda = 1240/0.1654 = 7500$ nm $= 7.5$ µm.
```

```quiz
? How do the energy levels of a particle in a box and a harmonic oscillator differ?
+ Box levels grow as $n^2$ and spread apart; oscillator levels are evenly spaced by $\hbar\omega$.
- Both are evenly spaced.
- Box levels are evenly spaced; oscillator levels grow as $n^2$.
- Both grow as $n^2$.
> $E_{\text{box}} \propto n^2$, while $E_{\text{osc}} = (n + \tfrac{1}{2})\hbar\omega$.
```
