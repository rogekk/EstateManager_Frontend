import {FC} from "react";
import {useStyles} from "../../styles/UseStyles";
import {Button} from "@material-ui/core";
import {useTranslation} from "../../common/Translator/UseTranslation";
import {en} from "../../common/Translator/En";
import {it} from "../../common/Translator/It";
import {FaBars} from "react-icons/all";
import "./CustomAppBar.css";


export const CustomAppBar: FC<{
    menuClicked?: () => void
}> = ({menuClicked}) => {
    const {t, setT} = useTranslation();
    return (
        <div className="top-bar">
            <div>
                <Button  onClick={() => menuClicked ? menuClicked() : null }>
                    <FaBars className="top-bar__icon"/>
                </Button>
                </div>
                <div >
                <Button className="top-bar__translation" onClick={() => {
                    if (t === en) {
                        setT(it);
                    } else {
                        setT(en);
                    }
                }
                }>{t.common.toggleLanguage}</Button>
                </div>
        </div>
    );
};