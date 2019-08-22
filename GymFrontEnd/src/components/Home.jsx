import React,{useState} from 'react'
import SearchBox from './SearchBox.jsx';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import AllMemberWithData from './AllMember.jsx';
import '../css/index.css';
import CustomRadioButton from './CustomRadioButton.jsx';
import CustomDatePicker from './CustomDatePicker.jsx';
import Button from '@material-ui/core/Button';
const filterOptions={
    name:'Filter',
    typeEnabled:'ALL',
    options:[{
        name:'ALL',
        enabled:true
    },{
        name:'Date',
        enabled:true
    }]
}
const container= {
    widthContainer : {
        width:'90%',
        margin: '0 auto',
        marginTop: '2%'
    },
    searchBox: {
        marginTop: '2%'
    }

}
export default function Home() {
    const [type,setType]=useState({
        name:'ALL',
        value:''
    });
    const [filterOption,setFilterOption]=useState(filterOptions);
    const [datePickerLabel,setdatePickerLabel]=useState(new Date());
    const [datePickerLabelEnd,setdatePickerLabelEnd]=useState(new Date());

    function searchMember(searchText) {
            setType({
                name:'Contain',
                value:searchText
            });
    }
    function searchMemberByDate() {
        console.log("HandleCLick",datePickerLabel+','+datePickerLabelEnd);
        setType({
            name:'Date',
            value:datePickerLabel+','+datePickerLabelEnd
        });
}
    function handleFilter(filtervalue) {
        console.log("cdsbvcjkbsd",filtervalue);
        const filteredOptions={
            name:'Filter',
            typeEnabled:filtervalue,
            options:filterOption.options.map(option=>{
                return option.name===filtervalue ? option.active=true : option.active=false
            })
        }

        setFilterOption(filteredOptions);
      
    }
    function handleselectDate(date,datePicker) {
        console.log(date,datePicker)
        datePicker==="StartDate" ? setdatePickerLabel(date) :setdatePickerLabelEnd(date);
    }
    return (
        <div>
            <Container fixed style={container.searchBox}>
                {filterOption.typeEnabled==='ALL' ? <SearchBox searchMember={searchMember}/>
                
                : <div className="dateSearchContainer">
                    <CustomDatePicker labelName="Start Date" className="halfWidth" selectDate={handleselectDate}/> 
                    <div className="dateBoxSepartor"> To </div>
                    <CustomDatePicker labelName="End Date" className="halfWidth" minDate={datePickerLabel} selectDate={handleselectDate}/> 
                    <Button variant="contained" color="primary" className="buttonSearch" onClick={searchMemberByDate}>
                        Search
                    </Button>
                     </div>
              
                }
                <CustomRadioButton radioSelected={handleFilter} radioOption={filterOptions} selected={filterOption.typeEnabled} />
            </Container>
            <div style={container.widthContainer}>
                <Divider/>
            </div>
            <div className="searchListContainer">
            <AllMemberWithData typeWithValue={type}/>
            </div>
        </div>
    )
}
