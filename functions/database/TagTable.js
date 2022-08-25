/* eslint-disable require-jsdoc */

const Database = require("./wrapper/DatabaseWrapper");
const {dbKeys} = require("../helpers");

class TagTable {
  constructor() {
    if (this.instance) return this.instance;
    TagTable.instance = this;
  }

  get() {
    return Database.getList(dbKeys.TAGS);
  }

  getById(id) {
    return Database.get(dbKeys.TAGS, id);
  }

  create(data, key) {
    return Database.create(dbKeys.TAGS, data, key);
  }

  delete(id) {
    return Database.delete(dbKeys.TAGS, id);
  }

  update(id, data) {
    return Database.set(dbKeys.TAGS, id, data);
  }

  filter(key, value) {
    return Database.filter(dbKeys.TAGS, key, value);
  }

  doubleFilter(firstKey, firstValue, secondKey, secondValue) {
    return Database.secondLevelFilter(dbKeys.TAGS, firstKey, firstValue, secondKey, secondValue);
  }

  tripleFilter(firstKey, firstValue, secondKey, secondValue, thirdKey, thirdValue) {
    return Database.thirdLevelFilter(dbKeys.TAGS, firstKey, firstValue, secondKey, secondValue, thirdKey, thirdValue);
  }
}

module.exports = new TagTable();

