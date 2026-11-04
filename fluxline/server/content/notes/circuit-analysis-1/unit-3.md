## The big idea

Any linear two-terminal network, however complicated, behaves exactly like **one source and one resistor**. Find those two numbers once, and every load you connect becomes a one-line problem.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $V_{th} = v_{oc}$ | finding a Thévenin equivalent | Open-circuit the terminals; keep the polarity you'll use for the load. |
| $I_N = i_{sc}$ | finding a Norton equivalent | Short the terminals; current flows in the direction from + to − of $V_{th}$ through the short. |
| $R_{th} = V_{th}/I_N$ | always valid | Works with dependent sources too. |
| $R_{th}$ by inspection: kill sources, look into terminals | **independent sources only** | Kill = voltage source → short, current source → open. **Never kill dependent sources.** |
| $R_{th} = v_t/i_t$ with a test source | circuits with dependent sources | Set independent sources to zero, apply $v_t$ (or $i_t$), compute the other. $R_{th}$ can be negative. |
| $V_s$ in series with $R$ ⟷ $I_s = V_s/R$ in parallel with $R$ | source transformation | Only for a source with $R$ **directly** in series (or parallel). Voltages inside the transformed part change. |
| Response $= \sum$ responses to each independent source alone | superposition | Works for $v$ and $i$, **never for power**. Dependent sources stay on in every sub-problem. |
| $R_L = R_{th}$, $\; P_{max} = \dfrac{V_{th}^2}{4R_{th}}$ | maximum power to a load | Efficiency is only 50% at that point. Power systems deliberately don't match. |

## How to attack a problem

1. **Pick the tool:**
   - a load that changes, or "find the equivalent" → **Thévenin/Norton**;
   - several independent sources of different kinds → **superposition** or **source transformations**;
   - "what load gets the most power?" → Thévenin, then $R_L = R_{th}$.
2. **Remove the load** and mark terminals $a$, $b$.
3. **Find two of** $v_{oc}$, $i_{sc}$, $R_{th}$ (whichever two are easiest; the third follows from $V_{th} = I_N R_{th}$).
4. **Reconnect the load** to the equivalent and solve the one-loop circuit.

## Traps that cost points

- **Killing a dependent source.** Its value depends on the circuit; turn off only independent sources.
- **Superposing power.** $p \propto i^2$ and $(i_1 + i_2)^2 \neq i_1^2 + i_2^2$. Superpose the current, then compute power.
- **Load left in place** while finding $V_{th}$ or $R_{th}$: remove it first.
- **Polarity of $V_{th}$.** Define it as $v_a - v_b$ and keep that orientation when you reconnect.
- **Transforming a source without its series resistor.** A voltage source alone has no Norton equivalent.

## Sanity checks

- $v_{oc}$, $i_{sc}$ and $R_{th}$ must satisfy $v_{oc} = i_{sc}R_{th}$; finding all three is a free check.
- Doubling every independent source doubles $V_{th}$ and $I_N$ but **never changes $R_{th}$**. With only resistors and independent sources, $R_{th} > 0$.
- At maximum power, the load voltage is exactly $V_{th}/2$.

## 60-second self-test

```recall
Q: $v_{oc} = 12$ V and $i_{sc} = 3$ mA. What is $R_{th}$?
A: $12/0.003 = 4$ kΩ.
Q: That source drives its maximum-power load. How much power does the load get?
A: $12^2/(4 \times 4000) = 9$ mW, with 6 V across the load.
Q: Convert 10 V in series with 5 Ω to a Norton source.
A: 2 A in parallel with 5 Ω.
Q: A circuit contains a CCCS and a 9 V source. How do you find $R_{th}$?
A: Turn off the 9 V source (short it), keep the CCCS, apply a test source at the terminals: $R_{th} = v_t/i_t$.
```
