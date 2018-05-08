[![Dependencies Status](https://david-dm.org/blizzardbots/Guild-Emblem-Generator/status.svg)](https://david-dm.org/blizzardbots/Guild-Emblem-Generator)
[![Standard-Js](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

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
information, please see the [node.js documenation](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
on the method.