import React, {FC} from "react";
import {SvgIcon} from "@material-ui/core";

export const BackgroundIcon: FC<{
    icon: typeof SvgIcon,
}> = ({icon}) => {
    return React.createElement(icon, {
        style: {
            height: 300,
            width: 300,
            left: '50%',
            top: '50%',
            opacity: '70%',
            fill: 'white',
            transform: 'translate(-50%,-50%)',
            marginTop: '50px',
            marginLeft: '100px',
            position: "absolute",
        }
    })
}