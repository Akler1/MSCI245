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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

//Dev mode
const serverURL = ""; //enable for dev mode

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
  },

});


const MovieSelection = (props) => { // state.age, handleChange

  const handleChange = (event) => {
    props.setMovie(event.target.value);
  };

  return(
    <>
     <InputLabel htmlFor="Movie-native-simple">Movie</InputLabel>
        <Select
          native
          onChange={handleChange}
          error
        >
          <option aria-label="None" value="" />
          <option value={"The Batman"}>The Batman</option>
          <option value={"The Dark knight rises"}>The Dark knight rises</option>
          <option value={"Batman VS Superman"}>Batman VS Superman</option>
          <option value={"Batman begins"}>Batman begins </option>
          <option value={"The Dark Knight"}>The Dark Knight</option>
        </Select> 
    </>
  );
}

const ReviewTitle = (props) => {

  const handleChange = (event) => {
    props.setReviewTitle(event.target.value);
  };
  return(
    
     <form className={""} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Review Title" onChange ={handleChange}/>
    </form>
    
  );
}

const ReviewBody = (props)  =>{

  const handleChange = (event) => {
    props.setReviewBody(event.target.value);
  }
  return(
    <>
   <TextField
          id="outlined-multiline-static"
          label="Body"
          multiline
          rows={4}
          defaultValue=""
          variant="outlined"
          onChange = {handleChange}
        />
    </>
  );
}

const ReviewRating = (props) => {

  const handleChange = (event) => {
    props.setReviewRating(event.target.value);
  }
  
  return(
    <>
    <FormControl component="fieldset">
      <FormLabel component="legend">ratings</FormLabel>
      <RadioGroup aria-label="ratings" onChange={handleChange}>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
    </FormControl>
    </>
  );
}

function Review() {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredReview, setEnteredReview] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [isEmptyField, setIsEmptyField] = useState(false);

  const handleClick = () => {
    if (selectedMovie === "") {
      alert("movie");
    }
    if ( enteredTitle === ""){
      alert ("title")
    }
    if ( enteredReview === ""){
      alert ("review")
    }
    if ( selectedRating === ""){
      alert ("rating")
    }
  }

  return(
    <div>
    <Grid container spacing={3}>
      <Grid item xs={10}>
      <Typography variant="h3" gutterBottom>
        Submit a Movie Review
      </Typography>
      </Grid>
      <Grid item xs={10} sm={4}>
        <MovieSelection setMovie = {setSelectedMovie} error={isEmptyField}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <ReviewRating setReviewTitle = {setEnteredTitle}/>
      </Grid>
      <Grid item xs={6} sm={3}>
       <ReviewTitle setReviewBody={setEnteredReview}/>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ReviewBody setReviewRating={setSelectedRating}/>
      </Grid>
      <Grid item xs={6} sm={3}>
      </Grid>
      <Grid item xs={6} sm={3}>
    
      </Grid>
    </Grid>

      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
      
      
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

