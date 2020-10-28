const fetch = require("node-fetch");

class Cat {
    constructor() {
        this.url = "https://cat-fact.herokuapp.com/facts/random";
    }

    getFact() {
        return fetch(this.url)
            .then(res => res.json())
            .then(body => body);
    }
}

// const generateMessage = function () {
//     return fetch(url)
//         .then(res => res.json())
//         .then(body => body);
// };

// module.exports = {
//     generateMessage,
// };

module.exports = Cat;
