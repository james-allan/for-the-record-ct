import { Output } from '../src/output';

describe( 'Output', () => {
	let outputEl: HTMLTextAreaElement;
	let output: Output;

	beforeEach( () => {
		document.body.innerHTML = '<textarea id="output"></textarea>';
		outputEl = document.getElementById('output') as HTMLTextAreaElement;
		output = new Output();
	} );

	it( 'should append a message with a newline', () => {
		output.write( 'Hello world' );
		expect( outputEl.value ).toBe( 'Hello world\n' );

		output.write( 'Second line' );
		expect( outputEl.value ).toBe( 'Hello world\nSecond line\n' );
	} );

	it( 'should do nothing if the output element is missing', () => {
		const consoleWarn = jest.spyOn( console, 'warn' ).mockImplementation(() => {} );

		document.body.innerHTML = '';
		const brokenOutput = new Output();

		brokenOutput.write( 'Should warn' );

		expect( consoleWarn ).toHaveBeenCalledWith(
			'Output element not found. Message not written:',
			'Should warn'
		);

		consoleWarn.mockRestore();
	} );
});
