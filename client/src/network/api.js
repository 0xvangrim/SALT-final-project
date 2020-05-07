class Api {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getSlots(token) {
    return this.httpClient.request({
      method: 'get',
      url: '/v1/slot',
      headers: {
        Authorization: `jwt ${token}`,
      },
    });
  }

  getBookingStatistics(token, psychologistId) {
    return this.httpClient.request({
      method: 'get',
      url: `/v1/statistics/psychologist/${psychologistId}/booking`,
      headers: {
        Authorization: `jwt ${token}`,
      },
    });
  }

  getPatientStatistics(token, psychologistId) {
    return this.httpClient.request({
      method: 'get',
      url: `/v1/statistics/psychologist/${psychologistId}/patient`,
      headers: {
        Authorization: `jwt ${token}`,
      },
    });
  }

  getMisconductScores(token, from, to, offset, limit) {
    return this.httpClient.request({
      method: 'get',
      url: '/v1/admin/misconduct-score',
      headers: {
        Authorization: `jwt ${token}`,
      },
      params: {
        from,
        to,
        offset,
        limit,
      },
    });
  }

  getMisconductInfo(token, psychologistId, from, to) {
    return this.httpClient.request({
      method: 'get',
      url: `/v1/admin/status-count/${psychologistId}`,
      headers: {
        Authorization: `jwt ${token}`,
      },
      params: {
        from,
        to,
      },
    });
  }

  login() {
    return this.httpClient.request({
      method: 'post',
      url: '/v1/user/login',
    });
  }
}

export default Api;
