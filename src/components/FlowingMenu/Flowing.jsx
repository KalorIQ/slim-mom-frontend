import { useTranslation } from 'react-i18next';
import style from "./Flowing.module.css";
import FlowingMenu from './FlowingMenu';
import food from '../../assets/image/healthyfood.jpg';
import fit from '../../assets/image/fit.jpg';

const Flowing = () => {
    const { t } = useTranslation();

    const demoItems = [
      { link: '#', text: t('flowingMenu.eatHealthy'), image: food },
      { link: '#', text: t('flowingMenu.lighterEveryDay'), image: fit },
    ];

    return (
        <div className={style.flowingMenuContainer}>
            <FlowingMenu items={demoItems} />
        </div>
    );
};

export default Flowing;