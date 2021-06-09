import React from 'react';
import './App.css';
import {Box} from '@material-ui/core';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useStyles} from "./styles/UseStyles";
import {Login} from "./components/Login";
import {OwnerId} from "./common/models/Types";
import {Pages} from "./common/components/SideDrawer";
import {getPersistedToken, getPersistedUser} from "./common/persistance/Persistance";
import {TranslationProvider} from "./common/i18n/UseTranslation";
import {ManagerPortal} from "./manager/ManagerPortal";
import {OwnerPortal} from "./owners/requests/OwnerPortal";
import {Footer} from "./common/components/Footer";
import {AdminPortal} from "./admin/components/AdminPortal";

export const getToken = () => getPersistedToken()
export const getUser: () => OwnerId = () => {
    return {id: getPersistedUser()};
}

function App() {
    document.body.classList.toggle("light")
    return (
        <TranslationProvider>
            <Box className={'background'}>
                <Footer/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={Pages.login.url} render={() => <Login/>}/>
                        <Route path="/o/*" render={() => <OwnerPortal/>}/>
                        <Route path="/a/*" render={() => <AdminPortal/>}/>
                        <Route path="/m/*" render={() => <ManagerPortal/>}/>
                    </Switch>
                </BrowserRouter>
            </Box>
        </TranslationProvider>
    );
}

export default App;
