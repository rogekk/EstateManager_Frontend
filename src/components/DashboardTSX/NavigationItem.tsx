import React, {FC} from "react";
import {ListItem, ListItemIcon, ListItemText, SvgIcon} from "@material-ui/core";
import {useHistory, useLocation} from "react-router-dom";
import {useTranslation} from "../../common/Translator/UseTranslation";
import {IconType} from "react-icons";

export const NavigationItem: FC<{
    icon: IconType,
    name: string,
    url: string,
    expanded: boolean
}> = ({icon, name, url, expanded}) => {
    const location = useLocation();
    const history = useHistory();
    const {t} = useTranslation();

    return (<ListItem selected={location.pathname === url} button onClick={() => {
            history.push(url);
        }}>
            {React.createElement(icon)}
            {expanded && <ListItemText> {name} </ListItemText>}
        </ListItem>
    )
}
