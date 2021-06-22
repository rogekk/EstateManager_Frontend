import {CommunityId} from "../../../common/models/Types";
import {useEffect, useState} from "react";
import {OwnersResponse} from "../../models/responses/Responses";
import {getOwners} from "../../services/ManagerCommunitiesService";

import {Divider} from "@material-ui/core";
import {OwnerListItem} from "./OwnerListItem";
import {OwnerSearch} from "./ManagerCommunity";
import { UsersListHeader } from "./UsersListHeader";

export const CommunityUsers = ({communityId}: { communityId: CommunityId }) => {
    const [owners, setOwners] = useState<OwnersResponse>()

    const [ownerSearch, setOwnerSearch] = useState<OwnerSearch>({} as OwnerSearch);


    useEffect(() => {
        getOwners(communityId.id, ownerSearch).then(setOwners)
    }, [])


    function setSearch(key: keyof OwnerSearch, value: string) {
        setOwnerSearch((v) => {
                v[key] = value
                getOwners(communityId.id, v).then(setOwners)
                return v
            }
        )
    }

    return <div className={'page-appbar'}>
        <div className={'wrapper'}>
            <UsersListHeader name={'Username'} column={'username'} setSearch={setSearch}/>
            <UsersListHeader name={'Email'} column={'email'} setSearch={setSearch}/>
            <UsersListHeader name={'Full name'} column={'fullName'} setSearch={setSearch}/>
            <UsersListHeader name={'Address'} column={'address'} setSearch={setSearch}/>
            <UsersListHeader name={'Phone number'} column={'phoneNumber'} setSearch={setSearch}/>
        </div>
        {owners
            ?.users
            .flatMap((owner, i) =>
                [i !== 0 && <Divider/>, <OwnerListItem owner={owner}/>]
            )}
    </div>

}