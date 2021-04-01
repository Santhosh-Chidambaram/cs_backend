import React ,{useState,useEffect,useContext} from "react";
import MaterialTable from 'material-table';
import birthdayContext from '../../context/Birthday/BirthdayContext'
const OrderList = () => {
  const ProductContext = useContext(birthdayContext)
  const { birthdays,updateBirthday,deleteBirthday,current,setCurrent} = ProductContext;
  useEffect(()=>{
    
  if(birthdays != null){
    
     var res = birthdays.map(pd =>({
      _id:pd._id,
      customername:pd.customername,
      productname:pd.productname,
      qty:pd.qty,
      deliveryto:pd.deliiveryto,
      phone:pd.phone,
      price:pd.price

     }));
     
     
    if(current){
      if(res.some(p => p._id === current["_id"] )){
        setState(prevState => (
          {...prevState,
          data:[...prevState.data,current
          ]
        }))
          
          
      }
    }
    
    else{
      setState(prevState => (
        {...prevState,
        data:[...prevState.data,...res
        ]
      }))
    }
     
     
     
    
  
  }
  

    
  },[birthdays]);
    
  
  const [state, setState] = useState({
    columns: [
      { title: 'Customername', field: 'customername' },
      { title: 'Productname', field: 'productname' },
      { title: 'Quantity', field: 'qty' },
      { title: 'Phone', field: 'phone' },
      { title: 'Deliveryto', field: 'deliveryto' },
      
      { title: 'price', field: 'price', type: 'numeric' },
     
    ],
    
    data: [],
  });
  
  return (
    <MaterialTable
      title="Salary List"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve(); 
              
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
              updateBirthday(newData,oldData._id);
              console.log(newData);
              
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
              deleteBirthday(oldData._id);
            }, 600);
          }),
      }}
    />
  );
}
export default OrderList;