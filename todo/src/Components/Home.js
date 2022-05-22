import React from 'react'

export default function Home() {
    const name = JSON.parse(localStorage.getItem("user"))?.username;
  return (
    <div><h1>Hello {name}</h1></div>
  )
}
