import React, {FC} from "react";
import {ListItem, ListItemIcon, ListItemText, SvgIcon} from "@material-ui/core";
import {useHistory, useLocation} from "react-router-dom";
import {IconType} from "react-icons";
import './NavigationItem.css';
import { useTranslation } from "../common/Translator/UseTranslation";

export const NavigationItem: FC<{
    icon: IconType,
    name: string,
    url: string,
}> = ({icon, name, url,}) => {
    const location = useLocation();
    const history = useHistory();
    const {t} = useTranslation();

    return <ListItem className="nav_list" selected={location.pathname === url} button onClick={() => {
            history.push(url);
        }}>
            <i>{React.createElement(icon )}</i>
            <li>{<ListItemText> {name} </ListItemText>}</li>
            <div className="toolTip"><ListItemText> {name} </ListItemText></div>
        </ListItem>
    
}
