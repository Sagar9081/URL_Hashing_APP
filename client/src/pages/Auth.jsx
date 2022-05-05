import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import style from './styles/Auth/Auth.module.css'

export const Auth = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: "", password: ""
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.type]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className={style.center}>Link Shortener</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div className="input-field">
                            <input placeholder="Enter email:" type="email" className="input" onChange={changeHandler} value={form.email}/>
                            <input placeholder="Enter password:" type="password" className="input" onChange={changeHandler} value={form.password}/>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className={`btn yellow darken-4 ${style.margin} ${style.custom}`} onClick={loginHandler} disabled={loading}>Sign in</button>
                        <button className={`btn grey lighten-1 ${style.custom}`} onClick={registerHandler} disabled={loading}>Sign up</button>
                    </div>
                </div>
            </div> 
        </div>
    )
}