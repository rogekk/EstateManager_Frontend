import React, {FC} from "react";
import {Translation} from "../i18n/Translations";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {removePersistedToken, removePersistedUser} from "../persistance/Persistance";
import {ExitToApp} from "@material-ui/icons";
import {Pages, SetPage} from "./SideDrawer";
import {useTranslation} from "../i18n/UseTranslation";
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