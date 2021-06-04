import {Dispatch, FC, SetStateAction, useState} from "react";
import {CommunityId, TopicId} from "../../../common/models/Types";
import {useTranslation} from "../../../common/i18n/UseTranslation";
import {Button, Dialog, DialogTitle, TextField} from "@material-ui/core";
import {postComment} from "../../services/TopicsService";
import {createNewIssue} from "../../services/IssuesService";

export const CreateNewIssue: FC<{
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    communityId: CommunityId,
    onCreated: () => any,
    handleClose: () => any,
}> = ({
          open,
          setOpen,
          communityId,
          onCreated,
          handleClose,
      }) => {
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const {t} = useTranslation();

    return <Dialog open={open} onClose={handleClose}>
        <form
            style={{display: "flex", flexDirection: "column", padding: "16px", width: "500px"}}
            onSubmit={(e) => {
                e.preventDefault();
                createNewIssue(communityId, {subject, description, attachments: ""})
                    .then(() => onCreated())
                    .catch((e) => console.log(e))
                    .finally(() => {
                        console.log("done");
                        setOpen(false);
                    })
            }}>
            <DialogTitle id="form-dialog-title">{t.common.createTopic}</DialogTitle>

            <TextField
                id="subject"
                margin={'normal'}
                fullWidth={true}
                multiline={true}
                label={"subject"}
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
                {t.owner.forums.create}
            </Button>
        </form>
    </Dialog>
}