import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    justifyContent: 'center',
  },
  bold: {
    fontWeight: '650',
  },
}));

function Notification() {
  const { week } = useSelector((state) => state.statistics.bookings);
  const statisticsLoading = useSelector((state) => state.statistics.bookingStatisticsAreLoading);
  const quota = useSelector((state) => state.statistics.quota);
  const classes = useStyles();

  if (statisticsLoading) {
    return (
      <div className={classes.root}>
        <h3>Loading...</h3>
      </div>
    );
  }
  const quotaFulfilled = week.fulfilled / quota.meetingsPerWeek >= 0.99;
  const slotsRequired = quota.meetingsPerWeek - week.fulfilled;
  const notificationMessage = (quotaMet) => (!quotaMet ? (
    <p>
      You need to open
      <span className={classes.bold}>{slotsRequired}</span>
      {' '}
      slots to meet your weekly quota.
    </p>
  ) : <p>You have met your weekly quota!</p>);

  return (
    <div className={classes.root}>
      <Alert variant="outlined" severity={!quotaFulfilled ? 'warning' : 'success'}>
        {notificationMessage(quotaFulfilled)}
      </Alert>
    </div>
  );
}

export default Notification;
