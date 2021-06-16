import React, {FC} from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {removePersistedToken, removePersistedUser} from "../../common/persistance/Persistance";
import {ExitToApp} from "@material-ui/icons";
import {useTranslation} from "../../common/Translator/UseTranslation";
import {useHistory} from "react-router-dom";

export const LogoutButton: FC<{}> = ({}) => {
    const {t} = useTranslation();
    const history = useHistory();
    return <ListItem
        style={{flexShrink: 1}}
        button
        onClick={() => {
            removePersistedUser();
            removePersistedToken();
            history.push("/login");
        }}>
        <ListItemIcon>
            <ExitToApp/>
        </ListItemIcon>
        <ListItemText>
            {t.common.logout}
        </ListItemText>

    </ListItem>
}