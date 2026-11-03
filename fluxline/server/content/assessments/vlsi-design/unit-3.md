Covers Lessons 3.1–3.3: sequential circuits and clocking, memory arrays, and the ASIC design flow.

```quiz
? $t_{pcq} = 45$ ps, the longest logic path is 750 ps, $t_{setup} = 30$ ps and skew is 25 ps. What is the maximum clock frequency, in MHz?
= 1176.5 | 0.002 | MHz
> $T_c = 850$ ps.
```

```quiz
? $t_{ccq} = 35$ ps, $t_{hold} = 25$ ps and skew is 40 ps. What minimum contamination delay must the logic have, in ps?
= 30 | 0.001 | ps
> $25 + 40 - 35$.
```

```quiz
? A synchronizer with $\tau = 30$ ps gets 150 ps more resolution time. By what factor does its MTBF grow?
= 148.4 | 0.005 |
> $e^{5}$.
```

```quiz
? A DRAM cell of 30 fF shares charge with a 120 fF bitline precharged to 0.5 V. What is the signal, in mV?
= 100 | 0.001 | mV
> $0.5 \times 30/150$.
```

```quiz
? NRE is \$3M; ASICs cost \$10 each and FPGAs \$40. What is the break-even volume?
= 100000 | 0.001 | units
> $3\times10^6/30$.
```

```quiz
? A path has a required time of 1200 ps and arrives at 1150 ps. What is its setup slack, in ps?
= 50 | 0.001 | ps
> $1200 - 1150$.
```

```quiz
? Which check verifies that a layout's connectivity matches its netlist?
+ LVS
- DRC
- ATPG
- CTS
> Layout versus schematic.
```
