import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RandomService {
    seed = new Date().getMilliseconds();

    constructor() { }

    public init(s: number) {
        this.seed = s;
    }

    public getNext(): number {
        return (this.seed = Math.sin(this.seed) * 10000) - Math.floor(this.seed);
    }
}
