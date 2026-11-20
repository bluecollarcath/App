## The big idea

A particle is described by a wavefunction $\psi$, and $|\psi|^2$ tells you where it's likely to be found. A localized wave needs many wavelengths, so position and momentum can't both be sharp, and confining a particle always costs energy. The Schrödinger equation plus boundary conditions gives the allowed energies: in a box they grow as $n^2/L^2$; in a harmonic oscillator they're evenly spaced.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $P = \displaystyle\int_a^b \lvert \psi\rvert ^2 dx$ | probability in a range | For a narrow range, $\lvert \psi\rvert ^2 \Delta x$. |
| $\displaystyle\int \lvert \psi\rvert ^2 dx = 1$ | normalizing | Fix the size with a constant. |
| $\Delta x\, \Delta p \ge \hbar/2$ | uncertainty in position and momentum | $\hbar = h/2\pi = 1.055 \times 10^{-34}$ J·s. |
| $KE \sim \dfrac{\hbar^2}{2m\Delta x^2}$ | confinement energy | Electrons: $\hbar^2/2m = 0.0381$ eV·nm². |
| $\Delta E\, \Delta t \ge \hbar/2$ | linewidths, short pulses | Short-lived states have blurred energies. |
| $-\dfrac{\hbar^2}{2m}\psi'' + V\psi = E\psi$ | the Schrödinger equation | Kinetic + potential = total. |
| $E_n = \dfrac{n^2h^2}{8mL^2} = 0.376\dfrac{n^2}{L^2}$ eV | electron in a box (L in nm) | $n$ starts at 1; grows as $n^2$. |
| $\psi_n = \sqrt{2/L}\sin(n\pi x/L)$ | box wavefunctions | $n$ half-wavelengths fit. |
| $\kappa = \sqrt{(V_0 - E)/0.0381}$ nm⁻¹ | decay into a barrier | Penetration depth $1/\kappa$. |
| $E_n = (n + \tfrac{1}{2})\hbar\omega$ | harmonic oscillator | $n$ starts at 0; evenly spaced by $hf$. |

## How to attack a problem

1. **Probability?** Square the wavefunction, then integrate (or multiply by a small width).
2. **Uncertainty?** Solve $\Delta p = \hbar/(2\Delta x)$, then divide by mass for $\Delta v$.
3. **Box energies?** Use $0.376\,n^2/L^2$ eV, then subtract levels for a photon and convert with 1240.
4. **Oscillator?** Find $\hbar\omega = hf$; levels are $(n + \tfrac{1}{2})$ times that.

## Traps that cost points

- **$\psi$ is not a probability:** square it.
- **$h$ vs $\hbar$:** the uncertainty principle uses $\hbar$.
- **Starting the box at $n = 0$:** the box starts at $n = 1$; the oscillator starts at $n = 0$.
- **Missing squares:** box energies go as $n^2$ and as $1/L^2$.

## Sanity checks

- **Halve the box, quadruple the energy.**
- **Smaller quantum dots glow bluer.**
- **Confinement to atomic size (0.1 nm) gives energies of a few eV;** to 10 nm, only meV.

## 60-second self-test

```recall
Q: Ground-state energy of an electron in a 1 nm box?
A: $0.376$ eV.
Q: The box shrinks to half its width. New ground-state energy?
A: Four times larger: 1.50 eV.
Q: Confinement energy of an electron in 0.2 nm?
A: $0.0381/0.04 \approx 0.95$ eV.
Q: Oscillator with $\hbar\omega = 0.2$ eV. Energy of $n = 1$?
A: $1.5 \times 0.2 = 0.3$ eV.
Q: Where is an electron in the $n = 2$ box state never found?
A: At the center (a node).
```
