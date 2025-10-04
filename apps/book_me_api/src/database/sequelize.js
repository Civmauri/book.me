import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { defineUser } from './models/index.js';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLITE_DB_PATH || './database.sqlite',
  logging: false,
  pool: {
    max: 10,         
    min: 0,          
    idle: 10000,     
    acquire: 30000,   
  },
  define: {
    timestamps: false,
    underscored: false,
    freezeTableName: true
  },
  sync: {
    force: false,        // Non ricrea le tabelle se esistono già
    alter: true          // Aggiorna le tabelle esistenti con le modifiche ai modelli
  }
});

// Function to register all models and their associations
export const registerModels = () => {
  console.log('Registering models...');
  
  // Create all models
  const User = defineUser(sequelize);
  
  // Store models for easy access
  sequelize.models = {
    User
  };
  
  // Update exported models
  models.User = User;
  
  console.log('Models registered successfully');
};

// Function to sync database with models
export const syncDatabase = async () => {
  try {
    // First register all models
    registerModels();
    
    // Then sync the database
    await sequelize.sync({ 
      force: false,    // Non ricrea le tabelle esistenti
      alter: true      // Aggiorna le tabelle con le modifiche ai modelli
    });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
    throw error;
  }
};

// Function to force recreate all tables (use with caution!)
export const forceSyncDatabase = async () => {
  try {
    // First register all models
    registerModels();
    
    // Then force sync the database
    await sequelize.sync({ 
      force: true      // Ricrea tutte le tabelle (ATTENZIONE: cancella i dati!)
    });
    console.log('Database force synchronized successfully');
  } catch (error) {
    console.error('Error force synchronizing database:', error);
    throw error;
  }
};

// Export models for use in routes
export const models = {
  User: null // Will be set after registerModels() is called
};

export default sequelize;
