import {useEffect, useState} from "react";
import {CommunitiesResponse} from "../../models/responses/Responses";
import {getCommunities} from "../../services/ManagerCommunitiesService";
import {CommunityListItem} from "./CommunityListItem";
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {useTranslation} from "../../../common/i18n/UseTranslation";
import "../../../styles/Common.css"

export const ManagerCommunities = () => {
    const [communities, setCommunities] = useState<CommunitiesResponse>()
    const [open, setOpen] = useState(false)
    const {t} = useTranslation()

    useEffect(() => {
        getCommunities().then(setCommunities);
    }, []);

    return <div className={'page-appbar'}>
        <Fab variant='extended' onClick={() => setOpen(true)} className={'fab'} color={"secondary"}>
            <Add/>
            {t.owner.forums.create}
        </Fab>
        {communities?.communities.map((community) => <CommunityListItem community={community}/>)}
    </div>
}

