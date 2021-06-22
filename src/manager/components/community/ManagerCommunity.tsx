import {Route, Switch, useParams} from "react-router-dom";
import './ManagerCommunity.css'
import {CommunityUsers} from "./CommunityUsers";
import {ManagerResolutions} from "../../resolutions/Resolutions";
import {CreateNewResolution} from "../../resolutions/CreateNewResolution";
import { TabItem, TabsComponent} from "../../../components/DashboardTSX/TabsComponent";
import { IssuesCommunities } from "../issues/CommunityIssues";

export type OwnerSearch = {
    email: string,
    username: string,
    fullName: string,
    address: string,
    phoneNumber: string,
}

export type IssueSearch = {
    subject: string,
    createdBy: string,
    createdAt: string,
    status: string,
    commentCount: string,
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
            <Route exact path={'/m/issues'} render={() => <IssuesCommunities/>}/>
        </Switch>
    </div>
}
