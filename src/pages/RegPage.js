import React, {useState} from "react";
import {useHttp} from "../hooks/http.hook";

export const RegPage = () => {

    const {loading, request, error} = useHttp()

    const [form, setForm] = useState(
        { regEmail:'', regPassword: '', name: ''}
    )

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('api/auth/register', 'POST', {...form})
            console.log('Data:' + data)

        } catch (e) {}
    }

    return(
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Users table</h1>

                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title pb">Register</span>
                        <div>
                            <div className="input-field pb">
                                <input id="regEmail"
                                       type="text"
                                       name="regEmail"
                                       onChange={changeHandler}
                                />
                                <label htmlFor="regEmail">Email</label>
                            </div>
                            <div className="input-field pb">
                                <input
                                    id="regPassword"
                                    type="password"
                                    name="regPassword"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="regPassword">Password</label>
                            </div>
                            <div className="input-field">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn" onClick={registerHandler} disabled={loading}>Register</button>
                        <a href="/AuthPage" className="waves-effect waves-light btn" style={{marginLeft: 30}}>Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}