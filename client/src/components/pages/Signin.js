import React ,{useState, useContext,useEffect}from 'react';
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import alertContext from '../../context/alert/alertContext'
import authContext from '../../context/auth/authContext'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin(props) {
  
  const AlertContext = useContext(alertContext);
  const { setAlert } = AlertContext;
  const AuthContext = useContext(authContext);
  const { login, isAuthenticated, errors } = AuthContext;
  
  const classes = useStyles();
  const [user,setUser] = useState({
    
    email:'',
    password:'',
    


  });

  useEffect(() => {
    if (isAuthenticated) {
      setAlert('Your Account Has Been Successfully Logged In','success')
      props.history.push("/");
      
    }
    if(errors){
      setAlert(errors,'error')

    }
    //eslint-disable-next-line
  }, [isAuthenticated,errors, props.history]);

  
  const {email,password} = user;
  const onChange = e =>{
    setUser({
      ...user,
      [e.target.name] : e.target.value

    })
  }
  const onSubmit = e =>{
    e.preventDefault();
    if(email === '' || password === ''){
      setAlert("Please Fill Out All Fields",'error')
    }else{
      login({
        email,
        password
      })
    }
    
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
       
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onChange}
            value={email}
            autoFocus
          />
          <TextField
            
            variant="outlined"
            margin="normal"
            onChange={onChange}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='' variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              
            </Grid>
          </Grid>
        </form>
      </div>
 
    </Container>
  );
}