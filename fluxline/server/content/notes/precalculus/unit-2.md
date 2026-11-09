## The big idea

A function is a rule that turns each input into exactly one output, and its graph is the picture of every (input, output) pair. Slope measures how fast the output changes per unit of input. That idea, rate of change, is what calculus will extend to curves.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $f(a)$: replace $x$ with $a$ | evaluating a function | Put negative inputs in parentheses: $(-2)^2 = 4$. |
| Domain: no division by 0, no $\sqrt{\text{negative}}$ | finding allowed inputs | $\sqrt{x - 2}$ needs $x \ge 2$; $\tfrac{1}{x - 2}$ needs $x \ne 2$. |
| $m = \dfrac{y_2 - y_1}{x_2 - x_1}$ | slope from two points | Same order on top and bottom; $y$ (rise) goes on top. |
| $y = mx + b$ | equation of a line | $b$ is where it crosses the $y$-axis (at $x = 0$). |
| Slope units = $y$-units per $x$-unit | rates (L/min, mA/V, m/s) | A slope without units hides its meaning. |
| Substitution / elimination | two equations, two unknowns | Multiply **every** term when scaling an equation. |
| $f(x - h)$ moves right $h$; $f(x) + k$ moves up $k$ | shifting graphs | Inside changes feel backward. |
| $f(g(x))$: do $g$ first, then $f$ | composing functions | Order matters: $f(g(x)) \ne g(f(x))$ in general. |
| Inverse: solve $y = f(x)$ for $x$ | undoing a function (sensors, conversions) | $f^{-1}(x)$ is not $\dfrac{1}{f(x)}$. |

## How to attack a problem

1. **Lines:** find the slope from two points, then find $b$ by plugging one point into $y = mx + b$. Check with the other point.
2. **Systems:** if one equation already says "$y = \ldots$", substitute. Otherwise scale an equation so a variable cancels, then add or subtract.
3. **Compositions:** work from the inside out, one function at a time.
4. **Inverses:** write $y = f(x)$, solve for $x$, then rename. Check that $f^{-1}(f(a)) = a$ for a sample value.

## Traps that cost points

- **Reading $f(x)$ as multiplication.** It's "$f$ of $x$."
- **Upside-down slope:** $\tfrac{\Delta x}{\Delta y}$ instead of $\tfrac{\Delta y}{\Delta x}$.
- **Shift direction:** $(x - 3)^2$ moves the parabola **right**, not left.
- **Stopping halfway in a system:** find both unknowns and check both equations.
- **Parallel lines** (same slope, different intercepts) have no solution; algebra produces something like $0 = 5$.

## Sanity checks

- **Rising line?** Positive slope. Falling? Negative. Flat? Zero.
- **Does your solution sit on both lines?** Plug it into both equations.
- **Inverse check:** feed the output back through the inverse and you should get the original input.

## 60-second self-test

```recall
Q: Let $g(x) = x^2 - 3x$. What is $g(-1)$?
A: $(-1)^2 - 3(-1) = 1 + 3 = 4$.
Q: Slope through $(2, 1)$ and $(6, 9)$?
A: $\tfrac{9 - 1}{6 - 2} = 2$.
Q: Solve $x + y = 5$ and $x - y = 1$.
A: Adding: $2x = 6$, so $x = 3$, $y = 2$.
Q: With $f(x) = 2x$ and $g(x) = x + 1$, what is $f(g(4))$?
A: $g(4) = 5$, then $f(5) = 10$.
Q: What is the inverse of $f(x) = 5x - 2$?
A: $f^{-1}(x) = \tfrac{x + 2}{5}$.
```
