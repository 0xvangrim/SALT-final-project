import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { patientStatistics } from '../../actions/apiActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& p': {
      marginTop: theme.spacing(1),
    },
  },
  bold: {
    fontWeight: '650',
  },
}));

function PatientStatistics() {
  const statisticsLoading = useSelector((state) => state.statistics.patientStatisticsAreLoading);
  const { averageMeetingLength, visits } = useSelector((state) => state.statistics.patients);
  const userLoggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (userLoggedIn) { dispatch(patientStatistics()); }
  }, [userLoggedIn]);

  if (statisticsLoading) {
    return (
      <div className={classes.root}>
        <h3>Loading...</h3>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <h3>Patient Statistics (monthly)</h3>
      <p>
        <span className={classes.bold}>Avg. Meeting Length: </span>
        {averageMeetingLength || 0}
        {' '}
        minutes
      </p>
      <p>
        <span className={classes.bold}>New Patients: </span>
        {visits.newVisits}
      </p>
      <p>
        <span className={classes.bold}>Returning Patients: </span>
        {visits.revisits}
      </p>
    </div>
  );
}

export default PatientStatistics;
