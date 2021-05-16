import {FC} from "react";
import {Container} from "@material-ui/core";
import {BackgroundIcon} from "./BackgroundIcon";
import {HowToVote, InsertDriveFile} from "@material-ui/icons";

export const Documents: FC<{}> = () => {
    return <Container>
        <BackgroundIcon icon={InsertDriveFile}></BackgroundIcon>
    </Container>

}