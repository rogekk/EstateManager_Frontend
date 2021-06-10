import {FC} from "react";
import {CommunityResponse} from "../../models/responses/Responses";
import {ListItem, Paper, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

export const CommunityListItem = ({community}: { community: CommunityResponse }) => {
    const history = useHistory();

    return <ListItem button key={community.id} onClick={() => (history.push(`/m/communities/${community.id}/users`))}>
        <Typography>
            {community.name}
        </Typography>
    </ListItem>
}