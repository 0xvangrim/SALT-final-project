import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, TableSortLabel, TablePagination, makeStyles,
} from '@material-ui/core';
import DropDownMenu from './dropDownMenu';
import FlaggedPsychologistInfo from './infoDialog';
import { misconductScore } from '../../actions/apiActions';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    borderCollapse: 'separate',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(2),
  },
  subHeader: {
    fontSize: '1rem',
    border: 'none',
    backgroundColor: 'transparent',
    outline: '0',
  },
  nameHeader: {
    width: 450,
  },
  scoreHeader: {
    width: 100,
  },
  psychologist: {
    display: 'flex',
    alignItems: 'center',
  },
  psychologistName: {
    marginLeft: '1em',
    fontWeight: '500',
  },
  score: {
    paddingRight: '2em',
  },

}));

const comparators = {
  nameAcs: (a, b) => (a.lastName < b.lastName ? -1 : 1),
  nameDesc: (a, b) => (a.lastName > b.lastName ? -1 : 1),
  scoreAsc: (a, b) => (a.score > b.score ? -1 : 1),
  scoreDesc: (a, b) => (a.score < b.score ? -1 : 1),
};

export default function FlaggedPsychologistTable() {
  const scoresLoading = useSelector((state) => state.misconductScores.areLoading);
  const data = useSelector((state) => state.misconductScores.data);
  const userLoggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  const [sort, setSort] = useState({ active: 'score', comparator: comparators.scoreAsc, direction: 'ascending' });
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const classes = useStyles();

  useEffect(() => {
    if (userLoggedIn) { dispatch(misconductScore()); }
  }, [userLoggedIn]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (scoresLoading) {
    return (
      <div>
        <h3>Loading scores...</h3>
      </div>
    );
  }

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h6" id="tableTitle" component="div" color="primary">
          Flagged Psychologists
        </Typography>
        <DropDownMenu />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.nameHeader}>
                <TableSortLabel
                  active={sort.active === 'lastName'}
                  direction={sort.direction === 'ascending' ? 'asc' : 'desc'}
                  onClick={() => {
                    sort.direction === 'ascending' && sort.active === 'lastName'
                      ? setSort({ active: 'lastName', comparator: comparators.nameDesc, direction: 'descending' })
                      : setSort({ active: 'lastName', comparator: comparators.nameAcs, direction: 'ascending' });
                  }}
                >
                  {' '}
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.scoreHeader} align="right" className={classes.score}>
                <TableSortLabel
                  active={sort.active === 'score'}
                  direction={sort.direction === 'ascending' ? 'asc' : 'desc'}
                  onClick={() => {
                    sort.direction === 'ascending' && sort.active === 'score'
                      ? setSort({ active: 'score', comparator: comparators.scoreDesc, direction: 'descending' })
                      : setSort({ active: 'score', comparator: comparators.scoreAsc, direction: 'ascending' });
                  }}
                >
                  {' '}
                  Score
                </TableSortLabel>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .sort(sort.comparator)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.name}>
                  <TableCell className={classes.psychologist} align="left">
                    <Avatar src={row.thumbnail} />
                    <span className={classes.psychologistName}>
                      {row.firstName}
                      {' '}
                      {row.lastName}
                    </span>
                  </TableCell>
                  <TableCell className={classes.score} align="right">{row.score}</TableCell>
                  <TableCell align="right"><FlaggedPsychologistInfo id={row.psychologistId} /></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
