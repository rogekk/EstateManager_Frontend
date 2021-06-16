import React, {useState} from "react";
import {api} from "../../common/network/Api";
import {useHistory} from "react-router-dom";
import {Button, TextField} from "@material-ui/core";
import {persistToken, persistUser} from "../../common/persistance/Persistance";
import {useTranslation} from "../../common/Translator/UseTranslation";
import './Login.css';

export const Login: React.FC<{}> = () => {

    const {t} = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    return (
        <div className={'body'}>
            <div className="leftBox">
            </div>
            <section>
                <div className="imgBox">
                    <img src="bg.jpg"/>
                </div>
                <div className="contentBox">
                    <div className="formBox">
                        <h2>Login</h2>
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
                            <span className={'formLabel'}>E-mail</span>
                            <div className="inputBox">
                                <input
                                    id="email"
                                    type={'string'}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <span className={'formLabel'}>Password</span>
                            <div className="inputBox">
                                <input
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={'password'}
                                    required
                                />
                            </div>
                            <div className="rememberMe">
                                <label><input type="checkbox" name="my"/> Remember me</label>
                            </div>
                            <div className="loginBox">
                                <Button type={'submit'}>
                                    {t.common.login.loginButton}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

async function login(u: string, p: string): Promise<{ token: string, id: string, userType: "admin" | "manager" | "owner" }> {
    const body = {username: u, password: p}
    return api("/login", {method: "POST", body: JSON.stringify(body)})
}
