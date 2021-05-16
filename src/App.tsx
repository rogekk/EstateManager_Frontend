import React, {FC, useEffect, useState} from 'react';
import './App.css';
import {Box, Container, Fab, List, ListItem, Typography, Paper} from '@material-ui/core';
import {BrowserRouter, Route, useHistory, useLocation, useParams} from "react-router-dom";
import {useStyles} from "./styles/UseStyles";
import {Dashboard} from "./components/Dashboard";
import {Login} from "./components/Login";
import {useLocale} from "./i18n";
import {en, Translation} from "./Translations";
import {Forums} from "./components/Forums";
import {Comments, Community, CommunityId, OwnerProfile, Page, Topic} from "./components/Types";
import Cookies from "universal-cookie";
import {getComments, getProfile} from "./services/TopicsService";
import {SideDrawer} from "./SideDrawer";
import {CustomAppBar} from "./components/CustomAppBar";
import {Add} from "@material-ui/icons";
import {CreateNewComment} from "./components/CreateNewComment";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";

export const getToken = () => new Cookies().get("token");
export const getOwner = () => new Cookies().get("owner");

function App() {
    const classes = useStyles();
    const [t, setTranslation] = useLocale(en);
    const [community] = useState<Community>({id: {id: "id1"}, name: {value: ""}});
    const [owner, setOwner] = useState<OwnerProfile>();
    const [currentPage, setPage] = useState<Page>('forums');

    useEffect(
        () => {
            if (getToken() == null && window.location.pathname !== "/login") {
                window.location.replace("/login");
            }

            if (owner == null && getOwner() != null) {
                getProfile(getOwner()).then(r => setOwner(r))
            }
        }
    )

    return (
        <Box className={classes.background}>
            <BrowserRouter>
                <CustomAppBar t={t} setTranslation={setTranslation}/>
                <SideDrawer t={t} page={currentPage} setPage={setPage}/>
                <Route exact path="/login" render={() => <Login t={t}/>}/>
                <Route exact path="/dashboard" render={() => <Dashboard t={t} profile={owner}/>}/>
                <Route exact path="/forums" render={() => <Forums t={t} community={community}/>}/>
                <Route exact path="/forums/:topicId"
                       render={() => <TopicComponent t={t} communityId={community.id.id}/>}/>
            </BrowserRouter>
        </Box>
    );
}

export default App;

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
                    {comments.comments.map(c => <Paper> <ListItem>{c.content}</ListItem></Paper>)}
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
