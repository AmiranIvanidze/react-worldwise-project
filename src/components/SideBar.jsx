import Logo from './Logo'
import AppNav from './AppNav'
import styles from './Sidebar.module.css'

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
        <Logo />
        <AppNav/>

        <p>List of cities</p>
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyrights {new Date().getFullYear()} by WorldWise Inc.
            </p>
        </footer>
    </div>
  )
}

export default SideBar