// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GradesManager {
    address public teacher;
    mapping(address => uint8) private grades;

    event GradeSet(address indexed student, uint8 grade);

    modifier onlyTeacher() {
        require(msg.sender == teacher, "Only teacher can set grades");
        _;
    }

    constructor() {
        teacher = msg.sender;
    }

    function setGrade(address student, uint8 grade) external onlyTeacher {
        require(student != address(0), "Invalid student address");
        require(grade <= 100, "Grade must be between 0 and 100");
        grades[student] = grade;
        emit GradeSet(student, grade);
    }

    function getMyGrade() external view returns (uint8) {
        return grades[msg.sender];
    }

    function getGrade(address student) external view returns (uint8) {
        return grades[student];
    }
}
