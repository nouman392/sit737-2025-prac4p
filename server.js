const express = require('express');

const winston = require('winston');
const app = express();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});


// Middleware to parse JSON requests
app.use(express.json());

// Define arithmetic operation endpoints
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2) {
        logger.error("Missing parameters for addition");
        return res.status(400).json({ error: "Missing parameters" });
    }
    const result = parseFloat(num1) + parseFloat(num2);
    logger.info(`Addition operation: ${num1} + ${num2} = ${result}`);
    res.json({ result });
});

app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2) {
        logger.error("Missing parameters for addition");
        return res.status(400).json({ error: "Missing parameters" });
    }
    const result = parseFloat(num1) + parseFloat(num2);
    logger.info(`subtract operation: ${num1} - ${num2} = ${result}`);
    res.json({ result });
});
app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2) {
        logger.error("Missing parameters for addition");
        return res.status(400).json({ error: "Missing parameters" });
    }
    res.json({ result: parseFloat(num1) * parseFloat(num2) });
    logger.info(`multiply operation: ${num1} - ${num2} = ${result}`);
    res.json({ result });
});

app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2) {
        logger.error("Missing parameters for addition");
        return res.status(400).json({ error: "Missing parameters" });
    }
    if (parseFloat(num2) === 0) {
        return res.status(400).json({ error: "Cannot divide by zero" });
    }
    res.json({ result: parseFloat(num1) / parseFloat(num2) });
    logger.info(`divide operation: ${num1} - ${num2} = ${result}`);
    res.json({ result });
});
// Logging middleware
app.use((req, res, next) => {
    logger.info(`Received request: ${req.method} ${req.url}`);
    next();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Calculator microservice running on port ${PORT}`);
});
