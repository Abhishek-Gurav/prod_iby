import React, {useEffect} from 'react'
import Lipstick from "../components/Lipstick"
function Lips() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = '/login-user';
    }
  }, [])
  return (
    <Lipstick />
  )
}

export default Lips