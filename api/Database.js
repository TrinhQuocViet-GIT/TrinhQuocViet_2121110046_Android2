// Database.js

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'testDB', location: 'default' },
  () => {},
  error => {
    console.log('Error:', error);
  }
);

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, category_id INTEGER, brand_id INTEGER, FOREIGN KEY(category_id) REFERENCES categories(id), FOREIGN KEY(brand_id) REFERENCES brand(id))'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS brand (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
    );
  });
};

export const addUser = (name, email) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users', [], (_, { rows: { _array } }) => {
        resolve(_array);
      });
    });
  });
};


export const addCategory = name => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO categories (name) VALUES (?)', [name]);
  });
};

export const addProduct = (name, categoryId, brandId, image) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO products (name, category_id, brand_id, image) VALUES (?, ?, ?, ?)',
      [name, categoryId, brandId, image]
    );
  });
};

export const addBrand = name => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO brand (name) VALUES (?)', [name]);
  });
};

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM categories', [], (_, { rows: { _array } }) => {
        resolve(_array);
      });
    });
  });
};

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM products', [], (_, { rows: { _array } }) => {
        resolve(_array);
      });
    });
  });
};

export const getBrands = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM brand', [], (_, { rows: { _array } }) => {
        resolve(_array);
      });
    });
  });
};
