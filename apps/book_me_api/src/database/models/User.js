import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

/**
 * User model based on the User entity structure
 * Extends Person with authentication and contact fields
 */
const defineUser = (sequelize) => {
  const User = sequelize.define('User', {
  // Unique identifier
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  
  // Person fields (inherited from Person entity)
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'firstName is required'
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'lastName is required'
      }
    }
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  
  // User-specific fields
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Invalid email format'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, Infinity],
        msg: 'Password must be at least 8 characters long'
      }
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'userType is required'
      }
    }
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: true,
  paranoid: false, // We handle soft delete with the 'deleted' field
  indexes: [
    {
      unique: true,
      fields: ['id']
    },
    {
      unique: true,
      fields: ['email']
    },
    {
      fields: ['active', 'deleted']
    }
  ]
});

// Instance methods
User.prototype.isAvailable = function() {
  return this.active && !this.deleted;
};

User.prototype.getDisplayName = function() {
  return `${this.firstName} ${this.lastName} (${this.email})`;
};

// Class methods
User.findAvailableUsers = function() {
  return this.findAll({
    where: {
      active: true,
      deleted: false
    }
  });
};

User.findByEmail = function(email) {
  return this.findOne({
    where: { email: email.toLowerCase() }
  });
};

User.findByUid = function(uid) {
  return this.findOne({
    where: { uid: uid }
  });
};

  return User;
};

export default defineUser;
