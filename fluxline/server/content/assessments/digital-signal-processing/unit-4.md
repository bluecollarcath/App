Covers Lesson 4.1: decimation, interpolation, and polyphase filters.

```quiz
? A 192 kHz signal is decimated to 48 kHz. What is $M$?
= 4 | 0.001 |
> $192/48$.
```

```quiz
? What anti-aliasing cutoff does that decimator need, in kHz?
= 24 | 0.001 | kHz
> Half the output rate.
```

```quiz
? An ADC oversamples by 64 without noise shaping. How much does the in-band quantization noise drop, in dB?
= 18.06 | 0.005 | dB
> $10\log_{10}64$.
```

```quiz
? A decimate-by-16 FIR stage uses 256 taps. With a polyphase structure, how many taps does each sub-filter have?
= 16 | 0.001 |
> $256/16$.
```

```quiz
? Upsampling by inserting zeros creates:
+ images of the spectrum, which must be removed by a lowpass filter
- aliasing of high frequencies
- a lower Nyquist frequency
- quantization noise
> The interpolation filter removes the $L - 1$ images.
```
