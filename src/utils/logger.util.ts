import winston from 'winston';

const logDirectory = 'logs';

// Generates a log file name based on the current date and log level.
const generateLogger = (logLevel = 'log') => {
  const timestamp: Date = new Date();
  const [day, month, year] = [
    timestamp.getDate(),
    `0${timestamp.getMonth() + 1}`.slice(-2),
    timestamp.getFullYear()
  ];

  const dateFormat = `${year}-${month}-${day}`;

  return `${logDirectory}/${logLevel}-${dateFormat}.log`;
};

const logConfig = {
  transports: [
    new winston.transports.Console({
      level: 'warn'
    }),
    new winston.transports.Console({
      level: 'info'
    }),
    new winston.transports.File({
      level: 'error',
      filename: generateLogger()
    }),
    new winston.transports.File({
      level: 'debug',
      filename: generateLogger()
    })
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    winston.format.printf(
      (info) =>
        `${info.level.toUpperCase()}: ${[info.timestamp]}: ${info.message}`
    )
  )
};

const logger = winston.createLogger(logConfig);

export default logger;
