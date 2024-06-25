import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsServics {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findCat(name: string): Cat {
    console.log(name, this.cats);

    return this.cats.find((i) => {
      return i.name === name;
    });
  }
}
