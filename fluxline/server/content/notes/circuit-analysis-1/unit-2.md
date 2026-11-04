## The big idea

Nodal and mesh analysis turn any circuit into a set of linear equations you can write without thinking. Nodal: unknowns are node voltages, equations are KCL. Mesh: unknowns are loop currents, equations are KVL. Choose whichever gives **fewer equations**.

## Must-know formulas

| Formula | Use it when | Watch out |
|---|---|---|
| KCL at node $n$: $\sum_k \dfrac{v_n - v_k}{R_{nk}} + i_{src,out} = 0$ | nodal analysis, every non-reference node | Write every current **leaving** the node; signs then take care of themselves. |
| $\mathbf{G}\,\mathbf{v} = \mathbf{i}$: $G_{nn} = \sum$ conductances at $n$, $G_{nk} = -$ conductance between $n$ and $k$ | inspection method, independent sources only | With dependent sources the matrix isn't symmetric; write the equations out instead. |
| Supernode: one KCL around both nodes, plus $v_a - v_b = V_s$ | a voltage source between two non-reference nodes | Don't write KCL for either node individually. |
| KVL in mesh $m$: $\sum R\,(i_m - i_{neighbor}) = \sum$ source voltages | mesh analysis, every mesh | A shared resistor carries $i_m - i_{neighbor}$, measured in mesh $m$'s direction. |
| $\mathbf{R}\,\mathbf{i} = \mathbf{v}$: $R_{mm} = $ total $R$ in mesh, $R_{mk} = -$ shared $R$ | inspection method, independent sources only | Take all mesh currents clockwise, or the off-diagonal signs change. |
| Supermesh: KVL around both meshes, skipping the source, plus $i_1 - i_2 = I_s$ | a current source shared by two meshes | A current source on an **outside** branch just fixes that mesh current; no KVL needed. |
| Nodal equations $= N - 1 - (\text{voltage sources})$; mesh $= B - N + 1 - (\text{current sources})$ | choosing the method | $N$ nodes, $B$ branches. Mesh needs a planar circuit. |

## How to attack a problem

1. **Count** equations for both methods; pick the smaller.
2. **Nodal:** choose the reference node (usually the one with the most connections, or the bottom of the voltage sources). Mark node voltages known from sources tied to it.
3. **Mesh:** draw all mesh currents clockwise. Mark mesh currents fixed by outer current sources.
4. **Write** one equation per unknown (KCL or KVL), plus one **constraint** per supernode/supermesh, plus one per **dependent source**, expressing its control variable in terms of your unknowns.
5. **Solve** (substitution for 2 unknowns, matrix or calculator for 3+).
6. **Back out** what was asked: branch currents from node voltages, or element voltages from mesh currents.

## Traps that cost points

- **KCL inside a supernode.** The source's current is unknown; only the KCL around the whole supernode is valid.
- **KVL through a current source.** Its voltage is unknown; go around it (supermesh) or treat the mesh current as known.
- **Forgetting the control equation.** A dependent source adds an unknown; express its controlling $v_x$ or $i_x$ in node voltages or mesh currents.
- **Sign of the shared current.** In mesh $m$'s equation, the shared resistor carries $i_m - i_k$, not $i_k - i_m$.
- **SPICE floating node.** Every node needs a DC path to node 0; a node joined only through capacitors gives a "singular matrix" error. Add a large resistor to ground.

## Sanity checks

- Plug your answers into a **KCL or KVL you didn't use**; it must balance.
- With only independent sources, the inspection matrix is **symmetric** with positive diagonal.
- Node voltages in a circuit of resistors and one source lie **between 0 and the source voltage**.
- In SPICE, a 0 V source in series with a branch acts as an **ammeter**.

## 60-second self-test

```recall
Q: A circuit has 3 nodes, 5 branches and one current source on an outside branch. How many mesh equations?
A: $5 - 3 + 1 = 3$ meshes, minus 1 fixed by the current source: **2**.
Q: Node 1 connects to 2 Ω, 4 Ω and a 4 Ω to ground. What is $G_{11}$?
A: $0.5 + 0.25 + 0.25 = 1$ S.
Q: A 5 V source sits between nodes $a$ and $b$ (neither is ground). What do you write?
A: One KCL around the supernode containing $a$ and $b$, plus $v_a - v_b = 5$.
Q: SPICE reports a singular matrix. Most likely cause?
A: A node with no DC path to ground, or a loop made only of voltage sources (and inductors).
```
