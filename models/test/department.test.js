const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
describe('Department', () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value

    dep.validate((err) => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "name" is too short or too long', () => {
    const cases = [
      'aaa',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    ];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should no throw an error if "name" is okay', () => {
    const cases = ['testing', 'management'];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
