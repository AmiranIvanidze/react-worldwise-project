import { useEffect } from "react"
import Map from "../components/Map"
import SideBar from "../components/SideBar"
import User from "../components/User"
import { useAuth } from "../contexts/FakeAuthContext"
import styles from './AppLayout.module.css'
import { useNavigate } from "react-router-dom"
const AppLayout = () => {
  const {user, isAuthenticated, login, logout} = useAuth();
 
  return (
    <div className={styles.app}> 
       <SideBar />
       <Map/>
       {isAuthenticated && (
        <User logout={logout} />
       )}
    </div>
  )
}

export default AppLayout