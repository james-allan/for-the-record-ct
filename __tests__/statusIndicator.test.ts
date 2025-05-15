import { StatusIndicator, Status } from '../src/statusIndicator';

describe( 'StatusIndicator', () => {
	let indicator: HTMLElement;
	let statusIndicator: StatusIndicator;

	beforeEach( () => {
		document.body.innerHTML = '<div id="indicator"></div>';
		indicator               = document.getElementById('indicator') as HTMLElement;
		statusIndicator         = new StatusIndicator();
	} );

	it( 'should show the indicator when enabled is true', () => {
		statusIndicator.setStatus( Status.Running );
		expect( indicator.style.display ).toBe( 'block' );
	} );

	it( 'should hide the indicator when enabled is false', () => {
		statusIndicator.setStatus( Status.Idle );
		expect( indicator.style.display ).toBe( 'none' );
	} );
});