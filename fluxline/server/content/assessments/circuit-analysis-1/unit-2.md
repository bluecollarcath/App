Covers Lessons 2.1–2.3: nodal analysis, mesh analysis, and circuit simulation with SPICE.

```quiz
? A 2 A source injects current into node 1. Node 1 has 4 Ω to ground and 2 Ω to node 2. Node 2 has 6 Ω to ground and nothing else. What is $v_1$, in V?
= 5.333 | 0.01 | V
> $\begin{bmatrix}0.75 & -0.5\\ -0.5 & 0.667\end{bmatrix}\begin{bmatrix}v_1\\v_2\end{bmatrix} = \begin{bmatrix}2\\0\end{bmatrix}$ gives $v_1 = 5.33$ V and $v_2 = 4$ V. (Check: 2 Ω and 6 Ω in series form a divider, $5.33 \cdot \frac{6}{8} = 4$ ✓.)
```

```quiz
? Node 2 connects to ground through 5 Ω, to node 1 through 10 Ω, and to node 3 through 2 Ω. What is the diagonal entry $G_{22}$ of the conductance matrix, in S?
= 0.8 | 0.01 | S
> $G_{22} = \frac15 + \frac1{10} + \frac12 = 0.8$ S.
```

```quiz
? Mesh 1 contains a 12 V source and a 2 Ω resistor; it shares a 4 Ω resistor with mesh 2, which also contains a 6 Ω resistor and no source. What current flows through the shared 4 Ω resistor, in A?
= 1.636 | 0.01 | A
> Mesh equations $6i_1 - 4i_2 = 12$ and $-4i_1 + 10i_2 = 0$ give $i_1 = 2.727$ A and $i_2 = 1.091$ A. The shared resistor carries $i_1 - i_2 = 1.636$ A.
```

```quiz
? A planar circuit has 8 branches and 5 nodes. How many mesh equations does it need?
= 4 | 0 |
> $b - n + 1 = 8 - 5 + 1 = 4$.
```

```quiz
? A 10 V source connects two non-reference nodes directly. How do you handle it in nodal analysis?
- Treat it as a short circuit
- Ignore it, since nodal analysis only uses current sources
+ Form a supernode: one KCL equation around both nodes, plus $v_a - v_b = 10$
- Replace it with a 10 Ω resistor
> The current through an ideal voltage source can't be written with Ohm's law, so enclose it in a supernode and add the constraint equation.
```

```quiz
? Modified nodal analysis is applied to a circuit with 3 non-ground nodes, 1 independent voltage source and 1 independent current source. How many unknowns are there?
= 4 | 0 |
> Node voltages (3) plus one current per voltage source (1) = 4. Current sources add no unknowns.
```
