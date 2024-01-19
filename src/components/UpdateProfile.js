import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
    const { currentUser, updateUserEmailHandle, updateUserPasswordHandle } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError("password do not match")
        }

        const Promises = [];
        setLoading(true)
        setError("")

        if (emailRef.current.value != currentUser.email) {
            Promises.push(updateUserEmailHandle(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            Promises.push(updateUserPasswordHandle(passwordRef.current.value))
        }

        Promise.all(Promises)
            .then( () => {
                navigate("/")
            } )
            .catch( () => {
                setError("Failed to update account")
            } )
            .finally( () => {
                setLoading(false)
            } )
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title className='tect-center mb-4'>Update Profile</Card.Title>
                    { error && <Alert variant='danger'>{error}</Alert> }

                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor='email'>Email</Form.Label>
                            <Form.Control type='email' id='email' ref={emailRef} defaultValue={currentUser?.email} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='password'>Password</Form.Label>
                            <Form.Control type='password' id='password' ref={passwordRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='password-confirmation'>Password Confirmation</Form.Label>
                            <Form.Control type='password' id='password-confirmation' ref={passwordConfirmationRef} />
                        </Form.Group>

                        <Button variant='primary' type='submit' className='w-100 mt-3' disabled={loading}>Update</Button>
                    </Form>
                </Card.Body>

                <div className='w-100 mt-3 text-center'>
                    <Card.Link href="/" className='btn btn-danger w-75 text-center mb-4'>Cansel</Card.Link>
                </div>
            </Card>
        </>
    )
}

export default UpdateProfile
