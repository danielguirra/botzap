import { capivaraCommand } from './commands/capivara';
import { commandEmployeeBase } from './commands/employee/Employee';
import { findEmployee } from './commands/employee/findEmployee';
import { findEmployeeByName } from './commands/employee/findEmployeeByName';




export const messageBuilder = [
   capivaraCommand,
   commandEmployeeBase,
   findEmployee,
   findEmployeeByName
]