import style from './UserNav.module.css';
import { useNavigate, NavLink} from 'react-router';


function UserNav() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/')
    };
    const user = 'user';

    return (
        <div className={style.userNav}>
            <div className={style.nav}>
                <NavLink to='/diary' className={style.diary}> Diary </NavLink>
                <NavLink to='calculator' className={style.calc}> Calculator </NavLink>
            </div>
            <div className={style.user}>
                <div className={style.userInfo}>
                    <p className={style.userName}>{user}</p>
                    <button onClick={handleLogout} className={style.logout}>Logout</button>
                </div>
            </div>
        </div>
    )
};

export default UserNav;