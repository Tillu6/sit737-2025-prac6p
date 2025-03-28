const express = require('express');
const logger = require('./logger');

const app = express();
const port = 3000;

//  Default root route for basic confirmation
app.get('/', (req, res) => {
  res.send('Calculator Microservice is up and running! 🚀');
});

//  Health check endpoint for monitoring
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

//  Middleware to log all incoming requests
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

//  Function to perform calculations with error handling
const calculate = (num1, num2, operation) => {
  if (isNaN(num1) || isNaN(num2)) {
    throw new Error('Invalid numbers provided.');
  }
  switch (operation) {
    case 'add': return num1 + num2;
    case 'subtract': return num1 - num2;
    case 'multiply': return num1 * num2;
    case 'divide':
      if (num2 === 0) throw new Error('Cannot divide by zero');
      return num1 / num2;
    default: throw new Error('Unknown operation');
  }
};

//  Route handler for all four operations
['add', 'subtract', 'multiply', 'divide'].forEach(operation => {
  app.get(`/${operation}`, (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    try {
      const result = calculate(num1, num2, operation);

      logger.info(`Success: ${operation} => ${num1} & ${num2} = ${result}`);

      res.json({ result });
    } catch (error) {
      logger.error(`Error: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  });
});

//  Start the server
app.listen(port, () => {
  logger.info(`Calculator microservice running on http://localhost:${port}`);
});
