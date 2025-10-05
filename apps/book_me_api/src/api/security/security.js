import dotenv from 'dotenv';
import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const hashSomething = (toHash) => {
    const hash = createHash('sha512').update(`${process.env.HASH_SALT}${toHash}`).digest('hex');
    return hash;
}


const get_success_result = async (user) => {

    return {
        success: true,
        user: await return_user(user),
        token: get_token(user),
    };
}

const return_user = async (user) => {
    // Fetch user rights if available. Currently unused in the returned payload.

    // Support both legacy and current user shapes
    return {
        Name: user.user.firstName ,
        LastName: user.user.lastName,
        EMail: user.user.email,
        userType: user.user.userType,
    };
}

const get_token = (user, expiresIn = process.env.TOKEN_EXPIRES_IN || '30m') => {
    const secret =  process.env.HASH_SALTSTRING;
    const token = jwt.sign({email: user.user.email }, secret, {
        expiresIn,
    });

    return token;
}

// Temporary placeholder: implement rights lookup as needed by your domain.
const get_users_rights = async (user) => {
    return [];
}

export { hashSomething, get_success_result, return_user, get_token };

