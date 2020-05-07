import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core/';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '10em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& p': {
      marginTop: theme.spacing(0.5),
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

function QuotaStatistics() {
  const statisticsLoading = useSelector((state) => state.statistics.bookingStatisticsAreLoading);
  const { month, week } = useSelector((state) => state.statistics.bookings);
  const quota = useSelector((state) => state.statistics.quota);
  const classes = useStyles();

  if (statisticsLoading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  const quotaFulfillment = (period, meetings) => (period.fulfilled < meetings ? Math.round(period.fulfilled * 100 / meetings) : 100);
  return (
    <div className={classes.root}>
      <h3>Quota Statistics</h3>
      <p>
        <span className={classes.bold}>Week: </span>
        {week.fulfilled}
        /
        {quota.meetingsPerWeek}
        {' '}
        (
        {quotaFulfillment(week, quota.meetingsPerWeek)}
        %)
      </p>
      <LinearProgress className={classes.progress} color="primary" variant="determinate" value={quotaFulfillment(week, quota.meetingsPerWeek)} />
      <p>
        <span className={classes.bold}>Month: </span>
        {month.fulfilled}
        /
        {quota.meetingsPerMonth}
        {' '}
        (
        {quotaFulfillment(month, quota.meetingsPerMonth)}
        %)
      </p>
      <LinearProgress className={classes.progress} color="primary" variant="determinate" value={quotaFulfillment(month, quota.meetingsPerMonth)} />
    </div>
  );
}

export default QuotaStatistics;
