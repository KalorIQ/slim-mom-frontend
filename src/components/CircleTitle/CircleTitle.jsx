import CircularText from './CircularText.jsx';
import style from './CircleTitle.module.css'

const CircleTitle = () => {
    return (
        <div className={style.container}>
            <CircularText
            text="KALORIQ TEAM NODE JS "
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
            />
        </div>
    )
}
export default CircleTitle;