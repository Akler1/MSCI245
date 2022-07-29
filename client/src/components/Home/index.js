import React, { Component, useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import  MenuItem  from '@material-ui/core/MenuItem';
import { Router, Switch, Route } from "react-router-dom";
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

//Dev mode
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3018"; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#000000"
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
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
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
    
    fromControl: {
      margin: theme.spacing(1),
      minWidth: 140, 
    }
  },

});


const MovieSelection = (props) => {
  const classes = styles;
  const [movie, setMovie] = React.useState('');
  const [moviesList,setMoviesList] = React.useState([]);

  const CallGetMovies = () => {
    callApiGetMovies()
      .then(res => {
        console.log("callApiGetMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetMovies parsed: ", parsed);
        setMoviesList(parsed);
      })
  }
  
  const callApiGetMovies = async () => {
  
    const url = serverURL + "/api/getMovies";
    console.log(url);
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("getMovies : ", body);
    return body;
  }
  const handleChange = (event) => {
    props.setMovieSelection(event.target.value.name);
    setMovie(event.target.value);
    props.enteredMovieID(event.target.value.id);
  };
  React.useEffect(() => {
      CallGetMovies();
      console.log(moviesList);
  }, []);

  return(
    <>
    <FormControl className={classes.formControl}>
     <InputLabel id= "MovieSelectionLabel"> Pick A Movie</InputLabel>
        <Select
          labelId= "MovieSelectionLabel"
          id = "MovieSelectionForm"
          value={movie}
          onChange={handleChange}
        
        >
          {moviesList.map((movies) =>
           {
            return(
              <MenuItem value={movies}>{movies.name}</MenuItem>
            )

          })}
        </Select> 
    </FormControl>
    </>
  );
}

const ReviewTitle = (props) => {

  const handleChange = (event) => {
    props.setReviewTitle(event.target.value);
  };
  return(
    
     <form >
      <TextField id="standard-basic" label="Review Title" onChange ={handleChange}  />
    </form>
    
  );
}

const ReviewBody = (props)  =>{

  const handleChange = (event) => {
    props.setReviewBody(event.target.value);
  }
  return(
    <>
    <form>
   <TextField
          id="InputedReviewBodyText"
          label="Body"
          multiline
          rows={4}
          defaultValue=""
          variant="outlined"
          onChange = {handleChange}
          
        />
        </form>
    </>
  );
}

const ReviewRating = (props) => {
 const [selectedRating, setRating] = React.useState("0");
  
 const handleChange = (event) => {
   setRating(event.target.value);
    props.setReviewRating(event.target.value);
  }
  
  return(
    <>
      <p> Rate from 1-5</p>
      <Radio
      checked={selectedRating === "1"}
      onChange = {handleChange}
      value = "1"
      name = "radio-butto-Rating"
      inputProps = {{ 'aria-label' : '1'}}
      />
       <Radio
      checked={selectedRating === "2"}
      onChange = {handleChange}
      value = "2"
      name = "radio-butto-Rating"
      inputProps = {{ 'aria-label' : '2'}}
      />
       <Radio
      checked={selectedRating === "3"}
      onChange = {handleChange}
      value = "3"
      name = "radio-butto-Rating"
      inputProps = {{ 'aria-label' : '3'}}
      />
       <Radio
      checked={selectedRating === "4"}
      onChange = {handleChange}
      value = "4"
      name = "radio-butto-Rating"
      inputProps = {{ 'aria-label' : '4'}}
      />
       <Radio
      checked={selectedRating === "5"}
      onChange = {handleChange}
      value = "5"
      name = "radio-butto-Rating"
      inputProps = {{ 'aria-label' : '5'}}
      />
    </>
  );
}

function Review() {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredReview, setEnteredReview] = useState("");
  const [selectedRating, setSelectedRating] = useState("0");
  const [error, setError] = useState("");
  const [Display, setDisplay] = useState("none");
  const [enteredMovieID, setEnteredMovieID] = useState(0);

   const InputReview = (review) => {
    AddReviewAPI(review)
    .then(res => {
      console.log("AddReviewAPI returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("AddReviewAPI parsed: ", parsed);
    })
  }
  const AddReviewAPI = async (review) => {
    const url = serverURL + "/api/addReview";
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        MovieID: review.MovieID,
        ReviewTitle: review.ReviewTitle,
        ReviewScore: review.ReviewScore,
        ReviewBody: review.ReviewBody,
        UserID: review.UserID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Found recipes: ", body);
    return body;
  }
  const handleClick = () => {
    
    if (selectedMovie === "" || enteredTitle === "" || enteredReview === "" || selectedRating === "0"){
      if (selectedMovie === "") {
        setError("please fill all feilds ");
        setDisplay("none")
      } else {
        if (error != ""){
          setError("");
        }
        setDisplay("inline-block")
      }
      if ( enteredTitle === ""){
        setError("please fill all feilds ");
        setDisplay("none")
      } else {
        if (error != ""){
          setError("");
        }
        setDisplay("inline-block")
      }
      if ( enteredReview === ""){
        setError("please fill all feilds ");
        setDisplay("none")
      } else {
        if (error != ""){
          setError("");
        }
        setDisplay("inline-block")
      }
      if ( selectedRating === "0"){
        setError("please fill all feilds ");
        setDisplay("none")
      } else {
        if (error != ""){
          setError("");
        }
        setDisplay("inline-block")
      }
    }
    else {
      let review = {
        MovieID:  enteredMovieID,
        ReviewTitle: enteredTitle,
        ReviewScore: selectedRating,
        ReviewBody: enteredReview,
        UserID: 1
      };
      console.log(review);
      InputReview(review);
      setError("")
      setDisplay("inline-block")
    }
  }

  return(
    <div>
       <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
               <Button color="inherit" onClick={() => history.push('/')} > Landing </Button>
               <Button color="inherit" onClick={() => history.push('/Search')} > Search for a movie </Button>
               <Button color="inherit" onClick={() => history.push('/MyPage')} > Actor info </Button>
               </Toolbar>
        </AppBar>
            </Box>
    <Grid container spacing={3}>
      <Grid item xs={10}>
      <Typography variant="h3" gutterBottom>
        Submit a Movie Review
      </Typography>
      </Grid>
      <Grid item xs={10} sm={4}>
        <MovieSelection enteredMovieID = {setEnteredMovieID} setMovieSelection = {setSelectedMovie} />
      </Grid>
      <Grid item xs={12} sm={6}>
      <ReviewTitle setReviewTitle={setEnteredTitle} />
      </Grid>
      <Grid item xs={6} sm={3}>
      <ReviewRating setReviewRating = {setSelectedRating} />
      </Grid>
      <Grid item xs={6} sm={3}>
        <ReviewBody setReviewBody={setEnteredReview} />
      </Grid>
      <Grid item xs={6} sm={3}>
      <Button variant= "contained" onClick={handleClick}>Submit</Button>
      </Grid>
      <Grid item xs={6} sm={3}>
      <div style={{"display": Display}}>
        <h3> inputed review:</h3>
       <p>{selectedMovie}</p>
        <p>{enteredTitle}</p>
        <p>{enteredReview}</p>
       <p>{selectedRating}</p>
      </div>
      </Grid>
    </Grid>
  </div>
);

}


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  render() {
    const { classes } = this.props;



    const mainMessage = (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >
        <Grid item>

          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>
              
              </React.Fragment>
            ) : (
              <React.Fragment>
                Welcome back!
              </React.Fragment>
            )}
          </Typography>

        </Grid>
        <Grid item>
          <Review />
        </Grid>
      </Grid>
    )


    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Paper
            className={classes.paper}
          >
            {mainMessage}
          </Paper>

        </div>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

