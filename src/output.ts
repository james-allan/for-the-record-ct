export class Output {

	/**
	 * The output element.
	 */
	output: HTMLTextAreaElement | null;

	/**
	 * Constructor.
	 */
	constructor() {
		this.output = document.getElementById( 'output' ) as HTMLTextAreaElement;
	}

	/**
	 * Write a message to the output element.
	 *
	 * @param message
	 */
	write( message: string ): void {
		if ( this.output ) {
			this.output.value += message + '\n';
			this.output.scrollTop = this.output.scrollHeight; // Scroll to the bottom after each change.
		} else {
			console.warn( 'Output element not found. Message not written:', message );
		}
	}
}