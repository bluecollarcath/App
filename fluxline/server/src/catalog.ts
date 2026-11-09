// The Ohmentum curriculum: a complete, college-level electrical engineering program,
// sequenced the way an ABET-accredited B.S.E.E. degree is. Each lesson is
// [title, "key topic; key topic; ..."]. Lesson ids are "<unit>-<lesson>" (1-based).

export type LessonTuple = [title: string, topics: string];

export interface CourseDef {
  slug: string;
  code: string;
  title: string;
  stage: 1 | 2 | 3 | 4;
  track: 'Math & Science' | 'Circuits & Electronics' | 'Signals & Systems' | 'Fields & Waves' | 'Digital & Computing' | 'Power & Energy' | 'Professional';
  hours: number;
  description: string;
  prereqs: string[];
  outcomes: string[];
  units: { title: string; lessons: LessonTuple[] }[];
}

export const STAGES: Record<number, { name: string; blurb: string }> = {
  1: { name: 'Foundations', blurb: 'The mathematics, physics, and programming every electrical engineer builds on.' },
  2: { name: 'Core I', blurb: 'Circuit analysis, digital logic, and the language of signals.' },
  3: { name: 'Core II', blurb: 'Electronics, electromagnetics, control, probability, and embedded systems.' },
  4: { name: 'Specialization', blurb: 'Communications, DSP, power, RF, VLSI, and professional practice.' },
};

export const COURSES: CourseDef[] = [
  // ───────────────────────────── STAGE 1 ─────────────────────────────
  {
    slug: 'precalculus', code: 'MATH 100', title: 'Precalculus: Math Foundations', stage: 1, track: 'Math & Science', hours: 35,
    description: 'The starting point if you never took (or don\'t remember) algebra, trigonometry or calculus. Builds every math skill the rest of the curriculum relies on, from fractions and equations to functions, logarithms, trigonometry and sine waves, then gives you an intuitive first look at calculus. Every step is shown.',
    prereqs: [],
    outcomes: ['Work confidently with fractions, exponents, scientific notation and engineering prefixes', 'Solve equations and rearrange any formula for the quantity you need', 'Read, graph and combine functions, including lines, parabolas, exponentials and logarithms', 'Use trigonometry and describe sine waves by amplitude, frequency and phase', 'Explain what a rate of change and an accumulated total are, ready for calculus'],
    units: [
      { title: 'The Algebra Toolkit', lessons: [
        ['Numbers, Fractions & Order of Operations', 'negative numbers; fractions; percentages; order of operations'],
        ['Exponents, Roots & Scientific Notation', 'exponent rules; square roots; scientific notation; engineering prefixes'],
        ['Solving Equations & Rearranging Formulas', 'variables; balancing equations; isolating a variable; Ohm\'s law'],
        ['Factoring & Quadratic Equations', 'expanding; factoring; quadratic formula; checking answers'],
      ] },
      { title: 'Functions & Graphs', lessons: [
        ['What Is a Function?', 'function notation; inputs and outputs; the coordinate plane; domain and range'],
        ['Lines, Slope & Rates', 'slope; y = mx + b; rate of change with units; reading graphs'],
        ['Systems of Linear Equations', 'substitution; elimination; two equations, two unknowns'],
        ['Transforming & Combining Functions', 'shifts and stretches; composition; inverse functions'],
      ] },
      { title: 'Exponentials & Logarithms', lessons: [
        ['Exponential Growth & Decay', 'growth factor; the number e; half-life; time constant'],
        ['Logarithms', 'logs as inverse exponentials; log rules; natural log; solving for time; decibels'],
      ] },
      { title: 'Trigonometry', lessons: [
        ['Angles, Radians & Right Triangles', 'Pythagorean theorem; sine, cosine, tangent; degrees and radians'],
        ['The Unit Circle & Trig Functions', 'unit circle; sine and cosine as functions; key identities'],
        ['Sine Waves: Amplitude, Frequency & Phase', 'A sin(ωt + φ); period; frequency; ω = 2πf'],
      ] },
      { title: 'A First Look at Calculus', lessons: [
        ['Rates of Change & the Idea of a Limit', 'average rate of change; zooming in; instantaneous rate; limits'],
        ['Accumulation & Area', 'adding up small pieces; area under a graph; distance from speed'],
      ] },
    ],
  },
  {
    slug: 'calculus-for-engineers', code: 'MATH 151', title: 'Calculus for Engineers', stage: 1, track: 'Math & Science', hours: 45,
    description: 'Single- and multivariable calculus taught through engineering applications: rates, accumulation, optimization, and the vector calculus that underpins electromagnetics.',
    prereqs: ['precalculus'],
    outcomes: ['Differentiate and integrate elementary and composite functions', 'Model physical rates of change', 'Apply Taylor series to linearize systems', 'Evaluate line, surface, and volume integrals'],
    units: [
      { title: 'Limits & Derivatives', lessons: [
        ['Derivatives as Rates of Change', 'limit definition; slope; i = dq/dt; v = L di/dt'],
        ['Differentiation Rules', 'product rule; quotient rule; chain rule; implicit differentiation'],
        ['Exponentials, Logs & Transients', 'e^x; natural log; time constants; decay'],
        ['Optimization', 'critical points; maximum power transfer preview; constrained extrema'],
      ] },
      { title: 'Integration', lessons: [
        ['The Definite Integral', 'Riemann sums; fundamental theorem; charge from current'],
        ['Techniques of Integration', 'substitution; integration by parts; partial fractions'],
        ['Average & RMS Values', 'average value; root-mean-square; periodic waveforms'],
        ['Improper Integrals', 'convergence; infinite limits; Laplace transform preview'],
      ] },
      { title: 'Series & Approximation', lessons: [
        ['Sequences & Series', 'convergence tests; geometric series; power series'],
        ['Taylor & Maclaurin Series', 'polynomial approximation; small-signal linearization; error bounds'],
        ['Complex Numbers & Euler\'s Formula', 'rectangular/polar form; e^{jθ}; roots of unity'],
      ] },
      { title: 'Multivariable & Vector Calculus', lessons: [
        ['Partial Derivatives & Gradients', 'partials; gradient; directional derivative; potential fields'],
        ['Multiple Integrals', 'double/triple integrals; cylindrical & spherical coordinates'],
        ['Line & Surface Integrals', 'work; flux; parametrized surfaces'],
        ['Divergence, Curl & the Big Theorems', 'divergence theorem; Stokes\' theorem; Green\'s theorem'],
      ] },
    ],
  },
  {
    slug: 'linear-algebra', code: 'MATH 221', title: 'Linear Algebra & Matrix Methods', stage: 1, track: 'Math & Science', hours: 40,
    description: 'Vectors, matrices, and linear transformations with an emphasis on solving the large linear systems that arise from circuits, state-space models, and signal processing.',
    prereqs: [],
    outcomes: ['Solve linear systems with Gaussian elimination', 'Reason about rank, null space, and invertibility', 'Compute eigenvalues and diagonalize matrices', 'Apply least squares to measurement data'],
    units: [
      { title: 'Linear Systems', lessons: [
        ['Systems of Linear Equations', 'Gaussian elimination; row echelon form; circuits as Ax = b'],
        ['Matrix Algebra', 'multiplication; inverse; transpose; block matrices'],
        ['LU Factorization & Numerical Solving', 'LU; pivoting; conditioning; SPICE solvers'],
      ] },
      { title: 'Vector Spaces', lessons: [
        ['Subspaces, Span & Independence', 'span; linear independence; basis'],
        ['Rank & the Four Fundamental Subspaces', 'column space; null space; rank-nullity'],
        ['Orthogonality & Projections', 'inner products; Gram-Schmidt; projection matrices'],
        ['Least Squares', 'normal equations; curve fitting; QR'],
      ] },
      { title: 'Eigen-analysis', lessons: [
        ['Determinants', 'cofactor expansion; properties; Cramer\'s rule'],
        ['Eigenvalues & Eigenvectors', 'characteristic polynomial; eigenspaces; stability'],
        ['Diagonalization & Matrix Exponential', 'similarity; e^{At}; state-space solutions'],
        ['The Singular Value Decomposition', 'SVD; low-rank approximation; pseudo-inverse'],
      ] },
    ],
  },
  {
    slug: 'differential-equations', code: 'MATH 251', title: 'Differential Equations', stage: 1, track: 'Math & Science', hours: 40,
    description: 'Ordinary differential equations, Laplace transforms, and systems of ODEs — the mathematics of every capacitor, inductor, motor, and feedback loop.',
    prereqs: ['calculus-for-engineers'],
    outcomes: ['Solve first- and second-order linear ODEs', 'Use the Laplace transform to solve initial-value problems', 'Analyze systems of first-order ODEs', 'Interpret damping and natural frequency'],
    units: [
      { title: 'First-Order Equations', lessons: [
        ['First-Order Linear ODEs & the RC Circuit', 'integrating factor; time constant; step response'],
        ['Separable & Exact Equations', 'separation of variables; exactness; applications'],
        ['Existence, Uniqueness & Direction Fields', 'Picard theorem; slope fields; equilibria'],
      ] },
      { title: 'Second-Order Equations', lessons: [
        ['Homogeneous Constant-Coefficient ODEs', 'characteristic equation; over/under/critical damping'],
        ['Forced Response', 'undetermined coefficients; variation of parameters'],
        ['Resonance & the Series RLC', 'natural frequency; damping ratio; quality factor'],
      ] },
      { title: 'The Laplace Transform', lessons: [
        ['Definition & Properties', 'transform pairs; linearity; shifting; derivatives'],
        ['Inverse Transforms & Partial Fractions', 'residues; repeated roots; complex poles'],
        ['Step, Impulse & Convolution', 'unit step; Dirac delta; convolution theorem'],
      ] },
      { title: 'Systems of ODEs', lessons: [
        ['First-Order Linear Systems', 'state vector; eigenvalue method; phase portraits'],
        ['Numerical Methods', 'Euler; Runge-Kutta; stiffness'],
      ] },
    ],
  },
  {
    slug: 'physics-electricity-magnetism', code: 'PHYS 212', title: 'University Physics: Electricity & Magnetism', stage: 1, track: 'Math & Science', hours: 45,
    description: 'Calculus-based physics of electric charge, fields, potential, current, magnetism, and induction — the physical foundation of the discipline.',
    prereqs: ['calculus-for-engineers'],
    outcomes: ['Compute electric fields from charge distributions', 'Apply Gauss\'s law to symmetric problems', 'Relate potential, capacitance, and stored energy', 'Use Faraday\'s law to explain induction'],
    units: [
      { title: 'Electrostatics', lessons: [
        ['Charge & Coulomb\'s Law', 'quantization; conservation; superposition of forces'],
        ['The Electric Field', 'field lines; continuous distributions; dipoles'],
        ['Gauss\'s Law', 'flux; symmetry; conductors in equilibrium'],
        ['Electric Potential', 'work; equipotentials; E = −∇V'],
      ] },
      { title: 'Capacitance & Current', lessons: [
        ['Capacitors & Dielectrics', 'C = εA/d; energy storage; polarization'],
        ['Current, Resistance & Drift', 'current density; resistivity; drift velocity'],
        ['DC Circuits from a Physics View', 'emf; internal resistance; energy flow'],
      ] },
      { title: 'Magnetism', lessons: [
        ['Magnetic Force & Field', 'Lorentz force; force on wires; cyclotron motion'],
        ['Biot–Savart & Ampère\'s Law', 'field of a wire; solenoid; toroid'],
        ['Faraday\'s Law & Induction', 'motional emf; Lenz\'s law; generators'],
        ['Inductance & Magnetic Energy', 'self/mutual inductance; energy density'],
      ] },
    ],
  },
  {
    slug: 'programming-for-engineers', code: 'ECE 120', title: 'Programming for Engineers', stage: 1, track: 'Digital & Computing', hours: 40,
    description: 'Structured programming in Python and C for engineers: numerical computation, data analysis, simulation, and low-level memory concepts that lead into embedded systems.',
    prereqs: [],
    outcomes: ['Write and debug programs in Python and C', 'Use NumPy for numerical analysis and plotting', 'Understand pointers, memory, and bit manipulation', 'Simulate engineering systems numerically'],
    units: [
      { title: 'Python for Engineering', lessons: [
        ['Variables, Control Flow & Functions', 'types; loops; functions; modules'],
        ['NumPy, Arrays & Vectorization', 'ndarray; broadcasting; linear algebra'],
        ['Plotting & Data Analysis', 'matplotlib; CSV data; curve fitting'],
        ['Simulating Circuits & ODEs', 'scipy.integrate; solving nodal equations'],
      ] },
      { title: 'C and the Machine', lessons: [
        ['C Fundamentals', 'compilation; types; control flow'],
        ['Pointers, Arrays & Memory', 'addresses; stack vs heap; malloc'],
        ['Bitwise Operations & Registers', 'masks; shifts; memory-mapped I/O preview'],
        ['Structs, Files & Modular Code', 'structs; headers; makefiles'],
      ] },
      { title: 'Software Practice', lessons: [
        ['Algorithms & Complexity', 'big-O; sorting; searching'],
        ['Version Control & Testing', 'git; unit tests; debugging'],
      ] },
    ],
  },

  // ───────────────────────────── STAGE 2 ─────────────────────────────
  {
    slug: 'circuit-analysis-1', code: 'ECE 201', title: 'Circuit Analysis I', stage: 2, track: 'Circuits & Electronics', hours: 50,
    description: 'The cornerstone course of electrical engineering. DC circuit laws, systematic nodal and mesh analysis, network theorems, operational amplifiers, and first-order transients.',
    prereqs: ['calculus-for-engineers', 'physics-electricity-magnetism'],
    outcomes: ['Apply Ohm\'s law and Kirchhoff\'s laws to any linear circuit', 'Solve circuits systematically with nodal and mesh analysis', 'Simplify networks with Thévenin, Norton, and superposition', 'Analyze ideal op-amp circuits', 'Find the transient response of RC and RL circuits'],
    units: [
      { title: 'Circuit Fundamentals', lessons: [
        ['Charge, Current, Voltage & Power', 'SI units; passive sign convention; power balance'],
        ['Ohm\'s Law & Kirchhoff\'s Laws', 'resistance; KCL; KVL; nodes and loops'],
        ['Series, Parallel & Dividers', 'equivalent resistance; voltage divider; current divider'],
        ['Dependent Sources & Wye–Delta', 'VCVS/VCCS/CCVS/CCCS; Y–Δ transformation'],
      ] },
      { title: 'Systematic Analysis', lessons: [
        ['Nodal Analysis', 'node voltages; supernodes; matrix form'],
        ['Mesh Analysis', 'mesh currents; supermeshes; choosing a method'],
        ['Circuit Simulation with SPICE', 'netlists; .op; .dc sweeps'],
      ] },
      { title: 'Network Theorems', lessons: [
        ['Thévenin & Norton Equivalents', 'open-circuit voltage; short-circuit current; R_th'],
        ['Superposition & Source Transformation', 'linearity; deactivating sources'],
        ['Maximum Power Transfer', 'load matching; efficiency trade-off'],
      ] },
      { title: 'Operational Amplifiers', lessons: [
        ['The Ideal Op-Amp', 'virtual short; inverting; non-inverting'],
        ['Op-Amp Building Blocks', 'summer; difference amp; buffer; cascades'],
      ] },
      { title: 'Energy Storage & Transients', lessons: [
        ['Capacitors & Inductors', 'i = C dv/dt; v = L di/dt; energy; continuity'],
        ['First-Order RC & RL Transients', 'natural/step response; time constant'],
        ['Switched Circuits & General First-Order Solutions', 'initial/final value method; sequential switching'],
      ] },
    ],
  },
  {
    slug: 'circuit-analysis-2', code: 'ECE 202', title: 'Circuit Analysis II', stage: 2, track: 'Circuits & Electronics', hours: 50,
    description: 'Second-order transients, sinusoidal steady state with phasors, AC power, three-phase systems, Laplace-domain circuit analysis, frequency response, filters, and two-port networks.',
    prereqs: ['circuit-analysis-1', 'differential-equations'],
    outcomes: ['Solve second-order RLC transients', 'Analyze AC circuits with phasors and impedance', 'Compute real, reactive, and complex power', 'Use the Laplace transform for circuit analysis', 'Design passive filters from Bode plots'],
    units: [
      { title: 'Second-Order Circuits', lessons: [
        ['Series & Parallel RLC Natural Response', 'damping; ω₀; α; characteristic roots'],
        ['RLC Step Response', 'overdamped; critically damped; underdamped'],
      ] },
      { title: 'Sinusoidal Steady State', lessons: [
        ['Sinusoids & Phasors', 'amplitude/phase; phasor transform; impedance'],
        ['AC Circuit Analysis', 'nodal/mesh with phasors; Thévenin in AC'],
        ['AC Power', 'instantaneous/average power; RMS; complex power; power factor'],
        ['Power Factor Correction', 'capacitor sizing; utility tariffs'],
      ] },
      { title: 'Three-Phase & Magnetically Coupled Circuits', lessons: [
        ['Balanced Three-Phase Systems', 'Y and Δ; line vs phase quantities; per-phase analysis'],
        ['Mutual Inductance & Transformers', 'dot convention; coupling coefficient; ideal transformer'],
      ] },
      { title: 'Laplace-Domain Analysis', lessons: [
        ['Circuits in the s-Domain', 's-domain models; initial conditions as sources'],
        ['Transfer Functions, Poles & Zeros', 'H(s); stability; impulse response'],
      ] },
      { title: 'Frequency Response & Filters', lessons: [
        ['Bode Plots', 'magnitude/phase asymptotes; decibels'],
        ['Passive & Active Filters', 'low/high/band-pass; Sallen-Key; Butterworth'],
        ['Two-Port Networks', 'z, y, h, and ABCD parameters; interconnection'],
      ] },
    ],
  },
  {
    slug: 'digital-logic', code: 'ECE 220', title: 'Digital Logic Design', stage: 2, track: 'Digital & Computing', hours: 45,
    description: 'Number systems, Boolean algebra, combinational and sequential logic, finite-state machines, and hardware description with Verilog — the foundation of every digital system.',
    prereqs: [],
    outcomes: ['Convert between number systems and represent signed values', 'Minimize Boolean functions with algebra and K-maps', 'Design combinational and sequential circuits', 'Design and implement finite-state machines in Verilog'],
    units: [
      { title: 'Number Systems & Boolean Algebra', lessons: [
        ['Binary, Hex & Two\'s Complement', 'positional notation; signed numbers; overflow'],
        ['Boolean Algebra & Logic Gates', 'axioms; De Morgan; universal gates'],
        ['Canonical Forms & Karnaugh Maps', 'SOP/POS; minterms; don\'t-cares'],
      ] },
      { title: 'Combinational Logic', lessons: [
        ['Multiplexers, Decoders & Encoders', 'MUX-based logic; priority encoders'],
        ['Arithmetic Circuits', 'half/full adder; ripple-carry; carry-lookahead'],
        ['Timing & Hazards', 'propagation delay; glitches; critical path'],
      ] },
      { title: 'Sequential Logic', lessons: [
        ['Latches & Flip-Flops', 'SR latch; D flip-flop; setup/hold'],
        ['Registers & Counters', 'shift registers; synchronous counters'],
        ['Finite-State Machines', 'Moore vs Mealy; state encoding; design flow'],
      ] },
      { title: 'Hardware Description', lessons: [
        ['Verilog for Combinational Logic', 'modules; assign; always @*'],
        ['Verilog for Sequential Logic & FPGAs', 'non-blocking assignment; testbenches; synthesis'],
      ] },
    ],
  },
  {
    slug: 'signals-and-systems', code: 'ECE 301', title: 'Signals & Systems', stage: 2, track: 'Signals & Systems', hours: 50,
    description: 'Continuous- and discrete-time signals, LTI systems, convolution, Fourier series and transforms, Laplace and z-transforms, and sampling — the mathematical language of modern EE.',
    prereqs: ['differential-equations', 'circuit-analysis-1'],
    outcomes: ['Classify signals and systems by their properties', 'Compute outputs of LTI systems by convolution', 'Analyze signals in the frequency domain', 'Apply Laplace and z-transforms to system analysis', 'State and apply the sampling theorem'],
    units: [
      { title: 'Signals & Systems Basics', lessons: [
        ['Signal Classifications & Operations', 'energy/power; even/odd; time shift and scale'],
        ['System Properties', 'linearity; time invariance; causality; BIBO stability'],
      ] },
      { title: 'LTI Systems', lessons: [
        ['Convolution in Continuous Time', 'impulse response; convolution integral; graphical method'],
        ['Convolution in Discrete Time', 'convolution sum; FIR systems'],
      ] },
      { title: 'Fourier Analysis', lessons: [
        ['Fourier Series', 'trigonometric/exponential series; Parseval; Gibbs'],
        ['The Continuous-Time Fourier Transform', 'transform pairs; properties; spectra'],
        ['The Discrete-Time Fourier Transform', 'DTFT; periodicity; frequency response'],
      ] },
      { title: 'Transforms & Sampling', lessons: [
        ['The Laplace Transform for Systems', 'ROC; system function; stability'],
        ['The z-Transform', 'ROC; inverse z; difference equations'],
        ['Sampling & Reconstruction', 'Nyquist theorem; aliasing; interpolation'],
      ] },
    ],
  },

  // ───────────────────────────── STAGE 3 ─────────────────────────────
  {
    slug: 'microelectronics-1', code: 'ECE 310', title: 'Microelectronics I', stage: 3, track: 'Circuits & Electronics', hours: 50,
    description: 'Semiconductor devices as circuit elements: diodes, BJTs, and MOSFETs. Biasing, small-signal models, and single-stage amplifier design.',
    prereqs: ['circuit-analysis-2'],
    outcomes: ['Analyze diode circuits including rectifiers and regulators', 'Bias BJT and MOSFET transistors', 'Derive and use small-signal models', 'Design single-stage amplifiers for gain and impedance'],
    units: [
      { title: 'Diodes', lessons: [
        ['Diode Models & Analysis', 'Shockley equation; constant-drop model; load line'],
        ['Rectifiers & Power Supplies', 'half/full wave; ripple; filter capacitor'],
        ['Zener Diodes, Clippers & Clampers', 'breakdown; regulation; waveshaping'],
      ] },
      { title: 'MOSFETs', lessons: [
        ['MOSFET Structure & I–V Characteristics', 'threshold; triode; saturation; channel-length modulation'],
        ['MOSFET Biasing', 'DC analysis; bias stability'],
        ['MOSFET Small-Signal Model', 'g_m; r_o; T-model; hybrid-π'],
        ['CS, CG & CD Amplifiers', 'gain; input/output resistance'],
      ] },
      { title: 'BJTs', lessons: [
        ['BJT Operation & I–V Characteristics', 'active mode; β; Early effect'],
        ['BJT Biasing & Small-Signal Model', 'g_m = I_C/V_T; r_π; r_o'],
        ['CE, CB & CC Amplifiers', 'gain; impedance; emitter degeneration'],
      ] },
      { title: 'Amplifier Fundamentals', lessons: [
        ['Amplifier Models & Cascading', 'voltage/current/transconductance amps; loading'],
        ['Low-Frequency Response', 'coupling and bypass capacitors; lower cutoff'],
      ] },
    ],
  },
  {
    slug: 'microelectronics-2', code: 'ECE 311', title: 'Microelectronics II', stage: 3, track: 'Circuits & Electronics', hours: 45,
    description: 'Integrated circuit amplifiers: current mirrors, differential pairs, multistage amplifiers, high-frequency response, feedback, stability, and output stages.',
    prereqs: ['microelectronics-1'],
    outcomes: ['Design current sources and active loads', 'Analyze differential amplifiers', 'Predict high-frequency response with Miller and OCTC methods', 'Apply feedback theory and ensure stability'],
    units: [
      { title: 'IC Building Blocks', lessons: [
        ['Current Mirrors & Current Sources', 'basic/cascode/Wilson mirrors; output resistance'],
        ['Differential Pairs', 'differential/common-mode gain; CMRR; active load'],
        ['Multistage & Op-Amp Internals', 'two-stage op-amp; gain stages; offsets'],
      ] },
      { title: 'Frequency Response', lessons: [
        ['High-Frequency Device Models', 'C_gs; C_gd; f_T'],
        ['The Miller Effect & Time-Constant Methods', 'Miller theorem; OCTC; dominant pole'],
      ] },
      { title: 'Feedback & Stability', lessons: [
        ['Feedback Topologies', 'series-shunt etc.; loop gain; desensitivity'],
        ['Stability & Compensation', 'phase margin; Miller compensation'],
      ] },
      { title: 'Output Stages & Oscillators', lessons: [
        ['Output Stages', 'class A, B, AB; efficiency; crossover distortion'],
        ['Oscillators', 'Barkhausen criterion; Wien bridge; LC and crystal'],
      ] },
    ],
  },
  {
    slug: 'electromagnetics', code: 'ECE 320', title: 'Engineering Electromagnetics', stage: 3, track: 'Fields & Waves', hours: 50,
    description: 'Vector analysis, static fields, Maxwell\'s equations, uniform plane waves, transmission lines, and an introduction to waveguides and antennas.',
    prereqs: ['physics-electricity-magnetism', 'calculus-for-engineers', 'circuit-analysis-2'],
    outcomes: ['Apply Maxwell\'s equations in integral and differential form', 'Solve electrostatic and magnetostatic boundary-value problems', 'Analyze plane-wave propagation, reflection, and transmission', 'Design matching networks with transmission lines and the Smith chart'],
    units: [
      { title: 'Transmission Lines', lessons: [
        ['Transmission Line Fundamentals', 'distributed model; telegrapher\'s equations; Z₀'],
        ['Reflection, VSWR & Input Impedance', 'Γ; standing waves; quarter-wave transformer'],
        ['The Smith Chart & Impedance Matching', 'normalized impedance; stub matching'],
        ['Transients on Transmission Lines', 'bounce diagrams; signal integrity'],
      ] },
      { title: 'Static Fields', lessons: [
        ['Vector Analysis & Coordinate Systems', 'gradient; divergence; curl; coordinate transforms'],
        ['Electrostatics & Boundary Conditions', 'Poisson/Laplace equations; images'],
        ['Magnetostatics', 'vector potential; inductance; magnetic materials'],
      ] },
      { title: 'Maxwell\'s Equations & Waves', lessons: [
        ['Maxwell\'s Equations', 'displacement current; integral and point forms'],
        ['Uniform Plane Waves', 'wave equation; propagation constant; skin depth'],
        ['Reflection & Transmission at Interfaces', 'normal/oblique incidence; polarization'],
      ] },
      { title: 'Guided Waves & Radiation', lessons: [
        ['Waveguides', 'TE/TM modes; cutoff frequency'],
        ['Antenna Fundamentals', 'Hertzian dipole; radiation pattern; gain; Friis equation'],
      ] },
    ],
  },
  {
    slug: 'probability-random-processes', code: 'ECE 313', title: 'Probability & Random Processes', stage: 3, track: 'Signals & Systems', hours: 40,
    description: 'Probability, random variables, and stochastic processes for engineers, with applications to noise, communications, reliability, and estimation.',
    prereqs: ['calculus-for-engineers'],
    outcomes: ['Compute probabilities using axioms, conditioning, and Bayes\' rule', 'Work with discrete and continuous random variables', 'Characterize random processes by mean, autocorrelation, and PSD', 'Analyze noise through LTI systems'],
    units: [
      { title: 'Probability', lessons: [
        ['Axioms, Counting & Conditional Probability', 'sample spaces; combinatorics; Bayes'],
        ['Discrete Random Variables', 'PMF; Bernoulli; binomial; Poisson'],
        ['Continuous Random Variables', 'PDF; CDF; uniform; exponential; Gaussian'],
      ] },
      { title: 'Multiple Random Variables', lessons: [
        ['Joint Distributions & Independence', 'joint PDF; marginals; covariance'],
        ['Functions of Random Variables', 'transformations; sums; moment-generating functions'],
        ['Limit Theorems', 'law of large numbers; central limit theorem'],
      ] },
      { title: 'Random Processes', lessons: [
        ['Stationarity & Autocorrelation', 'WSS; ergodicity'],
        ['Power Spectral Density', 'Wiener-Khinchin; white noise'],
        ['Random Signals Through LTI Systems', 'output PSD; thermal noise; SNR'],
      ] },
    ],
  },
  {
    slug: 'semiconductor-devices', code: 'ECE 340', title: 'Semiconductor Devices', stage: 3, track: 'Circuits & Electronics', hours: 40,
    description: 'The physics behind the transistor: crystal structure, energy bands, carrier statistics and transport, the p-n junction, and the operating principles of BJTs and MOSFETs.',
    prereqs: ['physics-electricity-magnetism'],
    outcomes: ['Explain energy bands and carrier statistics', 'Model drift and diffusion currents', 'Derive the ideal diode equation', 'Relate device physics to transistor models'],
    units: [
      { title: 'Semiconductor Fundamentals', lessons: [
        ['Crystals & Energy Bands', 'lattices; bandgap; effective mass'],
        ['Carrier Statistics & Doping', 'Fermi-Dirac; intrinsic carriers; n and p type'],
        ['Carrier Transport', 'drift; mobility; diffusion; Einstein relation'],
        ['Generation, Recombination & Continuity', 'minority carrier lifetime; diffusion length'],
      ] },
      { title: 'Junctions', lessons: [
        ['The p–n Junction in Equilibrium', 'built-in potential; depletion width'],
        ['The Ideal Diode Equation', 'forward/reverse bias; minority carrier injection'],
        ['Breakdown, Capacitance & Metal–Semiconductor Contacts', 'avalanche; Zener; Schottky; ohmic'],
      ] },
      { title: 'Transistors', lessons: [
        ['Bipolar Junction Transistor Physics', 'emitter efficiency; base transport'],
        ['The MOS Capacitor', 'accumulation; depletion; inversion; threshold voltage'],
        ['MOSFET Physics & Scaling', 'square law; short-channel effects; FinFETs'],
      ] },
    ],
  },
  {
    slug: 'control-systems', code: 'ECE 330', title: 'Control Systems', stage: 3, track: 'Signals & Systems', hours: 45,
    description: 'Modeling, analysis, and design of feedback control systems: transfer functions, time response, root locus, frequency-domain design, PID control, and state space.',
    prereqs: ['signals-and-systems', 'linear-algebra'],
    outcomes: ['Model electrical and electromechanical systems', 'Evaluate stability with Routh–Hurwitz and Nyquist', 'Design controllers with root locus and Bode methods', 'Design state-feedback controllers'],
    units: [
      { title: 'Modeling', lessons: [
        ['Transfer Functions & Block Diagrams', 'modeling; block diagram algebra; DC motor'],
        ['State-Space Models', 'state equations; conversion to/from transfer functions'],
      ] },
      { title: 'Time Response & Stability', lessons: [
        ['First- & Second-Order Response', 'rise time; overshoot; settling time'],
        ['Stability & Routh–Hurwitz', 'characteristic equation; Routh array'],
        ['Steady-State Error', 'system type; error constants'],
      ] },
      { title: 'Design', lessons: [
        ['Root Locus', 'sketching rules; gain selection'],
        ['PID Control & Compensators', 'P, PI, PD, PID; lead/lag'],
        ['Frequency Response & Nyquist', 'gain/phase margin; Nyquist criterion'],
      ] },
      { title: 'Modern Control', lessons: [
        ['Controllability & Pole Placement', 'controllability matrix; Ackermann'],
        ['Observers & Digital Control', 'observability; Luenberger observer; discretization'],
      ] },
    ],
  },
  {
    slug: 'embedded-systems', code: 'ECE 362', title: 'Microprocessors & Embedded Systems', stage: 3, track: 'Digital & Computing', hours: 45,
    description: 'Computer architecture from the instruction set down, and embedded systems from the register up: assembly, memory, interrupts, timers, serial buses, and real-time software on ARM microcontrollers.',
    prereqs: ['digital-logic', 'programming-for-engineers'],
    outcomes: ['Explain the datapath and control of a processor', 'Write assembly and embedded C for a microcontroller', 'Use interrupts, timers, ADCs, and PWM', 'Interface peripherals over UART, SPI, and I²C'],
    units: [
      { title: 'Computer Architecture', lessons: [
        ['Instruction Set Architecture', 'RISC vs CISC; addressing modes; ARM/RISC-V'],
        ['Assembly Programming', 'registers; branching; the stack; calling conventions'],
        ['The Processor Datapath & Pipelining', 'single-cycle; hazards; forwarding'],
        ['Memory Hierarchy', 'caches; locality; hit rate'],
      ] },
      { title: 'Microcontroller Peripherals', lessons: [
        ['GPIO & Memory-Mapped I/O', 'registers; pull-ups; debouncing'],
        ['Interrupts & Exceptions', 'NVIC; ISRs; latency; priorities'],
        ['Timers & PWM', 'prescalers; compare; motor and LED control'],
        ['ADCs & DACs', 'resolution; sampling; quantization'],
      ] },
      { title: 'Communication & Real-Time Software', lessons: [
        ['Serial Buses: UART, SPI, I²C', 'framing; clocking; addressing'],
        ['Real-Time Operating Systems', 'tasks; scheduling; semaphores'],
        ['Low-Power Design', 'sleep modes; energy budgets'],
      ] },
    ],
  },

  {
    slug: 'pcb-design', code: 'ECE 270', title: 'PCB Design & Schematic Reading', stage: 3, track: 'Circuits & Electronics', hours: 40,
    description: 'Read any schematic and datasheet with confidence, then design, lay out, order, assemble and debug your own printed circuit boards.',
    prereqs: ['circuit-analysis-1'],
    outcomes: ['Read schematics, symbols, reference designators and datasheets fluently', 'Capture a schematic and choose footprints in an EDA tool', 'Place and route a board with sound grounding, decoupling and trace sizing', 'Produce manufacturing files, then assemble, bring up and debug a board'],
    units: [
      { title: 'Reading Schematics', lessons: [
        ['Schematic Symbols & Conventions', 'component symbols; reference designators; value notation; power and ground'],
        ['Reading a Real Schematic', 'sheets; net labels; buses; signal flow; functional blocks'],
        ['Datasheets & Component Selection', 'absolute maximum ratings; electrical characteristics; packages; derating'],
      ] },
      { title: 'From Schematic to Board', lessons: [
        ['How PCBs Are Made', 'layers; stackups; copper weight; vias; finishes; fab capabilities'],
        ['Schematic Capture, Symbols & Footprints', 'EDA workflow; libraries; footprints; ERC; netlists'],
        ['Component Placement', 'mechanical constraints; grouping; critical loops; thermal; DFM'],
      ] },
      { title: 'Routing & Signal Integrity', lessons: [
        ['Routing & Trace Sizing', 'current capacity; voltage clearance; vias; routing rules'],
        ['Grounding, Return Paths & Decoupling', 'ground planes; loop area; decoupling networks'],
        ['High-Speed Signals & Controlled Impedance', 'rise time; impedance; differential pairs; termination'],
        ['Power, Thermal & EMC Layout', 'switching-regulator hot loops; thermal vias; emissions; ESD'],
      ] },
      { title: 'Building the Board', lessons: [
        ['Design Checks & Manufacturing Files', 'DRC; Gerbers; drill files; BOM; pick-and-place; ordering'],
        ['Assembly, Bring-Up & Debugging', 'soldering; reflow; first power-up; debugging; rework'],
      ] },
    ],
  },

  // ───────────────────────────── STAGE 4 ─────────────────────────────
  {
    slug: 'communication-systems', code: 'ECE 440', title: 'Communication Systems', stage: 4, track: 'Signals & Systems', hours: 45,
    description: 'Analog and digital communications: modulation, noise, pulse shaping, digital modulation schemes, error probability, channel capacity, and coding.',
    prereqs: ['signals-and-systems', 'probability-random-processes'],
    outcomes: ['Analyze AM and FM systems', 'Design baseband and passband digital links', 'Compute bit-error rates in AWGN', 'Apply Shannon capacity and basic error-correcting codes'],
    units: [
      { title: 'Analog Modulation', lessons: [
        ['Amplitude Modulation', 'DSB-SC; AM; SSB; envelope detection'],
        ['Angle Modulation', 'FM/PM; Carson\'s rule; FM demodulation'],
        ['Superheterodyne Receivers', 'mixing; IF; image frequency'],
      ] },
      { title: 'Digital Communications', lessons: [
        ['Pulse Shaping & ISI', 'Nyquist criterion; raised cosine; eye diagrams'],
        ['Digital Modulation', 'ASK; PSK; QAM; constellations'],
        ['Optimum Detection & Bit-Error Rate', 'matched filter; Q-function; Eb/N0'],
      ] },
      { title: 'Information Theory & Coding', lessons: [
        ['Entropy & Channel Capacity', 'Shannon-Hartley; source coding'],
        ['Error-Control Coding', 'Hamming codes; convolutional codes; LDPC overview'],
        ['Modern Systems: OFDM & MIMO', 'multicarrier; diversity; 5G/Wi-Fi'],
      ] },
    ],
  },
  {
    slug: 'digital-signal-processing', code: 'ECE 438', title: 'Digital Signal Processing', stage: 4, track: 'Signals & Systems', hours: 45,
    description: 'Discrete-time signal processing: sampling, the DFT and FFT, FIR and IIR filter design, multirate processing, and practical implementation.',
    prereqs: ['signals-and-systems'],
    outcomes: ['Analyze discrete-time systems with the z-transform and DTFT', 'Compute spectra efficiently with the FFT', 'Design FIR and IIR filters to specification', 'Implement multirate systems'],
    units: [
      { title: 'Sampling & Discrete-Time Systems', lessons: [
        ['Sampling, Aliasing & Quantization', 'Nyquist rate; anti-aliasing; quantization noise'],
        ['Difference Equations & z-Domain Analysis', 'poles/zeros; frequency response'],
      ] },
      { title: 'Spectral Analysis', lessons: [
        ['The Discrete Fourier Transform', 'DFT definition; circular convolution; zero padding'],
        ['The Fast Fourier Transform', 'radix-2 decimation in time; complexity'],
        ['Windowing & Spectral Leakage', 'Hann; Hamming; resolution'],
      ] },
      { title: 'Filter Design', lessons: [
        ['FIR Filter Design', 'linear phase; window method; Parks-McClellan'],
        ['IIR Filter Design', 'bilinear transform; Butterworth; Chebyshev'],
        ['Filter Structures & Finite Word Length', 'direct forms; cascade; quantization effects'],
      ] },
      { title: 'Multirate DSP', lessons: [
        ['Decimation & Interpolation', 'downsampling; upsampling; polyphase'],
      ] },
    ],
  },
  {
    slug: 'power-systems', code: 'ECE 450', title: 'Power Systems Analysis', stage: 4, track: 'Power & Energy', hours: 45,
    description: 'Generation, transmission, and distribution of electric power: three-phase power, per-unit analysis, transformers, line models, power flow, faults, and stability.',
    prereqs: ['circuit-analysis-2'],
    outcomes: ['Analyze balanced three-phase power systems', 'Use the per-unit system', 'Solve power-flow problems', 'Compute symmetrical and unsymmetrical fault currents'],
    units: [
      { title: 'Fundamentals', lessons: [
        ['Three-Phase Power & Complex Power', 'balanced systems; P, Q, S; power triangle'],
        ['The Per-Unit System', 'base quantities; change of base'],
        ['Power Transformers', 'equivalent circuit; three-phase connections'],
      ] },
      { title: 'Transmission', lessons: [
        ['Transmission Line Parameters', 'resistance; inductance; capacitance; bundling'],
        ['Transmission Line Models', 'short/medium/long lines; ABCD; surge impedance loading'],
      ] },
      { title: 'Network Analysis', lessons: [
        ['Power Flow', 'Y-bus; Gauss-Seidel; Newton-Raphson'],
        ['Symmetrical Faults', 'subtransient reactance; fault current'],
        ['Symmetrical Components & Unsymmetrical Faults', 'sequence networks; SLG; LL; DLG'],
      ] },
      { title: 'Operation', lessons: [
        ['Power System Stability', 'swing equation; equal-area criterion'],
        ['Grid Integration of Renewables', 'inverter-based resources; frequency control'],
      ] },
    ],
  },
  {
    slug: 'power-electronics', code: 'ECE 464', title: 'Power Electronics', stage: 4, track: 'Power & Energy', hours: 40,
    description: 'Efficient electrical energy conversion with switching circuits: DC-DC converters, rectifiers, inverters, magnetics, and converter control.',
    prereqs: ['microelectronics-1', 'circuit-analysis-2'],
    outcomes: ['Analyze switched-mode converters in steady state', 'Design buck, boost, and isolated converters', 'Analyze rectifiers and inverters', 'Model and control converters'],
    units: [
      { title: 'DC-DC Conversion', lessons: [
        ['Switching Converters & Volt-Second Balance', 'efficiency; inductor volt-second; capacitor charge balance'],
        ['Buck, Boost & Buck-Boost Converters', 'conversion ratios; ripple; CCM/DCM'],
        ['Isolated Converters', 'flyback; forward; full-bridge'],
      ] },
      { title: 'AC Conversion', lessons: [
        ['Rectifiers', 'diode and thyristor rectifiers; power quality'],
        ['Inverters & PWM', 'half/full bridge; sinusoidal PWM; space vector'],
      ] },
      { title: 'Design & Control', lessons: [
        ['Power Semiconductor Devices', 'MOSFETs; IGBTs; SiC; GaN; losses'],
        ['Magnetics Design', 'inductor and transformer design; core loss'],
        ['Converter Modeling & Control', 'averaged models; compensator design'],
      ] },
    ],
  },
  {
    slug: 'electric-machines', code: 'ECE 452', title: 'Electric Machines & Drives', stage: 4, track: 'Power & Energy', hours: 40,
    description: 'Magnetic circuits, transformers, DC machines, induction machines, synchronous machines, and variable-speed drives.',
    prereqs: ['circuit-analysis-2', 'physics-electricity-magnetism'],
    outcomes: ['Analyze magnetic circuits', 'Model transformers and rotating machines', 'Predict torque-speed characteristics', 'Select machines and drives for an application'],
    units: [
      { title: 'Magnetics & Transformers', lessons: [
        ['Magnetic Circuits', 'reluctance; MMF; B-H curves; hysteresis'],
        ['Transformers', 'equivalent circuit; tests; regulation'],
        ['Electromechanical Energy Conversion', 'co-energy; force and torque'],
      ] },
      { title: 'Rotating Machines', lessons: [
        ['DC Machines', 'commutation; torque-speed; motor control'],
        ['Induction Machines', 'rotating field; slip; equivalent circuit'],
        ['Synchronous Machines', 'phasor diagram; power angle; excitation'],
      ] },
      { title: 'Drives', lessons: [
        ['Variable-Speed Drives', 'V/f control; field-oriented control'],
        ['Brushless DC & Permanent-Magnet Machines', 'BLDC; PMSM; EV traction'],
      ] },
    ],
  },
  {
    slug: 'rf-microwave', code: 'ECE 470', title: 'RF & Microwave Engineering', stage: 4, track: 'Fields & Waves', hours: 40,
    description: 'High-frequency circuit design: S-parameters, microwave network analysis, matching, passive components, amplifiers, noise, and RF system design.',
    prereqs: ['electromagnetics', 'microelectronics-1'],
    outcomes: ['Characterize networks with S-parameters', 'Design broadband matching networks', 'Design microwave amplifiers for gain, stability, and noise', 'Perform RF system link budgets'],
    units: [
      { title: 'Microwave Networks', lessons: [
        ['S-Parameters', 'scattering matrix; reciprocity; losslessness'],
        ['Matching Networks', 'L-networks; single-stub; quarter-wave; bandwidth'],
        ['Couplers, Dividers & Filters', 'Wilkinson; hybrids; stepped-impedance filters'],
      ] },
      { title: 'Active RF Circuits', lessons: [
        ['Microwave Amplifier Design', 'stability circles; gain circles'],
        ['Noise & Low-Noise Design', 'noise figure; Friis formula; noise circles'],
        ['Mixers & Oscillators', 'conversion gain; phase noise'],
      ] },
      { title: 'RF Systems', lessons: [
        ['Link Budgets & Receiver Architecture', 'sensitivity; dynamic range; IP3'],
      ] },
    ],
  },
  {
    slug: 'vlsi-design', code: 'ECE 482', title: 'Digital VLSI Design', stage: 4, track: 'Digital & Computing', hours: 40,
    description: 'CMOS digital integrated circuit design: inverters, logic gates, layout, delay and power, sequential circuits, memories, and the modern ASIC flow.',
    prereqs: ['digital-logic', 'microelectronics-1'],
    outcomes: ['Analyze the static and dynamic behavior of CMOS gates', 'Size transistors using logical effort', 'Estimate and reduce power', 'Describe the RTL-to-GDSII design flow'],
    units: [
      { title: 'CMOS Fundamentals', lessons: [
        ['The CMOS Inverter', 'VTC; noise margins; switching threshold'],
        ['Static CMOS Logic Gates', 'pull-up/pull-down networks; complex gates'],
        ['Fabrication & Layout', 'process steps; design rules; stick diagrams'],
      ] },
      { title: 'Performance', lessons: [
        ['Delay & Logical Effort', 'RC delay; logical effort; path optimization'],
        ['Power Dissipation', 'dynamic; short-circuit; leakage; power gating'],
        ['Interconnect', 'wire RC; repeaters; crosstalk'],
      ] },
      { title: 'Systems', lessons: [
        ['Sequential Circuits & Clocking', 'flip-flop timing; skew; jitter'],
        ['Memory Arrays', 'SRAM; DRAM; sense amplifiers'],
        ['The ASIC Design Flow', 'synthesis; place and route; static timing analysis'],
      ] },
    ],
  },
  {
    slug: 'professional-practice', code: 'ECE 490', title: 'Senior Design & Professional Practice', stage: 4, track: 'Professional', hours: 30,
    description: 'Engineering design process, project management, standards, safety, ethics, and a full review for the NCEES FE Electrical and Computer exam.',
    prereqs: ['circuit-analysis-2', 'microelectronics-1'],
    outcomes: ['Execute a structured engineering design process', 'Apply codes, standards, and ethical reasoning', 'Write technical documentation', 'Prepare for the FE Electrical and Computer exam'],
    units: [
      { title: 'Engineering Design', lessons: [
        ['The Engineering Design Process', 'requirements; concepts; trade studies; verification'],
        ['Project Management', 'scheduling; risk; budgets'],
        ['PCB Design & Prototyping', 'schematic capture; layout; grounding; DFM'],
      ] },
      { title: 'Professional Responsibility', lessons: [
        ['Engineering Ethics', 'NSPE code; case studies; licensure'],
        ['Electrical Safety, Codes & Standards', 'NEC; IEEE; IEC; grounding and shock hazards'],
        ['Technical Communication', 'reports; presentations; documentation'],
      ] },
      { title: 'FE Exam Review', lessons: [
        ['FE Review: Circuits & Electronics', 'timed practice; reference handbook strategy'],
        ['FE Review: Signals, Power & Digital', 'timed practice; mixed problems'],
      ] },
    ],
  },
];

export function getCourse(slug: string) {
  return COURSES.find((c) => c.slug === slug);
}

/** Free preview: the first lesson of every course. Everything else requires a subscription. */
export function isFreeLesson(lessonId: string) {
  return lessonId === '1-1';
}

export function lessonExists(course: CourseDef, lessonId: string) {
  const m = /^(\d+)-(\d+)$/.exec(lessonId);
  if (!m) return null;
  const unit = course.units[Number(m[1]) - 1];
  const lesson = unit?.lessons[Number(m[2]) - 1];
  return lesson ? { unit, lesson } : null;
}

export function totalLessons(course: CourseDef) {
  return course.units.reduce((n, u) => n + u.lessons.length, 0);
}
