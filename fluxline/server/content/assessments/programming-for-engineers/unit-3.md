Covers Lessons 3.1–3.2: algorithms and complexity, and version control and testing.

```quiz
? At most how many comparisons does binary search need on 4096 sorted items?
= 13 | 0.001 |
> Each step halves the range: $\lfloor\log_2 4096\rfloor + 1 = 13$ checks in the worst case.
```

```quiz
? An $O(n^2)$ routine takes 2 s on 5000 items. Roughly how long on 15,000 items, in s?
= 18 | 0.001 | s
> Three times the input, nine times the work.
```

```quiz
? How many pairs can be formed from 200 items?
= 19900 | 0.001 |
> $n(n - 1)/2$.
```

```quiz
? `git bisect` searches 256 commits. At most how many test runs does it need?
= 8 | 0.001 |
> $\log_2 256$.
```

```quiz
? Which test assertion is appropriate for a computed float?
+ `assert math.isclose(v, 3.1606, rel_tol=1e-4)`
- `assert v == 3.1606`
- `assert v is 3.1606`
- `assert str(v) == "3.1606"`
> Rounding makes exact float equality unreliable.
```

```quiz
? Checking `if x in big_list` inside a loop over 10⁵ items is slow. The best fix is:
+ convert `big_list` to a set before the loop
- sort the list inside the loop
- use a while loop instead
- run the program on a faster computer
> Set membership is O(1) on average.
```
