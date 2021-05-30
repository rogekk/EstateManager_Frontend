import React, {FC} from "react";
import {Translation} from "../i18n/Translations";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {removePersistedToken, removePersistedUser} from "../persistance/Persistance";
import {ExitToApp} from "@material-ui/icons";
import {Pages, SetPage} from "./SideDrawer";
import {useTranslation} from "../i18n/UseTranslation";

export const LogoutButton: FC<{setPage: SetPage }> = ({setPage}) => {
    const {t} = useTranslation();
    return <ListItem
        style={{flexShrink: 1}}
        button
        onClick={() => {
            removePersistedUser();
            removePersistedToken();
            setPage(Pages.login);
        }}>
        <ListItemIcon>
            <ExitToApp/>
        </ListItemIcon>
        <ListItemText>
            {t.common.logout}
        </ListItemText>

    </ListItem>
}