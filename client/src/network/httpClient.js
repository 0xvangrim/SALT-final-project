import axios from 'axios';

class HttpClient {
  async request(options = {}) {
    const res = await axios({
      method: options.method,
      url: options.url,
      headers: options.headers,
      body: options.body,
      params: options.params,
    });
    return res.data;
  }
}

export default HttpClient;
