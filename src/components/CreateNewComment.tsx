import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Translation} from "../common/i18n/Translations";
import {CommunityId, TopicId} from "../common/models/Types";
import {Button, Dialog, DialogTitle, TextField} from "@material-ui/core";
import {postComment} from "../owners/services/TopicsService";
import {useTranslation} from "../common/i18n/UseTranslation";

export const CreateNewComment: FC<{
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    communityId: CommunityId,
    topicId: TopicId,
    onCreated: () => any,
    handleClose: () => any,
}> = ({
          open,
          setOpen,
          communityId,
          topicId,
          onCreated,
          handleClose,
      }) => {
    const [content, setContent] = useState("")
    const {t} = useTranslation();

    return <Dialog open={open} onClose={handleClose}>
        <form
            style={{display: "flex", flexDirection: "column", padding: "16px", width: "500px"}}
            onSubmit={(e) => {
                e.preventDefault();
                postComment(communityId, topicId, content)
                    .then(() => onCreated())
                    .catch((e) => console.log(e))
                    .finally(() => {
                        console.log("done");
                        setOpen(false);
                    })
            }}>
            <DialogTitle id="form-dialog-title">{t.common.createTopic}</DialogTitle>

            <TextField
                id="content"
                margin={'normal'}
                fullWidth={true}
                multiline={true}
                label={"content"}
                onChange={(e) => setContent(e.target.value)}
                required/>
            <Button type='submit' style={{marginLeft: 'auto'}}>
                {t.owner.forums.create}
            </Button>
        </form>
    </Dialog>
}