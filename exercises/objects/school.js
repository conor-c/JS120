function School() {
  return {
    students: [],
    courses: [],

    addCourse(course) {
      this.courses.push(course);
    },

    addStudent(name, year) {
      if (!['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
        console.log("Invalid Year");
      } else {
        let newStudent = createStudent(name, year);
        this.students.push(newStudent);
      }
    },

    enrollStudent(studentName, course) {
      let student = this.findStudent(studentName);
      if (!student) {
        console.log('Error finding student');
        return;
      }

      let schoolCourse = this.findCourse(course);
      if (schoolCourse) {
        student.addCourse(course);
        schoolCourse.enrolled.push(student);
      }
    },

    findCourse(courseObj) {
      if (typeof courseObj === 'string') {
        return this.courses.find(course => course.name === courseObj);
      } else if (typeof courseObj === 'number') {
        return this.courses.find(course => course.code === courseObj);
      }
      return this.courses.find(course => courseObj.name === course.name && courseObj.code === course.code);
    },

    findStudent(studentName) {
      return this.students.find(student => student.name === studentName);
    },

    addGrade(studentName, courseObj, grade) {
      let student = this.findStudent(studentName);
      let foundCourse;

      if (student) {
        foundCourse = student.courses.find(course => {
          return course.name === courseObj.name && course.code === courseObj.code;
        });
      } else {
        console.log("There is no enrolled student by that name"); //doesn't check for capitals
        return;
      }
 
      if (foundCourse) {
        foundCourse.grade = grade;
      } else {
        console.log("There is no class by that name and code");
        return;
      }
    },

    getReportCard(studentName) {
      let student = this.findStudent(studentName);
      if (student) {
        student.courses.forEach(course => {
          if (course.grade) {
            console.log(`${course.name}: ${course.grade}`);
          } else {
            console.log(`${course.name}: In progress`);
          }
        })
      } else {
        console.log("There is no enrolled student by that name");
      }
    },

    courseReport(course) {
      let courseToReport = this.findCourse(course);
      if (!courseToReport) {
        console.log("Can't find that course, sorry.");
        return;
      }

      let studentsEnrolled = courseToReport.enrolled.length;
      let averageGrade = 0;
      
      if (studentsEnrolled) {
        console.log(`=${courseToReport.name} Grades=`);
        courseToReport.enrolled.forEach(studentInCourse => {
          let studentGrade = studentInCourse.courses.find(studentCourse => studentCourse.name === courseToReport.name).grade
          averageGrade += studentGrade;
          console.log(`${studentInCourse.name}: ${studentGrade ? studentGrade : "Not Graded"}`);
        });
        console.log("---");
        console.log(`Course Average: ${averageGrade / studentsEnrolled}`)
      } else {
        console.log(`=${courseToReport.name} Grades=`);
        console.log("Nobody seems to be enrolled in that course");
        console.log("---");
        return undefined;
      }
    },
  }
}

function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      console.log(this.courses);
    },

    addNote(courseCode, note) {
      this.courses.forEach(course => {
        if (course.code === courseCode) {
          course.note ? course.note += `; ${note}` : course.note = note;
        }
      });
    },

    updateNote(courseCode, note) {
      this.courses.forEach(course => {
        if (course.code === courseCode) {
          course.note = note;
        }
      })
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) console.log(`${course.name}: ${course.note}`);
      });
    }
  }
}

// let foo = createStudent('foo', '3rd');
// foo.info();
// foo.addCourse({ name: 'Math', code: 101 });
// foo.listCourses();

let school = School();
school.addCourse({name: 'Math', code: 101, enrolled: []});
school.addCourse({name: 'Advanced Math', code: 102, enrolled: []});
school.addCourse({name: 'Physics', code: 202, enrolled: []});


school.addStudent('foo', '3rd')
school.enrollStudent('foo', { name: 'Math', code: 101, })
school.enrollStudent('foo', {name: 'Advanced Math', code: 102,});

school.addGrade('foo', { name: "Math", code: 101}, 99)
console.log(school.students[0].courses)
school.getReportCard('foo');
console.log(school.courses[0].enrolled);
school.courseReport('Math')
school.courseReport(102);
school.courseReport({name: 'Physics', code: 202});

