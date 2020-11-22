import { Set } from './set';
export class Wordset extends Set {
    
    saveSet(): void {
        // console.log("heeeelo");
        this.setInfo.isWordSet = true;
        super.saveSet();
    }
}