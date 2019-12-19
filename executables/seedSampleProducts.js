const rootPrefix = "..",
  mysqlConfig = require(rootPrefix + '/config/config'),
  coreConstants = require(rootPrefix + '/coreConstants');

const Sequelize = require('sequelize');

let dbUser = mysqlConfig[coreConstants.environment].username,
  dbPassword = mysqlConfig[coreConstants.environment].password,
  dialect = mysqlConfig[coreConstants.environment].dialect,
  dbName = mysqlConfig[coreConstants.environment].database;


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: dialect
});

let query = `INSERT INTO \`products\` (\`id\`, \`category\`, \`name\`, \`price\`, \`description\`, \`average_rating\`, \`review_count\`, \`is_available\`, \`created_at\`, \`updated_at\`)
VALUES
\t(1, 'HOME', 'Godrej', 1000.00, 'Great', NULL, 0, 1, '2019-12-18 01:36:37', '2019-12-20 02:14:08'),
\t(2, 'HOME', 'Nilkamal Chair', 2000.00, 'Comfortable Chair', NULL, 0, 1, '2019-12-19 23:59:02', '2019-12-20 02:14:13'),
\t(3, 'Dining', 'Dining table', 5000.00, 'Big Dining table for 5', NULL, 0, 1, '2019-12-20 00:02:09', '2019-12-20 01:35:12');
`;
return sequelize.query(query).then(data => {
  // code to run after successful creation.
  console.log('Sample entries in products table created successfully !!');
  process.exit(0);
});
