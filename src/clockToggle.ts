export class ClockToggle {

	/**
	 * The input field.
	 */
	toggleButton: HTMLInputElement | null;

	/**
	 * The state of the clock.
	 */
	state: 'running' | 'paused' = 'running';

	/**
	 * Constructor.
	 */
	constructor( toggleCallback: Function ) {
		this.toggleButton = document.getElementById( 'clockToggle' ) as HTMLInputElement;

		if ( this.toggleButton === null ) {
			return;
		}

		this.setTextFromState();

		// Register the event handlers.
		this.toggleButton.addEventListener( 'click', () => {
			toggleCallback();
			this.toggleState();
		} );
	}

	/**
	 * Changes the text of the button.
	 */
	toggleState() {
		this.state = this.state === 'running' ? 'paused' : 'running';
		this.setTextFromState();
	}

	/**
	 * Sets the text of the button.
	 */
	setTextFromState() {
		if ( this.toggleButton ) {
			this.toggleButton.innerHTML = this.state === 'running' ? 'Halt 🛑' : 'Resume ▶️';
		}
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

	/**
	 * Enables the element.
	 */
	enable(): void {
		if ( this.toggleButton ) {
			this.toggleButton.disabled = false;
		}
	}
}
