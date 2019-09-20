[![Build status](https://dev.azure.com/4lch4/Guild%20Emblem%20Generator/_apis/build/status/Guild%20Emblem%20Generator)](https://dev.azure.com/4lch4/Guild%20Emblem%20Generator/_build/latest?definitionId=4)
[![Dependencies Status](https://david-dm.org/TeamJeeves/Guild-Emblem-Generator/status.svg)](https://david-dm.org/TeamJeeves/Guild-Emblem-Generator)
[![devDependencies Status](https://david-dm.org/TeamJeeves/Guild-Emblem-Generator/dev-status.svg)](https://david-dm.org/TeamJeeves/Guild-Emblem-Generator?type=dev)


[![Standard-Js](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com/)
[![GitHub license](https://img.shields.io/github/license/TeamJeeves/Guild-Emblem-Generator.svg?style=flat-square)](https://github.com/TeamJeeves/Guild-Emblem-Generator/blob/master/LICENSE.md)

# Guild-Emblem-Generator

The Guild-Emblem-Generator is a tool written in Node.js to convert emblem and
guild objects obtained via the Battle.net API into actual images. You can
convert the object into a buffer or a Canvas.

## Usage

You can use the emblem generator a few different ways. As of 1.2.0, the helper
classes have been exported as part of the module in case you wish to expand on
the basic methods that are exported by default.

For examples on how to use the base module, take a look in the examples folder
where we have a file for each of the exported methods.

## SaveEmblemToFile options

The options for the `saveEmblemToFile()` method are the same options available
to the `fs.writeFile()` method that is present in node by default. For more
information, please see the [node.js documentation](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
on the method.