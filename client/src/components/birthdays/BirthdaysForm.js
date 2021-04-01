import React ,{useState,useContext,useEffect} from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import BirthdayContext from '../../context/Birthday/BirthdayContext';





const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(0, 0, 2)
  }
}));

export default function BirthdaysForm() {
  const birthdayContext = useContext(BirthdayContext);
  const { addBirthday,current,clearCurrent,updateBirthday} = birthdayContext;

  const classes = useStyles();
  const [birthdayForm,setBirthdayForm] = useState({
    employeename:'',
    employeeid:'',
    salary:''
  })
  useEffect(()=>{
    // if(current !== null){
    //   setBirthdayForm(current);
    // }
    
      setBirthdayForm({
        customername:'',
        productname:'',
        qty:'',
        deliveryto:'',
        phone:'',
        price:''


      })
    
   
  },[birthdayContext])

  const onChange = e => setBirthdayForm({
    ...birthdayForm,
    [e.target.name]:e.target.value,
    
  })
  
 const onSubmit = e => {
   e.preventDefault();
   if(current === null){
    addBirthday(birthdayForm);

   }
   else{
     addBirthday(birthdayForm);
     
     
   }
   clearAll();
   
   
 }
 const clearAll=()=>{
   clearCurrent()

   
 }
 
  const {customername,productname,phone,price,deliveryto,qty} = birthdayForm;

  return (
    <div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
         Order Details
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}  noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="customername"
            label="customername"
            name="customername"
            value={customername}
            onChange={onChange}
            autoFocus
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="productname"
            label="productname"
            name="productname"
            value={productname}
            onChange={onChange}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="qty"
            label="Quantity"
            name="qty"
            value={qty}
            onChange={onChange}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="deliveryto"
            label="Deliveryto"
            name="deliveryto"
            value={deliveryto}
            onChange={onChange}
            autoFocus
          />

          <TextField

            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="phone"
            name="phone"
            value={phone}
            onChange={onChange}
            autoFocus

          />
           
          
            <TextField

            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="price"
            name="price"
            value={price}
            onChange={onChange}
            autoFocus

          />
         
          
          <Button

            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}

          >
            Order
          </Button>
          
             

          
          
        </form>
      </div>
    </Container>



    </div>
  );
    
  
}
