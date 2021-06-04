import React, {FC, useEffect, useState} from "react";
import {Translation} from "../common/i18n/Translations";
import {useStyles} from "../styles/UseStyles";
import {useParams} from "react-router-dom";
import {Comments} from "../common/models/Types";
import {getComments} from "../owners/services/TopicsService";
import {Container, Fab, List, Paper, Typography} from "@material-ui/core";
import {CreateNewComment} from "./CreateNewComment";
import {Add, Forum} from "@material-ui/icons";
import {CommentListItem} from "./CommentListItem";
import {BackgroundIcon} from "./BackgroundIcon";
import {useTranslation} from "../common/i18n/UseTranslation";

export const TopicComponent: FC<{
    communityId: string
}> = ({communityId}) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const {t} = useTranslation();

    const {topicId} = useParams<{ topicId: string, communityId: string }>();

    const [comments, setComments] = useState<Comments>({comments: []});
    const [retrieved, setRetrieved] = useState(false)

    useEffect(() => {
        if (!retrieved) {
            getComments({id: communityId}, {id: topicId}).then((r) => {
                setComments(r);
                setRetrieved(true);
            });
        }

    });

    return (
        <Container style={{
            maxHeight: "100%",
            overflow: "auto",
            paddingTop: '96px'
        }}>
            <BackgroundIcon icon={Forum}/>
            <Typography>
                <Paper style={{maxWidth: "600px"}}>
                    <List>
                        {comments.comments.map(c => <CommentListItem comment={c}/>)}
                    </List>
                </Paper>
            </Typography>

            <CreateNewComment open={open} setOpen={setOpen} communityId={
                {id: communityId}} topicId={{id: topicId}} onCreated={() =>
                getComments({id: communityId}, {id: topicId}).then((r) => setComments(r))
            } handleClose={handleClose}/>

            <Fab variant='extended' onClick={() => setOpen(true)} className={classes.fab} color={"secondary"}>
                <Add/>
                {t.owner.forums.create}
            </Fab>
        </Container>);
}