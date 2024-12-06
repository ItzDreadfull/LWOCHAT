import { User } from '../backend/models/User.ts';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
