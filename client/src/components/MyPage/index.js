import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import  MenuItem  from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from "@material-ui/core/Grid";



const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3018";


const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      overflow: "hidden",
    },
  },
 
  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
    
    fromControl: {
      margin: theme.spacing(1),
      minWidth: 140, 
    }
  },

});

const ActorSelection = (props) => {
  const classes = styles;
  const [Actors, setActors] = React.useState('');
  const [ActorsList,setActorsList] = React.useState([]);

  const CallGetActors = () => {
    callApiGetActors()
      .then(res => {
        console.log("callApiGetActors returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetActors parsed: ", parsed);
        setActorsList(parsed);
      })
  }
  
  const callApiGetActors = async () => {
  
    const url = serverURL + "/api/getActors";
    console.log(url);
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("getActors : ", body);
    return body;
  }
  const handleChange = (event) => {
    setActors(event.target.value);
    // props.enteredActorID(event.target.value);
  };
  React.useEffect(() => {
      CallGetActors();
      console.log(ActorsList);
  }, []);
  return(
    <>
    <FormControl className={classes.formControl}>
     <InputLabel id= "ActorSelectionLabel"> Actor</InputLabel>
        <Select
          labelId= "ActorSelectionLabel"
          id = "actorSelectionForm"
          value={Actors}
          onChange={handleChange}
        
        >
          {ActorsList.map((actors) =>
           {
            return(
              <MenuItem value={actors}>{actors.first_name} {actors.last_name}</MenuItem>
            )
          })}
        </Select> 
    </FormControl>
    <Typography>
    <MenuItem value={Actors}>{Actors.name} {Actors.role}</MenuItem>
     </Typography>
    </>
  );
}

const  MyPage = () => {
    return (
        <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
               <Button color="inherit" onClick={() => history.push('/Home')} > Leave a review </Button>
               <Button color="inherit" onClick={() => history.push('/Search')} > Search for a movie </Button>
               <Button color="inherit" onClick={() => history.push('/')} > Landing </Button>
               </Toolbar>
        </AppBar>
            </Box>
                <Typography variant="h4" color="inherit" noWrap>
                Find a actor's movies and role 
                </Typography>
                <Grid container spacing={3}>
          <Grid item xs={10}>
      <Typography variant="h5" gutterBottom>
      </Typography>
      </Grid>
      <Grid item xs={10}>
       <ActorSelection/>
        </Grid>
      </Grid>
    
     </div>
    );
  }
export default MyPage;
