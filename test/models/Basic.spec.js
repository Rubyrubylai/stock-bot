const chai = require('chai');
const expect = chai.expect;
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers');

const BasicModel = require('../../models/basic');

describe('# Basic Model', () => {
  const Basic = BasicModel(sequelize, dataTypes);
  const basic = new Basic();

  checkModelName(Basic)('Basic');

  context('properties', () => {
    ;['code', 'name', 'industry', 'listedCompany', 'capital'].forEach(checkPropertyExists(basic));
  })

  context('associations', () => {
    let Technical;
    before(() => {
      Basic.associate( Technical )
    });

    it ('defined a belongsTo association with Technical', () => {
      expect(Basic.belongsTo).to.have.been.calledWith(Technical);
    })
  })
})