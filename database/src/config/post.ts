import { newEmployee } from 'database/interface/Employee';
import { ErrorDataBase } from 'database/interface/Error';

import DataBaseConnection from './connection';



export class DataBaseCreateEmployee extends DataBaseConnection {
   constructor() {
      super()
   }

   createNewEmployee = (newEmployee: newEmployee) => {

      try {
         newEmployee = verifyEmployee(newEmployee)
         const newConnection = this.connection(true)
         newConnection.connect((databaseError) => {
            if (databaseError) throw databaseError;
            newConnection.query(queryMakeToSaveEmployee(newEmployee), (err, result) => {
               if (err) throw err;
               console.log('new Employee: ' + newEmployee.name)
            })
         })
         return true
      } catch (error) {
         if (error) {
            let newError: ErrorDataBase = {
               database: 'tg',
               erroMessage: error.message
            }
            return newError
         }

      }
   }
}



function verifyEmployee(eemployee: newEmployee) {
   if (typeof eemployee.name != 'string') throw new Error('name not string type');
   if (typeof eemployee.address != 'string') throw new Error('address not string type');
   if (typeof eemployee.office != 'string') throw new Error('office not string type');
   if (typeof eemployee.telephone != 'string') throw new Error('telephone not string type');
   if (typeof eemployee.wage != 'number') throw new Error('wage not string type');
   if (typeof eemployee.CPF != 'number' || eemployee.CPF.toString().length < 11) throw new Error('CPF not number type');
   return eemployee
}


function queryMakeToSaveEmployee(employee: newEmployee) {
   const queryEmployee = `INSERT INTO tg.employee (name, address, office, telephone, wage) VALUES ('${employee.name}', '${employee.address}', '${employee.office}', '${employee.telephone}', '${employee.wage}')`;
   return queryEmployee
}