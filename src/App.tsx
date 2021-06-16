
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { getPersistedToken, getPersistedUser } from './common/persistance/Persistance';
import { OwnerId } from './common/models/Types';
import { TranslationProvider } from './common/Translator/UseTranslation';
import { Pages } from './components/DashboardTSX/SideDrawer';
import { Login } from './components/Login/Login';
import { OwnerPortal } from './owners/requests/OwnerPortal';
import { AdminPortal } from './admin/components/AdminPortal';
import { ManagerPortal } from './manager/ManagerPortal';



export const getToken = () => getPersistedToken()
export const getUser: () => OwnerId = () => {
    return {id: getPersistedUser()};
}

function App() {
    document.body.classList.toggle("light")
    return (
        <TranslationProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={Pages.login.url} render={() => <Login/>}/>
                        <Route path="/o/*" render={() => <OwnerPortal/>}/>
                        <Route path="/a/*" render={() => <AdminPortal/>}/>
                        <Route path="/m/*" render={() => <ManagerPortal/>}/>
                    </Switch>
                </BrowserRouter>
        </TranslationProvider>
    );
}

export default App;
