1.
covered all points

Note 
1.if you run   npm run start:dev 
->The application is run in development mode

2.if you run   npm run start:prod
->The application is run in production mode

3.you must creat .env file with below content
->PORT=4000

4.if you run   npm run start:multi
->starts multiple instances of  application
->On localhost:4000/api load balancer is listening for requests
->On localhost:4001/api, localhost:4002/api, localhost:4003/api workers are
  listening for requests from load balancer  
->When user sends request to localhost:4000/api, load balancer sends this request to
  localhost:4001/api, next user request is sent to localhost:4002/api and so on.
 After sending request to localhost:4003/api load balancer starts from the first worker
  again (sends request to localhost:4001/api)
1. First POST request addressed to localhost:4001/api creates user
2. Second GET request addressed to localhost:4002/api  returns created user
3. Third DELETE request addressed to localhost:4003/api deletes created user
4. Fourth GET request addressed to localhost:4001/api  user not found error comes