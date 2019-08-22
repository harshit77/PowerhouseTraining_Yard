import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));



export default function PackageDetails(props) {
  const classes = useStyles();

  return (
      <React.Fragment>
          <Divider/>
           <div style={{marginTop:20}}>Package History</div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Package Name</TableCell>
            <TableCell >Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Package Fees</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.package.map((row,index) => (
            <TableRow key={index} selected={index==props.package.length-1}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.startDate}</TableCell>
              <TableCell>{row.endDate}</TableCell>
              <TableCell>{row.fees}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </React.Fragment>
  );
}