import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import { useAuth } from '../context/AuthContext'


const Login = () => {
    const { handleLogIn } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const locatiion = useLocation()
    const redirectPath = locatiion.state?.path || '/'; 

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await handleLogIn(emailRef.current.value, passwordRef.current.value);
            navigate(redirectPath, { replace: true })
        } catch (error) {
            setError("Failed to Login")
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title className='tect-center mb-4'>Log In</Card.Title>
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

                        <Button variant='primary' type='submit' className='w-100 mt-3' disabled={loading}>Log In</Button>
                    </Form>
                    <div className='text-center mt-5'>
                        <p>Forgot Password ? <Card.Link href="/forgot-password" className='w-100 text-center mt-2'>Resset Password</Card.Link></p>
                        <p>Need an account ? <Card.Link href="/signup" className='w-100 text-center mt-2'>signup</Card.Link></p>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Login
  {/* Forgot Password ?<Link to='/forgot-password'>Reset Password</Link> */}
  {/* <div className='w-100 text-center mt-2'>Need an account ? <Link to={<Signup />}>signup</Link></div> */}