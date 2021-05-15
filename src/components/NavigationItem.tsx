import React, {FC, SetStateAction} from "react";
import {ListItem, ListItemIcon, ListItemText, SvgIcon} from "@material-ui/core";
import {Translation} from "../Translations";
import {Page} from "./Types";
import {useHistory, useLocation} from "react-router-dom";

export const NavigationItem: FC<{
    icon: typeof SvgIcon,
    t: Translation,
    page: [Page, string, string],
    setPage: React.Dispatch<SetStateAction<Page>>,
}> = ({icon, t, page, setPage}) => {
    const location = useLocation();
    const history = useHistory();
    const [p, path, name] = page

    return (<ListItem selected={location.pathname === path} button onClick={() => {
        setPage(p);
        history.push(path);
    }}>
        <ListItemIcon>
            {React.createElement(icon)}
        </ListItemIcon>
        <ListItemText>
            {name}
        </ListItemText>
    </ListItem>)
}