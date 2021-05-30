import React, {FC} from 'react';
import {render, screen} from '@testing-library/react';
import {Login} from "../components/Login";

const YoComponent: FC = () => {

    return (
        <div></div>
    )
}

test('renders learn react link', () => {

    render(
        <Login />
    );
    const linkElement = screen.getByText(/login/i);
    expect(linkElement).toBeInTheDocument();
});
