import { ClockToggle } from '../src/clockToggle';

describe( 'ClockToggle', () => {
	let toggleButton: HTMLInputElement;
	let clockToggle: ClockToggle;
	let mockCallback: jest.Mock;

	beforeEach( () => {
		mockCallback            = jest.fn();
		document.body.innerHTML = '<input type="checkbox" id="clockToggle" />';
		toggleButton            = document.getElementById( 'clockToggle' ) as HTMLInputElement;
		clockToggle             = new ClockToggle( mockCallback );
	} );

	it( 'should call the callback when clicked', () => {
		toggleButton.click();
		expect( mockCallback ).toHaveBeenCalled();
	} );

	it( 'should disable the button when disable() is called', () => {
		expect( toggleButton.disabled ).toBe( false );

		clockToggle.disable();
		expect( toggleButton.disabled ).toBe( true );
	} );

	it( 'should be isReady() when the element is present', () => {
		expect( clockToggle.isReady() ).toBe( true );
	} );

	it( 'should not be isReady() when the element is missing', () => {
		document.body.innerHTML = ''; // remove the element
		const brokenToggle = new ClockToggle( mockCallback );

		expect( brokenToggle.isReady() ).toBe( false );
	} );


});

