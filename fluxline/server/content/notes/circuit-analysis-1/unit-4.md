## The big idea

With **negative feedback**, an ideal op-amp does whatever it takes at its output to make its two inputs equal, while drawing no input current. Those two rules plus KCL at the inverting input solve every circuit in this unit.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $v_+ = v_-$ (virtual short) | negative feedback (output connected back to the − input) | Not valid for comparators or positive feedback. |
| $i_+ = i_- = 0$ | always (ideal op-amp) | The **output** pin can source or sink any current. |
| $v_o = -\dfrac{R_f}{R_{in}}\,v_{in}$ | inverting amplifier | Input resistance is $R_{in}$, so it loads the previous stage. |
| $v_o = \left(1 + \dfrac{R_f}{R_g}\right) v_{in}$ | non-inverting amplifier | Gain is never below 1. Input resistance is essentially infinite. |
| $v_o = v_{in}$ | voltage follower (buffer) | Use it to stop a load from disturbing a source or divider. |
| $v_o = -R_f\left(\dfrac{v_1}{R_1} + \dfrac{v_2}{R_2} + \dots\right)$ | inverting summer | Each input is scaled independently by $R_f/R_k$. |
| $v_o = \dfrac{R_2}{R_1}\,(v_2 - v_1)$ | difference amplifier, matched ratios | Resistor mismatch converts common-mode voltage into error. |
| $V_{EE} < v_o < V_{CC}$ | always | If the formula gives more than the supply, the output **saturates** and the virtual short no longer holds. |

## How to attack a problem

1. **Check for negative feedback.** If there is none, treat it as a comparator: $v_o$ goes to the rail set by the sign of $v_+ - v_-$.
2. **Find $v_+$** (often directly from a source or a divider, since no current flows into the input).
3. **Set $v_- = v_+$.**
4. **Write KCL at the inverting input** with zero current into the op-amp, and solve for $v_o$.
5. **Check saturation** against the supply rails.
6. **Cascades:** each op-amp output is an ideal voltage source, so stage gains multiply, except where a stage's input resistance loads a non-op-amp source.

## Traps that cost points

- **Non-inverting gain written as $R_f/R_g$.** It is $1 + R_f/R_g$.
- **Assuming the output current is zero.** Only the **input** currents are zero; the output drives the feedback network and the load.
- **Ignoring saturation.** A gain-of-10 stage on ±12 V supplies can't output 20 V.
- **Virtual short with positive feedback.** Schmitt triggers and comparators switch between rails instead.
- **Forgetting input loading.** An inverting stage presents $R_{in}$ to whatever drives it; a source with internal resistance forms a divider with it.

## Sanity checks

- Inverting stages flip the sign; two in cascade restore it.
- Grounded + input with negative feedback → the − input sits at **0 V** (virtual ground).
- Output magnitude is always **less than the supply**.
- Set $R_f = 0$ in a non-inverting stage: gain 1 (a follower). Good formulas pass limit tests like this.

## 60-second self-test

```recall
Q: Inverting amp with $R_{in} = 10$ kΩ, $R_f = 47$ kΩ, $v_{in} = 0.2$ V. Output?
A: $-4.7 \times 0.2 = -0.94$ V.
Q: Non-inverting amp with $R_f = 90$ kΩ, $R_g = 10$ kΩ. Gain?
A: $1 + 9 = 10$.
Q: That amp runs on ±12 V with a 2 V input. Output?
A: The ideal answer is 20 V, so the output saturates near +12 V (a bit less for a non-rail-to-rail op-amp).
Q: Summer with $R_f = 10$ kΩ; 1 V through 10 kΩ and 0.5 V through 5 kΩ. Output?
A: $-(1 + 1) = -2$ V.
```
