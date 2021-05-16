import {FC} from "react";
import {Container} from "@material-ui/core";
import {BackgroundIcon} from "./BackgroundIcon";
import {HowToVote} from "@material-ui/icons";

export const Resolutions: FC<{}> = () => {
    return <Container>
        <BackgroundIcon icon={HowToVote}></BackgroundIcon>
    </Container>

}