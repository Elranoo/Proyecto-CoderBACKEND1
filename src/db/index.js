const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'products.json');
const cartsFilePath = path.join(__dirname, 'carts.json');

class Database {
    static readProducts() {
        return new Promise((resolve, reject) => {
            fs.readFile(productsFilePath, 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(data));
            });
        });
    }

    static writeProducts(products) {
        return new Promise((resolve, reject) => {
            fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    static readCarts() {
        return new Promise((resolve, reject) => {
            fs.readFile(cartsFilePath, 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(data));
            });
        });
    }

    static writeCarts(carts) {
        return new Promise((resolve, reject) => {
            fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2), (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = Database;