// Class Pattern

class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

const person = new Person('Edgar', 'm.zea@live.com.mx');

// Constructor Pattern

class Client extends Person {
  constructor(name, email, company) {
    super(name, email);
    this.company = company;
  }
}

const promasa = new Client('Promasa', 'cliente@cliente.mx', 'Promasa');

// Singleton Pattern

let instance = null;

class Charmander {
  constructor(age, city) {
    if (!instance) {
      this.age = age;
      this.city = city;
    } else {
      return instance;
    }
  }
}

const charizard = new Charmander(35, 'Pallet Town');
const charmeleon = new Charmander(20, 'Green City');

// Factory Pattern

class InputHTML {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }

  createInput() {
    return `<input type=${this.type} name=${this.name} id=${this.name}/>`;
  }
}

class HTMLFactory {
  createElement(type, name) {
    switch (type) {
      case 'text':
        return new InputHTML('text', name);
        break;
      case 'tel':
        return new InputHTML('tel', name);
        break;
      case 'email':
        return new InputHTML('email', name);
        break;
      default:
        break;
    }
  }
}

const element = new HTMLFactory();
const inputText = element.createElement('text', 'client-name');
console.log(inputText.createInput());

const element1 = new HTMLFactory();
const inputTel = element1.createElement('tel', 'client-phone');
console.log(inputTel.createInput());

const element2 = new HTMLFactory();
const inputEmail = element2.createElement('email', 'client-email');
console.log(inputEmail.createInput());

// Module Pattern

const showClient = name => console.log(name);

export default showClient;

// Mixins Pattern

class Digimon {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const attack = {
  fire() {
    console.log(
      `${this.name} has ${this.age} years and just attacked you with fire balls`
    );
  },
};

Object.assign(Digimon.prototype, attack);

const Greymon = new Digimon('Greymon', 32);

console.log(Greymon);
Greymon.fire();

// Namespace

const restaurant = {
  dishes: [
    {
      name: 'Hamburger',
      price: 20,
    },
    {
      name: 'Hot-Dog',
      price: 30,
    },
    {
      name: 'Pizza',
      price: 40,
    },
  ],
};

restaurant.functions = {
  showDishes: dish => {
    dish.forEach((dish, index) =>
      console.log(`${index + 1}. - ${dish.name}. Price: ${dish.price}`)
    );
  },
  order: id => {
    console.log(`You selected the dish ${restaurant.dishes[id].name}`);
  },
};

const { dishes } = restaurant;
restaurant.functions.showDishes(dishes);
restaurant.functions.order(0);

// Mediator Pattern

function Seller(name) {
  this.name = name;
  this.room = null;
}

Seller.prototype = {
  offer: (article, price) => {
    console.log(`The next article is ${article} and its cost is $${price}`);
  },
  sold: buyer => {
    console.log(`Sold to ${buyer}`);
  },
};

function Buyer(name) {
  this.name = name;
  this.room = null;
}

Buyer.prototype = {
  offers: (offer, buyer) => {
    console.log(`The buyer ${buyer.name} offers $${offer}`);
  },
};

function Auction() {
  let buyers = {};

  return {
    register: user => {
      buyers[user.name] = user;
      user.room = this;
    },
  };
}

const john = new Buyer('John');
const peter = new Buyer('Peter');
const seller = new Seller('Car seller');
const auction = new Auction();

auction.register(john);
auction.register(peter);
auction.register(seller);

seller.offer('Mustang 70', 250);

john.offers(251, john);
peter.offers(260, peter);

seller.sold('Peter');

console.log(john);
console.log(peter);
console.log(seller);
console.log(auction);
console.log(john.room);
