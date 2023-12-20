#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const patterns = require("./patterns.json");

const generatedStructure = {
  folders: [],
  files: {},
};

program
  .version("1.0.0")
  .command("generate <tipo>")
  .option("-f, --force", "Criar estrutura sem perguntar")
  .description("CLI para criar estrutura")
  .action((tipo, options) => {
    const folders = patterns[tipo]?.folders;
    const currentDir = process.cwd();

    if (!folders) {
      console.log("Tipo não encontrado ou estrutura de pastas não definida.");
      return;
    }

    let currentFolderIndex = 0;

    function createFilesInFolder() {
      const currentFolder = folders[currentFolderIndex];
      const folderPath = path.join(currentDir, currentFolder);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log(`Pasta "${currentFolder}" criada.`);
      } else {
        console.log(`Pasta "${currentFolder}" já existe.`);
      }

      generatedStructure.folders.push(currentFolder);

      function askFileName() {
        const interface = options.force ? null : require("readline").createInterface({ input: process.stdin, output: process.stdout });

        const question = options.force ? "" : `Digite o nome do arquivo (ou "ok" para continuar para a próxima pasta): `;
        options

        interface?.question(question, (fileName) => {
          const name = fileName.replace(".js", "");

          if (fileName.toLowerCase() === "ok") {
            interface?.close();
            currentFolderIndex++;

            if (currentFolderIndex < folders.length) {
              createFilesInFolder();
              return;
            }

            displayGeneratedStructure();
            return;
          }

          const filePath = path.join(folderPath, name);
          if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "");
            console.log(`Arquivo "${name}" criado.`);
          } else {
            console.log(`Arquivo "${name}" já existe.`);
          }

          if (!generatedStructure.files[currentFolder]) {
            generatedStructure.files[currentFolder] = [];
          }
          generatedStructure.files[currentFolder].push(fileName);
          askFileName();
        });
      }

      if (!options.force) {
        askFileName();
      } else {
        if (!isLastFolder()) {
          currentFolderIndex++;
          createFilesInFolder();
        } else {
          displayGeneratedStructure();
        }
      }
    }

    function displayGeneratedStructure() {
      console.log("************* ESTRUTURA GERADA *************");
      for (const folder in generatedStructure.files) {
        console.log(`\n${folder}:`);
        generatedStructure.files[folder].forEach((file) => {
          console.log(`- ${file}`);
        });
      }
    }

    function isLastFolder() {
      return currentFolderIndex === folders.length - 1;
    }

    createFilesInFolder();
  });

program.parse(process.argv);
