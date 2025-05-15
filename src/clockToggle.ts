export class ClockToggle {

	/**
	 * The input field.
	 */
	toggleButton: HTMLInputElement | null;

	/**
	 * Constructor.
	 */
	constructor( toggleCallback: Function ) {
		this.toggleButton = document.getElementById( 'clockToggle' ) as HTMLInputElement;

		if ( this.toggleButton === null ) {
			return;
		}

		// Register the event handlers.
		this.toggleButton.addEventListener( 'click', () => {
			toggleCallback();
		} );
	}

	/**
	 * Determines wether the clock toggle is ready.
	 * @returns true of the button is located and ready.
	 */
	isReady(): boolean {
		return this.toggleButton !== null;
	}

	/**
	 * Disables the element.
	 */
	disable(): void {
		if ( this.toggleButton ) {
			this.toggleButton.disabled = true;
		}
	}
}