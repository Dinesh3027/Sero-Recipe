import React from "react";
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import  Save  from './Save';

it('my test', () => {
    const formSubmit = jest.fn(() => console.log('/// Form submitted ///'));

    const { getByText } = render(<div>
        <form id="test-form" onSubmit={formSubmit}>
            <button type="submit">Inside form</button>
        </form>
        <button form="test-form" type="submit">Outside form</button>
    </div>);

    // Running this line DOES print the console log correctly
    // userEvent.click(screen.getByText('Inside form'));

    // This line DOES NOT print the console log...
    fireEvent.click(getByText('Outside form'));

    // Clicking the outside button means this also fails.
    expect(formSubmit).toHaveBeenCalled();
});
