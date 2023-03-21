import { capivaraCommand } from './commands/capivara';
import { commandEmployeeBase } from './commands/employee/Employee';
import { findEmployee } from './commands/employee/search/findEmployee';
import { findEmployeeByName } from './commands/employee/search/findEmployeeByName';




export const messageBuilder = [
   capivaraCommand,
   commandEmployeeBase,
   findEmployee,
   findEmployeeByName
]