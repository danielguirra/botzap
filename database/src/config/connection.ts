import * as dotenv from 'dotenv';
import * as mysql from 'mysql2';

dotenv.config();

class DataBaseConnection {
   private data_base_host: string = process.env.DATABASE_HOST;
   private data_base_user: string = process.env.DATABASE_USER;
   private data_base_password: string = process.env.DATABASE_PASSWORD;
   connection = (returnConnection: boolean) => {
      if (!this.data_base_host
         || !this.data_base_user
         || !this.data_base_password)
         throw new Error('Database Connection not successful!!')
      const createConnection = mysql.createConnection({
         host: this.data_base_host,
         user: this.data_base_user,
         password: this.data_base_password
      })
      if (!createConnection) throw new Error('createConnection not successful!!')
      if (returnConnection === true)
         return createConnection
      else createConnection.connect((databaseError) => {
         if (databaseError) throw databaseError;
         console.log('Database Connection Successful')
      })
   }

}

export default DataBaseConnection