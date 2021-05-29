import React, {useState} from "react";
import {api} from "../common/network/Api";
import {useStyles} from "../styles/UseStyles";
import {useHistory} from "react-router-dom";
import {Box, Button, Card, Container, TextField} from "@material-ui/core";
import {Translation} from "../common/i18n/Translations";
import {persistToken, persistUser} from "../common/persistance/Persistance";

export const Login: React.FC<{ t: Translation }> = ({t}) => {

    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    return (
        <Container className={classes.login}>
            <Card style={
                {
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    maxWidth: '400px',
                    padding: '0 30px',
                }
            }>
                <form onSubmit={
                    (e) => {
                        e.preventDefault();
                        login(username, password)
                            .then((o) => {
                                persistToken(o.token);
                                persistUser(o.id);

                                if (o.userType === "admin") {
                                    history.push("/a/dashboard");
                                } else if (o.userType === "manager") {
                                    history.push("/m/dashboard");
                                } else if (o.userType === "owner") {
                                    history.push("/o/dashboard");
                                }

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
                        label={t.common.login.email}
                        margin={'normal'}
                        fullWidth={true}
                        type={'string'}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        id="password"
                        label={t.common.login.password}
                        margin={'normal'}
                        fullWidth={true}
                        onChange={(e) => setPassword(e.target.value)}
                        type={'password'}
                        required
                    />
                    <Box className={classes.cardButtonControl}>
                        <Button variant={'outlined'} type={'submit'}>
                            {t.common.login.loginButton}
                        </Button>
                    </Box>
                </form>
            </Card>
        </Container>
    )
}

async function login(u: string, p: string): Promise<{ token: string, id: string, userType: "admin" | "manager" | "owner" }> {
    const body = {username: u, password: p}
    return api("/login", {method: "POST", body: JSON.stringify(body)})
}
