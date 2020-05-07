import React, { useEffect } from 'react';
import { LinearProgress } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { bookingStatistics } from '../../actions/apiActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& p': {
      marginTop: '0.3rem',
    },
  },
  bold: {
    fontWeight: '650',
  },
  progress: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function BookingStatistics() {
  const statisticsLoading = useSelector((state) => state.statistics.bookingStatisticsAreLoading);
  const { month, week, day } = useSelector((state) => state.statistics.bookings);
  const userLoggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (userLoggedIn) { dispatch(bookingStatistics()); }
  }, [userLoggedIn]);

  if (statisticsLoading) {
    return (
      <div className={classes.root}>
        <h3>Loading...</h3>
      </div>
    );
  }

  const percentage = (period) => (period.capacity !== 0 ? Math.round(period.booked * 100 / period.capacity) : 0);

  return (
    <div className={classes.root}>
      <h3>Booking Statistics</h3>
      <p>
        <span className={classes.bold}>Today: </span>
        {' '}
        {day.booked}
        /
        {day.capacity}
        {' '}
        (
        {percentage(day)}
        %)
      </p>
      <LinearProgress className={classes.progress} variant="determinate" value={percentage(day)} />
      <p>
        <span className={classes.bold}>Week:  </span>
        {' '}
        {week.booked}
        /
        {week.capacity}
        {' '}
        (
        {percentage(week)}
        %)
      </p>
      <LinearProgress className={classes.progress} variant="determinate" value={percentage(week)} />
      <p>
        <span className={classes.bold}>Month: </span>
        {month.booked}
        /
        {month.capacity}
        {' '}
        (
        {percentage(month)}
        %)
      </p>
      <LinearProgress className={classes.progress} variant="determinate" value={percentage(month)} />
    </div>
  );
}

export default BookingStatistics;
