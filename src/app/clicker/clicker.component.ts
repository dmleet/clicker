import { Component, OnInit } from '@angular/core';

import { interval, Subscription } from 'rxjs';

import { Item } from '../item';
import { ItemService } from '../item.service';
import { MessageService } from '../message.service';
import { ItemNames } from '../items';
import { RandomService } from '../random.service';

@Component({
    selector: 'app-clicker',
    templateUrl: './clicker.component.html',
    styleUrls: ['./clicker.component.css']
})
export class ClickerComponent implements OnInit {
    subscription: Subscription;

    // game vars
    carts = 0;
    clicks = 0;
    chunks = 10;
    feeders = 0;
    gatherDelay = 0;
    gameState = 0;
    hunger = 10;
    items: Item[];
    minionCap = 5;
    minionCost = 15;
    minions = 0;
    scavengers: number[] = [];
    ticks = 0;

    // button status vars
    cartButtonDisabled = true;
    minionButtonDisabled = true;
    hutButtonDisabled = true;
    feederButtonDisabled = true;

    constructor(
        private itemService: ItemService,
        private messageService: MessageService,
        private randomService: RandomService) { }

    ngOnInit(): void {
        const source = interval(1000);
        this.subscription = source.subscribe(val => this.tick());

        this.itemService.getItems().subscribe(items => this.items = items);

        this.messageService.add("You awake in a *scary:dark void.* A feeling of *visual:pure hunger* wraps its *slanted:tendrils* around your mind.");
    }

    // button fuctions
    public click() {
        this.clicks++;
        this.chunks--;
        if (this.hunger < -10) {
            return;
        }
        this.hunger--;
        this.setButtonStates();
    }

    public gather() {
        if (this.gatherDelay > 0)
            return;

        var chunkGet = (Math.floor(this.randomService.getNext() * 10) + 3) * ((this.minions + 1) + this.carts);
        this.chunks += chunkGet;
        this.messageService.add("You feel around in the darkness and find *bold:" + chunkGet + " more chunks.*");
        this.gatherDelay = 10;
        this.setButtonStates();
    }

    public hire() {
        if (this.chunks < this.minionCost)
            return;

        this.chunks -= this.minionCost;
        this.minions++;
        this.minionCost += 15;
        this.messageService.add("You come to an understanding. *slanted:The beast will eat us all before long...*");
        this.setButtonStates();
    }

    public scavenge() {
        if (this.minions < 1)
            return;

        this.minions--;
        this.minionCap--;
        var scavengeTime = Math.floor(this.randomService.getNext() * 20) + 10;
        this.scavengers.push(scavengeTime);
        this.setButtonStates();
    }

    public cart() {
        if (this.cartButtonDisabled)
            return;

        this.items[ItemNames.Wheel].qty--;
        this.items[ItemNames.Plank].qty--;
        this.items[ItemNames.Nails].qty--;
        this.carts++;
        this.messageService.add("A makeshift cart with a single wheel. It should improve productivity.");
        this.setButtonStates();
    }

    public hut() {
        if (this.hutButtonDisabled)
            return;

        this.items[ItemNames.Plank].qty -= 2;
        this.items[ItemNames.Nails].qty--;
        this.minionCap += 5;
        this.messageService.add("A hut of weathered planks should help attract more creatures. You will need their help despite the smell.");
        this.setButtonStates();
    }

    public feeder() {
        if (this.feederButtonDisabled)
            return;

        this.items[ItemNames.Gear].qty--;
        this.items[ItemNames.Plank].qty -= 2;
        this.items[ItemNames.Nails].qty--;
        this.items[ItemNames.Jar].qty--;
        this.feeders++;
        this.messageService.add("The gear hums, *slanted:your new feeder slowly transfers chunks into the beast's gaping maw.* A brief respite is welcome.");
        this.setButtonStates();
    }

    // the tick
    public tick() {
        this.ticks++;
        this.hunger++;


        // failure conditions
        if (this.hunger > 100) {
            if (this.minions > 0) {
                this.hunger -= 50;
                this.clicks += 50;
                this.minions--;
                this.messageService.add("The beast has *slanted:TaKeN* one of your minions...8");
            }
            else {
                this.messageService.add("*scary:YOU DIED.*");
                return;
            }
        }

        // cooldowns
        if (this.gatherDelay > 0) this.gatherDelay--;

        // beast hunger
        if (this.ticks % 10 == 0) {
            if (this.hunger > 79) {
                this.messageService.add("The beast is *scary:CoMiNG FoR YOu!!*");
            } else if (this.hunger > 49) {
                this.messageService.add("The beast is *visual:ravenous.*");
            } else if (this.hunger > 9) {
                this.messageService.add("The beast is hungy.");
            } else {
                this.messageService.add("The beast is quiet.");
            }
        }

        // scavenger items
        if (this.scavengers.length > 0) {
            this.scavengers = this.scavengers.sort(function (a, b) { return a - b });
            for (let i = 0; i < this.scavengers.length; i++) {
                this.scavengers[i]--;
            }
            if (this.scavengers[0] < 1) {
                this.minions++;
                this.minionCap++;
                var id = this.itemService.getRandomItemId()
                this.items[id - 1].qty++;
                this.messageService.add("A minion has returned with a *bold:" + this.items[id - 1].name + "*");
                this.scavengers.shift();
            }
        }

        // button logic
        this.setButtonStates();

        // game state
        if (this.ticks % 60 == 0) {
            switch (this.gameState) {
                case 0: this.messageService.add("You hear a group of lesser creatures take up residence nearby. A stong vision pierces your mind. They will help you in exchange for chunks."); break;
                case 1: this.messageService.add("The creatures send a vision to your mind. They may be able to scavenge useful bits of scrap. It could prove useful, but is it worth the scrifice?"); break;
                case 2: this.messageService.add("A stroke of pure, undeserved luck. Your fingers can identify a hammer among some chunks. It's a bit shoddy, but it will get the job done."); break;
                case 5: this.messageService.add("A minion calls out. He's found something. It's a dilapidated workbench. This should allow for more complex projects."); break;
            }
            this.gameState++;
        }

    }

    // set button states
    private setButtonStates() {
        this.minionButtonDisabled =
            this.chunks < this.minionCost ||
            this.minions > this.minionCap;

        this.hutButtonDisabled =
            this.items[ItemNames.Plank].qty < 2 ||
            this.items[ItemNames.Nails].qty < 1

        this.cartButtonDisabled =
            this.items[ItemNames.Wheel].qty < 1 ||
            this.items[ItemNames.Nails].qty < 1 ||
            this.items[ItemNames.Plank].qty < 1;

        this.feederButtonDisabled =
            this.items[ItemNames.Gear].qty < 1 ||
            this.items[ItemNames.Plank].qty < 2 ||
            this.items[ItemNames.Nails].qty < 1 ||
            this.items[ItemNames.Jar].qty < 1;
    }



}
