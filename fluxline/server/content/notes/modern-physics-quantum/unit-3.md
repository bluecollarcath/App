## The big idea

A wave hitting a barrier taller than its energy decays inside it, and if the barrier is thin, some of it gets through: tunneling, with a probability exponential in thickness. Atoms are 3D standing waves labeled by $n$, $l$ and $m_l$, plus spin $m_s$. Pauli exclusion lets only one electron per complete set of quantum numbers, which fills orbitals in order, builds the periodic table, and sets each element's valence electrons.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $T \approx e^{-2\kappa L}$ | tunneling probability | Factor of 2: probability, not amplitude. |
| $\kappa = \sqrt{(V_0 - E)/0.0381}$ nm⁻¹ | electrons, energies in eV | Use the height *above* the electron's energy. |
| $l = 0 \ldots n - 1$; $m_l = -l \ldots +l$ | listing allowed states | No 2d, no 1p. |
| $n^2$ orbitals, $2n^2$ electrons | counting states in level $n$ | Spin doubles the count. |
| $L = \sqrt{l(l+1)}\,\hbar$ | orbital angular momentum | s electrons have $L = 0$. |
| $E_n = -13.6/n^2$ eV | hydrogen energies | Depend only on $n$ in hydrogen. |
| $\Delta E = 2\mu_B B$ | spin splitting in a field | $\mu_B = 5.788 \times 10^{-5}$ eV/T (about 28 GHz per tesla). |
| $f = 42.58$ MHz/T $\times B$ | MRI proton frequency | Protons, not electrons. |

## How to attack a problem

1. **Tunneling?** Compute $\kappa$, then $2\kappa L$, then $e^{-2\kappa L}$. For "how much changes," take the ratio $e^{2\kappa\,\Delta L}$.
2. **Counting states?** List $l$ from 0 to $n-1$, add $2l + 1$ for each, double for spin.
3. **Valence electrons?** Write the configuration, then count electrons in the outermost $n$.

## Traps that cost points

- **Linear thinking:** twice as thick squares the probability, it doesn't halve it.
- **Using $V_0$ instead of $V_0 - E$** in $\kappa$.
- **Forgetting negative $m_l$ values.**
- **One electron per orbital:** each orbital holds two (spin up and down).

## Sanity checks

- **Tunneling only matters for barriers about 1 nm or thinner.**
- **Shells hold 2, 8, 18, 32 electrons.**
- **Si and Ge have 4 valence electrons; P has 5 (donor), B has 3 (acceptor).**

## 60-second self-test

```recall
Q: 1 eV barrier, 1 nm thick. Tunneling probability?
A: $\kappa = 5.12$ nm⁻¹, $T \approx e^{-10.2} \approx 3.5 \times 10^{-5}$.
Q: The barrier doubles in thickness. New probability?
A: The old one squared: about $1.3 \times 10^{-9}$.
Q: How many electrons fit in $n = 3$?
A: $2 \times 9 = 18$.
Q: Allowed $l$ values for $n = 2$?
A: 0 and 1 (2s and 2p).
Q: Which dopant makes silicon p-type?
A: Boron (3 valence electrons).
```
