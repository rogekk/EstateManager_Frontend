import {FC, useEffect, useState} from "react";
import {CommunitiesResponse} from "../models/responses/Responses";
import {getCommunities} from "../services/ManagerCommunitiesService";
import {CommunityListItem} from "./CommunityListItem";
import {List} from "@material-ui/core";

export const ManagerCommunities: FC<{}> = () => {
    const [communities, setCommunities] = useState<CommunitiesResponse>()

    useEffect(() => {
        getCommunities().then(setCommunities);
    }, []);

    return (<div style={{
        height: '100%',
        width: '100%',
        marginTop: 96
    }}>
        <List>
        {communities?.communities.map((community) => <CommunityListItem community={community}/>)}
            </List>
    </div>)
}

