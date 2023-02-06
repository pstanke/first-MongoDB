const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const Department = require('../department.model');

describe('Employee Read data', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  before(async () => {
    const testDepOne = new Department({
      name: 'Testing',
    });
    await testDepOne.save();

    const testDepTwo = new Department({
      name: 'Accountant',
    });
    await testDepTwo.save();

    const testEmplOne = new Employee({
      firstName: 'Amanda',
      lastName: 'Doe',
      department: testDepOne._id,
    });
    await testEmplOne.save();

    const testEmplTwo = new Employee({
      firstName: 'Jamal',
      lastName: 'Kalu',
      department: testDepTwo._id,
    });
    await testEmplTwo.save();
  });

  it('should return all the data with "find" method', async () => {
    const employees = await Employee.find();
    const expectedLength = 2;
    expect(employees.length).to.be.equal(expectedLength);
  });

  it('should return proper document by various params with findOne method', async () => {
    const employee = await Employee.findOne({ firstName: 'Amanda' });
    const expectedFirstName = 'Amanda';
    expect(employee.firstName).to.be.equal(expectedFirstName);
  });

  it('should return all data with populated department', async () => {
    const employee = await Employee.findOne({ firstName: 'Amanda' }).populate(
      'department'
    );
    const expectedFirstName = 'Amanda';
    expect(employee.firstName).to.be.equal(expectedFirstName);
    expect(employee.department).to.not.be.a('string');
    expect(employee.department).to.have.property('name');
    expect(employee.department).to.have.property('_id');
  });

  after(async () => {
    await Employee.deleteMany();
    await Department.deleteMany();
  });
});

describe(' Employee Create data', () => {
  it('should insert new document with "insertOne" method', async () => {
    const employee = new Employee({
      firstName: 'Alicia',
      lastName: 'Doe',
      department: 'IT',
    });
    await employee.save();
    expect(employee.isNew).to.be.false;
  });

  after(async () => {
    await Employee.deleteMany();
  });
});

describe(' Employee Update data', () => {
  beforeEach(async () => {
    const testEmplOne = new Employee({
      firstName: 'Amanda',
      lastName: 'Doe',
      department: 'Accountant',
    });
    await testEmplOne.save();

    const testEmplTwo = new Employee({
      firstName: 'Jamal',
      lastName: 'Kalu',
      department: 'Testing',
    });
    await testEmplTwo.save();
  });

  it('should properly update one document with "updateOne" method', async () => {
    await Employee.updateOne(
      { firstName: 'Amanda' },
      { $set: { firstName: 'Alicia' } }
    );
    const updatedEmployee = await Employee.findOne({
      firstName: 'Alicia',
    });
    expect(updatedEmployee).to.not.be.null;
  });

  it('should properly update one document with "save" method', async () => {
    const employee = await Employee.findOne({ firstName: 'Amanda' });
    employee.firstName = 'Alicia';
    await employee.save();
    const updatedEmployee = await Employee.findOne({
      firstName: 'Alicia',
    });
    expect(updatedEmployee).to.not.be.null;
  });

  it('should properly update multiple documents with "updateMany" method', async () => {
    await Employee.updateMany({}, { $set: { firstName: 'Jamal' } });
    const employees = await Employee.find({ firstName: 'Jamal' });
    expect(employees.length).to.be.equal(2);
  });

  afterEach(async () => {
    await Employee.deleteMany();
  });
});

describe(' Employee Delete data', () => {
  beforeEach(async () => {
    const testEmplOne = new Employee({
      firstName: 'Amanda',
      lastName: 'Doe',
      department: 'Accountant',
    });
    await testEmplOne.save();

    const testEmplTwo = new Employee({
      firstName: 'Jamal',
      lastName: 'Kalu',
      department: 'Testing',
    });
    await testEmplTwo.save();
  });

  it('should properly remove one document with "deleteOne" method', async () => {
    await Employee.deleteOne({ firstName: 'Jamal' });
    const removeEmployee = await Employee.findOne({
      firstName: 'Jamal',
    });
    expect(removeEmployee).to.be.null;
  });

  it('should properly remove one document with "remove" method', async () => {
    const employee = await Employee.findOne({ firstName: 'Jamal' });
    await employee.remove();
    const removeEmployee = await Employee.findOne({
      firstName: 'Jamal',
    });
    expect(removeEmployee).to.be.null;
  });

  it('should properly remove multiple documents with "deleteMany" method', async () => {
    await Employee.deleteMany();
    const employees = await Employee.find();
    expect(employees.length).to.be.equal(0);
  });

  afterEach(async () => {
    await Employee.deleteMany();
  });
});
