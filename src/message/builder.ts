import { capivaraCommand } from './commands/capivara';
import { commandEmployeeBase } from './commands/employee/Employee';
import { findEmployee } from './commands/employee/finder/findEmployee';
import { findEmployeeByName } from './commands/employee/finder/findEmployeeByName';




export const messageBuilder = [
   capivaraCommand,
   commandEmployeeBase,
   findEmployee,
   findEmployeeByName
]