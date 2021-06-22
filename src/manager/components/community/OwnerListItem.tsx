import {OwnerResponse} from "../../models/responses/Responses";
import {ButtonBase, Typography} from "@material-ui/core";

export const OwnerListItem = ({owner}: { owner: OwnerResponse }) => {
    return <ButtonBase key={owner.id} className={'air row'}>
        <div className={'wrapper'}>
            <Typography className={'column air air-padding'} noWrap>
                {owner.username}
            </Typography>
            <Typography className={'column air air-padding'} noWrap>
                {owner.email}
            </Typography>
            <Typography className={'column air air-padding'} noWrap>
                {owner.fullName}
            </Typography>
            <Typography className={'column air air-padding'} noWrap>
                {owner.address}
            </Typography>
            <Typography className={'column air air-padding'} noWrap>
                {owner.phoneNumber}
            </Typography>
        </div>
    </ButtonBase>
}