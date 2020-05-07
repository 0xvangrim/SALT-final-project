import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Select, MenuItem, InputLabel, FormControl, makeStyles,
} from '@material-ui/core';
import { misconductScore } from '../../actions/apiActions';
import { updateMonth } from '../../actions/misconductActions';
import DateHelper from '../DateHelper';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '7em',
  },
}));

function MonthMenu() {
  const classes = useStyles();
  const [month, setMonth] = useState(DateHelper.thisMonth());
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    dispatch(updateMonth(selectedMonth));
    const from = DateHelper.startOfMonth(selectedMonth);
    const to = DateHelper.endOfMonth(selectedMonth);
    dispatch(misconductScore(from, to));
  };

  return (
    <FormControl className={classes.root}>
      <InputLabel>Filter by month</InputLabel>
      <Select
        value={month}
        onChange={handleChange}
      >
        <MenuItem value={1}>January</MenuItem>
        <MenuItem value={2}>February</MenuItem>
        <MenuItem value={3}>March</MenuItem>
        <MenuItem value={4}>April</MenuItem>
        <MenuItem value={5}>May</MenuItem>
        <MenuItem value={6}>June</MenuItem>
        <MenuItem value={7}>July</MenuItem>
        <MenuItem value={8}>August</MenuItem>
        <MenuItem value={9}>September</MenuItem>
        <MenuItem value={10}>October</MenuItem>
        <MenuItem value={12}>November</MenuItem>
        <MenuItem value={12}>December</MenuItem>
      </Select>
    </FormControl>
  );
}

export default MonthMenu;
