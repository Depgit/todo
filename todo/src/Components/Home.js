import React , {useState, useEffect} from 'react'

export default function Home() {
    const [todo, settodo] = useState([])
    const [input, setInput] = useState('')

    useEffect(() => {
      fetch('/api/auth/todo', {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "applicaiton-type": "application/json"
        }
        }).then(res => res.json())
        .then(data=>{
            settodo(data)
        }).catch(err=>{
            console.log(err);
        })  
    }, [])

    const addList = (input) => {
        console.log(input);
        fetch('/api/auth/todo',{
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "applicaiton-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                username: JSON.parse(localStorage.getItem('user')).username,
                todo: input
            })
        }).then(res => res.json())
        .then(data=>{
            console.log("data",data);
            settodo([...todo, data.todo])
            setInput('');
        }).catch(err=>{
            console.log(err);
        })
    }
    console.log("todo",todo);
    return (
        <>
            <input className='form-control' type='text' placeholder='TODO' 
            value={input} onChange={(e)=>setInput(e.target.value)}
            />
            <button className='btn btn-primary btn-block'
            onClick={()=>{
                addList(input)
            }}
            >Add</button>
            <ul className='list-group'>
                {todo && todo.map((item, index) => {
                    return (
                        <li className='list-group-item' key={index}><b>@{item.username}  </b>{item. todo}</li>
                    )
                })}
            </ul>
        </>
    )
}
