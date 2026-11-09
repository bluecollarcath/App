## The big idea

Calculus answers two questions. **How fast is something changing at this instant?** Zoom in on shrinking intervals; the slopes approach the instantaneous rate (the derivative). **How much has built up?** Add thin rectangles under the rate graph; the sum approaches the area (the integral). Rates and totals undo each other.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $\dfrac{f(b) - f(a)}{b - a}$ | average rate of change over an interval | It's the slope of the secant line between the two points. |
| $\dfrac{f(a + h) - f(a)}{h}$, then let $h \to 0$ | instantaneous rate at $x = a$ | Simplify **before** letting $h$ reach zero. |
| $\displaystyle\lim_{x \to a}$: the value approached | expressions that give $\tfrac{0}{0}$ when you plug in | Factor and cancel first. |
| total = rate × time | constant rates | Units: (m/s) × s = m; A × s = C; kW × h = kWh. |
| total = area under the rate graph | changing rates | Use triangles and rectangles where you can. |
| Rectangle sums | estimating curved areas | Start-of-slice and end-of-slice estimates bracket the true area. |
| $\displaystyle\int_a^b f(t)\,dt$ | notation for the exact area | It's the limit of the rectangle sums. |

## How to attack a problem

1. **Rate questions:** decide whether they want an average (two points) or instantaneous (one point, take a limit).
2. **For an instantaneous rate:** write $\tfrac{f(a + h) - f(a)}{h}$, expand, cancel the $h$, then set $h = 0$.
3. **Limit questions:** try plugging in; if you get $\tfrac{0}{0}$, factor (often a difference of squares) and cancel.
4. **Total questions:** sketch the rate graph, find the area with rectangles and triangles, and attach units.

## Traps that cost points

- **Plugging in too early** in a limit and stopping at $\tfrac{0}{0}$.
- **Average vs instantaneous:** the average over $[1, 3]$ isn't the speed at $t = 1$.
- **Unit mismatches:** convert minutes to seconds before multiplying by amps; mA to A.
- **Rectangle direction:** for a rising graph, start-of-slice heights **under**estimate the area.

## Sanity checks

- **For a rising curve,** the instantaneous rate at the start of an interval is less than the interval's average rate.
- **Thinner slices** bring both rectangle estimates closer together.
- **Round trip:** from distance $5t^2$ you get speed $10t$; the area under $10t$ from 0 to 3 is 45, which matches $5 \times 3^2$.

## 60-second self-test

```recall
Q: Average rate of $f(x) = x^2$ from 0 to 4?
A: $\tfrac{16 - 0}{4} = 4$.
Q: Instantaneous rate of $x^2$ at $x = 3$?
A: $\tfrac{(3 + h)^2 - 9}{h} = 6 + h \to 6$.
Q: $\displaystyle\lim_{x \to 4} \frac{x^2 - 16}{x - 4}$?
A: $x + 4 \to 8$.
Q: Current ramps from 0 to 2 A over 4 s. Charge delivered?
A: Triangle: $\tfrac{1}{2} \times 4 \times 2 = 4$ C.
Q: A 2 kW heater runs 30 minutes. Energy?
A: $2 \times 0.5 = 1$ kWh.
```
