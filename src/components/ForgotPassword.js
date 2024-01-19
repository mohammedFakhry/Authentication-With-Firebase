import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Signup from './Signup'
import { useAuth } from '../context/AuthContext'

const ForgotPassword = () => {
    const { resetPasswordHandle } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const emailRef = useRef()

    const hsndleSubmit = async(e) => {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await resetPasswordHandle(emailRef.current.value);
            setMessage("check your inbox to get new password")
        } catch (error) {
            setError("Failed to reset password")
        }
        setLoading(false)
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title className='tect-center mb-4'>Reset Password</Card.Title>
                    { error && <Alert variant='danger'>{error}</Alert> }
                    { message && <Alert variant='success'>{message}</Alert> }

                    <Form onSubmit={hsndleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor='email'>Email</Form.Label>
                            <Form.Control type='email' id='email' ref={emailRef} />
                        </Form.Group>
                        
                        <Button variant='primary' type='submit' className='w-100 mt-3' disabled={loading}>Reset Password</Button>
                    </Form>
                    <Card.Text className='text-center mt-3'>
                        <Link to='/login'>Log In</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* <Card.Text className='w-100 text-center mt-2'>Need an Account? <Link to={<Signup />}>Log In</Link></Card.Text> */}
        </Container>
    )
}

export default ForgotPassword
// className='d-flex align-item-center justify-content-center'