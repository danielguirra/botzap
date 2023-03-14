import axios from "axios";
import WAWebJS, { List } from "whatsapp-web.js";

import { URL_API } from "../../../../client/client";
import Employee from "../../../../interface/Employee";
import { Command } from "../../../../interface/MessageInterface";
import { messagesCollectArray, offCollect, onCollect } from "../../../messageCreate";

export const findEmployeeByName: Command = {
  param: "Procurar Empregado Por Nome",
  buttons: true,
  func: async function findEmployeeByName(message) {
    const chat = await message.getChat();
    await chat.sendMessage("Digite o primeiro nome do funcionario");
    questionCache(chat);
  },
  description: "Retorna a busca de empregado baseado no nome digitado",
};

function questionCache(chat: WAWebJS.Chat) {
  onCollect();

  setTimeout(async () => {
    const lastMessage = messagesCollectArray.filter(message => message.id.user === chat.id.user);
    if (lastMessage.at(-1).content !== "Digite o primeiro nome do funcionario") {
      await chat.sendMessage("vou procurar por " + lastMessage.at(-1).content);
      const searchEmployees: Employee[] | false =
        await requestFindEmployeeByName(lastMessage.at(-1).content);
      if (searchEmployees !== false) {
        const listNamesEmployees = organizeListEmployees(searchEmployees)

        for (const iterator of listNamesEmployees) {
          chat.sendMessage(iterator)
        }
      } return
    }
    questionCache(chat)
    return lastMessage
  }, 7000);

  return;
}

async function requestFindEmployeeByName(employeeName: string) {
  try {
    const finder = await axios.get(
      URL_API.employee.findByName + employeeName.toLocaleLowerCase()
    );
    if ("employees" in finder.data) {
      const employess: Employee[] = finder.data.employees;
      return employess;
    }
    throw new Error("nenhum funcionário com esse nome encontrado");
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    offCollect();
  }
}


function organizeListEmployees(searchEmployees: Employee[]) {
  let employees = []
  for (const employee of searchEmployees) {
    let sections = [
      {
        title: employee.firstName,
        rows: [
          { title: "Sobrenome", description: employee.lastName },
          { title: "CPF", description: employee.CPF },
          { title: "Cargo", description: employee.office },
        ],
      },
    ];
    let list = new List(
      "List body",
      "btnText",
      sections,
      "Title",
      "footer"
    );
    employees.push(list)

  }

  return employees
}
