import React, {FC} from "react";
import {Translation} from "../i18n/Translations";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {removePersistedToken, removePersistedUser} from "../persistance/Persistance";
import {ExitToApp} from "@material-ui/icons";
import {Pages, SetPage} from "./SideDrawer";

export const LogoutButton: FC<{ t: Translation, setPage: SetPage }> = ({t, setPage}) => {
    return <ListItem
        style={{flexShrink: 1}}
        onClick={() => {
            removePersistedUser();
            removePersistedToken();
            setPage(Pages.login);
        }}>
        <ListItemIcon>
            <ExitToApp></ExitToApp>
        </ListItemIcon>
        <ListItemText>
            Logout
        </ListItemText>

    </ListItem>
}