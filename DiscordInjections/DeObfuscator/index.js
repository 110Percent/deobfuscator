const Plugin = module.parent.require('../Structures/Plugin');
const ObfusRegex = /^([A-z]+)-(?![^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])/;

let deobfuscateInterval = null;

class deObfuscator extends Plugin {
    constructor(...args) {
        super(...args);
        deobfuscateInterval = setInterval(function() {
            var items = document.body.getElementsByTagName('*');
            var classes = [];

            for (let i of items)
                if (i.className != '') classes.push(i);
            classes = classes.filter(e => !(e.className instanceof SVGAnimatedString));
            classes.forEach(e => e.classList.forEach(c => { if (ObfusRegex.test(c) && !e.className.includes(' ' + c.match(ObfusRegex)[0].slice(0, -1))) e.className += ' ' + c.match(ObfusRegex)[0].slice(0, -1) }));

            this.log('%c[DiscordDeobfuscate] %cDeobfuscated DOM elements', 'color: #7289DA', 'color: inherit');
        }, 1000);
    }

    unload() {
        deobfuscateInterval = null;
    }

    get configTemplate() {
        return {
            // The color is used for the `this.log()` function and also custom command help
            color: 'aaaaaa',
            // The optional icon to use with the `this.sendLocalMessage` function. If left blank, a default one will be used instead
            iconURL: ''
        };
    }
}

module.exports = deObfuscator;