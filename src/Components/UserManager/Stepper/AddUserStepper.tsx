import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField } from '@material-ui/core';
import UserPreview from './UserPreview';
import { AddUserProps } from '../types/Props';
import { useFormik } from 'formik';
import { User } from '../types/User';
import { userRepository } from '../../Repositories';

// Some styling needed for the stepper
const useStyles = makeStyles((theme: Theme) =>
    createStyles({ 
        root: {
            width: '100%'
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);

// This component renders the stepper, as well as the stepper content
const AddUserStepper = ({display, onDelete}: AddUserProps) => {
    const classes = useStyles();
    const steps = ['Add Basic Info', 'Add advanced info', 'Confirm new user']; // Step title
    const [activeStep, setActiveStep] = React.useState(0); // Current step

    const formik = useFormik<User>({
        initialValues: {
            username: '',
            password: '',
            surname: '',
            lastname: '',
            email: '',
            phoneNumber: ''
        },
        onSubmit: values => {
            // unused
        },
    });

    // Step content is defined by a switch case, returning the corresponding content for each step
    function getStepContent (step: number) {
        switch(step) {
            case 0:
                return (
                    <div>
                        <Box width="60%" style={{display:"inline-block"}}>
                            <TextField required id="username" label="Username" value={formik.values.username} onChange={formik.handleChange}/>
                            <TextField required type="password" id="password" label="Password" value={formik.values.password} onChange={formik.handleChange}/>
                        </Box>
                        <Box width="40%" style={{display:"inline-block"}}>
                            <UserPreview userData={{username: formik.values.username, password: formik.values.password, email: formik.values.email, surname: formik.values.surname, lastname: formik.values.lastname, phoneNumber: formik.values.phoneNumber}}/>
                        </Box>
                    </div>
                );
                break;
            case 1:
                return (
                    <div>
                        <Box width="60%" style={{display:"inline-block", }}>
                            <TextField required id="surname" label="Surname" value={formik.values.surname} onChange={formik.handleChange}/>
                            <TextField required id="lastname" label="Lastname" value={formik.values.lastname} onChange={formik.handleChange}/>
                            <TextField required id="email" label="E-Mail" value={formik.values.email} onChange={formik.handleChange}/>
                            <TextField id="phoneNumber" label="Phone Number" value={formik.values.phoneNumber} onChange={formik.handleChange}/>
                        </Box>
                        <Box width="40%" style={{display:"inline-block"}}>
                            <UserPreview userData={{username: formik.values.username, password: formik.values.password, email: formik.values.email, surname: formik.values.surname, lastname: formik.values.lastname, phoneNumber: formik.values.phoneNumber}}/>
                        </Box>
                    </div>
                )
                break;
            case 2:
                return (
                    <Box width="100%" style={{display:"flex", alignItems: 'center', justifyContent:'center'}}>
                        <UserPreview userData={{username: formik.values.username, password: formik.values.password, email: formik.values.email, surname: formik.values.surname, lastname: formik.values.lastname, phoneNumber: formik.values.phoneNumber}}/>
                    </Box>
                )
                break;
        }
    }

    // Function for calculating the next step and finishing the form
    const handleNext = () => {

        if (activeStep < 2){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        else {
            onDelete();
            userRepository.add({
                email: formik.values.email,
                lastname: formik.values.lastname,
                surname: formik.values.surname,
                phoneNumber: formik.values.phoneNumber,
                password: formik.values.password,
                username: formik.values.username 
            });
        }
    }

    // Function for calculating the last step
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    return (
        <div>
            <div>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
            <div>
                <Typography component="span" className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            </div>
            <div>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
    )
}

export default AddUserStepper;