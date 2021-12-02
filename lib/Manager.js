const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeIDNumber) {
        super(name,id,email);
        this.officeIDNumber = officeIDNumber;
    }

    getOfficeNumber() {
        return this.officeIDNumber;
    }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;