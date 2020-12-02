import { Set } from './set';
export class Wordset extends Set {
    
    saveSet(): void {
        this.setInfo.isWordSet = true;
        super.saveSet();
    }
}