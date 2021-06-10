import {CommunityId} from "../../../common/models/Types";
import {useEffect, useState} from "react";
import {OwnersResponse} from "../../models/responses/Responses";
import {getOwners} from "../../services/ManagerCommunitiesService";
import {ListHeader} from "../ListHeader";
import {Divider} from "@material-ui/core";
import {OwnerListItem} from "../OwnerListItem";
import {OwnerSearch} from "./ManagerCommunity";

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
            <ListHeader name={'Username'} column={'username'} setSearch={setSearch}/>
            <ListHeader name={'Email'} column={'email'} setSearch={setSearch}/>
            <ListHeader name={'Full name'} column={'fullName'} setSearch={setSearch}/>
            <ListHeader name={'Address'} column={'address'} setSearch={setSearch}/>
            <ListHeader name={'Phone number'} column={'phoneNumber'} setSearch={setSearch}/>
        </div>
        {owners
            ?.users
            .flatMap((owner, i) =>
                [i !== 0 && <Divider/>, <OwnerListItem owner={owner}/>]
            )}
    </div>

}