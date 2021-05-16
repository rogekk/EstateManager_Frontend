import {FC} from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from "@material-ui/core";
import {Topic} from "./Types";
import {useStyles} from "../styles/UseStyles";
import {useHistory} from "react-router-dom";

export const TopicListItem: FC<{ topic: Topic }> = ({topic}) => {
    const styles = useStyles();
    const history = useHistory();

    return (<Paper className={styles.topicListItem} elevation={8} key={topic.id.id} onClick={
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
                        {topic.description}
                    </Typography>
                    <Typography>
                        Comments: {topic.commentCount}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Paper>
    );
}
const timeAgo = (prevDate: number) => {
        const diff = Number(new Date()) - prevDate;
        const minute = 60 * 1000;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const year = day * 365;
        switch (true) {
            case diff < minute:
                const seconds = Math.round(diff / 1000);
                 return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`
            case diff < hour:
                return Math.round(diff / minute) + ' minutes ago';
            case diff < day:
                return Math.round(diff / hour) + ' hours ago';
            case diff < month:
                return Math.round(diff / day) + ' days ago';
            case diff < year:
                return Math.round(diff / month) + ' months ago';
            case diff > year:
                return Math.round(diff / year) + ' years ago';
            default:
                return "";
        }
    };