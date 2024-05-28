/*
У цьому завдання вам належить реалізувати сценарій життя, де людина, ключ і будинок взаємодіють один з одним.

Ключ (Key): Створіть клас Key. У нього має бути одна приватна властивість signature, яка генерується випадково при створенні об'єкта цього класу (наприклад Math.random()). Також цей клас повинен мати метод getSignature, який повертає значення властивості signature.

Людина (Person): Створіть клас Person. Конструктор цього класу приймає об'єкт класу Key і зберігає їх у приватному властивості key. Клас Person повинен мати метод getKey, який повертає збережений ключ.

Дім (House): Створіть абстрактний клас House. Цей клас має дві властивості: door, яка може бути відкрита (true), або закрита (false), і key, яка зберігає об'єкт класу Key. У цьому класі також повинен бути метод comeIn, який додає об'єкт класу Person у масив tenants, якщо door відкрита. Ваш абстрактний клас House також повинен мати абстрактний метод OpenDoor, який приймає об'єкт класу Key.

Мій будинок (MyHouse): Створіть клас MyHouse, який успадковується від абстрактного класу House. Реалізуйте метод openDoor у цьому класі. Якщо ключ, переданий цьому методу, збігається з ключем, збереженим як key, то двері відчиняються.

Після реалізації всіх класів створіть об'єкти для кожного класу та спробуйте відтворити сценарій, в якому людина приходить додому.

Наприклад, ось так:

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);
*/

interface IKey {
    name: string;
    
    getSignature(): number;
}

interface IPerson {
    name: string;
}

interface IOwner extends IPerson {
    getKey(): Key;
}

class Key implements IKey {
    private signature: number = Math.random();
    constructor(public name: string) {}

    getSignature(): number {
        return this.signature;
    }
}

class Owner implements IOwner {
    constructor(public name: string, private key: Key){}

    getKey() {
        console.log(this.name)
        return this.key;
    }
}

class Guest implements IPerson {
    constructor(public name: string) {}
}

abstract class House {
    constructor(protected key: Key) { }
    
    protected door: boolean = false;
    protected tenants: IPerson[] = [];

    public comeIn(tenant: IPerson): void {
        if (this.door) {
            this.tenants.push(tenant);
            console.log(`${tenant.name} Wellcome!`);
        } else {
            console.log(`${tenant.name} The door is closed!`);
        }
    }

    public showTenants(): string[] | [] {
       return this.tenants.map(tenant => tenant.name);
    }

    public abstract openDoor(key: Key): void;

     public closeDoor(): void {
        this.door = false;
        console.log('The door is locked');
    }
}

class MyHouse extends House {
    public openDoor(key: Key): void {
        if (key.getSignature() === this.key.getSignature()) {
            this.door = true;
            console.log("The door is now open.");
        } else {
            console.log('Incorrect key!');
        }
    }
}

const johnsKey = new Key('John\`s key');
const alsesKey = new Key('Alise\`s key');

const john = new Owner('John', johnsKey);
const alise = new Owner('Alise', alsesKey);
const max = new Guest('Max');


const johnsHouse = new MyHouse(johnsKey);

johnsHouse.openDoor(john.getKey());

johnsHouse.comeIn(john);
johnsHouse.comeIn(alise);
johnsHouse.closeDoor();

johnsHouse.openDoor(alise.getKey());
johnsHouse.comeIn(alise)

johnsHouse.openDoor(john.getKey());
johnsHouse.comeIn(max);


console.log(johnsHouse.showTenants());


// export {};