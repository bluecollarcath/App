Covers Lessons 1.1–1.4: Python basics, NumPy, plotting and data analysis, and simulating circuits and ODEs.

```quiz
? In Python, what is `17 // 5`?
= 3 | 0.001 |
> Floor division.
```

```quiz
? In Python, what is `17 % 5`?
= 2 | 0.001 |
> The remainder.
```

```quiz
? What does `sum(range(1, 11))` return?
= 55 | 0.001 |
> $1 + 2 + \cdots + 10$; `range` excludes its end.
```

```quiz
? What is the second element of `np.linspace(1, 2, 5)`?
= 1.25 | 0.001 |
> 1, 1.25, 1.5, 1.75, 2.
```

```quiz
? How many elements does `np.arange(2, 20, 4)` have?
= 5 | 0.001 |
> 2, 6, 10, 14, 18.
```

```quiz
? What is the RMS value of the samples `[3, 4]`?
= 3.536 | 0.002 |
> $\sqrt{(9 + 16)/2}$.
```

```quiz
? `np.linalg.solve([[3, -1], [-1, 2]], [5, 0])` returns $[v_1, v_2]$. What is $v_1$?
= 2 | 0.001 |
> $3v_1 - v_2 = 5$ and $-v_1 + 2v_2 = 0$ give $v_1 = 2$, $v_2 = 1$.
```

```quiz
? In `scipy.integrate.solve_ivp`, the state results are found in:
+ `sol.y`, with one row per state variable
- `sol.t` only
- the return value of the derivative function
- `sol.message`
> `sol.t` holds the times; `sol.y` the states.
```
