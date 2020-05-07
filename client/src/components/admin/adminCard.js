import React from 'react';
import { Card, makeStyles } from '@material-ui/core';
import FlaggedPsychologistTable from './table';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
  },
}));

function AdminCard() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <FlaggedPsychologistTable />
    </Card>
  );
}

export default AdminCard;
