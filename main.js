import inquirer from 'inquirer';
class Student {
    constructor(ID, name, coursesEnrolled, tuitionFee) {
        this.ID = ID;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.tuitionFee = tuitionFee;
    }
}
let baseID = 10000;
let students = [];
let continueEnrollment = true;
(async () => {
    while (continueEnrollment) {
        let action = await inquirer.prompt([{
                type: 'list',
                name: 'action',
                message: 'Select an option:',
                choices: ['Enroll student', 'Show student status']
            }]);
        if (action.action === 'Enroll student') {
            let studentNamePrompt = await inquirer.prompt([{
                    type: 'input',
                    name: 'name',
                    message: 'Please enter your name:'
                }]);
            let studentName = studentNamePrompt.name.trim().toLowerCase();
            let studentNames = students.map(student => student.name);
            if (!studentNames.includes(studentName)) {
                if (studentName !== "") {
                    baseID++;
                    let studentID = `std${baseID}`;
                    console.log('\n\tYour account has been created.');
                    console.log(`Welcome, ${studentName}!`);
                    let course = await inquirer.prompt([{
                            type: 'list',
                            name: 'course',
                            message: 'Please select a course:',
                            choices: ['IT', 'ENGLISH', 'MATHS']
                        }]);
                    let tuitionFee;
                    switch (course.course) {
                        case 'IT':
                            tuitionFee = 5000;
                            break;
                        case 'ENGLISH':
                            tuitionFee = 7000;
                            break;
                        case 'MATHS':
                            tuitionFee = 9000;
                            break;
                    }
                    let courseConfirmed = await inquirer.prompt([{
                            type: 'confirm',
                            name: 'confirm',
                            message: 'Do you want to enroll in this course?'
                        }]);
                    if (courseConfirmed.confirm) {
                        let newStudent = new Student(studentID, studentName, [course.course], tuitionFee);
                        students.push(newStudent);
                        console.log('You have enrolled in the course successfully!');
                    }
                    else {
                        console.log('Enrollment cancelled.');
                    }
                }
                else {
                    console.log('Invalid name.');
                }
            }
            else {
                console.log('This name is already taken.');
            }
        }
        else if (action.action === 'Show student status') {
            if (students.length > 0) {
                let studentNames = students.map(student => student.name);
                let selectedStudent = await inquirer.prompt([{
                        type: 'list',
                        name: 'name',
                        message: 'Please select a name:',
                        choices: studentNames
                    }]);
                let foundStudent = students.find(student => student.name === selectedStudent.name);
                console.log('Student Information:');
                console.log(`ID: ${foundStudent.ID}`);
                console.log(`Name: ${foundStudent.name}`);
                console.log(`Courses Enrolled: ${foundStudent.coursesEnrolled.join(', ')}`);
                console.log(`Tuition Fee: $${foundStudent.tuitionFee}`);
                console.log('\n');
            }
            else {
                console.log('No students enrolled yet.');
            }
        }
        let userConfirmation = await inquirer.prompt([{
                type: 'confirm',
                name: 'continue',
                message: 'Do you want to continue?'
            }]);
        continueEnrollment = userConfirmation.continue;
    }
})();
