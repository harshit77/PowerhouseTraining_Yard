import React,{useState,useEffect} from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default function CustomRadioButton(props) {
    const[value,setValue]=useState(props.selected);
    function handleChange(event){
        console.log(event.target.value)
        setValue(event.target.value);
        props.radioSelected(event.target.value);
    }
    return (
        <React.Fragment>
     
        <FormControl style={{marginLeft:'10px'}}>
        {props.radioOption.name!=undefined ?<FormLabel component="legend">{props.radioOption.name}</FormLabel> :null }
            <RadioGroup
             aria-label="filter"
             name="filter"
             value={value}
             onChange={handleChange}
             row>
             {props.radioOption.options.map((radio,index)=>{
                 return  <FormControlLabel value={radio.name} control={<Radio />} key={index} label={radio.name} />
             })
            }
           </RadioGroup>
            </FormControl>
        </React.Fragment>
    )
}
