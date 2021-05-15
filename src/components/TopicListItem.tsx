import {FC} from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from "@material-ui/core";
import {Topic} from "./Types";
import {useStyles} from "../styles/UseStyles";

export const TopicListItem: FC<{topic: Topic}> = ({topic}) => {
    const styles = useStyles()

    return (<Paper className={styles.topicListItem} elevation={8} key={topic.id.id.big()}>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar variant={'rounded'}/>
                </ListItemAvatar>
                <ListItemText>
                    <Typography variant='h6'>
                    {topic.subject}
                    </Typography>
                    <Typography>
                    {topic.description}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Paper>
    );
}