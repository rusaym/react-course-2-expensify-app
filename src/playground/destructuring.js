//Object destructuring

// const person = {
//     name: 'Ruslan',
//     age: 31,
//     location: {
//         city: 'Tampa',
//         temp: 94
//     }
// };

// // const name = person.name;
// // const age = person.age; //same as:

// const { name: firstName = 'Anonimous', age } = person;
// console.log(`${firstName} is ${age} year(s) old`);


// const { temp: temperature, city } = person.location;

// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}`);
// }


// const book = {
//     title: 'Twinx',
//     author: 'Rucus Leonel',
//     publisher: {
//         name: 'Penguin'
//     }
// };
// const { name: publisherName = 'Self-Published' } = book.publisher;
// console.log(publisherName);


//Array destructuring

const address = ['1299 S Juniper Street', 'Tampa', , '12306'];

const [street, city, state = 'New York', zip] = address;

console.log(`You are in ${city} ${state}`);


const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [drink, , medium] = item;
console.log(`A medium ${drink} costs ${medium}`);








