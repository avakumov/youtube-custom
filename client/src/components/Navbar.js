import React from "react"
import { useAuth } from "../context/auth-context"

function Navbar() {
  const user = useAuth()
  console.log("USER:", user)

  if (!user) return <div>Empty</div>

  return (
    <div>
      {user.username}
      <img src={user.avatar} alt="avatar" />
    </div>
  )
}

export default Navbar
