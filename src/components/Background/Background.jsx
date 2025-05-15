import strawberry from '../../assets/svg/background/strawberry.svg';
import banana from '../../assets/svg/background/banana.svg';
import leaf from '../../assets/svg/background/leaf.svg';
import shadow from '../../assets/svg/background/backshadow.svg';
import { useLocation } from 'react-router';
import style from './Background.module.css';

const Background = () => {
    const location = useLocation();
    const isLoggedIn = location.pathname === '/diary' || location.pathname === '/calculator';
    const isGuest = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

    return (
        <div>
            {isGuest && (
                <div>
                    <img src={strawberry} alt="strawberry" width='286' height='279' className={style.strawberry} />
                    <img src={shadow} alt="backshadow" width="603" height="816" className={style.backshadow} />
                    <img src={banana} alt="banana" width="773" height="552" className={style.banana} />
                    <img src={leaf} alt="leaf" width="980" height="820" className={style.leaf} />
                </div>
            )}
            {isLoggedIn &&(
                <div>
                    <img src={leaf} alt="leafdown" width="980" height="820" className={style.leaf} />
                </div>
            )}
        </div>
    );
};

export default Background;