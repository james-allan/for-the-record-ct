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
	 *
	 * @param toggleCallback The function to call when the button is clicked.
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
	toggleState(): void {
		this.state = this.state === 'running' ? 'paused' : 'running';
		this.setTextFromState();
	}

	/**
	 * Sets the text of the button.
	 */
	setTextFromState(): void {
		if ( this.toggleButton ) {
			this.toggleButton.innerHTML = this.state === 'running' ? 'Halt 🛑' : 'Resume ▶️';
		}
	}

	/**
	 * Determines wether the clock toggle is ready.
	 *
	 * @returns boolean True if the button is ready, otherwise false.
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
