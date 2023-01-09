import DataBaseConnection from '../config/connection';




const createDataBase = new DataBaseConnection().connection(true)
createDataBase.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");
   createDataBase.query("CREATE DATABASE tg", function (err, result) {
      if (err) throw err;
      console.log("Database created");
      createDataBase.end
   });
   createDataBase.destroy()
});

export default createDataBase