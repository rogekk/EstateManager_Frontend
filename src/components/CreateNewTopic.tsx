import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Translation} from "../Translations";
import {CommunityId} from "./Types";
import {Button, Dialog, DialogTitle, TextField} from "@material-ui/core";
import {postTopic} from "../services/TopicsService";

export const CreateNewTopic: FC<{
    t: Translation,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    communityId: CommunityId,
    onTopicCreated: () => any,
    handleClose: () => any,
}> = ({
          t,
          open,
          setOpen,
          communityId,
          onTopicCreated,
          handleClose,
      }) => {
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")

    return <Dialog open={open} onClose={handleClose}>
        <form
            style={{display: "flex", flexDirection: "column", padding: "16px", width: "500px"}}
            onSubmit={(e) => {
            e.preventDefault();
            postTopic(communityId, subject, description)
                .then(() => onTopicCreated())
                .catch((e) => console.log(e))
                .finally(() => {
                    console.log("done");
                    setOpen(false);
                })
        }}>
            <DialogTitle id="form-dialog-title">Create new topic</DialogTitle>

            <TextField
                id="subject"
                margin={'normal'}
                label={"subject"}
                fullWidth={true}
                multiline={true}
                onChange={(e) => setSubject(e.target.value)}
                required/>

            <TextField
                id="description"
                margin={'normal'}
                fullWidth={true}
                multiline={true}
                label={"description"}
                onChange={(e) => setDescription(e.target.value)}
                required/>
            <Button type='submit' style={{marginLeft: 'auto'}}>
                {t.forums.create}
            </Button>
        </form>
    </Dialog>
}