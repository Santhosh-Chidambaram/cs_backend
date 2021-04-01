import React, { useEffect,useContext} from 'react'
import birthdayContext from '../../context//Birthday/BirthdayContext'
import BirthdaysForm from '../../components/birthdays/BirthdaysForm'
import '../../App.css';
import setAuthToken from '../../utils/setAuthToken';
import OrderList from '../birthdays/OrderList';
function Home() {
    const ProductContext = useContext(birthdayContext)
    const {user,getBirthday} = ProductContext;
   useEffect(()=>{
        console.log("dasdsa");
        getBirthday();
        
        
   },[user]);
    return (
        <div className='grid-2'>
           <div>
           <BirthdaysForm/>

           </div>
            <div style={{marginTop:'50px',marginRight:'50px',}}>
                <OrderList/>
           
            
            </div>
            
            
            
           
        </div>
    )
}

export default Home
