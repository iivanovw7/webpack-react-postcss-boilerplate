/**
 * Contains webpack plugins.
 * @module _/tool/plugins
 */
const fs = require('fs');
const path = require('path');

const ENCODING = 'utf-8';

/**
 * TypesGenerator class.
 * Contains method for generation file names union `type.ts` file, based on files found inside path folder.
 *  @see {@link module:_/config/webpack/dev}
 */
class TypesGenerator {

    /**
     * TypesGenerator paths.
     * @typedef {object} module:_/tool/plugins~TypesGeneratorPaths
     * @property {string} pathToFileFolder - files path.
     * @property {string} pathToTypesFile - generated types path.
     */

    /**
     * TypesGenerator Output.
     * @typedef {object} module:_/tool/plugins~TypesGeneratorOutput
     * @property {string} filename - output filename.
     */

    /**
     * TypesGenerator options.
     * @typedef {object} module:_/tool/plugins~TypesGeneratorOptions
     * @property {string} entry - target files folder path.
     * @property {string} folderName - target files folder name.
     * @property {string} typeAlias - type alias name.
     * @property {module:_/tool/plugins~TypesGeneratorOutput} output - generator output config.
     */

    /**
     * Crates class instance.
     * @param {module:_/tool/plugins~TypesGeneratorOptions} options - generator options.
     */
    constructor(options) {
        this.options = options;
        this.paths = this.createPaths();
    }

    /**
     * Creates base file paths.
     * @return {module:_/tool/plugins~TypesGeneratorPaths} paths object.
     */
    createPaths() {
        const { entry, output: { filename }, folderName } = this.options;
        const mainDirectory = path.resolve(process.cwd(), entry);

        return {
            pathToFileFolder: path.resolve(mainDirectory, folderName || ''),
            pathToTypesFile: path.resolve(mainDirectory, filename),
        };
    }

    /**
     * Method creates `type.ts` file.
     * @param {Object} compiler - The Compiler module is the main engine that creates a compilation instance with options.
     *  @see {@link https://webpack.js.org/api/compiler-hooks/}
     */
    apply(compiler) {
        const { typeAlias } = this.options;

        compiler.hooks.done.tap('TypesGenerator', () => {
            const { pathToTypesFile, pathToFileFolder } = this.paths;

            fs.readdir(pathToFileFolder, ENCODING, (error, paths) => {
                const files = paths.map((fileName) => path.parse(fileName).name);
                const toWrite = `// AUTOGENERATED\nexport type ${typeAlias} =\n\t| '${files.join("'\n\t| '")}';\n`;

                fs.readFile(
                    pathToTypesFile,
                    ENCODING,
                    (err, result) => {
                        if (result !== toWrite) {
                            fs.writeFile(
                                pathToTypesFile,
                                toWrite,
                                () => {
                                    // eslint-disable-next-line no-console
                                    console.log(`✓ Updated types for alias ${typeAlias}.`);
                                }
                            );
                        }
                    }
                );
            });
        });
    }
}

module.exports = {
    TypesGenerator
};
