var employeeListApp = angular.module('employeeListApp', []);

class Person {
    constructor(id, name, email, phone, address, picture, nationality, salary) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.picture = picture;
        this.nationality = nationality;
        this.salary = salary;
    }

    toString() {
        return '${this.name.toString()} ${this.email} ${this.phone} ${this.address.toString()} ${this.nationality} ${this.salary}'
    }
}

class Name {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    toString() {
        return '${this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1)} ${this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1)}'
    }
}

class Location {
    constructor(city, postcode, state, street) {
        this.city = city;
        this.postcode = postcode;
        this.state = state;
        this.street = street;
    }

    toString() {
        return '${this.postcode}, ${this.city}, ${this.state}, ${this.street}'
    }
}

function randomUserToPerson(user) {
    var salary = (parseInt(Math.floor(Math.random() * 40) + 10)) * 1000;
    var name = new Name(user.name.first, user.name.last);
    var location = new Location(user.location.city, user.location.postcode, user.location.state, user.location.street)
    var person = new Person(user.login.username, name, user.email, user.phone, location, user.picture.large, user.nat, salary);
    return person;
}

employeeListApp.controller('EmployeeListController', function EmployeeListController($scope) {
    $scope.employees = [];
    $scope.LoadData = function () {
        $.ajax({
            url: 'https://randomuser.me/api/?nat=dk,gb,us&inc=name,phone,email,location,picture,login,nat&results=20',
            dataType: 'json',
            success: function (r) {
                var data = r.results.map(randomUserToPerson);
                $scope.employees = data;
                $scope.$apply();
            }
        });
    }
});