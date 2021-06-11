import {Route, Switch, useParams} from "react-router-dom";
import './ManagerCommunity.css'
import {CommunityUsers} from "./CommunityUsers";
import {ManagerResolutions} from "../../resolutions/Resolutions";
import {TabItem, TabsComponent} from "../../../common/components/TabsComponent";
import {CreateNewResolution} from "../../resolutions/CreateNewResolution";

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
        <TabsComponent>
            <TabItem name={'users'} destination={'users'} matcher={'users'}/>
            <TabItem name={'resolutions'} destination={'resolutions'} matcher={'resolutions'}/>
        </TabsComponent>
        <Switch>
            <Route exact path={'/m/communities/:communityId/users'}
                   render={() => <CommunityUsers communityId={{id: communityId}}/>}/>
            <Route exact path={'/m/communities/:communityId/newresolution'}
                   render={() => <CreateNewResolution communityId={{id: communityId}}/>}/>
            <Route exact path={'/m/communities/:communityId/resolutions'}
                   render={() => <ManagerResolutions communityId={{id: communityId}}/>}/>
        </Switch>
    </div>
}

