import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Protection = (props) => {
    const navigate = useNavigate();
    let Cmp = props.Cmp;
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    },[])
  return (
    <div>
        <Cmp/>
    </div>
  )
}

export default Protection