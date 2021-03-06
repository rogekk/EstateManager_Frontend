import React, {useEffect, useState} from "react";
import {useStyles} from "../../styles/UseStyles";
import {Container, Fab, List, ListItem} from "@material-ui/core";
import {Add, Forum} from "@material-ui/icons";
import {TopicListItem} from "./TopicListItem";
import {CreateNewTopic} from "./CreateNewTopic";
import {BackgroundIcon} from "../DashboardTSX/BackgroundIcon";
import {Translation} from "../../common/Translator/Translations";
import {Community, Topics} from "../../common/models/Types";
import {getTopics} from "../../owners/services/TopicsService";
import {useTranslation} from "../../common/Translator/UseTranslation";

export const Forums: React.FC<{
    community: Community
}> = ({community}) => {
    const {t} = useTranslation();
    const classes = useStyles();
    const [topics, setTopics] = useState<Topics | null>(null);
    const [open, setOpen] = useState(false);
    const makeRequest = async () => getTopics(community.id).then((o) => setTopics(o));

    useEffect(() => {
        if (topics === null) {
            makeRequest();
        }
    });

    console.log(topics);


    const topicList = () => topics !== null ? topics.topics.map((topic) =>
        <TopicListItem topic={topic}/>) : <ListItem/>

    const handleClose = () => setOpen(false);

    return (
        <Container className={classes.login} style={{maxHeight: "100%",
            overflow: "auto"}}>
            <BackgroundIcon icon={Forum}/>
            <CreateNewTopic
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
                {t.owner.forums.create}
            </Fab>
        </Container>
    );
}

