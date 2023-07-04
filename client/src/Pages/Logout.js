import React, {useEffect} from 'react'

function Logout() {
  useEffect(() => {
    window.localStorage.removeItem('token');
    window.location.href = '/login-user';
  }, [])
  
  return (
    <div>
        Logout
    </div>
  )
}

export default Logout