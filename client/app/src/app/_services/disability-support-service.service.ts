import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewProbabilities {
  videoProbability: number;
  audioProbability: number;
  imageProbability: number;
  nothingProbability: number;
}


@Injectable({
  providedIn: 'root'
})
export class DisabilitySupportServiceService {

  constructor() { }

  videoNoAudio: ViewProbabilities = {
    videoProbability: 65,
    audioProbability: 0,
    imageProbability: 25,
    nothingProbability: 10
  }

  videoAudio: ViewProbabilities = {
    videoProbability: 30,
    audioProbability: 30,
    imageProbability: 30,
    nothingProbability: 10
  }

  noVideoNoAudio: ViewProbabilities = {
    videoProbability: 0,
    audioProbability: 0,
    imageProbability: 70,
    nothingProbability: 30
  }

  noVideoAudio: ViewProbabilities = {
    videoProbability: 0,
    audioProbability: 40,
    imageProbability: 40,
    nothingProbability: 20
  }

}

