import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar } from '@material-ui/core';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import StatisticsCard from './components/psychologist/statisticsCard';
import Notification from './components/psychologist/notification';
import AdminCard from './components/admin/adminCard';
import { userlogin } from './actions/apiActions.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  mindlerIcon: {
    height: '100px',
    width: '100px',
  },
  cardContainer: {
    display: 'inline-block',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0E6C53',
    },
    secondary: {
      main: '#E3F0ED',
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(userlogin(3, 'psychologist'));
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color="primary" className={classes.header}>
          <img className={classes.mindlerIcon} alt="Mindle logo" src="https://cdn.discordapp.com/attachments/688767464569307184/694859544630788126/D3579733-6003-4B91-95E6-5B7512A6F4E3-1080x675.png" />
        </AppBar>
        <div className={classes.cardContainer}>
          <Notification />
          <StatisticsCard />
          <AdminCard />
        </div>

      </div>
    </MuiThemeProvider>
  );
}

export default App;
