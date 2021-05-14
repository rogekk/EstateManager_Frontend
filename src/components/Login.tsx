import React, {useState} from "react";
import {api} from "../services/Api";
import {useStyles} from "../styles/UseStyles";
import {useHistory} from "react-router-dom";
import {Box, Button, Card, Container, TextField} from "@material-ui/core";
import {Translation} from "../Translations";
import Cookies from "universal-cookie";

export const Login: React.FC<{t: Translation}> = (props) => {

    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    return (
        <Container className={classes.login}>
            <Card className={classes.yo}>
                <form onSubmit={
                    (e) => {
                        e.preventDefault();
                        login(username, password)
                            .then((o) => {
                                new Cookies().set("token", o.token);
                                history.push("/dashboard");
                            })
                            .catch((e) => {
                                console.log(e);
                                // HANDLE FAILURE
                            })
                        console.log("submitting");
                    }
                }>
                    <TextField
                        id="email"
                        label={props.t.login.email}
                        margin={'normal'}
                        fullWidth={true}
                        type={'email'}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        id="password"
                        label={props.t.login.password}
                        margin={'normal'}
                        fullWidth={true}
                        onChange={(e) => setPassword(e.target.value)}
                        type={'password'}
                        required
                    />
                    <Box className={classes.cardButtonControl}>
                        <Button variant={'outlined'} type={'submit'}>
                            {props.t.login.loginButton}
                        </Button>
                    </Box>
                </form>
            </Card>
        </Container>
    )
}

async function login(u: string, p: string): Promise<{token: string}> {
    const body = {username: u, password: p}
    return api("/login", {method: "POST", body: JSON.stringify(body)})

}
