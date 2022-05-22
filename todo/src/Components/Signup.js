import React, { useContext, useState, useEffect, useReducer } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { UserContext } from '../App';


export default function Signup() {
    const history = useNavigate();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    
    const Postdata = async () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            alert("wrong email addres pattern");
            return
        }
        // mobile number validate
        if(!/^[0-9]{10}$/.test(mobile)){
            alert("wrong mobile number pattern");
            return
        }
        if(password !== confirmPassword){
            alert("password and confirm password not match");
            return
        }
        fetch('/api/auth/signup', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "applicaiton-type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                mobile,
                email,
                password,
                confirmPassword
            })
        }).then(res => res.json())
            .then(data=>{
                if(data.error){
                    console.log(data.error);
                    history('/signup');
                }else{
                    alert('Signup Successfully');
                    history('/login');
                    console.log({data});
                }
            }).catch(err=>{
                console.log(err);
            })
    }
    return (
        <div className="container " style={{marginTop:"100px"}}>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h1 className="text-center">Signup</h1>
                    <div className="form-group">
                        <label>firstName</label>
                        <input type={'text'} className="form-control" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                        <label>lastName</label>
                        <input type={'text'} className="form-control" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                        <label>mobile</label>
                        <input type={'text'} className="form-control" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
                        <label>Email</label>
                        <input type={'email'} className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <label>Password</label>
                        <input type={'password'} className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <label>Confirm Password</label>
                        <input type={'password'} className="form-control" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        <button className="btn btn-primary btn-block" onClick={()=>Postdata()}>
                            Signup
                        </button>
                        <p className="text-center">Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}