import React, {useEffect} from 'react'
import Hands from "../components/Hands"
function Hand() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = '/login-user';
    }
  }, [])
  return (
    <Hands />
  )
}

export default Hand