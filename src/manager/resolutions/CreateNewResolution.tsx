import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CommunityId } from "../../common/models/Types";
import { useTranslation } from "../../common/Translator/UseTranslation";
import { createResolution, VoteCountingMethod } from "../services/ManagerRepositoryService";

export const CreateNewResolution = ({communityId,}: {communityId: CommunityId,}) => {
    const [number, setNumber] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [voteCountingMethod, setVoteCountingMethod] = useState<VoteCountingMethod>('shares_based')
    const {t} = useTranslation()
    const history = useHistory()

    return <div className={'page-appbar'}>
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
                    .then(() => history.goBack())
                    .catch((e) => console.log(e))
                    .finally(() => {
                        console.log("done")
                    })
            }}>

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
    </div>
}
