import React, {useEffect} from 'react'
import Holistic from "../components/Holistic"
function Holistics() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = '/login-user';
    }
  }, [])
  return (
    <Holistic />
  )
}

export default Holistics