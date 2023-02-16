#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан token');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess(`Токен сохранён`);
  } catch (error) {
    printError(error.message);
  }
};

const getForecast = async () => {
  try {
    const weather = await getWeather(process.env.CITY);
    console.log(weather);
  } catch (error) {
    if (error?.response?.status === 404) {
      printError('Неверно указан город');
    } else if (error?.response?.status === 401) {
      printError('Неверно указан токен');
    } else {
      printError(error.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }
  if (args.s) {
    /** Сохранить город */
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getForecast();
};

initCLI();
