## The big idea

Exponential change multiplies by the same factor every step; logarithms ask "what exponent?" and undo exponentials. Together they describe growth, decay, half-lives, capacitors charging and discharging, and the decibel scale.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $f(t) = a \cdot b^t$ | something multiplies by $b$ each unit of time | $b > 1$ grows, $0 < b < 1$ decays. Power first, then multiply. |
| $r\%$ growth: $b = 1 + r$; decay: $b = 1 - r$ | interest, depreciation | 5% is $\times 1.05$; 15% loss is $\times 0.85$. |
| $A_0 \left(\tfrac{1}{2}\right)^{t/T}$ | half-life $T$ | Count halvings: $t/T$. |
| $x_0\, e^{-t/\tau}$ | decay with time constant $\tau$ | After $\tau$: 36.8% left; after $5\tau$: under 1%. |
| $\log_b x = y \iff b^y = x$ | understanding any log | A log **is** an exponent. |
| $\log(xy) = \log x + \log y$, $\log(x^n) = n\log x$ | simplifying logs | $\log(x + y)$ does **not** split. |
| $b^x = c \Rightarrow x = \dfrac{\ln c}{\ln b}$ | solving for an exponent | Take ln of both sides; the exponent comes down. |
| $e^{-t/\tau} = k \Rightarrow t = -\tau \ln k$ | "when does it fall to $k$?" | Half: $t = \tau\ln 2 \approx 0.693\tau$; 10%: $t \approx 2.303\tau$. |
| dB $= 10\log_{10}\!\left(\dfrac{P_{out}}{P_{in}}\right)$ | power gain or loss | ×2 ≈ +3 dB, ×10 = +10 dB, ×0.001 = −30 dB. |

## How to attack a problem

1. **Identify the factor**: what is the quantity multiplied by each step? Write $a \cdot b^t$ (or $x_0 e^{-t/\tau}$).
2. **Forward question** ("how much after time $t$?"): plug in $t$ and compute.
3. **Backward question** ("how long until…?"): set the expression equal to the target, isolate the exponential, then take ln of both sides.
4. **Check** by plugging your time back in.

## Traps that cost points

- **Linear thinking:** doubling for 5 hours is $\times 32$, not $\times 10$.
- **$(100 \cdot 2)^5$ vs $100 \cdot 2^5$:** the power binds to its base only.
- **Log of zero or a negative number:** undefined. If you get one, recheck the setup.
- **Wrong log button:** "log" is base 10; "ln" is base $e$. Either works for solving $b^x = c$ if you use the same one on top and bottom.

## Sanity checks

- **Decay answers** must sit between 0 and the starting value.
- **"How long to halve?"** must be positive; a negative time means a sign slip with $\ln$ of a number below 1 (which is negative).
- **Bracket your answer:** $2^x = 20$ must give $x$ between 4 ($2^4 = 16$) and 5 ($2^5 = 32$).

## 60-second self-test

```recall
Q: A sample of 200 doubles every day. How much after 3 days?
A: $200 \cdot 2^3 = 1600$.
Q: What is $\log_3 81$?
A: $4$, because $3^4 = 81$.
Q: Simplify $\ln(e^5) + \ln 1$.
A: $5 + 0 = 5$.
Q: A voltage decays with $\tau = 4$ ms. When is it at half its starting value?
A: $t = \tau \ln 2 \approx 2.77$ ms.
Q: An amplifier has a gain of 20 dB. What is its power ratio?
A: $\times 100$.
```
