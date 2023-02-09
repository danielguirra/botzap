import { Client, LocalAuth } from 'whatsapp-web.js';

export const URL_API = {
  employee: {
    findAll: process.env.URL_API_EMPLOYEE_FIND_ALL,
    findByName: process.env.URL_API_EMPLOYEE_FIND_BY_NAME,
    findByCPF: process.env.URL_API_EMPLOYEE_FIND_BY_CPF,
    findInRegister: process.env.URL_EMPLOYEE_FIND_ALL_IN_REGISTER,
    findInWork: process.env.URL_EMPLOYEE_FIND_ALL_IN_WORK,
    newEmployee: process.env.URL_API_EMPLOYEE_NEW_EMPLOYEE,
    editEmployee: process.env.URL_API_EMPLOYEE_EDIT_EMPLOYEE,
    inactiveEmployee: process.env.URL_API_EMPLOYEE_INACTIVE_EMPLOYEE,
    reactivateEmployee: process.env.URL_API_EMPLOYEE_REACTIVATE_EMPLOYEE
  },
  company: {
    findAll: process.env.URL_API_COMPANY_FIND_ALL,
    findByName: process.env.URL_API_COMPANY_FIND_NAME,
    findByCNPJ: process.env.URL_API_COMPANY_FIND_BY_CNPJ,
    newCompany: process.env.URL_API_COMPANY_NEW_COMPANY,
    editCompany: process.env.URL_API_COMPANY_EDIT_COMPANY,

  },
  payment: {
    findAllByCPF: process.env.URL_API_PAYMENT_FIND_ALL_BY_CPF,
    findAllByCNPJ: process.env.URL_API_PAYMENT_FIND_ALL_BY_CNPJ,
    findLastByCPF: process.env.URL_API_PAYMENT_FIND_LAST_BY_CPF,
    findLastByCNPJ: process.env.URL_API_PAYMENT_FIND_LAST_CNPJ,
    newToEmployee: process.env.URL_API_PAYMENT_NEW_PAYMENT_TO_EMPLOYEE,
    newToCompany: process.env.URL_API_PAYMENT_NEW_PAYMENT_TO_COMPANY,

  }
}
export const client = new Client({
  authStrategy: new LocalAuth(),
});

