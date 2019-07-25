export const server_url = process.env.NODE_ENV === 'production' ? 
'https://postgris-server.herokuapp.com/' : 'http://192.168.33.29:8000';