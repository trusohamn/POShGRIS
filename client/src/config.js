export const server_url = process.env.NODE_ENV === 'production' ? 
'https://postgris-server.herokuapp.com/' : 'http://localhost:8000';