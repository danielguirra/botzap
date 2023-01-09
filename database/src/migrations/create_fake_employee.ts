import { DataBaseCreateEmployee } from '../config/post';


const fakeEmployee = new DataBaseCreateEmployee().createNewEmployee(
   {
      address: 'cassiano',
      name: 'daniel',
      CPF: 12345679102,
      office: 'admin',
      telephone: '123132132132',
      wage: 1000.01
   })
const fakeEmployee2 = new DataBaseCreateEmployee().createNewEmployee(
   {
      address: 'cassiano2',
      name: 'daniela',
      office: 'admin',
      CPF: 12345678930,
      telephone: '12313213212',
      wage: 999.01
   })

console.log(fakeEmployee)