import { Input } from './input.js';
import { Output } from './output.js';
import { StatusIndicator, Status } from './statusIndicator.js';
import { ClockToggle } from './clockToggle.js';

export default class App {
	/**
	 * The clock toggle (halt/resume) button.
	 */
	clockToggle: ClockToggle;

	/**
	 * The user input element.
	 */
	input: Input;

	/**
	 * The output element.
	 */
	output: Output;

	/**
	 * The clock status Indicator.
	 */
	indicator: StatusIndicator;

	/**
	 * The number of seconds between outputting the frequency.
	 */
	seconds: number = 0;

	/**
	 * The number of seconds left on the timer.
	 */
	timer: number = 0;

	/**
	 * A list of user inputs and their frequency.
	 */
	frequencies = new Map<bigint, number>();

	/**
	 * Whether the app is running or not.
	 */
	running = false;

	/**
	 * The list of fibonacci numbers.
	 *
	 * Note: given we need the first 1000, we will need a big int.
	 */
	fibonacci = new Set<bigint>( this.getFibonacciSeries() );

	/**
	 * The clock interval object.
	*/
	clock?: ReturnType<typeof setInterval>;

	/**
	 * Whether the app has been terminated.
	 */
	terminated = false;

	/**
	 * Initialises the app.
	 */
	constructor() {
		this.output      = new Output();
		this.input       = new Input( this.handleInput );
		this.clockToggle = new ClockToggle( this.toggleClock, 'running' );
		this.indicator   = new StatusIndicator();

		if ( ! this.input.isReady() || ! this.clockToggle.isReady() ) {
			this.terminate();
			this.output.write( 'An error occurred initialising the app. Please refresh and try again.' );
			return;
		}

		this.output.write( 'Please input the amount of time in seconds between emitting numbers and their frequency.' );
	}

	/**
	 * Returns the first 1000 Fibonacci numbers.
	 *
	 * @returns bigint[] The first 1000 Fibonacci numbers.
	 */
	getFibonacciSeries(): bigint[] {
		const series: bigint[] = [0n, 1n];

		for ( let i = series.length; i < 1000; i++ ) {
			series.push( series[ i - 1 ] + series[ i - 2 ] );
		}

		return series;
	}

	/**
	 * Starts the clock for outputting the frequency values.
	 */
	startClock(): void {

		if ( ! this.seconds ) {
			console.warn( 'An error occurred starting the clock, please refresh the browser to start again.' );
			this.terminate();
			return;
		}

		// Reset the current timer to the full number of seconds.
		this.timer = this.seconds;

		// Clear any previously running clock.
		if ( this.clock ) {
			clearInterval( this.clock );
		}

		this.clock = setInterval( () => {
			if ( ! this.running || this.terminated ) {
				return;
			}

			this.timer -= 1;

			if ( this.timer <= 0 ) {
				this.outputFrequencies();
				this.startClock(); // Restart the clock, resetting the interval
			}
		}, 1000 );
	}

	/**
	 * Sets the clock's duration (X seconds) and starts the clock.
	 *
	 * @param time The number of seconds the clock/timer should be set to.
	 */
	setClockAndStart( time: number ): void {
		this.seconds = time;
		this.toggleClock();
		this.startClock();
	}

	/**
	 * Records the inputted number value.
	 *
	 * @param value The user's inputted number value.
	 */
	recordInput( value: bigint ): void {
		// Record an input.
		if ( this.frequencies.has( value ) ) {
			const count = this.frequencies.get( value ) ?? 0;
			this.frequencies.set( value, count + 1 );
		} else {
			this.frequencies.set( value, 1 );
		}

		// Output FIB for Fibonacci numbers.
		if ( this.fibonacci.has( value ) ) {
			this.output.write( 'FIB' );
		}
	}

	/**
	 * Handles the user's input for the clock timing.
	 *
	 * @param input The user's inputted value.
	 */
	handleTimingInput( input: string ): void {
		const seconds = parseInt( input, 10 );

		// Handle cases where the input wasn't an int or was negative.
		if ( isNaN( seconds ) || seconds <= 0 ) {
			this.output.write( 'The value you inputted is not a positive integer. Please enter a number.' );
			return;
		}

		this.setClockAndStart( seconds );
		this.clockToggle.enable();

		this.output.write( 'Please enter the first number.' );
	}

	/**
	 * Handles the users' inputted value.
	 *
	 * 'quit' => terminates the app (disables all functions).
	 * 'number' => either the timer input (x seconds) or a number input depending on the context.
	 * All other values => an error message printed to the output field.
	 *
	 * @param inputValue The user's inputted value.
	 * @returns boolean True if the input was handled successfully, otherwise false.
	 */
	handleInput = ( inputValue: string ): boolean => {
		if ( this.terminated ) {
			return false;
		}

		// Write the inputted value to the output field.
		this.output.write( inputValue );

		// Normalise the input value.
		inputValue = inputValue.trim().toLowerCase();

		// Handle Quit input.
		if ( 'quit' === inputValue ) {
			this.terminate();
			return true;
		} else if ( 'resume' === inputValue || 'halt' === inputValue ) {
			return this.handleClockToggle( inputValue );
		} else if ( ! this.seconds ) {
			this.handleTimingInput( inputValue );
			return true;
		}

		// Convert the input to a bigInt
		let value: bigint;

		try {
			value = BigInt( inputValue.trim() );
		} catch {
			this.output.write( 'The value you inputted is not an integer. Please enter a number.' );
			return false;
		}

		this.recordInput( value );
		this.output.write( 'Please enter the next number.' );

		return true;
	}

	/**
	 * Handles the clock toggle input.
	 *
	 * @param inputValue The user's inputted value.
	 * @returns boolean True if the input was handled successfully, otherwise false.
	 */
	handleClockToggle( inputValue: 'resume' | 'halt' ): boolean {
		if (
			( 'resume' === inputValue && this.clockToggle.state === 'paused' ) ||
			( 'halt' === inputValue && this.clockToggle.state === 'running' )
		) {
			this.toggleClock();
			this.clockToggle.toggleState();
			return true;
		}

		// If the input wasn't handled successfully, output an error message.
		this.output.write( 'An error occurred toggling the clock. Please try again.' );
		return false;
	}

	/**
	 * Outputs the inputted frequencies and their counts.
	 */
	outputFrequencies(): void {
		// Exit early if there are no frequencies to report.
		if ( ! this.frequencies || this.frequencies.size === 0 ) {
			return;
		}

		const outputs: string[] = [];

		const sortedFrequencies = Array.from( this.frequencies.entries() )
			.sort( ( a, b ) => b[1] - a[1] );

		for ( const [ value, count ] of sortedFrequencies ) {
			outputs.push( `${value.toString()}:${count}` );
		}

		this.output.write( outputs.join( ' ' ) );
	}

	/**
	 * Pauses or resumes the clock depending on the current state.
	 */
	toggleClock = (): void => {
		if ( this.terminated ) {
			return;
		}

		this.running = ! this.running;
		this.updateIndictorStatus( this.running );
	}

	/**
	 * Updates the indicator based on the provided running status.
	 *
	 * @param running Whether the app clock is running. True = running. False = Halted or Terminated.
	 */
	updateIndictorStatus( running: boolean ): void {
		if ( this.indicator ) {
			this.indicator.setStatus( running ? Status.Running : Status.Idle );
		}
	}

	/**
	 * Terminate the app and halt all inputs.
	 */
	terminate(): void {
		this.terminated = true;

		this.updateIndictorStatus( false );

		// Disable the app.
		if ( this.input ) {
			this.input.disable();
		}
		if ( this.clockToggle ) {
			this.clockToggle.disable();
		}

		this.outputFrequencies();
		this.output.write( 'Thanks for playing, please refresh to start again.' );
	}
}
