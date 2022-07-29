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


const  Landing = () => {
    return (
        <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
               <Button color="inherit" onClick={() => history.push('/Home')} > Leave a review </Button>
               <Button color="inherit" onClick={() => history.push('/Search')} > Search for a movie </Button>
               <Button color="inherit" onClick={() => history.push('/MyPage')} > Actor info </Button>
               </Toolbar>
        </AppBar>
            </Box>
                <Typography variant="h3" color="inherit" noWrap>
                A's movie review 
                </Typography>
            <Typography variant="h4" color="inherit" noWrap>
            Leave a Reveiw Search for movies and browse Actor roles 
            </Typography>
            </div>
    );
  }
export default Landing;