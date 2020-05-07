import HttpClient from './httpClient';
import Api from './api';

export const httpClient = new HttpClient();

export const api = new Api(httpClient);
