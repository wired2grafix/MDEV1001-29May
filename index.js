const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(function(){
    db.run("CREATE TABLE Instructor (ID NUMBER, Name TEXT, Dept_name TEXT, Salary NUMBER)");

    db.run("INSERT INTO Instructor VALUES(10101, 'Sirivisan', 'Comp.Sci.', 65000)");
    db.run("INSERT INTO Instructor VALUES(12121, 'Wu', 'Finance', 90000)");
    db.run("INSERT INTO Instructor VALUES(15151, 'Mozart', 'Music',90000)");
    db.run("INSERT INTO Instructor VALUES(222222, 'Einstein', 'Physics', 95000)");
    db.run("INSERT INTO Instructor VALUES(32343, 'El Said', 'History', 62000)");
    db.run("INSERT INTO Instructor VALUES(3456, 'Gold', 'Physics', 87000)");
    db.run("INSERT INTO Instructor VALUES(45565, 'Katz', 'Comp.Sci.', 75000)");
    db.run("INSERT INTO Instructor VALUES(585583, 'Califieri', 'History', 62000)");
    db.run("INSERT INTO Instructor VALUES(76543, 'Singh', 'Finance', 80000)");
    db.run("INSERT INTO Instructor VALUES(76766, 'Crick', 'Biology', 72000)");
    db.run("INSERT INTO Instructor VALUES(83821, 'Brandt', 'Comp.Sci.', 92000)");
    db.run("INSERT INTO Instructor VALUES(98345, 'Kim', 'Elec.Eng.', 80000)");

    db.run("CREATE TABLE Teaches (ID NUMBER, Course_id TEXT, Sec_id NUMBER, Semester TEXT, Year NUMBER)");

    db.run("INSERT INTO Teaches VALUES(10101, 'CS-101', '1', 'Fall', 2009)");
    db.run("INSERT INTO Teaches VALUES(10101, 'CS-315', '1', 'Spring', 2010)");
    db.run("INSERT INTO Teaches VALUES(10101, 'CS-347', '1', 'Fall', 2019)");
    db.run("INSERT INTO Teaches VALUES(12121, 'FIN-201', '1', 'Spring', 2009)");
    db.run("INSERT INTO Teaches VALUES(15151, 'MU-199', '1', 'Spring', 2010)");
    db.run("INSERT INTO Teaches VALUES(22222, 'PHY-101', '1', 'Fall', 2009)");
    db.run("INSERT INTO Teaches VALUES(23343, 'HIS-351', '1', 'Spring', 2010)");
    db.run("INSERT INTO Teaches VALUES(45565, 'CS-101', '1', 'Spring', 2009)");
    db.run("INSERT INTO Teaches VALUES(45565, 'CS-319', '1', 'Spring', 2010)");
    db.run("INSERT INTO Teaches VALUES(76766, 'BIO-101', '1', 'Summer', 2009)");
    db.run("INSERT INTO Teaches VALUES(76766, 'BIO-301', '1', 'Summer', 2010)");
    db.run("INSERT INTO Teaches VALUES(83821, 'CS-190', '1', 'Spring', 2009)");
    db.run("INSERT INTO Teaches VALUES(83821, 'CS-190', '2', 'Spring', 2009)");
    db.run("INSERT INTO Teaches VALUES(83821, 'CS-319', '1', 'Spring', 2010)");
    db.run("INSERT INTO Teaches VALUES(98345, 'EE-181', '1', 'Spring', 2009)");

    //Match Teaches and Instructor with the same ID
    // Print Name and course id

    /* db.each("SELECT Instructor.Name, Teaches.Course_id AS Course FROM Instructor INNER JOIN \ Teaches ON Teaches.ID = Instructor.ID", function(err,row){
        if(err)
            console.log(err);
        console.log(row);
     });
 */
/*      db.each("SELECT Instructor.Name, Teaches.Course_id FROM Instructor, Teaches \ WHERE Teaches.ID = Instructor.ID", function(err,row){
         if(err)
            console.log(err);
        console.log(row);
    }); */

/*     db.each("SELECT * FROM Instructor NATURAL JOIN Teaches", function(err,row){
        if(err)
            console.log(err);
        console.log(row);
    }); */

    db.run("CREATE TABLE Student (ID NUMBER, Name TEXT, Dept_name TEXT, Tot_cred NUMBER)");

    db.run("INSERT INTO Student VALUES(00128, 'Zhang', 'Comp. Sci.', 102)");
    db.run("INSERT INTO Student VALUES(00128, 'Snow', 'Physics', 0)");

    db.run("CREATE TABLE Takes (ID NUMBER, Course_id TEXT, Sec_id NUMBER, Semester TEXT, Year NUMBER, Grade TEXT)");

    db.run("INSERT INTO Takes VALUES(00128, 'CS-101', 1, 'Fall', 2009, 'A')");
    db.run("INSERT INTO Takes VALUES(00128, 'CS-347', 1, 'Fall', 2009, 'A-')");

    //Display all the courses a student has taken

/*     db.all("SELECT * FROM Student, Takes WHERE Student.ID = Takes.ID", function(err,row){
        if(err)
            console.log(err)
        console.log(row);
    }); */

    //Display all students and the courses  they've taken
    //Student name and course name

/*     db.all("SELECT Student.Name, Takes.Course_id FROM Student \ NATURAL LEFT OUTER JOIN Takes",function(err,row){
        if(err)
            console.log(err);
        console.log(row);
    }); */

    //Display all students and the courses they've taken using views
    //Student name and course name semester
    //Let's use a view that included all of the attributes

    db.run("CREATE VIEW studentCourses AS \ SELECT * FROM Student \ NATURAL LEFT OUTER JOIN Takes");

    db.each("SELECT * FROM studentCourses", function(err,row){
        //console.log(row);
    });

    db.each("SELECT studentCourses.Name, studentCourses.Course_id FROM studentCourses",function(err,row){
        console.log(row);
    });

});