import { Set } from './set';
export class Lesson extends Set {
    saveSet(): void {
        this.setInfo.isWordSet = false;
        this.saveSet();
    }
}