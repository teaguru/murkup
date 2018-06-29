
# Frontend starter

1. [Установка](#setup)
2. [Запуск проекта](#launch)

## Установка
#### 1. Установите Node / Yarn / NPM
[Node.js](https://nodejs.org/en/),
[Yarn docs](https://yarnpkg.com/lang/en/docs/install/), 
[NPM docs](https://docs.npmjs.com/getting-started/installing-node) 

#### 2. Склонируйте проект из репозитория в рабочую папку
```
git clone git@gitlab.dev.idpowers.com:idpowers/frontend-starter.git
```
#### 3. Из корня проекта установите зависимости
```
yarn install / npm install
```

## Запуск проекта
Для сборки стилей, шрифтов, картинок и шаблонов используем
```
gulp / gulp build
```

Для скриптов используем `webpack` и запускаем с помощью следующих команд:
```
npm run dev / npm run watch / npm run build
```

проект работает на [http://localhost:9000](http://localhost:9000)