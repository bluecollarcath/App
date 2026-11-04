## The big idea

Every circuit problem in this course is built from two physical laws (charge is conserved at a node, energy is conserved around a loop) plus one device law per element. Label everything first; the algebra is then mechanical.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $p = vi$ | finding power of any element | Passive sign convention: $i$ **enters** the + terminal. If it enters −, use $p = -vi$. $p > 0$ means absorbing. |
| $v = iR$, $\; p = i^2R = v^2/R$ | any resistor | $v$ and $i$ must follow the passive convention, or a minus sign appears. |
| KCL: $\sum i_{in} = \sum i_{out}$ | at any node, or any closed boundary | Works for a whole region (a "supernode") too. |
| KVL: $\sum v = 0$ around a loop | any closed path | Pick one direction around the loop and stick to it. |
| $R_s = R_1 + R_2 + \dots$ | elements carrying the **same current** | Nothing may branch off between them. |
| $R_p = \dfrac{R_1R_2}{R_1 + R_2}$ | two elements across the **same two nodes** | For more than two, add conductances: $1/R_p = \sum 1/R_k$. |
| $v_2 = v\,\dfrac{R_2}{R_1 + R_2}$ | voltage divider, unloaded | Invalid if something draws current from the middle node. |
| $i_1 = i\,\dfrac{R_2}{R_1 + R_2}$ | current divider, two branches | Uses the **other** resistor: more current takes the easier path. |
| $R_Y = \dfrac{R_a R_b}{R_a + R_b + R_c}$ | Δ → Y | Numerator: the two Δ resistors touching that Y node. Equal resistors: $R_Y = R_\Delta/3$. |

## How to attack a problem

1. **Label** every node and give every element a current direction and voltage polarity (any choice works; the sign of the answer sorts it out).
2. **Collapse** series and parallel combinations, working from the end farthest from the source back toward it.
3. **Solve** the simplified circuit for the source current.
4. **Expand back** out, using dividers to recover the voltage or current you were asked for.
5. **Check** with power balance or KCL at a node you didn't use.

## Traps that cost points

- **Divider on a loaded node.** A load across $R_2$ is in parallel with it; combine them first, then divide.
- **Current divider upside down.** Branch 1 gets $R_2/(R_1+R_2)$ of the current, not $R_1/(R_1+R_2)$.
- **"Looks series, isn't."** Two resistors drawn in a line are in series only if no third wire joins between them.
- **Shorted resistor.** A wire across a resistor puts 0 V across it: it carries no current and drops out.
- **Source power sign.** A source delivering power has $p_{absorbed} < 0$. Mixing "delivered" and "absorbed" breaks the power balance.
- **Dependent sources can't be combined or removed** like independent ones; keep their controlling variable visible.

## Sanity checks

- Parallel resistance is **smaller than the smallest** branch; series is **larger than the largest**.
- A divider's output lies **between 0 and the source** value.
- Total absorbed power over all elements, sources included, is **exactly 0**.
- Two equal resistors in parallel give half of one. $n$ equal ones give $R/n$.

## 60-second self-test

```recall
Q: What is 6 kΩ in parallel with 3 kΩ?
A: $\dfrac{6 \times 3}{6 + 3} = 2$ kΩ (smaller than 3 kΩ, as it must be).
Q: 2 A enters the + terminal of an element with 5 V across it. Power?
A: 10 W **absorbed** (passive sign convention holds, so $p = +vi$).
Q: 12 V drives 4 kΩ and 8 kΩ in series. Voltage across the 8 kΩ?
A: $12 \times 8/12 = 8$ V.
Q: 9 mA splits between 1 kΩ and 2 kΩ in parallel. Current in the 1 kΩ?
A: $9 \times 2/3 = 6$ mA: the smaller resistor takes the larger share.
Q: Three 30 Ω resistors in Δ. Equivalent Y?
A: Three 10 Ω resistors ($R_\Delta/3$).
```
