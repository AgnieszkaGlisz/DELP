import { UserPreferences } from './userPreferences';
export class User {
    id: number;
    name: string;
    surname: string;
    birthday: string;
    login: string;
    password: string;
    email: string;

    preferences: UserPreferences;
}