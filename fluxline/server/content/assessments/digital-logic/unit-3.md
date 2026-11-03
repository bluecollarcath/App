Covers Lessons 3.1–3.3: latches and flip-flops, registers and counters, and finite-state machines.

```quiz
? A register-to-register path has $t_{clk\text{-}q} = 0.5$ ns, 3 ns of logic, and $t_{setup} = 0.5$ ns. What is the maximum clock frequency, in MHz?
= 250 | 0.01 | MHz
> $1/(4\ \text{ns}) = 250$ MHz.
```

```quiz
? A JK flip-flop with $J = K = 1$ starts at $Q = 0$. What is $Q$ after 3 rising clock edges?
= 1 | 0 |
> $J = K = 1$ toggles: 1, 0, 1.
```

```quiz
? How many flip-flops does a mod-12 counter need?
= 4 | 0 |
> $\lceil\log_2 12\rceil = 4$.
```

```quiz
? A ring counter built from 4 flip-flops cycles through how many states?
= 4 | 0 |
> A ring counter has one state per flip-flop (a Johnson counter would have 8).
```

```quiz
? A binary-encoded FSM has 10 states. How many flip-flops does it need?
= 4 | 0 |
> $\lceil\log_2 10\rceil = 4$.
```

```quiz
? Which statement describes a Mealy machine?
- Its outputs depend only on the current state
+ Its outputs depend on the current state and the current inputs
- It has no state register
- Its outputs change only on clock edges
> That's the difference from a Moore machine.
```

```quiz
? The overlapping 101 detector from Lesson 3.3 receives 1 0 1 1 0 1. How many times does $Z$ go high?
= 2 | 0 |
> Detections end at the 3rd and 6th inputs.
```
