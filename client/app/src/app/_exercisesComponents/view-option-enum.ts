import { Injectable } from '@angular/core';


// @Injectable({
//     providedIn: 'root'
//   })

export enum ViewOption {
    Create,
    Learn,
    LearnImage,
    LearnVideo,
    LearnAudio,
    DisplayImage,
    DisplayVideo,
    DisplayAudio,
    Display,
    Hint
  }

export class View {
    constructor(public type: ViewOption){};
  }

// export class View {
    // constructor()
// }