import { ClockToggle } from '../src/clockToggle';

describe( 'ClockToggle', () => {
	let toggleButton: HTMLInputElement;
	let clockToggle: ClockToggle;
	let mockCallback: jest.Mock;

	beforeEach( () => {
		mockCallback            = jest.fn();
		document.body.innerHTML = '<input type="checkbox" id="clockToggle" />';
		toggleButton            = document.getElementById( 'clockToggle' ) as HTMLInputElement;
		clockToggle             = new ClockToggle( mockCallback, 'running' );
	} );

	it( 'should call the callback when clicked', () => {
		toggleButton.click();
		expect( mockCallback ).toHaveBeenCalled();
	} );

	it( 'should be isReady() when the element is present', () => {
		expect( clockToggle.isReady() ).toBe( true );
	} );

	it( 'should not be isReady() when the element is missing', () => {
		document.body.innerHTML = ''; // remove the element
		const brokenToggle = new ClockToggle( mockCallback, 'running' );

		expect( brokenToggle.isReady() ).toBe( false );
	} );

	it( 'should disable the button when disable() is called', () => {
		expect( toggleButton.disabled ).toBe( false );

		clockToggle.disable();
		expect( toggleButton.disabled ).toBe( true );
	} );

	it( 'should enable the button when enable() is called', () => {
		clockToggle.disable();
		expect( toggleButton.disabled ).toBe( true );

		clockToggle.enable();
		expect( toggleButton.disabled ).toBe( false );
	} );

	it( 'should toggle the state of the button', () => {
		expect( clockToggle.state ).toBe( 'running' ); // Default state is running.

		toggleButton.click();
		expect( clockToggle.state ).toBe( 'paused' );

		toggleButton.click();
		expect( clockToggle.state ).toBe( 'running' );
	} );

	it( 'should change the text of the button when the state is running', () => {
		expect( toggleButton.textContent ).toBe( 'Halt 🛑' );

		toggleButton.click();
		expect( toggleButton.textContent ).toBe( 'Resume ▶️' );

		toggleButton.click();
		expect( toggleButton.textContent ).toBe( 'Halt 🛑' );
	} );

	it ( 'should change the state and text of the button when the state is toggled', () => {
		clockToggle.toggleState();
		expect( toggleButton.textContent ).toBe( 'Resume ▶️' );
		expect( clockToggle.state ).toBe( 'paused' );

		clockToggle.toggleState();
		expect( toggleButton.textContent ).toBe( 'Halt 🛑' );
		expect( clockToggle.state ).toBe( 'running' );
	} );
});
