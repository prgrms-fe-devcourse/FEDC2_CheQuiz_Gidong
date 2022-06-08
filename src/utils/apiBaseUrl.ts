const host = process.env.REACT_APP_API_HOST ?? 'localhost';
const port = process.env.REACT_APP_API_PORT ?? 3000;

export const API_ENDPOINT = `${host}:${port}`;

export default { API_ENDPOINT };
