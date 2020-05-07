import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { misconductInfo } from '../../actions/apiActions';
import { misconductInfoLoading } from '../../actions/misconductActions';
import DateHelper from '../DateHelper';

const useStyles = makeStyles((theme) => ({
  button: {
    outline: 'none',
    border: 'none',
    borderRadius: '100%',
  },
  infoIcon: {
    fontSize: '1.5em',
  },
  infoContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
  },
  infoText: {
    fontWeight: '700',
    color: '#0E6C53',
  },
  infoHeader: {
    textDecoration: 'underline',
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function FlaggedPsychologistInfo(psychologist) {
  const info = useSelector((state) => state.misconductScores.info);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClickOpen = () => {
    const from = DateHelper.startOfMonth(info.month);
    const to = DateHelper.endOfMonth(info.month);
    dispatch(misconductInfo(psychologist.id, from, to));
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(misconductInfoLoading(true));
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant="outlined"
        disableElevation="true"
        disableRipple="true"
        style={{ backgroundColor: 'transparent' }}
        onClick={handleClickOpen}
      >
        <InfoIcon
          className={classes.infoIcon}
          color="primary"
        />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={classes.infoHeader} id="alert-dialog-slide-title">
          Score breakdown
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.infoContainer} id="alert-dialog-slide-description">
            {!info.isLoading
              ? <InfoText />
              : <p>Loading...</p>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function InfoText() {
  const info = useSelector((state) => state.misconductScores.info);
  const classes = useStyles();

  return (
    <>
      <p className={classes.infoText}>REDACTED STATUS SIX: </p>
      <p>
        {info.data.redactedStatusSix}
        {' '}
        times
      </p>
      <p className={classes.infoText}>REDACTED STATUS FOUR: </p>
      <p>
        {info.data.redactedStatusFour}
        {' '}
        times
      </p>
      <p className={classes.infoText}>REDACTED STATUS FIVE: </p>
      <p>
        {info.data.redactedStatusFive}
        {' '}
        times
      </p>
    </>
  );
}

export default FlaggedPsychologistInfo;
