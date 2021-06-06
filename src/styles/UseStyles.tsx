import {makeStyles} from "@material-ui/core";

export const grid = {
    margin: {
        small: '8px',
        medium: '16px',
    }
}

export const useStyles = makeStyles({
    yo: {
        border: 0,
        borderRadius: 3,
        color: 'white',
        height: 'fit-content',
        padding: '0 30px',
    },
    login: {
        paddingTop: '100px',
        flexGrow: 1,
    },

    cardButtonControl: {
        float: 'right',
        margin: '40px 0 40px 0',
    },

    background: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        backgroundPosition: "center",
        background: "var(--bg)",
        height: '100%',
        display: 'flex',
        maxHeight: '100%',
        overflow: 'hidden',
    },
    topicListItem: {
        marginTop: grid.margin.medium,
        marginBottom: grid.margin.medium
    },
    fab: {
        position: 'absolute',
        bottom: grid.margin.medium,
        right: grid.margin.medium,
    },
    appbar: {
        position: 'fixed'
    },
    menuButton: {
        marginRight: grid.margin.medium,
    },
    title: {
        flexGrow: 1,
    },
    column: {
        flex: 1

    }
});
