import React, {useEffect, useState} from "react";
import {useStyles} from "../styles/UseStyles";
import {Container, Fab, List, ListItem} from "@material-ui/core";
import {Translation} from "../Translations";
import {Community, Topics} from "./Types";
import {getTopics} from "../services/TopicsService";
import {Add} from "@material-ui/icons";
import {TopicListItem} from "./TopicListItem";
import {CreateNewTopic} from "./CreateNewTopic";

export const Forums: React.FC<{
    t: Translation,
    community: Community
}> = ({t, community}) => {
    const classes = useStyles();
    const [topics, setTopics] = useState<Topics | null>(null);
    const [open, setOpen] = useState(false);
    const makeRequest = async () => getTopics(community.id).then((o) => setTopics(o));

    useEffect(() => {
        if (topics === null) {
            makeRequest();
        }
    });


    const topicList = () => topics !== null ? topics.topics.map((topic) => <TopicListItem topic={topic}/>) : <ListItem/>

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container className={classes.login} style={{maxHeight: "100%", overflow: "auto"}}>
            <CreateNewTopic
                t={t}
                open={open}
                setOpen={setOpen}
                communityId={community.id}
                onTopicCreated={makeRequest}
                handleClose={handleClose}/>
            <List style={{maxHeight: "100%"}}>
                {topicList()}
            </List>
            <Fab variant='extended' onClick={() => setOpen(true)} className={classes.fab} color={"secondary"}>
                <Add/>
                {t.forums.create}
            </Fab>
        </Container>
    );
}

