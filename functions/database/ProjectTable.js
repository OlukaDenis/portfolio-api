/* eslint-disable require-jsdoc */

const Database = require("./wrapper/DatabaseWrapper");
const {dbKeys} = require("../helpers");

class ProjectTable {
  constructor() {
    if (this.instance) return this.instance;
    ProjectTable.instance = this;
  }

  get() {
    return Database.getList(dbKeys.PROJECTS);
  }

  getById(id) {
    return Database.get(dbKeys.PROJECTS, id);
  }

  create(data, key) {
    return Database.create(dbKeys.PROJECTS, data, key);
  }

  delete(id) {
    return Database.delete(dbKeys.PROJECTS, id);
  }

  update(id, data) {
    return Database.set(dbKeys.PROJECTS, id, data);
  }

  filter(key, value) {
    return Database.filter(dbKeys.PROJECTS, key, value);
  }

  doubleFilter(firstKey, firstValue, secondKey, secondValue) {
    return Database.secondLevelFilter(dbKeys.PROJECTS, firstKey, firstValue, secondKey, secondValue);
  }

  tripleFilter(firstKey, firstValue, secondKey, secondValue, thirdKey, thirdValue) {
    return Database.thirdLevelFilter(dbKeys.PROJECTS, firstKey, firstValue, secondKey, secondValue, thirdKey, thirdValue);
  }
}

module.exports = new ProjectTable();
