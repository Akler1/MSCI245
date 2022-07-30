import React,{ useState, useEffect }  from 'react';
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


const Search = () => {
    const classes = styles;
    const [ DirectorInput, setDirectorInput] = React.useState('');
    const [ ActorInput, setActorInput] = React.useState('');
    const [ MovieInput, setMovieInput] = React.useState('');
    const [ Error, setError] = React.useState('');
    const [ Results, setResults] = React.useState('empty');
    
    const CallSearch = (data) => {
        callApiSearch(data)
          .then(res => {
            console.log("callApiSearch returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiSearch parsed: ", parsed);
        
          })
      }

      const callApiSearch = async (data) => {
  
        const url = serverURL + "/api/Search";
        console.log(url);
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({data})
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("getActors : ", body);
        return body;
      }
    return (
        <>
        <Typography>search by movie, actor and director</Typography>
            <div className="App">
            <div style={{ margin: '0 auto', marginTop: '10%' }}>
            <label>Search:</label>
            {/* <input type="text" onChange={(event) =>handleSearch(event)} /> */}
            </div>
            <div style={{padding:10}}>
            {Results.map((value,index)=>{
            return(
            <div key={value.id}>
            <div style={styles}>
            {value.title}
            </div>
            </div>
            )
            })}
            </div>
            </div>
        </>
    );

}



const  SearchPage = () => {
    return (
        <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
               <Button color="inherit" onClick={() => history.push('/Reviews')} > Leave a review </Button>
               <Button color="inherit" onClick={() => history.push('/MyPage')} > actor info</Button>
               <Button color="inherit" onClick={() => history.push('/')} > Landing </Button>
          </Toolbar>
        </AppBar>
            </Box>
                <Typography variant="h3" color="inherit" noWrap>
                search for a movie 
                </Typography>
                <Grid container spacing={3}>
          <Grid item xs={10}>
      <Typography variant="h5" gutterBottom>

      </Typography>
      </Grid>
      <Grid item xs={10}>
        <Search />
      </Grid>
      </Grid>
    
     </div>
    );
  }
export default SearchPage;
