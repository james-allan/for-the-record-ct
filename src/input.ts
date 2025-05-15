export class Input {

	/**
	 * The input field.
	 */
	input: HTMLInputElement | null;

	/**
	 * Function callback to trigger when an input is recorded.
	 */
	inputHandler: Function;

	/**
	 * Constructor.
	 *
	 * @param inputHandler The function to call when an input is recorded.
	 */
	constructor( inputHandler: Function ) {
		this.inputHandler = inputHandler;
		this.input        = document.getElementById( 'input' ) as HTMLInputElement;

		if ( this.input === null ) {
			return;
		}

		// Register the input handler.
		this.input.addEventListener( 'keydown', this.handleInput );
	}

	/**
	 * Checks if the input was successfully loaded.
	 *
	 * @returns boolean True if the input is ready, otherwise false.
	 */
	isReady(): boolean {
		return this.input !== null;
	}

	/**
	 * Clears the input field.
	 */
	clear(): void {
		if ( this.input ) {
			this.input.value = '';
		}
	}

	/**
	 * Disables the input element.
	 */
	disable(): void {
		if ( this.input ) {
			this.input.disabled = true;
		}
	}

	/**
	 * Handles the keydown event of the input element.
	 * When "Enter" is submitted, the element is submitted.
	 *
	 * @param event The keydown event.
	 */
	handleInput = ( event: KeyboardEvent ): void => {
		if ( ! this.input || event.key !== 'Enter' ) {
			return;
		}

		// Exit if there's no value to submit.
		if ( ! this.input.value ) {
			return;
		}

		if ( this.inputHandler( this.input.value ) ){
			this.clear();
		}
	};
}
