const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
describe('Employee', () => {
  it('should throw an error if no "firstName", "lastName", or "department" arg', () => {
    const cases = [
      {
        firstName: {},
        lastName: 'Doe',
        department: 'IT',
      },
      {
        firstName: 'Alicia',
        lastName: [],
        department: 'IT',
      },
      {
        firstName: 'Alicia',
        lastName: 'Doe',
        department: {},
      },
    ];
    for (let example of cases) {
      const empl = new Employee({ example });

      empl.validate((err) => {
        expect(err.errors.firstName).to.exist ||
          expect(err.errors.lastName).to.exist ||
          expect(err.errors.department).to.exist;
      });
    }
  });

  it('should throw an error if  "firstName", "lastName", or "department" is not a string', () => {
    const cases = [
      {
        firstName: {},
        lastName: 'Doe',
        department: 'IT',
      },
      {
        firstName: 'Alicia',
        lastName: [],
        department: 'IT',
      },
      {
        firstName: 'Alicia',
        lastName: 'Doe',
        department: {},
      },
    ];
    for (let example of cases) {
      const empl = new Employee({ example });

      empl.validate((err) => {
        expect(err.errors.firstName).to.exist ||
          expect(err.errors.lastName).to.exist ||
          expect(err.errors.department).to.exist;
      });
    }
  });

  it('should no throw an error if  "firstName", "lastName", and "department" is okay', () => {
    const cases = [
      {
        firstName: 'Amanda',
        lastName: 'Doe',
        department: 'Accountant',
      },
      {
        firstName: 'Jamal',
        lastName: 'Kalu',
        department: 'Testing',
      },
      {
        firstName: 'Alicia',
        lastName: 'Doe',
        department: 'IT',
      },
    ];
    for (let example of cases) {
      const empl = new Employee({ example });

      empl.validate((err) => {
        expect(err.firstName).to.not.exist &&
          expect(err.lastName).to.not.exist &&
          expect(err.department).to.not.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
