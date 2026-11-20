## The big idea

Light, which travels as a wave, is absorbed and emitted in packets called photons, each with energy $hf$. Matter, which we think of as particles, travels as waves with wavelength $h/p$. Electrons in atoms are standing waves, so they can only have certain energies, and jumps between those energies emit or absorb photons of exactly the matching color.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $E = hf = \dfrac{hc}{\lambda}$ | energy of one photon | $h = 6.626 \times 10^{-34}$ J·s. |
| $E\ (\text{eV}) = \dfrac{1240}{\lambda\ (\text{nm})}$ | photon energy, fast | Photons only, never electrons. |
| $1\ \text{eV} = 1.602 \times 10^{-19}$ J | converting to joules | An electron crossing $V$ volts gains $V$ eV. |
| $KE_{\max} = hf - W$ | photoelectric effect | Below threshold ($hf < W$): no electrons at all. |
| $\lambda = \dfrac{h}{p} = \dfrac{h}{mv}$ | wavelength of any particle | Use the particle's momentum, not $1240/E$. |
| $\lambda \approx \dfrac{1.226}{\sqrt{V}}$ nm | electron accelerated through $V$ | Square root: 4× the voltage halves $\lambda$. |
| $\Delta y = \dfrac{\lambda L}{d}$ | double-slit fringe spacing | Small angles only. |
| $E_n = -\dfrac{13.6\ \text{eV}}{n^2}$ | hydrogen energy levels | Hydrogen only; square the $n$. |
| $E_{\text{photon}} = E_{\text{upper}} - E_{\text{lower}}$ | emission or absorption lines | Subtract the more negative number. |

## How to attack a problem

1. **Photon question?** Convert between wavelength and energy with 1240, then compare with the work function or energy gap.
2. **Electron wavelength?** If it was accelerated through a voltage, use $1.226/\sqrt{V}$; if you're given its speed, use $h/(mv)$.
3. **Spectral line?** Find both level energies, subtract, then convert the difference to a wavelength.
4. **Count photons?** Divide power (J/s) by the energy of one photon (J).

## Traps that cost points

- **Brightness vs color:** brightness changes the number of electrons, never their maximum energy.
- **$1240/\lambda$ for electrons:** that shortcut is for photons only.
- **Forgetting the work function:** the electron keeps only what's left after escaping.
- **Using one level's energy:** a photon carries the *difference* between levels.

## Sanity checks

- **Visible photons are 1.8 to 3.1 eV** (700 down to 400 nm). A "visible" photon at 10 eV means an error.
- **Electron wavelengths in electronics are about 0.01 to 1 nm,** roughly atomic sizes.
- **Hydrogen's visible lines all end on $n = 2$**; drops to $n = 1$ are ultraviolet.

## 60-second self-test

```recall
Q: Energy of a 620 nm photon?
A: $1240/620 = 2.0$ eV.
Q: Work function 2.3 eV, light at 400 nm (3.1 eV). Maximum electron energy?
A: $3.1 - 2.3 = 0.8$ eV.
Q: Wavelength of an electron after 100 V?
A: $1.226/\sqrt{100} = 0.123$ nm.
Q: Photon from hydrogen's $n = 3 \to 2$ drop?
A: $1.89$ eV, about 656 nm (red).
Q: What does brighter light change in the photoelectric effect?
A: The number of electrons, not their maximum energy.
```
