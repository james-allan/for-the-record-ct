// app.test.ts
import App from '../src/app';

// Mock dependencies
jest.mock( '../src/input', () => {
	return {
		Input: jest.fn().mockImplementation(() => ({
			isReady: () => true,
			disable: jest.fn(),
		})),
	};
});

jest.mock( '../src/output', () => {
	return {
		Output: jest.fn().mockImplementation(() => ({
			write: jest.fn(),
		})),
	};
});

jest.mock( '../src/clockToggle', () => {
	return {
		ClockToggle: jest.fn().mockImplementation( ( onClick ) => ({
			isReady: () => true,
			disable: jest.fn(),
			toggleState: jest.fn(),
			setTextFromState: jest.fn(),
			enable: jest.fn(),
			onClick,
		})),
	};
});

jest.mock( '../src/statusIndicator', () => {
	return {
		StatusIndicator: jest.fn().mockImplementation(() => ({
			setStatus: jest.fn(),
		})),
		Status: {
			Running: 'RUNNING',
			Idle: 'IDLE',
		},
	};
});

describe( 'App', () => {
	let app: App;
	let writeSpy: jest.SpyInstance;

	beforeEach( () => {
		jest.useFakeTimers();
		app      = new App();
		writeSpy = jest.spyOn( app.output, 'write' );
	} );

	afterEach( () => {
		jest.clearAllTimers();
		jest.useRealTimers();
		jest.restoreAllMocks();
	} );

	it( 'sets clock and starts ticking', () => {
		app.setClockAndStart( 5 );

		expect( app.seconds ).toBe( 5 );
		expect( app.running ).toBe( true );

		jest.advanceTimersByTime( 4000 ); // advance 4 seconds
		expect( app.timer ).toBe( 1 );

		jest.advanceTimersByTime( 1000 ); // final second
		expect( app.timer ).toBe( 5 ); // resets to the start (5) after reaching 0
	});

	it( 'pauses the clock with toggleClock()', () => {
		app.setClockAndStart( 3 );
		expect( app.running ).toBe( true );

		app.toggleClock(); // pause
		expect( app.running ).toBe( false );

		jest.advanceTimersByTime( 3000 );
		expect( app.timer ).toBe( 3 ); // confirms the timer is paused.
	});

	it( 'terminates the app', () => {
		app.setClockAndStart( 2 );
		app.recordInput( 1n );

		app.terminate();

		expect( app.terminated ).toBe( true );
		expect( app.input.disable ).toHaveBeenCalled();
		expect( app.clockToggle.disable ).toHaveBeenCalled();

		// Confirm the termination message is outputted.
		expect( writeSpy ).toHaveBeenCalledWith(
			'Thanks for playing, please refresh to start again.'
		);
	} );

	it( 'outputs "FIB" for Fibonacci numbers', () => {
		app.seconds = 3; // set the seconds to 3.
		app.recordInput( 3n );
		expect( writeSpy ).toHaveBeenCalledWith( 'FIB' );
	} );

	it( 'outputs "FIB" for large Fibonacci numbers', () => {
		app.seconds = 3; // set the seconds to 3.
		app.recordInput( 354224848179261915075n ); // 100th Fibonacci number.

		expect( writeSpy ).toHaveBeenCalledWith( 'FIB' );
	} );

	it( 'outputs "FIB" for extremely large Fibonacci numbers', () => {
		app.seconds = 3; // set the seconds to 3.

		app.recordInput( 26863810024485359386146727202142923967616609318986952340123175997617981700247881689338369654483356564191827856161443356312976673642210350324634850410377680367334151172899169723197082763985615764450078474174626n ); // 1000th Fibonacci number.
		expect( writeSpy ).toHaveBeenCalledWith( 'FIB' );
	} );

	it( 'does not output "FIB" for non-Fibonacci numbers', () => {
		app.seconds = 3; // set the seconds to 3.

		app.recordInput( 4n );
		expect( writeSpy ).not.toHaveBeenCalledWith( 'FIB' );
	} );

	it( 'does not output frequencies if there are none', () => {
		writeSpy.mockClear();
		app.outputFrequencies();
		expect( writeSpy ).not.toHaveBeenCalled();
	} );

	it( 'records input frequencies and outputs them', () => {
		app.seconds = 3;
		app.recordInput( 10n );
		app.recordInput( 10n );
		app.recordInput( 5n );

		app.outputFrequencies();

		expect( writeSpy ).toHaveBeenCalledWith( '10:2 5:1' );
	} );

	it ( 'does generate 1000 fibonacci numbers', () => {
		expect( app.getFibonacciSeries().length ).toBe( 1000 );
	} );

	it ( 'does toggle the handleClockToggle() element when the input is "resume" or "halt"', () => {
		app.clockToggle.state = 'paused';
		app.handleClockToggle( 'resume' );

		expect( app.clockToggle.toggleState ).toHaveBeenCalled();

		app.clockToggle.state = 'running';
		app.handleClockToggle( 'halt' );

		expect( app.clockToggle.toggleState ).toHaveBeenCalled();
	} );

	it ( 'does not toggle the handleClockToggle() element when the input is not valid', () => {
		app.clockToggle.state = 'paused';
		app.handleClockToggle( 'halt' ); // "halt" is not a valid input for a paused clock.

		expect( app.clockToggle.toggleState ).not.toHaveBeenCalled();
		expect( writeSpy ).toHaveBeenCalledWith( 'An error occurred toggling the clock. Please try again.' );

		app.clockToggle.state = 'running';
		app.handleClockToggle( 'resume' ); // "resume" is not a valid input for a running clock.

		expect( app.clockToggle.toggleState ).not.toHaveBeenCalled();
		expect( writeSpy ).toHaveBeenCalledWith( 'An error occurred toggling the clock. Please try again.' );
	} );
});
