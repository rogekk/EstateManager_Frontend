import React, {useState} from 'react';
import './App.css';
import {Box, Button, Typography} from '@material-ui/core';
import {BrowserRouter, Route} from "react-router-dom";
import {useStyles} from "./styles/UseStyles";
import {Dashboard} from "./components/Dashboard";
import {Login} from "./components/Login";
import {useLocale} from "./i18n";
import {en, pl} from "./Translations";
import {Forums} from "./components/Forums";
import {Community} from "./components/Types";

function App() {
    const classes = useStyles();
    const [t, setTranslation] = useLocale(en);
    const [community, setCommunity] = useState<Community>({id: {id: "id1"}});

    return (
        <Typography>
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
                    <Route exact path="/forums" render={() => <Forums t={t} community={community}/>}/>
                </BrowserRouter>
            </Box>
        </Typography>
    );
}

export default App;
