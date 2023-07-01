import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axiosClient from '../axios.client'
import myImage from '/loading-gif.gif';



export default function UserForm() {


    const { id } = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);
    const onSubmit = (ev) => {

        ev.preventDefault();
        if (user.id) {

            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {

                    navigate('/users')

                })
                .catch(err => {
                    console.log(err);
                    const response = err.response;
                    if (response && response.status == 422) {
                        setErrors(response.data.errors);
                    }
                })
        }
        else{
            axiosClient.post(`/users`, user)
                .then(() => {

                    navigate('/users')

                })
                .catch(err => {
                    console.log(err);
                    const response = err.response;
                    if (response && response.status == 422) {
                        setErrors(response.data.errors);
                    }
                })
        }

    }
    const [user, setUser] = useState({

        id: null,
        email: '',
        password: '',
        password_confirmation: ''

    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })

        }, [])


    }
    return (
        <>
            {user.id && <h1>Update User : {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        <img style={{ width: "5%", height: "5%" }} src={myImage} srcSet={`${myImage}`} alt="My Image" />
                    </div>
                )}

                {errors && <div className="alert">
                    {Object.keys(errors).map(key =>

                        <p key={key}>
                            {errors[key][0]}
                        </p>

                    )}
                </div>
                }
                {!loading &&

                    <form onSubmit={onSubmit}>

                        <input value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} type="text" placeholder="Full Name" />
                        <input value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} type="email" placeholder="Email Address" />
                        <input onChange={ev => setUser({ ...user, password: ev.target.value })} type="password" placeholder="Enter Password" />
                        <input onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} type="password" placeholder="Confirm Password" />
                        <button className='btn'>Save</button>

                    </form>
                }
            </div>
        </>
    )
}
