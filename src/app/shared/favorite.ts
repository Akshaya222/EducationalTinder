import { Teacher } from '../shared/teacher';
import { User } from '../shared/user';

export class Favorite {
    _id: string;
    user: User;
    teachers:Teacher[];
    createdAt: string;
    updatedAt: string;
}

export interface FavDish {
    user: string;
    dish: string;
}
