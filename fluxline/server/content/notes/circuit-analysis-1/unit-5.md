## The big idea

Capacitors resist sudden changes in **voltage**, inductors resist sudden changes in **current**. After a switch moves, every first-order circuit glides exponentially from where it was to where it's going, at a rate set by one time constant. Find three numbers and you're done.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $i = C\,\dfrac{dv}{dt}$, $\; v = L\,\dfrac{di}{dt}$ | relating $v$ and $i$ in C or L | Passive sign convention, as for resistors. |
| $w_C = \tfrac12 Cv^2$, $\; w_L = \tfrac12 Li^2$ | stored energy | Energy depends on $v_C$ and $i_L$ only, which is why those two can't jump. |
| $v_C(0^+) = v_C(0^-)$, $\; i_L(0^+) = i_L(0^-)$ | the instant after switching | **Only these two** are continuous. Resistor currents, $i_C$ and $v_L$ can jump. |
| DC steady state: C = open, L = short | finding $t = 0^-$ and $t \to \infty$ values | Applies only once all transients have died out. |
| Series C: $1/C = \sum 1/C_k$; parallel C: $C = \sum C_k$ | combining capacitors | Opposite of resistors. Inductors combine like resistors. |
| $\tau = R_{th}C$, $\; \tau = L/R_{th}$ | time constant | $R_{th}$ is the resistance **seen by the C or L** with independent sources killed. |
| $x(t) = x(\infty) + \left[x(0^+) - x(\infty)\right] e^{-(t - t_0)/\tau}$ | **any** voltage or current in a first-order circuit with DC sources | Use $t - t_0$ when the switch moves at $t_0 \neq 0$. |
| $1 - e^{-1} = 63\%$; after $5\tau$, 99.3% | estimating | "Done" in practice means about $5\tau$. |

## How to attack a problem (initial/final value method)

1. **$t = 0^-$:** circuit in DC steady state with the switch in its old position. Find $v_C$ or $i_L$.
2. **$t = 0^+$:** carry $v_C$ or $i_L$ across. If you need another quantity at $0^+$, replace the C by a voltage source $v_C(0^+)$ (or the L by a current source $i_L(0^+)$) and solve that resistive circuit.
3. **$t \to \infty$:** new DC steady state, switch in its new position. Find the final value.
4. **$\tau$:** kill independent sources and find $R_{th}$ across the element terminals.
5. **Write** $x(t)$ from the general formula.
6. **Another switch later?** Evaluate $x$ at that time; it becomes the new initial value, with new $x(\infty)$, $\tau$ and $t_0$.

## Traps that cost points

- **Carrying over the wrong quantity.** Only $v_C$ and $i_L$ are continuous; a resistor's current can jump instantly.
- **Wrong resistance in $\tau$.** Use the Thévenin resistance at the element's terminals, not the total circuit resistance.
- **Forgetting the time shift.** A switch at $t = 2$ ms needs $e^{-(t - 2\,\text{ms})/\tau}$.
- **Unit slips.** kΩ × µF = ms, and kΩ × nF = µs. Write the units down.
- **Opening an inductor's circuit.** $i_L$ can't stop instantly, so $v = L\,di/dt$ spikes: real circuits need a flyback diode.

## Sanity checks

- The response moves **monotonically** from $x(0^+)$ toward $x(\infty)$; no overshoot in first-order circuits.
- At $t = \tau$ it has covered 63% of the distance; at $5\tau$ it's essentially at the final value.
- In steady state, **no current flows through a capacitor** and **no voltage appears across an inductor**.
- Larger $R$ makes RC circuits slower but RL circuits **faster** ($\tau = L/R$).

## 60-second self-test

```recall
Q: $R = 10$ kΩ, $C = 100$ µF. Time constant?
A: $10^4 \times 10^{-4} = 1$ s.
Q: A capacitor charges from 0 toward 10 V with $\tau = 2$ ms. Its voltage at $t = 2$ ms?
A: $10\,(1 - e^{-1}) = 6.32$ V.
Q: An inductor carries 3 A just before a switch opens. Its current just after?
A: Still 3 A: inductor current is continuous.
Q: Energy stored in 470 µF charged to 12 V?
A: $\tfrac12 \times 470\times10^{-6} \times 144 = 33.8$ mJ.
```
