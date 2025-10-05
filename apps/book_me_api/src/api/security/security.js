import dotenv from 'dotenv';
import { createHash } from 'crypto';

// Load environment variables
dotenv.config();

const hashSomething = (toHash) => {
    const hash = createHash('sha512').update(`${process.env.HASH_SALT}${toHash}`).digest('hex');
    return hash;
}

export { hashSomething };