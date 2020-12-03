import { UserInfo } from './userInfo';
import { UserPreferences } from './userPreferences';
export class User {
    id: number;
    userInfo: UserInfo;
    // name: string;
    // surname: string;
    // birthday: string;
    // login: string;
    // password: string;
    // email: string;

    preferences: UserPreferences;
}