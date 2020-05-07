import {
    updatePatientStatistics,
    patientStatisticsAreLoading,
    updateBookingStatistics,
    bookingStatisticsAreLoading,
    hasErrored
} from './statisticsActions';

import {
    userLoggedIn,
    userInfo,
    loginFailed
} from './userActions';

import {
    misconductScoresAreLoading,
    updateMisconductScores,
    updateMisconductInfo,
    misconductInfoLoading,
    scoresHasErrored,
    infoHasErrored
} from './misconductActions';

import { api } from '../network';

export function bookingStatistics() {
    return async (dispatch, getState) => {
        try {
            const { token, id } = getState().user.info;
            const statistics = await api.getBookingStatistics(token, id);
            await dispatch(updateBookingStatistics(statistics));
            await dispatch(bookingStatisticsAreLoading(false));
        }
        catch {
            dispatch(hasErrored());
        }
    };
}

export function patientStatistics() {
    return async (dispatch, getState) => {
        try {
            const { token, id } = getState().user.info;
            const statistics = await api.getPatientStatistics(token, id);
            await dispatch(updatePatientStatistics(statistics));
            dispatch(patientStatisticsAreLoading(false));
        }
        catch {
            dispatch(hasErrored());
        }
    };
}

export function userlogin(id, userType) {
    return async (dispatch) => {
        try {
            const { token } = await api.login();
            dispatch(userInfo(id, userType, token));
            dispatch(userLoggedIn(true));
        }
        catch {
            dispatch(loginFailed());
        }
    };
}

export function misconductScore(from, to, offset, limit) {
    return async (dispatch, getState) => {
        try {
            const { token } = getState().user.info;
            const scores = await api.getMisconductScores(token, from, to, offset, limit);
            await dispatch(updateMisconductScores(scores));
            dispatch(misconductScoresAreLoading(false));
        }
        catch {
            dispatch(scoresHasErrored());
        }
    };
}

export function misconductInfo(psychologistId, from, to) {
    return async (dispatch, getState) => {
        try {
            const { token } = getState().user.info;
            const info = await api.getMisconductInfo(token, psychologistId, from, to);
            await dispatch(updateMisconductInfo(info));
            dispatch(misconductInfoLoading(false));
        }
        catch {
            dispatch(infoHasErrored());
        }
    };
}
