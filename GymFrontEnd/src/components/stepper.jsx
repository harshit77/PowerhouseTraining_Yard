import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MemberWithData from './Member.jsx';
import PackageWithData from './Package.jsx';
import UpdateMemberWithData from './UpdateMember.jsx';
const container= {
    widthContainer : {
        width:'100%',
        margin: '0 auto',
        marginTop: '2%'
    },
    searchBox: {
        marginTop: '2%'
    }
}
const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Create Member', 'AddPackage'];
}

export default function HorizontalLinearStepper(props) {
  console.log("sdvchjdsvhjds",props)
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(Object.keys(props).length === 0 ? 0 :1);
  const [dataForPackage,setDataForPacakge]=React.useState(null)
  const steps = getSteps();
//   function isStepOptional(step) {
//     return step === 1;
//   }

//   function isStepSkipped(step) {
//     return skipped.has(step);
//   }

  function handleNext(id,firstName,lastName) {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }
   const data={
        id:id,
        firstName:firstName,
        lastName:lastName
    }
    
    console.log(data);
    if(id!='') { 
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setDataForPacakge(data)
     } 
    // setSkipped(newSkipped);
  }

//   function handleBack() {
//     setActiveStep(prevActiveStep => prevActiveStep - 1);
//   }

//   function handleSkip() {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     setActiveStep(prevActiveStep => prevActiveStep + 1);
//     setSkipped(prevSkipped => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   }

//   function handleReset() {
//     setActiveStep(0);
//   }

  return (
    <Container fixed style={container.searchBox}>
                 <Paper className="paperHeader">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
        //   if (isStepOptional(index)) {
        //     labelProps.optional = <Typography variant="caption">Optional</Typography>;
        //   }
        //   if (isStepSkipped(index)) {
        //     stepProps.completed = false;
        //   }
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            {activeStep==0 ? <MemberWithData next={handleNext}/>:(Object.keys(props).length === 0 ? <PackageWithData dataForPackage={dataForPackage} option="Create New Package"/>:<UpdateMemberWithData id={props.match.params.memberId}/>) }
            {/* <div>
            
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div> */}
          </div>
        )}
      </div>
 </Paper>
 </Container>
  );
}