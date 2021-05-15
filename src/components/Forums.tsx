import React, {useState} from "react";
import {api} from "../services/Api";
import {useStyles} from "../styles/UseStyles";
import {
    Avatar,
    Button,
    Card,
    Container, Dialog, DialogTitle,
    Divider, Fab,
    List,
    ListItem, ListItemAvatar,
    ListItemIcon,
    ListItemText, Paper,
    TextField
} from "@material-ui/core";
import {Translation} from "../Translations";
import {Community, Topics} from "./Types";
import {getTopics, postTopic} from "../services/TopicsService";
import {Add, FolderOpen} from "@material-ui/icons";
import {TopicListItem} from "./TopicListItem";

export const Forums: React.FC<{
    t: Translation,
    community: Community
}> = (props) => {
    const classes = useStyles();
    const [topics, setTopics] = useState<Topics | null>(null);
    const [newTopic, setNewTopic] = useState("")

    const makeRequest = async () => getTopics(props.community.id).then((o) => setTopics(o));

    if (topics === null) {
        makeRequest();
    }

    const topicList = () => topics !== null ? topics.topics.map((topic) => <TopicListItem topic={topic}/>) : <ListItem/>

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container className={classes.login} style={{maxHeight: "100%", overflow: "auto"}}>

            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    postTopic(props.community.id, newTopic, "yooo")
                        .then((o) => {
                            makeRequest();
                        })
                        .catch((e) => console.log(e))
                        .finally(() => {
                            console.log("done");
                            setOpen(false);
                        })
                }}>
                    <DialogTitle id="form-dialog-title">Create new topic</DialogTitle>

                    <TextField
                        id="createnewtopic"
                        margin={'normal'}
                        fullWidth={true}
                        onChange={(e) => setNewTopic(e.target.value)}
                        required/>
                    <Button type='submit'>
                        {props.t.forums.create}
                    </Button>
                </form>
            </Dialog>
            <div style={{maxHeight: "100%"}}>
                <List style={{}}>
                    {topicList()}
                </List>
            </div>
            <Fab variant='extended' onClick={() => setOpen(true)} className={classes.fab} color={"secondary"}>
                <Add/>
                {props.t.forums.create}
            </Fab>
        </Container>
    );
}

