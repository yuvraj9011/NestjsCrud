const http = require('http');
const httpProxy = require('http-proxy');
const workerPorts = [4001, 4002, 4003];
let currentIndex = 0;

const proxy = httpProxy.createProxyServer({});
// Round-robin function to select the next worker port
function getNextWorkerPort() {
  const port = workerPorts[currentIndex];
  currentIndex = (currentIndex + 1) % workerPorts.length; // Cycle to the next index
  return port;
}

const server = http.createServer((req, res) => {
  const port = getNextWorkerPort();; // Get the next port from the round-robin array
  console.log(`Request redirected to port ${port}`);
  proxy.web(req, res, { target: `http://localhost:${port}` });
});

server.listen(4000, () => {
  console.log('Load balancer listening on port 4000');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
