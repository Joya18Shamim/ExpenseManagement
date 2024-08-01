import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import Spinner from '../components/Spinner';
import "../styles/RegisterPage.css";


const Register = () => {

    const navigate = useNavigate();
    const [Loading,setLoading] = useState(false)

    // form submit
    const submitHandler = async(values) => {
        try {
            setLoading(true)
            await axios.post('api/v1/users/register',values)
            message.success("Registration Successfull");
            setLoading(false)
            navigate('/login')
        } catch (error) {
            setLoading(false)
            message.error('Something went wrong')       
        }
    };

    // prevent for login user
    useEffect(() => {
      if(localStorage.getItem('user')){
        navigate('/')
      }
    }, [navigate]);
    
  return (
    <>
    <div className='register-page'>
        {Loading && <Spinner/>}
        <Form layout='vertical' onFinish={submitHandler}>
            <h1>Register Form</h1>
            <Form.Item label="Name" name="name">
                <Input/>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type='email'/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type='password'/>
            </Form.Item>
            <div className="d-flex justify-content-between">
            <button className='btn btn-primary mb-2'>Register</button>
                <Link to='/login'>Already Register ? Click here to login</Link>
                
            </div>
        </Form>
    </div>
    </>
  )
}

export default Register