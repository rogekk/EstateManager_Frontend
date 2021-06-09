import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getOwners} from "../../services/ManagerCommunitiesService";
import {OwnersResponse} from "../../models/responses/Responses";
import {Divider} from "@material-ui/core";
import './ManagerCommunity.css'
import {OwnerListItem} from "../OwnerListItem";
import {ListHeader} from "../ListHeader";

export type OwnerSearch = {
    email: string,
    username: string,
    fullName: string,
    address: string,
    phoneNumber: string,
}

export const ManagerCommunity = () => {
    const {communityId} = useParams<{ communityId: string }>();
    const [owners, setOwners] = useState<OwnersResponse>()

    const [ownerSearch, setOwnerSearch] = useState<OwnerSearch>({} as OwnerSearch);

    useEffect(() => {
        getOwners(communityId, ownerSearch).then(setOwners);
    }, []);

    function setSearch(key: keyof OwnerSearch, value: string) {
        setOwnerSearch((v) => {
                v[key] = value
                getOwners(communityId, v).then(setOwners)
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
