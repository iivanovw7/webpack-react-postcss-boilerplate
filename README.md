## webpack-react-postcss-boilerplate

Boilerplate of react typescript application, bundled with webpack 5. Supports css in js via `astroturf` and `postcss`.

---
### Table of Contents

- [Requirements](#requirements)
- [Libs](#libs)
- [Clone](#clone)
- [Installation](#installation)
- [Development](#development)
- [Configuration](#configuration)
- [Files](#files)
- [ToDo](#todo)
- [License](#license)

---
### Requirements

- [NodeJS 15.x](https://nodejs.org/en/)
- [NPM 7.19.0](https://www.npmjs.com/get-npm)
---
### Libs

Technologies used
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [astroturf](https://4catalyzer.github.io/astroturf/)
- [postcss](https://github.com/postcss/postcss)
- [Jest](https://jestjs.io/)
- [Babel](http://babeljs.io)
- [Webpack](https://webpack.js.org/)
- [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)
- [Gulp](https://gulpjs.com/)
- [ESLint](https://eslint.org)
- [stylelint](https://stylelint.io)
- [typescript](https://www.typescriptlang.org/)

---
### Clone

- Clone repository: <br />
  `git clone https://github.com/iivanovw7/webpack-react-postcss-boilerplate.git` <br />

---
### Installation

- Navigate into the application directory <br />
  `cd webpack-react-postcss-boilerplate` <br />
- Installing setup modules: <br />
  `npm install` <br />
- Running in dev mode: <br />
  `npm run dev` <br />
- Running in dev mode with dashboard: <br />
  `npm run dev:dashboard` <br />
- Create production build: <br />
  `npm run build` <br />
- Running tests: <br />
  `npm run test` <br />
- Create test coverage report in `dist/coverage`: <br />
  `npm run coverage` <br />
- Serve local build for preview: <br />
  `npm run view` <br />

---
### Development

- Run dev server <br />
  `npm run dev`
- Run dev server with [dashboard](https://www.npmjs.com/package/webpack-dashboard) <br />
  `npm run dev:dashboard`
- Generate production build.
  `npm run build`
- Serve production build at configured port <br />
  `npm run view`
- Lint `css`, `js` and `ts` files
  `npm run lint`
- Lint with js and ts files with fix options enabled <br />
  `npm run lint:js:fix`

---
### Configuration

---
#### Application ports.

Application port could be set up via CLI (`npm run dev -- --port=999`).
Default ports `4425` and `4426` are going to be used otherwise (see `_/tool/env` file).

---
#### Additional configuration using CLI

Additional arguments could be added to `npm run dev`, `npm run dev:dashboard`, `npm run build` after `--`:
* `--source-maps` {string | false} [false] - creates [source maps](https://webpack.js.org/configuration/devtool/).
* `--zip` {string | boolean} [false] - creates archive in `./dist` folder (uses `archive` filename by default, if called with `boolean`, or sets custom filename in case it was called with `string`).
* `--stats` {boolean} [false] - creates `stats.json` file in `./dist` folder.
* `--port` {number} [false] - will serve application at custom port.
* Examples:
* `npm run build -- --source-map=true`
* `npm run build -- --zip=true`
* `npm run build -- --zip=build`
* `npm run build -- --port=9999`
* `npm run build -- --stats --zip`

---
### Files
Contains information about main configuration files and folders.

`./.nvmrc` -- contains current Node.js version.

`./.stylelintrc` -- contains stylelint configuration.

`./assets` -- folder contains application resources (images, svg, fonts and etc...)

`./config/jsdoc` -- contains JSDoc setup.

`./config/webpack` -- contains webpack config files.

`./gulpfile.js` -- contains gulp config.

`./src/` -- main application folder.

`./src/config` -- contains application config.

`./src/service` -- logic relate to data acquisition.

`./src/template` -- html template file.

`./src/types` -- additional ts types.

`./src/ui` -- contains application ui related files, such as pages components, styles, etc.

`./src/utils` -- contains application config.

`./tool` -- contains additional scripts used during build, testing, debugging, etc.

### License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2021 © <a href="https://github.com/iivanovw7/webpack-react-postcss-boilerplate" target="_blank">webpack-react-postcss-boilerplate</a>

