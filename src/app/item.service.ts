import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Item } from './item';
import { ITEMS } from './items';
import { RandomService } from './random.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private randomService: RandomService) { }

  getItems(): Observable<Item[]> {
    return of(ITEMS);
  }

  getRandomItemId() {
    let random = Math.floor(this.randomService.getNext() * 100);
    let rarity = 3;
    if (random < 65) {
      rarity = 1
    } else if (random < 90) {
      rarity = 2
    }

    let items = ITEMS.filter(i => i.rarity == rarity);
    let index = Math.floor(this.randomService.getNext() * items.length);

    return items[index].id;
  }
  
}
