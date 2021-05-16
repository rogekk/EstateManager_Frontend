import {FC} from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from "@material-ui/core";
import {Comment} from "./Types";
import {useStyles} from "../styles/UseStyles";
import {useHistory} from "react-router-dom";
import {timeAgo} from "./tools/TimeAgo";

export const CommentListItem: FC<{ comment: Comment }> = ({comment}) => {
    const styles = useStyles();
    const history = useHistory();

    return (<div  key={comment.id.id} onClick={
            () => history.push(`/forums/${comment.id.id}`)
        }>
            <ListItem button alignItems={'flex-start'}>
                <ListItemAvatar>
                    <Avatar variant={'rounded'} src={comment.createdBy.profileImageUrl}/>
                </ListItemAvatar>
                <ListItemText>
                    <Typography variant='subtitle2'>
                        {comment.createdBy.username} | {timeAgo(Date.parse(comment.createdAt))}
                    </Typography>
                    <Typography>
                        {comment.content}
                    </Typography>
                </ListItemText>
            </ListItem>
        </div>
    );
}
