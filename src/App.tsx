import React from 'react';
import './App.css';
import {Box, Button} from '@material-ui/core';
import {BrowserRouter, Route} from "react-router-dom";
import {useStyles} from "./styles/UseStyles";
import {Dashboard} from "./components/Dashboard";
import {Login} from "./components/Login";
import {useLocale} from "./i18n";
import {en, pl} from "./Translations";

function App() {
    const classes = useStyles();
    const [t, setTranslation] = useLocale(en)

    return (
        <Box className={classes.background}>
            <div onClick={(e) => {
                console.log("clicking");
                if (t === en) {
                    setTranslation(pl);
                } else {
                    setTranslation(en);
                }
            }
            }>
                Toggle language
            </div>
            <BrowserRouter>
                <Route exact path="/login" render={() => <Login t={t}/>}/>
                <Route exact path="/dashboard" render={() => <Dashboard t={t}/>}/>
            </BrowserRouter>
        </Box>
    );
}

export default App;
