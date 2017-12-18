var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
    default() {
        console.log("Hello World!");
    }
    writing() {
        this.fs.copy(
            this.templatePath('./**/*'),
            this.destinationPath('./')
        );
        this.fs.copy(
            this.templatePath('./**/.*'),
            this.destinationPath('./')
        );
    }

}
