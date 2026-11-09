## The big idea

Trigonometry links angles to lengths. On the unit circle, the point at angle $\theta$ is $(\cos\theta, \sin\theta)$; as the angle keeps turning, sine and cosine trace out waves. Every AC voltage is such a wave, described by its amplitude, frequency and phase.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| $a^2 + b^2 = c^2$ | missing side of a **right** triangle | $c$ is the hypotenuse (the longest side). |
| $\sin\theta = \tfrac{\text{opp}}{\text{hyp}}$, $\cos\theta = \tfrac{\text{adj}}{\text{hyp}}$, $\tan\theta = \tfrac{\text{opp}}{\text{adj}}$ | sides and angles in a right triangle | Opposite and adjacent depend on which angle you use. |
| $\theta = \sin^{-1}(\ldots)$, etc. | finding an angle from a ratio | $\sin^{-1}$ is the inverse function, not $\tfrac{1}{\sin}$. |
| $\text{rad} = \text{deg} \times \tfrac{\pi}{180}$ | converting angles | Check the calculator's DEG/RAD mode. |
| $(\cos\theta, \sin\theta)$ on the unit circle | any angle, including over 90° | Cosine is negative on the left half; sine on the bottom half. |
| $\sin^2\theta + \cos^2\theta = 1$ | finding one from the other | Pick the sign from where the angle lands. |
| $v(t) = A\sin(\omega t + \varphi)$ | describing a sine wave | $A$ is the peak; peak-to-peak is $2A$. |
| $f = \tfrac{1}{T}$, $\omega = 2\pi f$ | converting period, frequency, angular frequency | $f$ in Hz, $\omega$ in rad/s; formulas inside $\sin$ use $\omega$. |
| peak $= \sqrt{2} \times$ RMS | mains voltages | 120 V RMS is about 170 V peak. |

## How to attack a problem

1. **Triangles:** sketch it, mark the right angle and the angle you know, label opposite, adjacent and hypotenuse from that angle.
2. **Choose the ratio** that uses the side you know and the side you want (SOH CAH TOA), then rearrange like any formula.
3. **Angles beyond 90°:** find the reference angle (distance to the nearest horizontal axis), compute the acute value, then attach the sign for that part of the circle.
4. **Waves:** read $A$, $\omega$ and $\varphi$ off the formula; get $f = \omega / 2\pi$ and $T = 1/f$.

## Traps that cost points

- **Degree/radian mode:** $\sin 30$ in radian mode is $-0.988$.
- **Using SOH CAH TOA or Pythagoras on a triangle with no right angle.**
- **Forgetting signs** in the second, third and fourth quarters of the circle.
- **Mixing $f$ and $\omega$:** a 60 Hz wave is $\sin(377t)$, not $\sin(60t)$.
- **Peak vs RMS:** outlet ratings are RMS.

## Sanity checks

- **Sine and cosine** always lie between $-1$ and $1$.
- **The hypotenuse** is always the longest side; a leg longer than it means an error.
- **Period × frequency = 1** (e.g., 20 ms × 50 Hz = 1).
- **Special values:** $\sin 30° = 0.5$, $\cos 60° = 0.5$, $\sin 90° = 1$, $\cos 180° = -1$.

## 60-second self-test

```recall
Q: Legs 6 and 8. Hypotenuse?
A: $\sqrt{36 + 64} = 10$.
Q: Hypotenuse 10, angle 30°. Opposite side?
A: $10 \sin 30° = 5$.
Q: What is $\cos 150°$?
A: Reference 30°, left half: $-\cos 30° \approx -0.866$.
Q: Convert 45° to radians.
A: $\tfrac{\pi}{4} \approx 0.785$.
Q: $v(t) = 5\sin(628t + 0.5)$: amplitude and frequency?
A: Amplitude 5; $f = 628 / 2\pi \approx 100$ Hz.
```
