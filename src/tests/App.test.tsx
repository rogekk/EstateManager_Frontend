import React, {FC, useState, useEffect} from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';
import {useLocale} from "../i18n";
import {pl, en} from "../Translations";



const TestCompnent: FC = () => {
    const [locale, setLocale] = useLocale(en);

    console.log(locale.login.attempts(3))
    console.log(locale.login.attempts(2))
    console.log(locale.login.attempts(1))
    console.log(locale.login.attempts(0))

    return (<div></div>)
}

test('renders learn react link', () => {
    render(
        <TestCompnent></TestCompnent>
    )
});
