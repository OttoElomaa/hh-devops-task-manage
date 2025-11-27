import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL || "";

// THIS CREATES THE SEQUELIZE INSTANCE THAT ACCESSES THE DATABASE
export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  // LOGGING: Turn off when in production
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

console.log('Sequelize config:', {
  database: sequelize.config.database,
  username: sequelize.config.username,
  host: sequelize.config.host,
  port: sequelize.config.port
});

// THIS FUNC CONNECTS TO DATABASE IN SERVER.TS
export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync models in development
    if (process.env.NODE_ENV === 'development' || process.env.DB_SYNC === 'true') {
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // Don't exit in test environment
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};
