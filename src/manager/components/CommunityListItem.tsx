import {FC} from "react";
import {CommunityResponse} from "../models/responses/Responses";
import {ListItem, Paper, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

export const CommunityListItem: FC<{ community: CommunityResponse }> = ({community}) => {
    const history = useHistory();

    return (
        <ListItem button onClick={() => (history.push(`/m/communities/${community.id}`))}>

            <Paper>
                <Typography>
                    {community.name}
                </Typography>
            </Paper>
        </ListItem>
    )

}