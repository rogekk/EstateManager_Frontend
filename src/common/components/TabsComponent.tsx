import {FC, FunctionComponent} from "react";
import {ButtonBase, Typography} from "@material-ui/core";
import './Tabs.css'
import {useHistory} from "react-router-dom";

export const TabsComponent: FC<{}> = ({children}) => {
    return <div className={'tab-container'}>
        {children}
    </div>
}

export const TabItem = (
    {
        name,
        destination,
        matcher
    }: {
        name: string,
        destination: string,
        matcher: string,
    }) => {
    const selected = window.location.pathname.includes(matcher) ? 'tab-item-selected' : ''
    const history = useHistory()

    return <ButtonBase className={'tab-item'}> <Typography className={`${selected}`} onClick={
        () => history.push(destination)}>
        {name}
    </Typography>
    </ButtonBase>
}