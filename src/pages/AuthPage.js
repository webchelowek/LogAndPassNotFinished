import React, {useState} from "react"
import {useHttp} from "../hooks/http.hook";

export const AuthPage = () => {

    const {loading, error, request} = useHttp()

    const [form, setForm] = useState(
        { authEmail: '', authPassword: ''}
    )

    const changeHandler = function (event){
        setForm({...form, [event.target.name]: event.target.value})
    }

    const authHandler = async () => {
        try{
            const data = await request('api/auth/login', 'POST', {...form})

        } catch (e) {}
    }

    return(
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Users table</h1>

                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title pb">Login</span>
                        <div>
                            <div className="input-field pb">
                                <input
                                    id="authEmail"
                                    type="text"
                                    name="authEmail"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="authEmail">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    id="authPassword"
                                    type="password"
                                    name="authPassword"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="authPassword">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn">Login</button>
                        <a href='/RegPage' className="waves-effect waves-light btn" style={{marginLeft: 30}}>Register</a>
                    </div>
                </div>
            </div>
        </div>
    )
}