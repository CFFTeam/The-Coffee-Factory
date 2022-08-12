import React, { useState, useEffect } from 'react'
import "./AddUser.css"
import back from "../../../../Images/double-left.png"
import axios from 'axios'
import Cookie from 'universal-cookie'
import io from 'socket.io-client'
import { useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const cookie = new Cookie()
const socket = io.connect(process.env.REACT_APP_ipAddress)
export default function AddUser() {
    const params = useParams();
    const [gender, setGender] = useState();
    const [status, setStatus] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState();
    const [saveSuccess, setSaveSuccess] = useState(false)
    const navigate = useNavigate()

    const sendDataUpdate = (event) => {
        event.preventDefault()
        const headers = {
            'Authorization': `Bearer ${cookie.get("TWJ")}`
        }

        const object = {
            name: name,
            email: email,
            gender: gender,
            status: status,
            role: role
        }

        axios.post(process.env.REACT_APP_ipAddress + '/tcf/v1/admin/create-user', object, { headers: headers }).then((res) => {
            console.log(res.data)
            setSaveSuccess(true)
            setTimeout(() => {
                setSaveSuccess(false)
            }, 2000);
        }).catch(error => {
            console.log(error)
            console.log(email)
        })
    }


    return (
        <div className='AddUser'>
            <div className='back-allUser' onClick={() => navigate('/users')}>
                <svg className="btn-back" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1802_6518)">
                        <path d="M9.11553 1.75272e-06L10.8843 1.83588L3.01865 10L10.8843 18.1641L9.11553 20L0.365526 10.9179C-0.121974 10.4119 -0.121974 9.59131 0.365526 9.08206L9.11553 1.75272e-06Z" fill="black" />
                        <path d="M1.25 11.2974L20 11.2974L20 8.70255L1.25 8.70255L1.25 11.2974Z" fill="black" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1802_6518">
                            <rect width="20" height="20" fill="white" transform="translate(20 20) rotate(-180)" />
                        </clipPath>
                    </defs>
                </svg>

                <p className='btn-name'>All User</p>
            </div>

            <div className='title-newUser'>
                <p className='new-user-title'>New User</p>
                <p className='describe-title'>Use the below form to create a new account</p>
            </div>

            <form onSubmit={sendDataUpdate}>
                <div className='form-user'>
                    <p className='title-name-form'>Name</p>
                    <input className='input-name' type='text' placeholder='Nguyen Van A'
                        onChange={(event) => { setName(event.target.value) }}></input>
                    <p className='title-name-mail'>Email</p>
                    <input className='input-email' type='email' required placeholder='example@gmail.com'
                        onChange={(event) => { setEmail(event.target.value) }}></input>
                </div>
                <div className='gender-user'>
                    <p className='gender-title'>Gender</p>
                    <div className='male-gender'>
                        <input type='radio' name='gender' checked={gender === 'male' ? true : false} onClick={() => setGender('male')} value='Male' />Male
                    </div>

                    <div className='female-gender'>
                        <input type='radio' name='gender' checked={gender === 'female' ? true : false} onClick={() => setGender('female')} value='Female' />Female
                    </div>
                    <div className='other-gender'>
                        <input type='radio' name='gender' checked={gender === 'other' ? true : false} onClick={() => setGender('other')} value='Other' />Other
                    </div>
                </div>

                <div className='status-user'>
                    <p className='status-title'>Status</p>
                    <div className='status1'>
                        <input type='radio' name='status' checked={status === 'active' ? true : false} onClick={() => setStatus('active')} value='Active' />Active
                    </div>

                    <div className='status2'>
                        <input type='radio' name='status' value='Inactive' checked={status === 'inactive' ? true : false} onClick={() => setStatus('inactive')} />Inactive
                    </div>
                </div>

                <div className='role-user'>
                    <p className='role-title'>Role</p>
                    <div className='role-1'>
                        <input type='radio' name='role' value='Admin' checked={role === 'admin' ? true : false} onClick={() => setRole('admin')} />Admin
                    </div>

                    <div className='role-2'>
                        <input type='radio' name='role' value='Employee' checked={role === 'employee' ? true : false} onClick={() => setRole('employee')} />Employee
                    </div>

                    <div className='role-3'>
                        <input type='radio' name='role' value='Customer' checked={role === 'customer' ? true : false} onClick={() => setRole('customer')} />Customer
                    </div>
                </div>

                {!saveSuccess && <button type='submit' className='save-user-btn-add-save'>
                    <p className='save-user-add'>save</p></button>}
                {saveSuccess && <div className='save-user-btn-add save-user-btn-add-bg'>
                    <p className='save-user-add'>save successfully</p> </div>}

            </form>

        </div>
    )
}
