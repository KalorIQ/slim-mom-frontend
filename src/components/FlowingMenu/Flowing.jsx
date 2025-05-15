import FlowingMenu from './FlowingMenu'
import food from '../../assets/image/healthyfood.jpg';
import fit from '../../assets/image/fit.jpg';
const demoItems = [
  { link: '#', text: 'Eat Healthy', image:food },
  { link: '#', text: 'Lighter Every Day', image: fit },
];



const Flowing = () => {
    return (
        <div style={{ height: '200px', position: 'relative' }}>
            <FlowingMenu items={demoItems} />
        </div>
    )
}
export default Flowing;