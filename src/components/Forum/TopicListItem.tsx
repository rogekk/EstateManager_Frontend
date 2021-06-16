import {FC} from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from "@material-ui/core";
import {Topic} from "../../common/models/Types";
import {useStyles} from "../../styles/UseStyles";
import {useHistory} from "react-router-dom";
import {renderText, timeAgo} from "../../common/tools/TimeAgo";
import {useTranslation} from "../../common/Translator/UseTranslation";

export const TopicListItem: FC<{
    topic: Topic }> = ({topic}) => {
    const styles = useStyles();
    const history = useHistory();
    const {t} = useTranslation();

    console.log(topic.subject);

    return (<Paper className={styles.topicListItem}
                   style={{maxWidth: '600px'}}
                   elevation={8} key={topic.id.id} onClick={
            () => history.push(`/o/forums/${topic.id.id}`)
        }>
            <ListItem button alignItems={'flex-start'}>
                <ListItemAvatar>
                    <Avatar variant={'rounded'} src={topic.createdBy.profileImageUrl}/>
                </ListItemAvatar>
                <ListItemText>
                    <Typography variant='subtitle2'>
                        {topic.createdBy.username} | {timeAgo(t, Date.parse(topic.createdAt))}
                    </Typography>
                    <Typography variant='h6'>
                        {topic.subject}
                    </Typography>
                    <Typography>
                        {renderText(topic.description)}
                    </Typography>
                    <Typography>
                        {t.common.topics.comments}: {topic.commentCount}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Paper>
    );
}

