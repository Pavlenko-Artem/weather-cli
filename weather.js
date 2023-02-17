#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import {
  printHelp,
  printSuccess,
  printError,
  printWeather
} from './services/log.service.js';
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

const saveCity = async (city) => {
  if (!city.length) {
    printError('Не передан город');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess(`Город сохранён`);
  } catch (error) {
    printError(error.message);
  }
};

const getForecast = async () => {
  try {
    const weather = await getWeather();
    printWeather(weather, getIcon(weather.weather[0].icon));
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
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  return getForecast();
};

initCLI();
