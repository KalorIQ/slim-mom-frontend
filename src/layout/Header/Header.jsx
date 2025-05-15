import style from './Header.module.css';
import Logo from '../../components/Logo/Logo.jsx';
import UserNav from '../../components/UserNav/UserNav.jsx';
import AuthNav from '../../components/AuthNav/AuthNav.jsx';

const Header = () => {
    const isLoggedIn = true;

    return (
    <header className={style.header}>
        <div className={style.container}>
            <Logo /> |
        </div>
        <div className={style.container}>
            {isLoggedIn ? <UserNav /> : <AuthNav />}
        </div>
    </header>


    )
}

export default Header;