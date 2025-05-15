import strawberry from '../../assets/svg/background/strawberry.svg';
import  banana from '../../assets/svg/background/banana.svg';
import leaf from '../../assets/svg/background/leaf.svg';
import shadow from '../../assets/svg/background/shadow.svg';
import leafAuth from '../../assets/svg/background/leaf.svg';
import style from './Background.module.css';

const Background = () => {

    return (
        <div className={style.content}>
            <div className={style.container}>
                <img src={strawberry} alt='strawberry' className={style.strawberry} width={286} height={279} />
                <img src={banana} alt='banana' className={style.banana} width={773} height={552} />
                <img src={leaf} alt='leaf' className={style.leaf} width={746} height={846} />
                <img src={shadow} alt='shadow' className={style.shadow} width={603} height={816} />
            </div>
        </div>
    )
}

export default Background;