import {makeStyles} from "@material-ui/core";

export const grid =  {
    margin: {
        small: '8px',
        medium: '16px',
    }
}

export const useStyles = makeStyles({
    yo: {
        background: 'white',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 'fit-content',
        padding: '0 30px',
    },
    login: {
        paddingTop: '100px',
        maxWidth: '600px'
    },

    cardButtonControl: {
        float: 'right',
        margin: '40px 0 40px 0',
    },

    background: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        height: '100%'
    },
    topicListItem: {
        marginTop: grid.margin.medium,
        marginBottom: grid.margin.medium
    },
});
