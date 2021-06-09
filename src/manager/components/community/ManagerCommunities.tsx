import {useEffect, useState} from "react";
import {CommunitiesResponse} from "../../models/responses/Responses";
import {getCommunities} from "../../services/ManagerCommunitiesService";
import {CommunityListItem} from "./CommunityListItem";

export const ManagerCommunities = () => {
    const [communities, setCommunities] = useState<CommunitiesResponse>()

    useEffect(() => {
        getCommunities().then(setCommunities);
    }, []);

    return <div className={'page-appbar'}>
        {communities?.communities.map((community) => <CommunityListItem community={community}/>)}
    </div>
}

