import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Select, MenuItem, InputLabel, FormControl, makeStyles,
} from '@material-ui/core';
import { updateWorkingQuota } from '../../actions/statisticsActions';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '5em',
  },
}));

function QuotaMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const quota = useSelector((state) => state.statistics.quota);

  const handleChange = (event) => {
    dispatch(updateWorkingQuota(event.target.value));
  };

  return (
    <FormControl className={classes.root}>
      <InputLabel>I work</InputLabel>
      <Select
        value={quota.ratio}
        onChange={handleChange}
      >
        <MenuItem value={1}>100%</MenuItem>
        <MenuItem value={0.75}>75%</MenuItem>
        <MenuItem value={0.5}>50%</MenuItem>
        <MenuItem value={0.25}>25%</MenuItem>
      </Select>
    </FormControl>
  );
}

export default QuotaMenu;
