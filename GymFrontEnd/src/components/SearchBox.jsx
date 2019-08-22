import React,{useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField"

const useStyles=makeStyles(theme=>({
    container:{
        display:'flex',
        flex:'wrap'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
}));

function SearchBox(props) {
    const classes=useStyles();
    const [values,setValues]=useState('');
    const  handleChange=event=>{
        setValues(event.target.value);
        if(event.target.value.length>=2)
            props.searchMember(event.target.value);
    }
    return(
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
        id="outlined-search-input"
        label="Search"
        className={classes.textField}
        type="text"
        value={values}
        name="search"
        autoComplete="Search"
        margin="normal"
        variant="outlined"
        onChange={handleChange}
        fullWidth
      />
        </form>
    )
}

export default SearchBox;