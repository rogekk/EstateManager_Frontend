import {CommunityId} from "../../common/models/Types";
import {Dispatch, SetStateAction, useState} from "react";
import {useTranslation} from "../../common/i18n/UseTranslation";
import {Button, Dialog, DialogTitle, TextField} from "@material-ui/core";
import {postTopic} from "../../owners/services/TopicsService";
import {createResolution, VoteCountingMethod} from "../services/ManagerRepositoryService";

export const CreateNewResolution = ({
                                        open,
                                        setOpen,
                                        communityId,
                                        onResolutionsCreated,
                                        handleClose,
                                    }: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    communityId: CommunityId,
    onResolutionsCreated: () => any,
    handleClose: () => any,
}) => {
    const [number, setNumber] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [voteCountingMethod, setVoteCountingMethod] = useState<VoteCountingMethod>('shares_based')
    const {t} = useTranslation()

    return <Dialog open={open} onClose={handleClose}>
        <form
            style={{display: "flex", flexDirection: "column", padding: "16px", width: "500px"}}
            onSubmit={(e) => {
                e.preventDefault();
                createResolution(communityId, {
                    number: number,
                    subject: subject,
                    description: description,
                    voteCountingMethod: voteCountingMethod,
                })
                    .then(() => onResolutionsCreated())
                    .catch((e) => console.log(e))
                    .finally(() => {
                        console.log("done")
                        setOpen(false)
                    })
            }}>
            <DialogTitle id="form-dialog-title">{t.common.createTopic}</DialogTitle>

            <TextField
                id="number"
                margin={'normal'}
                label={'Subject'}
                fullWidth={true}
                multiline={true}
                onChange={(e) => setSubject(e.target.value)}
                required/>

            <TextField
                id="number"
                margin={'normal'}
                label={'Number'}
                fullWidth={true}
                multiline={true}
                onChange={(e) => setNumber(e.target.value)}
                required/>

            <TextField
                id="description"
                margin={'normal'}
                fullWidth={true}
                multiline={true}
                label={t.common.topicCreation.description}
                onChange={(e) => setDescription(e.target.value)}
                required/>
            <Button type='submit' style={{marginLeft: 'auto'}}>
                {t.owner.forums.create}
            </Button>
        </form>
    </Dialog>
}
