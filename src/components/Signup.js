import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Login from './Login'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
    const { handleSignup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError("password do not match")
        }

        try {
            setError("")
            setLoading(true)
            await handleSignup(emailRef.current.value, passwordRef.current.value);
            navigate("/")
        } catch (error) {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title className='tect-center mb-4'>Sign Up</Card.Title>
                    { error && <Alert variant='danger'>{error}</Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor='email'>Email</Form.Label>
                            <Form.Control type='email' id='email' ref={emailRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='password'>Password</Form.Label>
                            <Form.Control type='password' id='password' ref={passwordRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='password-confirmation'>Password Confirmation</Form.Label>
                            <Form.Control type='password' id='password-confirmation' ref={passwordConfirmationRef} />
                        </Form.Group>

                        <Button variant='primary' type='submit' className='w-100 mt-3' disabled={loading}>signup</Button>
                    </Form>
                </Card.Body>

                <p className='text-center'>Already have an account ?<Card.Link href="/login" className='w-100 text-center mt-2'>Log In</Card.Link></p>
            </Card>
        </>
    )
}

export default Signup
{/* <div className='w-100 text-center mt-2'>Already have an account ? <Link to={<Login />}>Log In</Link></div> */}