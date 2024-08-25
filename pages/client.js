import Client from '../components/client';
import SideBar from '../components/sideBar';
import styles from '../styles/Home.module.css';


export default function MainClient(){
  return (
    <div class="container mx-auto">
        <div class="grid grid-cols-4 gap-4">
            <div><SideBar/></div>
            <div><Client/></div>
        </div>
      </div>   
  )
}
