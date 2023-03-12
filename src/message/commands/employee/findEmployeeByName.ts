import axios from "axios";
import * as fs from "fs";
import { List } from "whatsapp-web.js";

import { URL_API } from "../../../client/client";
import Employee from "../../../interface/Employee";
import { Command } from "../../../interface/MessageInterface";
import { offCollect, onCollect } from "../../messageCreate";

export const findEmployeeByName: Command = {
  param: "Procurar Empregado Por Nome",
  buttons: true,
  func: async function findEmployeeByName(message) {
    const chat = await message.getChat();
    chat.sendMessage("Digite o primeiro nome do funcionario").then(() => {
      let sections = [
        {
          title: "employee.firstName",
          rows: [
            { title: "ListItem1", description: "desc" },
            { title: "ListItem2" },
          ],
        },
      ];
      let list: any = new List(
        "List body",
        "btnText",
        sections,
        "Title",
        "footer"
      );
      console.log(list);
      chat.sendMessage(message.to, list);
    });
  },
  description: "Retorna a busca de empregado baseado no nome digitado",
};

function questionCache(chat) {
  onCollect();
  setTimeout(async () => {
    const lastMessage = fs.readFileSync(
      "./cache/" + chat.id.user + ".txt",
      "utf-8"
    );
    if (lastMessage !== "Digite o primeiro nome do funcionario") {
      chat.sendMessage("vou procurar por " + lastMessage);
      const searchEmployees: Employee[] | false =
        await requestFindEmployeeByName(lastMessage);
      if (searchEmployees !== false) {
        for (const employee of searchEmployees) {
          let sections = [
            {
              title: employee.firstName,
              rows: [
                { title: "ListItem1", description: "desc" },
                { title: "ListItem2" },
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
        }
      }
      return lastMessage;
    }
    questionCache(chat);
  }, 7000);
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
