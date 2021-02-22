import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {TablePage} from "./pages/TablePage";
import {RegPage} from "./pages/RegPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return(
            <Switch>
                <Route path='/TablePage' exact>
                    <TablePage/>
                </Route>
                <Route path='/RegPage' exact>
                    <RegPage/>
                </Route>
                <Route path='/AuthPage' exact>
                    <AuthPage/>
                </Route>
                <Redirect to='/TablePage'/>
            </Switch>
            )
    }
    return(
        <Switch>
            <Route path='/RegPage' exact>
                <RegPage/>
            </Route>
            <Route path='/AuthPage' exact>
                <AuthPage/>
            </Route>
            <Redirect to='/AuthPage'/>
        </Switch>
    )
}