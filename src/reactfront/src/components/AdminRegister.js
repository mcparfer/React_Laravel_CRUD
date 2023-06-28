import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from './AuthUser'

const AdminRegister = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { http } = AuthUser();

    const submit = async (e) => {
        e.preventDefault()
        http.post('/register', { name, email, password }).then((res) => {
            navigate('/dashboard')
        });
    }

    return (
        <div className="col-md-6 mt-5">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title text-center fw-bold pt-2">REGISTRATIOM FORM</h4>
                </div>
                <div className="card-body">
                    <form className="px-4 py-2">
                        <div className="mb-3 form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input required type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input required type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input required type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type='submit' onClick={submit} className='btn primary-color mt-3 w-100 text-black'>REGISTER</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminRegister