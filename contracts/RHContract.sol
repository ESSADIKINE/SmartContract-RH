// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RHContract {
    address public owner;

    struct Employee {
        address addr;
        string name;
        string poste;
        uint salaire;
    }

    mapping(address => Employee) private employees;
    address[] private employeeAddresses;

    modifier onlyOwner() {
        require(msg.sender == owner, "Seul l'admin peut faire cela");
        _;
    }

    modifier onlyEmployee() {
        require(employees[msg.sender].addr != address(0), "Vous n'etes pas employe");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Ajouter un employé (admin seulement)
    function addEmployee(address _addr, string memory _name, string memory _poste, uint _salaire) public onlyOwner {
        require(_addr != address(0), "Adresse invalide");
        require(employees[_addr].addr == address(0), "Employe existe deja");
        employees[_addr] = Employee(_addr, _name, _poste, _salaire);
        employeeAddresses.push(_addr);
    }

    // Voir ses propres infos (employé connecté)
    function getMyInfo() public view onlyEmployee returns (string memory, string memory, uint) {
        Employee memory emp = employees[msg.sender];
        return (emp.name, emp.poste, emp.salaire);
    }

    // Voir la liste de tous les employés (admin seulement)
    function getAllEmployees() public view onlyOwner returns (Employee[] memory) {
        Employee[] memory list = new Employee[](employeeAddresses.length);
        for (uint i = 0; i < employeeAddresses.length; i++) {
            list[i] = employees[employeeAddresses[i]];
        }
        return list;
    }
} 