import {FC} from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import {Topic} from "./Types";
import {useStyles} from "../styles/UseStyles";

export const TopicListItem: FC<{topic: Topic}> = ({topic}) => {
    const styles = useStyles()

    return (<Paper className={styles.topicListItem} elevation={8}>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText>
                    {topic.subject}
                </ListItemText>
            </ListItem>
        </Paper>
    );
}