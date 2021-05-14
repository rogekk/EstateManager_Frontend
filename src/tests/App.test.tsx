import React, {FC, useState, useEffect} from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';
import {Login} from "../components/Login";
import {useLocale} from "../i18n";
import {en} from "../Translations";

const YoComponent: FC = () => {

    return (
        <div></div>
    )
}

test('renders learn react link', () => {

    render(
        <Login t={en}/>
    );
    const linkElement = screen.getByText(/login/i);
    expect(linkElement).toBeInTheDocument();
});
