import { NavLink } from 'react-router';
import style from './Logo.module.css';
import logo from '../../assets/svg/logo/slimMomLogo.svg';
import logoMobile from '../../assets/svg/logo/slimMomLogoMobile.svg';
import logoText from '../../assets/svg/logo/slimMomLogoText.svg';

const Logo = () => {
    return (
        <div className={style.container}>
            <NavLink to='/' className={style.logo}>
                <img src={logo} alt="Slim Mom Logo" className={style.logoImg} />
                {/* <img src={logoText} alt="Slim Mom Logo Text" className={style.logoText} /> */}
            </NavLink>
        </div>
    )
}

export default Logo;