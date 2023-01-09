import DataBaseConnection from '../config/connection';




const createTableEmployee = new DataBaseConnection().connection(true)
try {
   createTableEmployee.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      createTableEmployee.query("CREATE TABLE tg.employee (id int NOT NULL AUTO_INCREMENT ,CPF int(30) NOT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL,telephone VARCHAR(30),office varchar(30) NOT NULL,wage DECIMAL(30,2) NOT NULL, PRIMARY KEY(id))", function (err, result) {
         if (err) throw err;
         console.log("TABLE employee created!");
      });

   });
} catch (error) {
   console.log(error)
} finally {
   createTableEmployee.end(function (err) {
      if (err) {
         return new Error('error:' + err.message);
      }
      console.log('Close the database connection.');
   }); ''
}

export default createTableEmployee