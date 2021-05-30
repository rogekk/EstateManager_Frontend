import React, {FC, SetStateAction} from "react";
import {ListItem, ListItemIcon, ListItemText, SvgIcon} from "@material-ui/core";
import {Page} from "../common/models/Types";
import {useHistory, useLocation} from "react-router-dom";
import {NavigationPage} from "../common/components/SideDrawer";
import {useTranslation} from "../common/i18n/UseTranslation";

export const NavigationItem: FC<{
    icon: typeof SvgIcon,
    page: NavigationPage,
    setPage: React.Dispatch<SetStateAction<NavigationPage>>,
}> = ({icon, page, setPage}) => {
    const location = useLocation();
    const history = useHistory();
    const {t} = useTranslation();
    // const [p, path, name] = page

    return (<ListItem selected={location.pathname === page.url} button onClick={() => {
        setPage(page)
    }}>
        <ListItemIcon>
            {React.createElement(icon)}
        </ListItemIcon>
        <ListItemText>
            {page.name(t)}
        </ListItemText>
    </ListItem>)
}
