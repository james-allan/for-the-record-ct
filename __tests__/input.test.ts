import { Input } from '../src/input';

describe( 'Input', () => {
	let input: HTMLInputElement;
	let inputObject: Input;
	let mockCallback = jest.fn();

	beforeEach(() => {
		mockCallback = jest.fn();
		document.body.innerHTML = '<input id="input" />';
		inputObject             = new Input( mockCallback );
		input                   = document.getElementById( 'input' ) as HTMLInputElement;
	});

	it( 'should call the handler when "Enter" is pressed', () => {
		input.value = 'test input';
		input.dispatchEvent( new KeyboardEvent( 'keydown', { key: 'Enter' } ) );

		expect( mockCallback ).toHaveBeenCalledWith( 'test input' );
	} );

	it( 'should do nothing if input is empty', () => {
		input.value = '';
		input.dispatchEvent( new KeyboardEvent( 'keydown', { key: 'Enter' } ) );

		expect( mockCallback ).not.toHaveBeenCalled();
	} );

	it( 'should not call the handler when a non-Enter key is pressed', () => {
		input.value = 'some text';
		input.dispatchEvent( new KeyboardEvent( 'keydown', { key: 'Escape' } ) );

		expect( mockCallback ).not.toHaveBeenCalled();
	} );

	it( 'should clear the input field when clear() is called', () => {
		input.value = 'test input';
		inputObject.clear();

		expect( input.value ).toBe( '' );
	} );

	it( 'should be ready when input is present', () => {
		expect( inputObject.isReady() ).toBe( true );
	} );

	it( 'should report as NOT ready when input is not present', () => {
		document.body.innerHTML = '';
		const brokenInputObject = new Input( mockCallback );

		expect( brokenInputObject.isReady() ).toBe( false );
	} );

	it ( 'should disable the input element when disable() is called', () => {
		inputObject.disable();

		expect( input.disabled ).toBe( true );
	} );
});
