import React, {FC} from "react";
import {ListItem, ListItemIcon, ListItemText, SvgIcon} from "@material-ui/core";
import {useHistory, useLocation} from "react-router-dom";
import {useTranslation} from "../../common/Translator/UseTranslation";

export const NavigationItem: FC<{
    icon: typeof SvgIcon,
    name: string,
    url: string,
}> = ({icon, name, url}) => {
    const location = useLocation();
    const history = useHistory();
    const {t} = useTranslation();
    

    return (<ListItem selected={location.pathname === url} button onClick={() => {
        history.push(url);
    }}>
        <ListItemIcon>
            {React.createElement(icon)}
        </ListItemIcon>
        <ListItemText>
            {name}
        </ListItemText>
    </ListItem>)
}
