import { Item } from './item';

export const ITEMS: Item[] = [
    { id: 1, name: "Rusty Iron Wheel",      qty: 0, rarity: 3 },
    { id: 2, name: "Weathered Plank",       qty: 0, rarity: 1 },
    { id: 3, name: "Handful of Bent Nails", qty: 0, rarity: 1 },
    { id: 4, name: "Used Battery",          qty: 0, rarity: 3 },
    { id: 5, name: "Jagged Metal Tube",     qty: 0, rarity: 2 },
    { id: 6, name: "Cracked Glass Jar",     qty: 0, rarity: 2 },
    { id: 7, name: "Melted Copper Wire",    qty: 0, rarity: 2 },
    { id: 8, name: "Delicate Fillament",    qty: 0, rarity: 3 },
    { id: 9, name: "Infernal Gear",         qty: 0, rarity: 3 }
];

export enum ItemNames {
    Wheel = 0,
    Plank,
    Nails,
    Battery,
    Tube,
    Jar,
    Wire,
    Fillament,
    Gear
};