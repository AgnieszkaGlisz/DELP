import { SetInfo } from './setInfo';
import { TranslateWordTemplate } from './translateWordTemplate';
export interface Wordset {
    setInfo: SetInfo,
    exercises: TranslateWordTemplate[];
}