import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(`${chalk.bgRed(` ERROR `)} ${error}`);
};

const printSuccess = (message) => {
  console.log(`${chalk.bgGreen(` SUCCESS `)} ${message}`);
};
// 0fd0e0e255958e88fc5f8b1cc04dcea4

const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
  `)
  );
};

export { printError, printSuccess, printHelp };
