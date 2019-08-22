import React, { Fragment, useState } from "react";
import {
    DatePicker,
    MuiPickersUtilsProvider,
  } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

function CustomeDatePicker(props) {
    const [selectedDate, selectedDateChange] = useState(new Date());
    function handleDateChange(date){
        selectedDateChange(date);
        props.labelName=="Start Date" ? props.selectDate(date,"StartDate"):props.selectDate(date,"EndDate")
    }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker className={props.className}
        label={props.labelName}
        value={selectedDate}
        minDate={props.minDate}
        disableFuture={props.disableFuture!=undefined ? props.disableFuture:true}
        onChange={handleDateChange}
        inputVariant="outlined"
        animateYearScrolling
        format="dd/MM/yyyy"
      />
    </MuiPickersUtilsProvider>
  );
}

export default CustomeDatePicker;