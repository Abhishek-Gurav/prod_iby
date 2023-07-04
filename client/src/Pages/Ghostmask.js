import React, {useEffect} from 'react'
import Facemask from "../components/Facemask"
function Facemesh() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = '/login-user';
    }
  }, [])
  return (
    <Facemask />
  ) 
}

export default Facemesh