import {FC} from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from "@material-ui/core";
import {Topic} from "./Types";
import {useStyles} from "../styles/UseStyles";
import {useHistory} from "react-router-dom";
import {renderText, timeAgo} from "./tools/TimeAgo";

export const TopicListItem: FC<{ topic: Topic }> = ({topic}) => {
    const styles = useStyles();
    const history = useHistory();

    return (<Paper className={styles.topicListItem}
                   style={{maxWidth: '600px'}}
                   elevation={8} key={topic.id.id} onClick={
            () => history.push(`/forums/${topic.id.id}`)
        }>
            <ListItem button alignItems={'flex-start'}>
                <ListItemAvatar>
                    <Avatar variant={'rounded'} src={topic.createdBy.profileImageUrl}/>
                </ListItemAvatar>
                <ListItemText>
                    <Typography variant='subtitle2'>
                        {topic.createdBy.username} | {timeAgo(Date.parse(topic.createdAt))}
                    </Typography>
                    <Typography variant='h6'>
                        {topic.subject}
                    </Typography>
                    <Typography>
                        {renderText(topic.description)}
                    </Typography>
                    <Typography>
                        Comments: {topic.commentCount}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Paper>
    );
}
