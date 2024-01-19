import { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [error, setError] = useState("")
    const { currentUser } = useAuth()
    const { handleSignout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await handleSignout()
            navigate("/login")
        } catch (error) {
            setError("Failed to Log Out")
        }
    }

    console.log(currentUser)

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title className='text-center mb-4'>Profile</Card.Title>
                    { error && <Alert variant='danger'>{error}</Alert> }

                    <Card.Text variant='b'>Email : { currentUser && currentUser.email }</Card.Text> 
                    <Card.Link href="/update-profile" className='btn btn-primary w-100 mt-2'>update profile</Card.Link>
                </Card.Body>
            </Card>

            <div className='w-100 text-center mt-2'>
                <Button className='btn btn-primary' onClick={handleLogout}>Log out</Button>
            </div>
        </>
    )
}

export default Dashboard
