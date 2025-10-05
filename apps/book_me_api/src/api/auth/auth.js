
import { hashSomething, get_success_result } from '../security/security.js';
import { models } from '../../database/sequelize.js';
import { User, UserSchema } from 'book_me_entities';

/**
 * Register a new user with encrypted password
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Registration result
 */
const register = async (userData) => {
    try {
        // Validate input data using Zod schema
        const validatedData = UserSchema.parse(userData);
        
        // Check if user already exists
        const existingUser = await models.User.findByEmail(validatedData.email);
        if (existingUser) {
            return {
                success: false,
                message: 'User with this email already exists'
            };
        }
        
        // Hash the password
        const hashedPassword = hashSomething(validatedData.password);
        
        // Create user data with hashed password
        const userToCreate = {
            ...validatedData,
            password: hashedPassword,
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            userType: validatedData.userType
        };
        
        // Create user in database
        const newUser = await models.User.create(userToCreate);
        
        // Convert to domain object for response
        const userDTO = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: newUser.password,
            phoneNumber: newUser.phoneNumber,
            userType: newUser.userType,
            birthDate: newUser.birthDate,
            active: newUser.active,
            deleted: newUser.deleted
        };
        
        const user = User.fromDTO(userDTO);
        
        return {
            success: true,
            message: 'User registered successfully',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                userType: user.userType,
                birthDate: user.birthDate,
                active: user.active
            }
        };
        
    } catch (error) {
        console.error('Registration error:', error);
        
        if (error.name === 'ZodError') {
            return {
                success: false,
                message: 'Invalid input data',
                errors: error.errors
            };
        }
        
        return {
            success: false,
            message: 'Registration failed',
            error: error.message
        };
    }
};

/**
 * Login user with email and password
 * @param {Object} credentials - Login credentials
 * @returns {Promise<Object>} Login result
 */
const login = async (credentials) => {
    try {
        const { email, password } = credentials;
        
        if (!email || !password) {
            return {
                success: false,
                message: 'Email and password are required'
            };
        }
        
        // Find user by email
        const user = await models.User.findByEmail(email);
        if (!user) {
            return {
                success: false,
                message: 'Invalid credentials'
            };
        }
        
        // Check if user is available
        if (!user.isAvailable()) {
            return {
                success: false,
                message: 'Account is not active'
            };
        }
        
        // Verify password
        const hashedPassword = hashSomething(password);
        if (user.password !== hashedPassword) {
            return {
                success: false,
                message: 'Invalid credentials'
            };
        }
        
        // Build standardized success result with JWT token
        const successResult = await get_success_result({
           user: user.dataValues
        });

        return successResult;
        
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'Login failed',
            error: error.message
        };
    }
};

export { register, login };
