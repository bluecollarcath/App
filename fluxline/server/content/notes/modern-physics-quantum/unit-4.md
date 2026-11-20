## The big idea

In a crystal, atomic levels spread into bands with forbidden gaps between them. Whether the top band is partly filled (metal), or full with a big gap (insulator) or a small gap (semiconductor), decides conduction. Thermal excitation and doping set how many electrons and holes carry current. Photons with energy above the gap are absorbed; electrons falling across a direct gap emit light at about the gap energy. Qubits use superposition and interference, but their advantages are problem-specific.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $\lambda \le \dfrac{1240}{E_g}$ nm | what a material absorbs | Longer wavelengths pass through. |
| $\lambda \approx \dfrac{1240}{E_g}$ nm | LED or laser color | Needs a direct gap; silicon barely emits. |
| $f(E) = \dfrac{1}{1 + e^{(E - E_F)/kT}}$ | occupation probability | $kT = 0.0259$ eV at 300 K; $f = \tfrac{1}{2}$ at $E_F$. |
| $n \cdot p = n_i^2$ | minority carriers | Si at 300 K: $n_i^2 = 10^{20}$ cm⁻⁶. |
| $E_F - E_i = kT\ln(n/n_i)$ | Fermi level shift with doping | Up for n-type, down for p-type. |
| $R = \dfrac{\eta\lambda}{1240}$ A/W | photodiode responsivity | $\lambda$ in nm. |
| $P(0) = \lvert \alpha\rvert ^2$, $P(1) = \lvert \beta\rvert ^2$ | measuring a qubit | Must add to 1. |
| $2^n$ amplitudes | size of an $n$-qubit state | Measurement returns only $n$ bits. |

## How to attack a problem

1. **Conductor, insulator or semiconductor?** Look at the band filling and the gap size.
2. **Absorb or not?** Convert the photon to eV and compare with $E_g$.
3. **Doped silicon?** Majority carriers = doping; minority = $10^{20}$ / majority; then shift $E_F$ by $kT\ln$.
4. **Solar cell loss?** Photon energy minus $E_g$ becomes heat.

## Traps that cost points

- **A full band conducts:** it doesn't; there are no empty states to move into.
- **Forgetting minority carriers drop** when you dope.
- **Expecting silicon LEDs:** silicon's gap is indirect.
- **Quantum hype:** quantum computers don't speed up everyday tasks.

## Sanity checks

- **Si gap 1.12 eV absorbs below 1107 nm; GaN (3.4 eV) only absorbs UV.**
- **$kT$ is about 0.026 eV at room temperature,** much smaller than any useful gap.
- **Doping $10^{16}$ cm⁻³ moves $E_F$ about 0.36 eV from midgap.**

## 60-second self-test

```recall
Q: Longest wavelength silicon absorbs?
A: $1240/1.12 \approx 1107$ nm.
Q: Si doped with $10^{16}$ donors per cm³. Hole concentration?
A: $10^{20}/10^{16} = 10^4$ cm⁻³.
Q: Occupation exactly at the Fermi level?
A: One half.
Q: A 1.9 eV LED glows what color?
A: About 650 nm: red.
Q: Qubit $0.6|0\rangle + 0.8|1\rangle$. Chance of measuring 1?
A: $0.64$.
```
