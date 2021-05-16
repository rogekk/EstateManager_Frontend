import React, {FC, useEffect, useState} from "react";
import {Translation} from "../Translations";
import {useStyles} from "../styles/UseStyles";
import {useParams} from "react-router-dom";
import {Comments} from "./Types";
import {getComments} from "../services/TopicsService";
import {Container, Fab, List, ListItem, Paper, Typography} from "@material-ui/core";
import {CreateNewComment} from "./CreateNewComment";
import {Add} from "@material-ui/icons";
import {CommentListItem} from "./CommentListItem";

export const TopicComponent: FC<{
    t: Translation,
    communityId: string
}> = ({t, communityId}) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        <Container style={{maxHeight: "100%", overflow: "auto", paddingTop: '96px'}}>
            <Typography>
                <List>
                    {comments.comments.map(c => <CommentListItem comment={c}/>) }
                </List>
            </Typography>

            <CreateNewComment t={t} open={open} setOpen={setOpen} communityId={
                {id: communityId}} topicId={{id: topicId}} onCreated={() =>
                getComments({id: communityId}, {id: topicId}).then((r) => setComments(r))
            } handleClose={handleClose}/>

            <Fab variant='extended' onClick={() => setOpen(true)} className={classes.fab} color={"secondary"}>
                <Add/>
                {t.forums.create}
            </Fab>
        </Container>);
}