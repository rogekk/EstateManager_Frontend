import {Route, Switch, useParams} from "react-router-dom";
import './ManagerCommunity.css'
import {CommunityUsers} from "./CommunityUsers";
import {ManagerResolutions} from "../../resolutions/Resolutions";

export type OwnerSearch = {
    email: string,
    username: string,
    fullName: string,
    address: string,
    phoneNumber: string,
}

export const ManagerCommunity = () => {
    const {communityId} = useParams<{ communityId: string }>();

    return <div className={'page-appbar'}>
        <Switch>
            <Route exact path={'/m/communities/:communityId/users'}
                   render={() => <CommunityUsers communityId={{id: communityId}}/>}/>
            <Route exact path={'/m/communities/:communityId/resolutions'}
                   render={() => <ManagerResolutions communityId={{id: communityId}}/>}/>
        </Switch>
    </div>
}

