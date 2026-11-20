## The big idea

Rotation mirrors linear motion: $\theta, \omega, \alpha$ for $x, v, a$; torque for force; moment of inertia for mass; $L = I\omega$ for momentum. A restoring force $-kx$ gives simple harmonic motion at $\omega = \sqrt{k/m}$, regardless of amplitude. Damping makes oscillations decay; driving near the natural frequency causes resonance with a peak about $Q$ times high. An RLC circuit obeys the very same equations.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $\omega = \omega_0 + \alpha t$, etc. | constant angular acceleration | Radians, not degrees. |
| $\tau = rF\sin\theta$ | torque | Only the perpendicular part turns. |
| $\sum F = 0$ and $\sum\tau = 0$ | static equilibrium | Need both. |
| $I$: disk $\tfrac{1}{2}MR^2$, hoop $MR^2$, rod (center) $\tfrac{1}{12}ML^2$ | moment of inertia | Mass far from the axis counts more. |
| $\sum\tau = I\alpha$ | rotational dynamics | Like $F = ma$. |
| $KE = \tfrac{1}{2}I\omega^2$; $P = \tau\omega$ | rotational energy and motor power | ω in rad/s. |
| $I_1\omega_1 = I_2\omega_2$ | no external torque | $KE$ can change. |
| $\omega = \sqrt{k/m}$, $T = 2\pi\sqrt{L/g}$ | spring; small-angle pendulum | Frequency doesn't depend on amplitude. |
| $\omega_0 = 1/\sqrt{LC}$, $Q = \tfrac{1}{R}\sqrt{L/C}$ | LC / RLC circuits | $L \leftrightarrow m$, $R \leftrightarrow b$, $1/C \leftrightarrow k$. |
| $\Delta\omega = \omega_0/Q$ | resonance bandwidth | High $Q$ = narrow peak. |

## How to attack a problem

1. **Rotation:** convert rpm to rad/s first; then use the linear-style equations.
2. **Torque balance:** pick the pivot, add counterclockwise minus clockwise torques, set to zero.
3. **Oscillator:** find $\omega$ from $k/m$ (or $1/LC$), then $f = \omega/2\pi$; $v_{\max} = A\omega$; $E = \tfrac{1}{2}kA^2$.
4. **Resonance:** find $\omega_0$ and $Q$; bandwidth is $\omega_0/Q$.

## Traps that cost points

- **rpm in formulas:** always convert to rad/s.
- **Using full force for torque at an angle.**
- **Putting mass in the pendulum period.**
- **High $Q$ means heavy damping:** it's the opposite; high $Q$ is light damping.

## Sanity checks

- **A DC motor's power peaks at half its no-load speed.**
- **Rolling objects reach the bottom slower than sliding ones** (hoop slowest).
- **A 1 m pendulum has a 2 s period.**

## 60-second self-test

```recall
Q: Torque from 20 N pushed perpendicular at 0.9 m?
A: $18$ N·m.
Q: Motor at 2 N·m and 3000 rpm. Power?
A: $2 \times 314 \approx 628$ W.
Q: Skater halves her moment of inertia. Spin rate?
A: Doubles.
Q: 0.5 kg on a 200 N/m spring. Frequency?
A: $\omega = 20$ rad/s, $f \approx 3.18$ Hz.
Q: In the RLC analogy, what matches mass?
A: Inductance $L$.
```
