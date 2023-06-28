import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import AuthUser from './AuthUser'

const endpoint = 'http://localhost:8000/api/login'

const AdminLogin = () => {

    const { navigate } = useNavigate()
    const { setToken } = AuthUser();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${endpoint}`, { email: email, password: password })
            setToken(res.data.user, res.data.access_token)
            navigate('/dashboard/events')
        } catch (error) {
            if (error.response.status === 401) {
                setError('Error: Invalid credentials');
            }
        }
    }

    return (
        <div class="col-md-6 my-5">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title text-center fw-bold pt-2">LOGIN</h4>
                </div>
                <div className="card-body">
                    {error.length > 0 && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    <form className="px-4 py-2">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type='submit' onClick={submit} className='btn primary-color w-100 mt-3 text-black'>ENTER</button>
                    </form>
                </div>
                <div className="card-footer text-muted text-center p-3">
                    Not registered yet? Contact an administrator.
                </div>
            </div>
        </div>
    )
}

export default AdminLogin