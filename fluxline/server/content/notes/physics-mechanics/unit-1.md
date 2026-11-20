## The big idea

Motion is described by position, velocity (the slope of position) and acceleration (the slope of velocity). With constant acceleration, four equations connect them. In two dimensions, split everything into $x$ and $y$: they're independent and share only time. Circular motion at constant speed is still accelerated, toward the center.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $A_x = A\cos\theta$, $A_y = A\sin\theta$ | breaking a vector into components | Check the quadrant when going back with $\tan^{-1}$. |
| $v = dx/dt$, $a = dv/dt$ | position or velocity is a function of time | Displacement is the area under $v(t)$. |
| $v = v_0 + at$ | constant $a$, no displacement needed | Only for constant acceleration. |
| $x = x_0 + v_0t + \tfrac{1}{2}at^2$ | constant $a$, no final velocity needed | Signs: pick a positive direction. |
| $v^2 = v_0^2 + 2a\Delta x$ | constant $a$, no time needed | Stopping distance goes as $v^2$. |
| $a = -g = -9.8$ m/s² | free fall (up positive) | Even at the top of a throw. |
| $R = \dfrac{v_0^2\sin 2\theta}{g}$ | projectile range on level ground | Max at 45°; level ground only. |
| $\omega = 2\pi f = 2\pi/T$, $v = \omega r$ | rotation rates | rpm × $2\pi/60$ = rad/s. |
| $a_c = v^2/r = \omega^2 r$ | uniform circular motion | Points toward the center. |

## How to attack a problem

1. **Convert to SI** (m, s, kg); divide km/h by 3.6.
2. **One dimension:** list $v_0$, $v$, $a$, $\Delta x$, $t$; pick the equation that skips the one you don't need.
3. **Projectile:** split $v_0$ into $v_0\cos\theta$ and $v_0\sin\theta$; get time from the vertical motion; use it horizontally.
4. **Circle:** get $\omega$ in rad/s, then $v = \omega r$ and $a_c = v^2/r$.

## Traps that cost points

- **Adding magnitudes of non-parallel vectors:** add components instead.
- **Zero acceleration at the top of a throw:** velocity is zero, acceleration is still $g$.
- **Gravity changing $v_x$:** horizontal velocity stays constant.
- **Degrees vs radians:** rotational formulas need radians.

## Sanity checks

- **Free fall from rest:** about 10 m/s after 1 s, 5 m fallen.
- **Car braking:** typical decelerations are 5 to 8 m/s².
- **Doubling speed quadruples stopping distance and centripetal acceleration.**

## 60-second self-test

```recall
Q: 108 km/h in m/s?
A: $108/3.6 = 30$ m/s.
Q: Car at 30 m/s braking at 6 m/s². Stopping distance?
A: $900/12 = 75$ m.
Q: Ball thrown up at 15 m/s. Maximum height?
A: $225/19.6 \approx 11.5$ m.
Q: Launch angle for maximum range on level ground?
A: 45°.
Q: Centripetal acceleration at 20 m/s on a 50 m curve?
A: $400/50 = 8$ m/s².
```
