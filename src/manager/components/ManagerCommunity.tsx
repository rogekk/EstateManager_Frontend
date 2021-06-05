import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getOwners} from "../services/ManagerCommunitiesService";
import {OwnerResponse, OwnersResponse} from "../models/responses/Responses";
import {List, ListItem, Paper, TextField} from "@material-ui/core";

export const ManagerCommunity: FC<{}> = () => {
    const {communityId} = useParams<{ communityId: string }>();
    const [owners, setOwners] = useState<OwnersResponse>()

    const [email, setemail] = useState("");
    const [username, setusername] = useState("");
    const [fullname, setfullname] = useState("");
    const [address, setaddress] = useState("");
    const [phone, setphone] = useState("");

    useEffect(() => {
        getOwners(communityId, {email, username, fullname, address, phone}).then(setOwners);
    }, []);

    return <Paper style={{marginTop: 96}}>
        <div>
            {`Username | email | fullname | address | phone number`}
        </div>
        <TextField label={'username'} onChange={(e) => {
            setusername(e.target.value);
            getOwners(communityId, {email, username: e.target.value, fullname, address, phone}).then(setOwners);
        }}></TextField>
        <TextField label={'email'} onChange={(e) => {
            setemail(e.target.value);
            getOwners(communityId, {email: e.target.value, username, fullname, address, phone}).then(setOwners);
        }}></TextField>
        <TextField label={'fullname'}
                   onChange={(e) => {
            setfullname(e.target.value);
            getOwners(communityId, {email, username, fullname: e.target.value, address, phone}).then(setOwners);
        }}></TextField>
        <TextField label={'address'} onChange={(e) => {
            setaddress(e.target.value);
            getOwners(communityId, {email, username, fullname, address: e.target.value, phone}).then(setOwners);
        }}></TextField>
        <TextField label={'phone'} onChange={(e) => {
            setphone(e.target.value);

            getOwners(communityId, {email, username, fullname, address, phone: e.target.value}).then(setOwners);
        }}></TextField>
        <List>
            {owners?.users.map((owner) => <OwnerListItem owner={owner}/>)}
        </List>
    </Paper>
}

export const OwnerListItem: FC<{ owner: OwnerResponse }> = ({owner}) => {
    return (
        <ListItem>
            {owner.username} | {owner.email} | {owner.fullName} | {owner.address} | {owner.phoneNumber}
        </ListItem>
    );
}