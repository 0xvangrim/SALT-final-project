import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BookingStatistics from './bookingStatistics';
import PatientStatistics from './patientStatistics';
import QuotaStatistics from './quotaStatistics';
import QuotaMenu from './dropDownMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'inline-flex',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

function StatisticsCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <PatientStatistics />
      <BookingStatistics />
      <QuotaStatistics />
      <QuotaMenu />
    </Card>
  );
}

export default StatisticsCard;
