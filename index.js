/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const SourceMapSupport = __webpack_require__(/*! source-map-support */ "source-map-support");
const read_complex_modifications_1 = __webpack_require__(/*! ./read_complex_modifications */ "./src/read_complex_modifications.ts");
const read_rules_1 = __webpack_require__(/*! ./read_rules */ "./src/read_rules.ts");
const write_rules_1 = __webpack_require__(/*! ./write_rules */ "./src/write_rules.ts");
SourceMapSupport.install();
let files = read_complex_modifications_1.read_complex_modifications(~process.argv.indexOf("--json")
    ? process.argv[process.argv.indexOf("--json") + 1]
    : __dirname);
if (!files.length) {
    console.error("missing setting json files");
    process.exit(1);
}
let rules = read_rules_1.read_rules(files);
if (~process.argv.indexOf("--update")) {
    write_rules_1.write_rules(rules);
}
else {
    console.log({
        title: "private settings",
        rules: rules,
    });
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./src/read_complex_modifications.ts":
/*!*******************************************!*\
  !*** ./src/read_complex_modifications.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(/*! fs */ "fs");
function read_complex_modifications(dirname) {
    return fs
        .readdirSync(dirname)
        .filter(file => file.match(/\.json$/))
        .map(file => {
        let path = `${dirname}/${file}`;
        return {
            fileName: file,
            textContent: String(fs.readFileSync(path)),
        };
    });
}
exports.read_complex_modifications = read_complex_modifications;


/***/ }),

/***/ "./src/read_rules.ts":
/*!***************************!*\
  !*** ./src/read_rules.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const make_rules_1 = __webpack_require__(/*! ./rules/make_rules */ "./src/rules/make_rules.ts");
const only_filter_1 = __webpack_require__(/*! ./rules/only_filter */ "./src/rules/only_filter.ts");
function read_rules(files) {
    let results = files.map(file => {
        try {
            return make_rules_1.make_rules(file);
        }
        catch (e) {
            console.error(e.message, file.fileName);
        }
    });
    return only_filter_1.only_filter(results);
}
exports.read_rules = read_rules;


/***/ }),

/***/ "./src/rules/json_to_rule.ts":
/*!***********************************!*\
  !*** ./src/rules/json_to_rule.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function json_to_rule(json) {
    if (json.length) {
        if (json.find(rule => rule.description)) {
            return json;
        }
        return [
            {
                manipulators: json,
            },
        ];
    }
    return json.rules || [json];
}
exports.json_to_rule = json_to_rule;


/***/ }),

/***/ "./src/rules/make_rule.ts":
/*!********************************!*\
  !*** ./src/rules/make_rule.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function make_rule(rule) {
    if (rule.length) {
        return {
            manipulators: rule,
        };
    }
    if (rule[":manipulators"]) {
        rule.manipulators = (rule.manipulators || []).concat(rule[":manipulators"]);
        delete rule[":manipulators"];
    }
    return rule;
}
exports.make_rule = make_rule;


/***/ }),

/***/ "./src/rules/make_rules.ts":
/*!*********************************!*\
  !*** ./src/rules/make_rules.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const json_to_rule_1 = __webpack_require__(/*! ./json_to_rule */ "./src/rules/json_to_rule.ts");
const map_rule_1 = __webpack_require__(/*! ./map_rule */ "./src/rules/map_rule.ts");
const make_rule_1 = __webpack_require__(/*! ./make_rule */ "./src/rules/make_rule.ts");
function make_rules(file) {
    let json = eval(`(${file.textContent})`);
    let rules = json_to_rule_1.json_to_rule(json).map(rule => make_rule_1.make_rule(rule));
    let only = false;
    if (rules.find(rule => rule[":only"])) {
        only = true;
        rules = rules.filter(rule => rule[":only"]).map(rule => {
            delete rule[":only"];
            return rule;
        });
    }
    return {
        only: only,
        rules: rules.map(rule => map_rule_1.map_rule(rule, file.fileName)),
    };
}
exports.make_rules = make_rules;


/***/ }),

/***/ "./src/rules/map_rule.ts":
/*!*******************************!*\
  !*** ./src/rules/map_rule.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(/*! ./rule/app */ "./src/rules/rule/app.ts");
const device_1 = __webpack_require__(/*! ./rule/device */ "./src/rules/rule/device.ts");
const from_1 = __webpack_require__(/*! ./rule/from */ "./src/rules/rule/from.ts");
const lang_1 = __webpack_require__(/*! ./rule/lang */ "./src/rules/rule/lang.ts");
const pear_1 = __webpack_require__(/*! ./rule/pear */ "./src/rules/rule/pear.ts");
const set_attrs_1 = __webpack_require__(/*! ./set_attrs */ "./src/rules/set_attrs.ts");
const string_shortcut_1 = __webpack_require__(/*! ./rule/string_shortcut */ "./src/rules/rule/string_shortcut.ts");
const to_1 = __webpack_require__(/*! ./rule/to */ "./src/rules/rule/to.ts");
const type_basic_1 = __webpack_require__(/*! ./type_basic */ "./src/rules/type_basic.ts");
function map_rule(json, fileName) {
    let { rule, attr } = set_attrs_1.set_attrs(json);
    rule.description = rule.description || fileName.replace(/\.\w+/, "");
    rule.manipulators = rule.manipulators
        .map(string_shortcut_1.string_shortcut)
        .map((manip) => Object.assign({}, manip, attr))
        .map(type_basic_1.type_basic)
        .map(app_1.app)
        .map(device_1.device)
        .map(lang_1.lang)
        .map(from_1.from)
        .map(to_1.to)
        .map(pear_1.pear);
    return rule;
}
exports.map_rule = map_rule;


/***/ }),

/***/ "./src/rules/only_filter.ts":
/*!**********************************!*\
  !*** ./src/rules/only_filter.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function only_filter(rules) {
    let isOnly = rules.find(rule => rule.only);
    let filteredRules = isOnly ? rules.filter(rule => rule.only) : rules;
    return filteredRules
        .map(rule => rule.rules)
        .reduce((base, cur) => base.concat(cur), []);
}
exports.only_filter = only_filter;


/***/ }),

/***/ "./src/rules/rule/app.ts":
/*!*******************************!*\
  !*** ./src/rules/rule/app.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const condition_map_1 = __webpack_require__(/*! ./libs/condition_map */ "./src/rules/rule/libs/condition_map.ts");
let conditionAppMap = {
    browsers: [
        "^com\\.google\\.Chrome$",
        "^org\\.mozilla\\.firefox$",
        "^com\\.apple\\.Safari$",
    ],
    chrome: ["^com\\.google\\.Chrome$"],
    jetbrains: ["^com\\.jetbrains\\."],
};
exports.app = condition_map_1.condition_map(":app", (condition) => {
    if (conditionAppMap[condition]) {
        return {
            type: "frontmost_application_if",
            bundle_identifiers: conditionAppMap[condition],
        };
    }
    if (condition.match(/^!/) &&
        conditionAppMap[condition.replace(/^!/, "")]) {
        return {
            type: "frontmost_application_unless",
            bundle_identifiers: [
                conditionAppMap[condition.replace(/^!/, "")],
            ],
        };
    }
    throw new Error(`Unknown ConditionAppMap "${condition}"`);
});


/***/ }),

/***/ "./src/rules/rule/device.ts":
/*!**********************************!*\
  !*** ./src/rules/rule/device.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const condition_map_1 = __webpack_require__(/*! ./libs/condition_map */ "./src/rules/rule/libs/condition_map.ts");
let conditionDeviceMap = {
    barocco: {
        vendor_id: 1241,
        product_id: 323,
    },
    apple: {
        vendor_id: 1452,
        product_id: 629,
    },
};
exports.device = condition_map_1.condition_map(":device", (condition) => {
    if (conditionDeviceMap[condition]) {
        return {
            type: "device_if",
            identifiers: [conditionDeviceMap[condition]],
        };
    }
    if (condition.match(/^!/) &&
        conditionDeviceMap[condition.replace(/^!/, "")]) {
        return {
            type: "device_unless",
            identifiers: [conditionDeviceMap[condition.replace(/^!/, "")]],
        };
    }
    throw new Error(`Unknown ConditionDevice "${condition}"`);
});


/***/ }),

/***/ "./src/rules/rule/from.ts":
/*!********************************!*\
  !*** ./src/rules/rule/from.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const parse_shortcut_1 = __webpack_require__(/*! ./libs/parse_shortcut */ "./src/rules/rule/libs/parse_shortcut.ts");
const remove_property_1 = __webpack_require__(/*! ./libs/remove_property */ "./src/rules/rule/libs/remove_property.ts");
function fromModifier(base, short) {
    let keys = parse_shortcut_1.parse_shortcut(short);
    let result = Object.assign(base || {}, {
        key_code: keys.pop(),
    });
    if (!keys.length) {
        return result;
    }
    result.modifiers = result.modifiers || {
        mandatory: [],
    };
    if (~keys.indexOf("any")) {
        result.modifiers.optional = ["any"];
        keys = keys.filter(key => key !== "any");
    }
    if (keys.find(key => key.includes("?"))) {
        let optional = keys
            .filter(key => key.includes("?"))
            .map(key => key.replace("?", ""));
        result.modifiers.optional = (result.modifiers.optional || []).concat(optional);
        keys = keys.filter(key => !key.includes("?"));
    }
    if (!keys.length) {
        return result;
    }
    result.modifiers.mandatory = keys;
    return result;
}
exports.fromModifier = fromModifier;
exports.from = remove_property_1.remove_property(":from", (manip, prop) => {
    manip.from = fromModifier(manip.from, prop);
    return manip;
});


/***/ }),

/***/ "./src/rules/rule/lang.ts":
/*!********************************!*\
  !*** ./src/rules/rule/lang.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const condition_map_1 = __webpack_require__(/*! ./libs/condition_map */ "./src/rules/rule/libs/condition_map.ts");
exports.lang = condition_map_1.condition_map(":lang", (lang) => ({
    type: "input_source_if",
    input_sources: [{ language: lang }],
}));


/***/ }),

/***/ "./src/rules/rule/libs/condition_map.ts":
/*!**********************************************!*\
  !*** ./src/rules/rule/libs/condition_map.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const remove_property_1 = __webpack_require__(/*! ./remove_property */ "./src/rules/rule/libs/remove_property.ts");
function condition_map(name, mapper) {
    return remove_property_1.remove_property(name, (manip, prop) => {
        manip.conditions = (manip.conditions || []).concat(mapper(prop));
        return manip;
    });
}
exports.condition_map = condition_map;


/***/ }),

/***/ "./src/rules/rule/libs/parse_shortcut.ts":
/*!***********************************************!*\
  !*** ./src/rules/rule/libs/parse_shortcut.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let modifierMap = {
    shift: "shift",
    cmd: "command",
    com: "command",
    opt: "option",
    alt: "alt",
    ctrl: "control",
    "*": "any",
};
function parse_shortcut(shortcut) {
    return shortcut.split("-").map(key => modifierMap[key] || key);
}
exports.parse_shortcut = parse_shortcut;


/***/ }),

/***/ "./src/rules/rule/libs/remove_property.ts":
/*!************************************************!*\
  !*** ./src/rules/rule/libs/remove_property.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function remove_property(name, callback) {
    return (manip) => {
        if (!manip[name]) {
            return manip;
        }
        manip = callback(manip, manip[name]);
        delete manip[name];
        return manip;
    };
}
exports.remove_property = remove_property;


/***/ }),

/***/ "./src/rules/rule/libs/shortcut_to_modifier.ts":
/*!*****************************************************!*\
  !*** ./src/rules/rule/libs/shortcut_to_modifier.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let toModifierMap = {
    "(": {
        key: "9",
        mod: "shift",
    },
    ")": {
        key: "0",
        mod: "shift",
    },
    "{": {
        key: "open_bracket",
        mod: "shift",
    },
    "}": {
        key: "close_bracket",
        mod: "shift",
    },
    "<": {
        key: "comma",
        mod: "shift",
    },
    ">": {
        key: "period",
        mod: "shift",
    },
    '"': {
        key: "quote",
        mod: "shift",
    },
    "'": {
        key: "quote",
    },
    ",": {
        key: "comma",
    },
    ".": {
        key: "period",
    },
    " ": {
        key: "spacebar",
    },
    "=": {
        key: "equal_sign",
    },
    ";": {
        key: "semicolon",
    },
    ":": {
        key: "semicolon",
        mod: "shift",
    },
};
function shortcut_to_modifier(short) {
    return short
        .replace(/^'(.+?)'$/, "$1")
        .split(/(?:)/)
        .map((key) => {
        if (!toModifierMap[key]) {
            if (key.toLowerCase() === key) {
                return { key_code: key };
            }
            return {
                key_code: key.toLowerCase(),
                modifiers: ["shift"],
            };
        }
        let mod = toModifierMap[key]["mod"];
        if (!mod) {
            return { key_code: toModifierMap[key]["key"] };
        }
        return {
            key_code: toModifierMap[key]["key"],
            modifiers: [mod],
        };
    });
}
exports.shortcut_to_modifier = shortcut_to_modifier;


/***/ }),

/***/ "./src/rules/rule/pear.ts":
/*!********************************!*\
  !*** ./src/rules/rule/pear.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const from_1 = __webpack_require__(/*! ./from */ "./src/rules/rule/from.ts");
const to_1 = __webpack_require__(/*! ./to */ "./src/rules/rule/to.ts");
function pear(manip) {
    Object.keys(manip)
        .filter(key => key.match(/^:/))
        .filter(key => "string" === typeof manip[key])
        .forEach(key => {
        manip.from = from_1.fromModifier(manip.from, key.replace(/^:/, ""));
        manip.to = to_1.toModifier(manip.to, manip[key]);
        delete manip[key];
    });
    return manip;
}
exports.pear = pear;


/***/ }),

/***/ "./src/rules/rule/string_shortcut.ts":
/*!*******************************************!*\
  !*** ./src/rules/rule/string_shortcut.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function string_shortcut(manip) {
    if ("string" !== typeof manip) {
        return manip;
    }
    let kv = manip.split(":");
    if (kv.length === 1) {
        return manip;
    }
    let result = {};
    result[":" + (kv.shift() || "").trim()] = kv.join(":").trim();
    return result;
}
exports.string_shortcut = string_shortcut;


/***/ }),

/***/ "./src/rules/rule/to.ts":
/*!******************************!*\
  !*** ./src/rules/rule/to.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const parse_shortcut_1 = __webpack_require__(/*! ./libs/parse_shortcut */ "./src/rules/rule/libs/parse_shortcut.ts");
const remove_property_1 = __webpack_require__(/*! ./libs/remove_property */ "./src/rules/rule/libs/remove_property.ts");
const shortcut_to_modifier_1 = __webpack_require__(/*! ./libs/shortcut_to_modifier */ "./src/rules/rule/libs/shortcut_to_modifier.ts");
function toModifier(base, short) {
    let results = short
        .split(/,/)
        .filter(short => short)
        .reduce((base, short) => {
        if (!short.match(/^'.+?'$/)) {
            let keys = parse_shortcut_1.parse_shortcut(short);
            let result = {
                key_code: keys.pop() || "",
            };
            if (keys.length) {
                result.modifiers = keys;
            }
            return base.concat(result);
        }
        return base.concat(shortcut_to_modifier_1.shortcut_to_modifier(short));
    }, []);
    return (base || []).concat(results);
}
exports.toModifier = toModifier;
exports.to = remove_property_1.remove_property(":to", (manip, prop) => {
    manip.to = toModifier(manip.to, prop);
    return manip;
});


/***/ }),

/***/ "./src/rules/set_attrs.ts":
/*!********************************!*\
  !*** ./src/rules/set_attrs.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function set_attrs(rule) {
    let attrs = Object.keys(rule)
        .filter(key => key.match(/^:/))
        .filter(key => "string" === typeof rule[key])
        .reduce((base, cur) => {
        base[cur] = rule[cur];
        delete rule[cur];
        return base;
    }, {});
    return {
        rule: rule,
        attr: attrs,
    };
}
exports.set_attrs = set_attrs;


/***/ }),

/***/ "./src/rules/type_basic.ts":
/*!*********************************!*\
  !*** ./src/rules/type_basic.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function type_basic(manip) {
    manip.type = manip.type || "basic";
    return manip;
}
exports.type_basic = type_basic;


/***/ }),

/***/ "./src/write_rules.ts":
/*!****************************!*\
  !*** ./src/write_rules.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(/*! fs */ "fs");
function write_rules(rules) {
    let karabinerJsonPath = `${process.env.HOME}/.config/karabiner/karabiner.json`;
    let karabinerJson = eval(`(${fs.readFileSync(karabinerJsonPath)})`);
    karabinerJson.profiles
        .filter(profile => profile.selected)
        .forEach(profile => (profile.complex_modifications.rules = rules));
    fs.writeFileSync(karabinerJsonPath, JSON.stringify(karabinerJson, null, "  "));
}
exports.write_rules = write_rules;


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "source-map-support":
/*!*************************************!*\
  !*** external "source-map-support" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9yZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvanNvbl90b19ydWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9tYWtlX3J1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21ha2VfcnVsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hcF9ydWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9vbmx5X2ZpbHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS9hcHAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvZGV2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL2Zyb20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvbGFuZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS9saWJzL2NvbmRpdGlvbl9tYXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvbGlicy9wYXJzZV9zaG9ydGN1dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS9saWJzL3JlbW92ZV9wcm9wZXJ0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS9saWJzL3Nob3J0Y3V0X3RvX21vZGlmaWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL3BlYXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvc3RyaW5nX3Nob3J0Y3V0LnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL3RvLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9zZXRfYXR0cnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3R5cGVfYmFzaWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dyaXRlX3J1bGVzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic291cmNlLW1hcC1zdXBwb3J0XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDZGQUF1RDtBQUN2RCxvSUFBMEU7QUFDMUUsb0ZBQTBDO0FBQzFDLHVGQUE0QztBQUU1QyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUUzQixJQUFJLEtBQUssR0FBRyx1REFBMEIsQ0FDbEMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDM0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxTQUFTLENBQ2xCLENBQUM7QUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtJQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ25CO0FBRUQsSUFBSSxLQUFLLEdBQUcsdUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUU5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7SUFDbkMseUJBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN0QjtLQUFNO0lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNSLEtBQUssRUFBRSxrQkFBa0I7UUFDekIsS0FBSyxFQUFFLEtBQUs7S0FDZixDQUFDLENBQUM7Q0FDTjs7Ozs7Ozs7Ozs7Ozs7OztBQzFCRCwrQ0FBeUI7QUFPekIsb0NBQ0ksT0FBZTtJQUVmLE9BQU8sRUFBRTtTQUNKLFdBQVcsQ0FBQyxPQUFPLENBQUM7U0FDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNyQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDUixJQUFJLElBQUksR0FBRyxHQUFHLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNoQyxPQUFPO1lBQ0gsUUFBUSxFQUFFLElBQUk7WUFDZCxXQUFXLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0MsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQWJELGdFQWFDOzs7Ozs7Ozs7Ozs7Ozs7QUNwQkQsZ0dBQXlFO0FBRXpFLG1HQUFrRDtBQUVsRCxvQkFDSSxLQUFnQztJQUVoQyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzNCLElBQUk7WUFDQSxPQUFPLHVCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0M7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8seUJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBWEQsZ0NBV0M7Ozs7Ozs7Ozs7Ozs7OztBQ2JELHNCQUE2QixJQUFTO0lBQ2xDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNiLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTztZQUNIO2dCQUNJLFlBQVksRUFBRSxJQUFJO2FBQ3JCO1NBQ0osQ0FBQztLQUNMO0lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQVpELG9DQVlDOzs7Ozs7Ozs7Ozs7Ozs7QUNaRCxtQkFBMEIsSUFBUztJQUMvQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDYixPQUFPO1lBQ0gsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQztLQUNMO0lBQ0QsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUNoRCxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ3hCLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNoQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFiRCw4QkFhQzs7Ozs7Ozs7Ozs7Ozs7O0FDZkQsZ0dBQThDO0FBQzlDLG9GQUFzQztBQUt0Qyx1RkFBd0M7QUFtQ3hDLG9CQUNJLElBQTZCO0lBRTdCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLElBQUksS0FBSyxHQUFHLDJCQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMscUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzVELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNqQixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtRQUNuQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUNELE9BQU87UUFDSCxJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsbUJBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzFELENBQUM7QUFDTixDQUFDO0FBakJELGdDQWlCQzs7Ozs7Ozs7Ozs7Ozs7O0FDekRELCtFQUFpQztBQUNqQyx3RkFBdUM7QUFDdkMsa0ZBQW1DO0FBQ25DLGtGQUFtQztBQUNuQyxrRkFBbUM7QUFDbkMsdUZBQXdDO0FBQ3hDLG1IQUF5RDtBQUN6RCw0RUFBK0I7QUFDL0IsMEZBQTBDO0FBRTFDLGtCQUNJLElBQTZCLEVBQzdCLFFBQWdCO0lBRWhCLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcscUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWTtTQUNoQyxHQUFHLENBQUMsaUNBQWUsQ0FBQztTQUNwQixHQUFHLENBQ0EsQ0FBQyxLQUFrQixFQUFlLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQ3RFO1NBQ0EsR0FBRyxDQUFDLHVCQUFVLENBQUM7U0FDZixHQUFHLENBQUMsU0FBRyxDQUFDO1NBQ1IsR0FBRyxDQUFDLGVBQU0sQ0FBQztTQUNYLEdBQUcsQ0FBQyxXQUFJLENBQUM7U0FDVCxHQUFHLENBQUMsV0FBSSxDQUFDO1NBQ1QsR0FBRyxDQUFDLE9BQUUsQ0FBQztTQUNQLEdBQUcsQ0FBQyxXQUFJLENBQUMsQ0FBQztJQUNmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFuQkQsNEJBbUJDOzs7Ozs7Ozs7Ozs7Ozs7QUN6QkQscUJBQ0ksS0FBbUM7SUFFbkMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNyRSxPQUFPLGFBQWE7U0FDZixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3ZCLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckQsQ0FBQztBQVJELGtDQVFDOzs7Ozs7Ozs7Ozs7Ozs7QUNaRCxrSEFBcUQ7QUFFckQsSUFBSSxlQUFlLEdBQUc7SUFDbEIsUUFBUSxFQUFFO1FBQ04seUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQix3QkFBd0I7S0FDM0I7SUFDRCxNQUFNLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztJQUNuQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztDQUNyQyxDQUFDO0FBRVcsV0FBRyxHQUFHLDZCQUFhLENBQzVCLE1BQU0sRUFDTixDQUFDLFNBQWlCLEVBQXlCLEVBQUU7SUFDekMsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDNUIsT0FBTztZQUNILElBQUksRUFBRSwwQkFBMEI7WUFDaEMsa0JBQWtCLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQztTQUNqRCxDQUFDO0tBQ0w7SUFDRCxJQUNJLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3JCLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUM5QztRQUNFLE9BQU87WUFDSCxJQUFJLEVBQUUsOEJBQThCO1lBQ3BDLGtCQUFrQixFQUFFO2dCQUNoQixlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDL0M7U0FDSixDQUFDO0tBQ0w7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQzlELENBQUMsQ0FDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNsQ0Ysa0hBQXFEO0FBT3JELElBQUksa0JBQWtCLEdBQUc7SUFDckIsT0FBTyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsR0FBRztLQUNsQjtJQUNELEtBQUssRUFBRTtRQUNILFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLEdBQUc7S0FDbEI7Q0FDSixDQUFDO0FBRVcsY0FBTSxHQUFHLDZCQUFhLENBQy9CLFNBQVMsRUFDVCxDQUFDLFNBQVMsRUFBeUIsRUFBRTtJQUNqQyxJQUFJLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQy9CLE9BQU87WUFDSCxJQUFJLEVBQUUsV0FBVztZQUNqQixXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMvQyxDQUFDO0tBQ0w7SUFDRCxJQUNJLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3JCLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQ2pEO1FBQ0UsT0FBTztZQUNILElBQUksRUFBRSxlQUFlO1lBQ3JCLFdBQVcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDakUsQ0FBQztLQUNMO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUM5RCxDQUFDLENBQ0osQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDdENGLHFIQUF1RDtBQUN2RCx3SEFBeUQ7QUFVekQsc0JBQ0ksSUFBeUIsRUFDekIsS0FBYTtJQUViLElBQUksSUFBSSxHQUFHLCtCQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsSUFBSSxNQUFNLEdBQWlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRTtRQUNqRCxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtLQUN2QixDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNkLE9BQU8sTUFBTSxDQUFDO0tBQ2pCO0lBQ0QsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJO1FBQ25DLFNBQVMsRUFBRSxFQUFFO0tBQ2hCLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN0QixNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDO0tBQzVDO0lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3JDLElBQUksUUFBUSxHQUFHLElBQUk7YUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQ2hFLFFBQVEsQ0FDWCxDQUFDO1FBQ0YsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqRDtJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ2QsT0FBTyxNQUFNLENBQUM7S0FDakI7SUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDbEMsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQWhDRCxvQ0FnQ0M7QUFFWSxZQUFJLEdBQUcsaUNBQWUsQ0FDL0IsT0FBTyxFQUNQLENBQUMsS0FBa0IsRUFBRSxJQUFZLEVBQWUsRUFBRTtJQUM5QyxLQUFLLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVDLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMsQ0FDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNuREYsa0hBQXFEO0FBTXhDLFlBQUksR0FBRyw2QkFBYSxDQUM3QixPQUFPLEVBQ1AsQ0FBQyxJQUFZLEVBQXlCLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLElBQUksRUFBRSxpQkFBaUI7SUFDdkIsYUFBYSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Q0FDdEMsQ0FBQyxDQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ1pGLG1IQUFvRDtBQUVwRCx1QkFDSSxJQUFZLEVBQ1osTUFBK0M7SUFFL0MsT0FBTyxpQ0FBZSxDQUNsQixJQUFJLEVBQ0osQ0FBQyxLQUFrQixFQUFFLElBQVksRUFBZSxFQUFFO1FBQzlDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDLENBQ0osQ0FBQztBQUNOLENBQUM7QUFYRCxzQ0FXQzs7Ozs7Ozs7Ozs7Ozs7O0FDZEQsSUFBSSxXQUFXLEdBQThCO0lBQ3pDLEtBQUssRUFBRSxPQUFPO0lBQ2QsR0FBRyxFQUFFLFNBQVM7SUFDZCxHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRSxRQUFRO0lBQ2IsR0FBRyxFQUFFLEtBQUs7SUFDVixJQUFJLEVBQUUsU0FBUztJQUNmLEdBQUcsRUFBRSxLQUFLO0NBQ2IsQ0FBQztBQUVGLHdCQUErQixRQUFnQjtJQUMzQyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFGRCx3Q0FFQzs7Ozs7Ozs7Ozs7Ozs7O0FDVkQseUJBQ0ksSUFBWSxFQUNaLFFBQTJEO0lBRTNELE9BQU8sQ0FBQyxLQUFrQixFQUFlLEVBQUU7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNkLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQVpELDBDQVlDOzs7Ozs7Ozs7Ozs7Ozs7QUNaRCxJQUFJLGFBQWEsR0FLYjtJQUNBLEdBQUcsRUFBRTtRQUNELEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLE9BQU87S0FDZjtJQUNELEdBQUcsRUFBRTtRQUNELEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLE9BQU87S0FDZjtJQUNELEdBQUcsRUFBRTtRQUNELEdBQUcsRUFBRSxjQUFjO1FBQ25CLEdBQUcsRUFBRSxPQUFPO0tBQ2Y7SUFDRCxHQUFHLEVBQUU7UUFDRCxHQUFHLEVBQUUsZUFBZTtRQUNwQixHQUFHLEVBQUUsT0FBTztLQUNmO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsR0FBRyxFQUFFLE9BQU87UUFDWixHQUFHLEVBQUUsT0FBTztLQUNmO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsR0FBRyxFQUFFLFFBQVE7UUFDYixHQUFHLEVBQUUsT0FBTztLQUNmO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsR0FBRyxFQUFFLE9BQU87UUFDWixHQUFHLEVBQUUsT0FBTztLQUNmO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsR0FBRyxFQUFFLE9BQU87S0FDZjtJQUNELEdBQUcsRUFBRTtRQUNELEdBQUcsRUFBRSxPQUFPO0tBQ2Y7SUFDRCxHQUFHLEVBQUU7UUFDRCxHQUFHLEVBQUUsUUFBUTtLQUNoQjtJQUNELEdBQUcsRUFBRTtRQUNELEdBQUcsRUFBRSxVQUFVO0tBQ2xCO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsR0FBRyxFQUFFLFlBQVk7S0FDcEI7SUFDRCxHQUFHLEVBQUU7UUFDRCxHQUFHLEVBQUUsV0FBVztLQUNuQjtJQUNELEdBQUcsRUFBRTtRQUNELEdBQUcsRUFBRSxXQUFXO1FBQ2hCLEdBQUcsRUFBRSxPQUFPO0tBQ2Y7Q0FDSixDQUFDO0FBRUYsOEJBQXFDLEtBQWE7SUFDOUMsT0FBTyxLQUFLO1NBQ1AsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUM7U0FDMUIsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNiLEdBQUcsQ0FDQSxDQUFDLEdBQVcsRUFBYyxFQUFFO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckIsSUFBSSxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUssR0FBRyxFQUFFO2dCQUMzQixPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDO2FBQzVCO1lBQ0QsT0FBTztnQkFDSCxRQUFRLEVBQUUsR0FBRyxDQUFDLFdBQVcsRUFBRTtnQkFDM0IsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3ZCLENBQUM7U0FDTDtRQUNELElBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ04sT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNsRDtRQUNELE9BQU87WUFDSCxRQUFRLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNuQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDbkIsQ0FBQztJQUNOLENBQUMsQ0FDSixDQUFDO0FBQ1YsQ0FBQztBQXpCRCxvREF5QkM7Ozs7Ozs7Ozs7Ozs7OztBQ3BGRCw2RUFBc0M7QUFDdEMsdUVBQWtDO0FBRWxDLGNBQXFCLEtBQWtCO0lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEtBQUssT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ1gsS0FBSyxDQUFDLElBQUksR0FBRyxtQkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RCxLQUFLLENBQUMsRUFBRSxHQUFHLGVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFRLEtBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE9BQWEsS0FBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQVZELG9CQVVDOzs7Ozs7Ozs7Ozs7Ozs7QUNaRCx5QkFDSSxLQUEyQjtJQUUzQixJQUFJLFFBQVEsS0FBSyxPQUFPLEtBQUssRUFBRTtRQUMzQixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNqQixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQztJQUNyQixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5RCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBYkQsMENBYUM7Ozs7Ozs7Ozs7Ozs7OztBQ2RELHFIQUF1RDtBQUN2RCx3SEFBeUQ7QUFDekQsdUlBQW1FO0FBT25FLG9CQUNJLElBQXlCLEVBQ3pCLEtBQWE7SUFFYixJQUFJLE9BQU8sR0FBRyxLQUFLO1NBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztTQUN0QixNQUFNLENBQUMsQ0FBQyxJQUFrQixFQUFFLEtBQWEsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3pCLElBQUksSUFBSSxHQUFHLCtCQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsSUFBSSxNQUFNLEdBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTthQUM3QixDQUFDO1lBQ0YsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQzNCO1lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLDJDQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQXJCRCxnQ0FxQkM7QUFFWSxVQUFFLEdBQUcsaUNBQWUsQ0FDN0IsS0FBSyxFQUNMLENBQUMsS0FBa0IsRUFBRSxJQUFZLEVBQWUsRUFBRTtJQUM5QyxLQUFLLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMsQ0FDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNyQ0YsbUJBQ0ksSUFBNkI7SUFLN0IsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsT0FBTztRQUNILElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLEtBQUs7S0FDZCxDQUFDO0FBQ04sQ0FBQztBQWxCRCw4QkFrQkM7Ozs7Ozs7Ozs7Ozs7OztBQ2xCRCxvQkFBMkIsS0FBa0I7SUFDekMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQztJQUNuQyxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBSEQsZ0NBR0M7Ozs7Ozs7Ozs7Ozs7OztBQ0xELCtDQUF5QjtBQWN6QixxQkFBNEIsS0FBZ0M7SUFDeEQsSUFBSSxpQkFBaUIsR0FBRyxHQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQ2hCLG1DQUFtQyxDQUFDO0lBQ3BDLElBQUksYUFBYSxHQUFrQixJQUFJLENBQ25DLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQzVDLENBQUM7SUFDRixhQUFhLENBQUMsUUFBUTtTQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLEVBQUUsQ0FBQyxhQUFhLENBQ1osaUJBQWlCLEVBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDNUMsQ0FBQztBQUNOLENBQUM7QUFkRCxrQ0FjQzs7Ozs7Ozs7Ozs7O0FDNUJELCtCOzs7Ozs7Ozs7OztBQ0FBLCtDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgKiBhcyBTb3VyY2VNYXBTdXBwb3J0IGZyb20gXCJzb3VyY2UtbWFwLXN1cHBvcnRcIjtcbmltcG9ydCB7IHJlYWRfY29tcGxleF9tb2RpZmljYXRpb25zIH0gZnJvbSBcIi4vcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IHJlYWRfcnVsZXMgfSBmcm9tIFwiLi9yZWFkX3J1bGVzXCI7XG5pbXBvcnQgeyB3cml0ZV9ydWxlcyB9IGZyb20gXCIuL3dyaXRlX3J1bGVzXCI7XG5cblNvdXJjZU1hcFN1cHBvcnQuaW5zdGFsbCgpO1xuXG5sZXQgZmlsZXMgPSByZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucyhcbiAgICB+cHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLWpzb25cIilcbiAgICAgICAgPyBwcm9jZXNzLmFyZ3ZbcHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLWpzb25cIikgKyAxXVxuICAgICAgICA6IF9fZGlybmFtZVxuKTtcbmlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgY29uc29sZS5lcnJvcihcIm1pc3Npbmcgc2V0dGluZyBqc29uIGZpbGVzXCIpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbn1cblxubGV0IHJ1bGVzID0gcmVhZF9ydWxlcyhmaWxlcyk7XG5cbmlmICh+cHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLXVwZGF0ZVwiKSkge1xuICAgIHdyaXRlX3J1bGVzKHJ1bGVzKTtcbn0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coe1xuICAgICAgICB0aXRsZTogXCJwcml2YXRlIHNldHRpbmdzXCIsXG4gICAgICAgIHJ1bGVzOiBydWxlcyxcbiAgICB9KTtcbn1cbiIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsZXhNb2RpZmljYXRpb25GaWxlIHtcbiAgICBmaWxlTmFtZTogc3RyaW5nO1xuICAgIHRleHRDb250ZW50OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucyhcbiAgICBkaXJuYW1lOiBzdHJpbmdcbik6IENvbXBsZXhNb2RpZmljYXRpb25GaWxlW10ge1xuICAgIHJldHVybiBmc1xuICAgICAgICAucmVhZGRpclN5bmMoZGlybmFtZSlcbiAgICAgICAgLmZpbHRlcihmaWxlID0+IGZpbGUubWF0Y2goL1xcLmpzb24kLykpXG4gICAgICAgIC5tYXAoZmlsZSA9PiB7XG4gICAgICAgICAgICBsZXQgcGF0aCA9IGAke2Rpcm5hbWV9LyR7ZmlsZX1gO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogZmlsZSxcbiAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogU3RyaW5nKGZzLnJlYWRGaWxlU3luYyhwYXRoKSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbn1cbiIsImltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlLCBtYWtlX3J1bGVzIH0gZnJvbSBcIi4vcnVsZXMvbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgQ29tcGxleE1vZGlmaWNhdGlvbkZpbGUgfSBmcm9tIFwiLi9yZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgb25seV9maWx0ZXIgfSBmcm9tIFwiLi9ydWxlcy9vbmx5X2ZpbHRlclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVhZF9ydWxlcyhcbiAgICBmaWxlczogQ29tcGxleE1vZGlmaWNhdGlvbkZpbGVbXVxuKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXSB7XG4gICAgbGV0IHJlc3VsdHMgPSBmaWxlcy5tYXAoZmlsZSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gbWFrZV9ydWxlcyhmaWxlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlLm1lc3NhZ2UsIGZpbGUuZmlsZU5hbWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG9ubHlfZmlsdGVyKHJlc3VsdHMpO1xufVxuIiwiaW1wb3J0IHsgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUgfSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBqc29uX3RvX3J1bGUoanNvbjogYW55KTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXSB7XG4gICAgaWYgKGpzb24ubGVuZ3RoKSB7XG4gICAgICAgIGlmIChqc29uLmZpbmQocnVsZSA9PiBydWxlLmRlc2NyaXB0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtYW5pcHVsYXRvcnM6IGpzb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4ganNvbi5ydWxlcyB8fCBbanNvbl07XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VfcnVsZShydWxlOiBhbnkpOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB7XG4gICAgaWYgKHJ1bGUubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYW5pcHVsYXRvcnM6IHJ1bGUsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChydWxlW1wiOm1hbmlwdWxhdG9yc1wiXSkge1xuICAgICAgICBydWxlLm1hbmlwdWxhdG9ycyA9IChydWxlLm1hbmlwdWxhdG9ycyB8fCBbXSkuY29uY2F0KFxuICAgICAgICAgICAgcnVsZVtcIjptYW5pcHVsYXRvcnNcIl1cbiAgICAgICAgKTtcbiAgICAgICAgZGVsZXRlIHJ1bGVbXCI6bWFuaXB1bGF0b3JzXCJdO1xuICAgIH1cbiAgICByZXR1cm4gcnVsZTtcbn1cbiIsImltcG9ydCB7IGpzb25fdG9fcnVsZSB9IGZyb20gXCIuL2pzb25fdG9fcnVsZVwiO1xuaW1wb3J0IHsgbWFwX3J1bGUgfSBmcm9tIFwiLi9tYXBfcnVsZVwiO1xuaW1wb3J0IHsgQ29tcGxleE1vZGlmaWNhdGlvbkZpbGUgfSBmcm9tIFwiLi4vcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IERldmljZUlkZW50aWZpZXJzIH0gZnJvbSBcIi4vcnVsZS9kZXZpY2VcIjtcbmltcG9ydCB7IEZyb21Nb2RpZmllciB9IGZyb20gXCIuL3J1bGUvZnJvbVwiO1xuaW1wb3J0IHsgTGFuZ0lucHV0U291cmNlcyB9IGZyb20gXCIuL3J1bGUvbGFuZ1wiO1xuaW1wb3J0IHsgbWFrZV9ydWxlIH0gZnJvbSBcIi4vbWFrZV9ydWxlXCI7XG5pbXBvcnQgeyBUb01vZGlmaWVyIH0gZnJvbSBcIi4vcnVsZS90b1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGJ1bmRsZV9pZGVudGlmaWVycz86IHN0cmluZ1tdO1xuICAgIGlkZW50aWZpZXJzPzogRGV2aWNlSWRlbnRpZmllcnNbXTtcbiAgICBpbnB1dF9zb3VyY2VzPzogTGFuZ0lucHV0U291cmNlc1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hbmlwdWxhdG9yIHtcbiAgICB0eXBlPzogc3RyaW5nO1xuICAgIGNvbmRpdGlvbnM/OiBNYW5pcHVsYXRvckNvbmRpdGlvbnNbXTtcbiAgICBmcm9tPzogRnJvbU1vZGlmaWVyO1xuICAgIHRvPzogVG9Nb2RpZmllcltdO1xuXG4gICAgXCI6ZnJvbVwiPzogc3RyaW5nO1xuICAgIFwiOnRvXCI/OiBzdHJpbmc7XG4gICAgXCI6YXBwXCI/OiBzdHJpbmc7XG4gICAgXCI6ZGV2aWNlXCI/OiBzdHJpbmc7XG4gICAgXCI6bGFuZ1wiPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsZXhNb2RpZmljYXRpb25SdWxlIHtcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBtYW5pcHVsYXRvcnM/OiBNYW5pcHVsYXRvcltdO1xuICAgIFwiOm1hbmlwdWxhdG9yc1wiPzogTWFuaXB1bGF0b3IgfCBNYW5pcHVsYXRvcltdO1xuICAgIFwiOm9ubHlcIj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVTZXQge1xuICAgIG9ubHk6IGJvb2xlYW47XG4gICAgcnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlX3J1bGVzKFxuICAgIGZpbGU6IENvbXBsZXhNb2RpZmljYXRpb25GaWxlXG4pOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVNldCB7XG4gICAgbGV0IGpzb24gPSBldmFsKGAoJHtmaWxlLnRleHRDb250ZW50fSlgKTtcbiAgICBsZXQgcnVsZXMgPSBqc29uX3RvX3J1bGUoanNvbikubWFwKHJ1bGUgPT4gbWFrZV9ydWxlKHJ1bGUpKTtcbiAgICBsZXQgb25seSA9IGZhbHNlO1xuICAgIGlmIChydWxlcy5maW5kKHJ1bGUgPT4gcnVsZVtcIjpvbmx5XCJdKSkge1xuICAgICAgICBvbmx5ID0gdHJ1ZTtcbiAgICAgICAgcnVsZXMgPSBydWxlcy5maWx0ZXIocnVsZSA9PiBydWxlW1wiOm9ubHlcIl0pLm1hcChydWxlID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSBydWxlW1wiOm9ubHlcIl07XG4gICAgICAgICAgICByZXR1cm4gcnVsZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG9ubHk6IG9ubHksXG4gICAgICAgIHJ1bGVzOiBydWxlcy5tYXAocnVsZSA9PiBtYXBfcnVsZShydWxlLCBmaWxlLmZpbGVOYW1lKSksXG4gICAgfTtcbn1cbiIsImltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlLCBNYW5pcHVsYXRvciB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuL3J1bGUvYXBwXCI7XG5pbXBvcnQgeyBkZXZpY2UgfSBmcm9tIFwiLi9ydWxlL2RldmljZVwiO1xuaW1wb3J0IHsgZnJvbSB9IGZyb20gXCIuL3J1bGUvZnJvbVwiO1xuaW1wb3J0IHsgbGFuZyB9IGZyb20gXCIuL3J1bGUvbGFuZ1wiO1xuaW1wb3J0IHsgcGVhciB9IGZyb20gXCIuL3J1bGUvcGVhclwiO1xuaW1wb3J0IHsgc2V0X2F0dHJzIH0gZnJvbSBcIi4vc2V0X2F0dHJzXCI7XG5pbXBvcnQgeyBzdHJpbmdfc2hvcnRjdXQgfSBmcm9tIFwiLi9ydWxlL3N0cmluZ19zaG9ydGN1dFwiO1xuaW1wb3J0IHsgdG8gfSBmcm9tIFwiLi9ydWxlL3RvXCI7XG5pbXBvcnQgeyB0eXBlX2Jhc2ljIH0gZnJvbSBcIi4vdHlwZV9iYXNpY1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwX3J1bGUoXG4gICAganNvbjogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUsXG4gICAgZmlsZU5hbWU6IHN0cmluZ1xuKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUge1xuICAgIGxldCB7IHJ1bGUsIGF0dHIgfSA9IHNldF9hdHRycyhqc29uKTtcbiAgICBydWxlLmRlc2NyaXB0aW9uID0gcnVsZS5kZXNjcmlwdGlvbiB8fCBmaWxlTmFtZS5yZXBsYWNlKC9cXC5cXHcrLywgXCJcIik7XG4gICAgcnVsZS5tYW5pcHVsYXRvcnMgPSBydWxlLm1hbmlwdWxhdG9yc1xuICAgICAgICAubWFwKHN0cmluZ19zaG9ydGN1dClcbiAgICAgICAgLm1hcChcbiAgICAgICAgICAgIChtYW5pcDogTWFuaXB1bGF0b3IpOiBNYW5pcHVsYXRvciA9PiBPYmplY3QuYXNzaWduKHt9LCBtYW5pcCwgYXR0cilcbiAgICAgICAgKVxuICAgICAgICAubWFwKHR5cGVfYmFzaWMpXG4gICAgICAgIC5tYXAoYXBwKVxuICAgICAgICAubWFwKGRldmljZSlcbiAgICAgICAgLm1hcChsYW5nKVxuICAgICAgICAubWFwKGZyb20pXG4gICAgICAgIC5tYXAodG8pXG4gICAgICAgIC5tYXAocGVhcik7XG4gICAgcmV0dXJuIHJ1bGU7XG59XG4iLCJpbXBvcnQge1xuICAgIENvbXBsZXhNb2RpZmljYXRpb25SdWxlLFxuICAgIENvbXBsZXhNb2RpZmljYXRpb25SdWxlU2V0LFxufSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvbmx5X2ZpbHRlcihcbiAgICBydWxlczogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVTZXRbXVxuKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXSB7XG4gICAgbGV0IGlzT25seSA9IHJ1bGVzLmZpbmQocnVsZSA9PiBydWxlLm9ubHkpO1xuICAgIGxldCBmaWx0ZXJlZFJ1bGVzID0gaXNPbmx5ID8gcnVsZXMuZmlsdGVyKHJ1bGUgPT4gcnVsZS5vbmx5KSA6IHJ1bGVzO1xuICAgIHJldHVybiBmaWx0ZXJlZFJ1bGVzXG4gICAgICAgIC5tYXAocnVsZSA9PiBydWxlLnJ1bGVzKVxuICAgICAgICAucmVkdWNlKChiYXNlLCBjdXIpID0+IGJhc2UuY29uY2F0KGN1ciksIFtdKTtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBjb25kaXRpb25fbWFwIH0gZnJvbSBcIi4vbGlicy9jb25kaXRpb25fbWFwXCI7XG5cbmxldCBjb25kaXRpb25BcHBNYXAgPSB7XG4gICAgYnJvd3NlcnM6IFtcbiAgICAgICAgXCJeY29tXFxcXC5nb29nbGVcXFxcLkNocm9tZSRcIixcbiAgICAgICAgXCJeb3JnXFxcXC5tb3ppbGxhXFxcXC5maXJlZm94JFwiLFxuICAgICAgICBcIl5jb21cXFxcLmFwcGxlXFxcXC5TYWZhcmkkXCIsXG4gICAgXSxcbiAgICBjaHJvbWU6IFtcIl5jb21cXFxcLmdvb2dsZVxcXFwuQ2hyb21lJFwiXSxcbiAgICBqZXRicmFpbnM6IFtcIl5jb21cXFxcLmpldGJyYWluc1xcXFwuXCJdLFxufTtcblxuZXhwb3J0IGNvbnN0IGFwcCA9IGNvbmRpdGlvbl9tYXAoXG4gICAgXCI6YXBwXCIsXG4gICAgKGNvbmRpdGlvbjogc3RyaW5nKTogTWFuaXB1bGF0b3JDb25kaXRpb25zID0+IHtcbiAgICAgICAgaWYgKGNvbmRpdGlvbkFwcE1hcFtjb25kaXRpb25dKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZnJvbnRtb3N0X2FwcGxpY2F0aW9uX2lmXCIsXG4gICAgICAgICAgICAgICAgYnVuZGxlX2lkZW50aWZpZXJzOiBjb25kaXRpb25BcHBNYXBbY29uZGl0aW9uXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29uZGl0aW9uLm1hdGNoKC9eIS8pICYmXG4gICAgICAgICAgICBjb25kaXRpb25BcHBNYXBbY29uZGl0aW9uLnJlcGxhY2UoL14hLywgXCJcIildXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZyb250bW9zdF9hcHBsaWNhdGlvbl91bmxlc3NcIixcbiAgICAgICAgICAgICAgICBidW5kbGVfaWRlbnRpZmllcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uQXBwTWFwW2NvbmRpdGlvbi5yZXBsYWNlKC9eIS8sIFwiXCIpXSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gQ29uZGl0aW9uQXBwTWFwIFwiJHtjb25kaXRpb259XCJgKTtcbiAgICB9XG4pO1xuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3JDb25kaXRpb25zIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IGNvbmRpdGlvbl9tYXAgfSBmcm9tIFwiLi9saWJzL2NvbmRpdGlvbl9tYXBcIjtcblxuZXhwb3J0IGludGVyZmFjZSBEZXZpY2VJZGVudGlmaWVycyB7XG4gICAgdmVuZG9yX2lkOiBudW1iZXI7XG4gICAgcHJvZHVjdF9pZDogbnVtYmVyO1xufVxuXG5sZXQgY29uZGl0aW9uRGV2aWNlTWFwID0ge1xuICAgIGJhcm9jY286IHtcbiAgICAgICAgdmVuZG9yX2lkOiAxMjQxLFxuICAgICAgICBwcm9kdWN0X2lkOiAzMjMsXG4gICAgfSxcbiAgICBhcHBsZToge1xuICAgICAgICB2ZW5kb3JfaWQ6IDE0NTIsXG4gICAgICAgIHByb2R1Y3RfaWQ6IDYyOSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGRldmljZSA9IGNvbmRpdGlvbl9tYXAoXG4gICAgXCI6ZGV2aWNlXCIsXG4gICAgKGNvbmRpdGlvbik6IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyA9PiB7XG4gICAgICAgIGlmIChjb25kaXRpb25EZXZpY2VNYXBbY29uZGl0aW9uXSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImRldmljZV9pZlwiLFxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXJzOiBbY29uZGl0aW9uRGV2aWNlTWFwW2NvbmRpdGlvbl1dLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb25kaXRpb24ubWF0Y2goL14hLykgJiZcbiAgICAgICAgICAgIGNvbmRpdGlvbkRldmljZU1hcFtjb25kaXRpb24ucmVwbGFjZSgvXiEvLCBcIlwiKV1cbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZGV2aWNlX3VubGVzc1wiLFxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXJzOiBbY29uZGl0aW9uRGV2aWNlTWFwW2NvbmRpdGlvbi5yZXBsYWNlKC9eIS8sIFwiXCIpXV0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBDb25kaXRpb25EZXZpY2UgXCIke2NvbmRpdGlvbn1cImApO1xuICAgIH1cbik7XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBwYXJzZV9zaG9ydGN1dCB9IGZyb20gXCIuL2xpYnMvcGFyc2Vfc2hvcnRjdXRcIjtcbmltcG9ydCB7IHJlbW92ZV9wcm9wZXJ0eSB9IGZyb20gXCIuL2xpYnMvcmVtb3ZlX3Byb3BlcnR5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRnJvbU1vZGlmaWVyIHtcbiAgICBrZXlfY29kZTogc3RyaW5nO1xuICAgIG1vZGlmaWVycz86IHtcbiAgICAgICAgb3B0aW9uYWw/OiBzdHJpbmdbXTtcbiAgICAgICAgbWFuZGF0b3J5OiBzdHJpbmdbXTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbU1vZGlmaWVyKFxuICAgIGJhc2U6IEZyb21Nb2RpZmllciB8IHZvaWQsXG4gICAgc2hvcnQ6IHN0cmluZ1xuKTogRnJvbU1vZGlmaWVyIHtcbiAgICBsZXQga2V5cyA9IHBhcnNlX3Nob3J0Y3V0KHNob3J0KTtcbiAgICBsZXQgcmVzdWx0OiBGcm9tTW9kaWZpZXIgPSBPYmplY3QuYXNzaWduKGJhc2UgfHwge30sIHtcbiAgICAgICAga2V5X2NvZGU6IGtleXMucG9wKCksXG4gICAgfSk7XG4gICAgaWYgKCFrZXlzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXN1bHQubW9kaWZpZXJzID0gcmVzdWx0Lm1vZGlmaWVycyB8fCB7XG4gICAgICAgIG1hbmRhdG9yeTogW10sXG4gICAgfTtcbiAgICBpZiAofmtleXMuaW5kZXhPZihcImFueVwiKSkge1xuICAgICAgICByZXN1bHQubW9kaWZpZXJzLm9wdGlvbmFsID0gW1wiYW55XCJdO1xuICAgICAgICBrZXlzID0ga2V5cy5maWx0ZXIoa2V5ID0+IGtleSAhPT0gXCJhbnlcIik7XG4gICAgfVxuICAgIGlmIChrZXlzLmZpbmQoa2V5ID0+IGtleS5pbmNsdWRlcyhcIj9cIikpKSB7XG4gICAgICAgIGxldCBvcHRpb25hbCA9IGtleXNcbiAgICAgICAgICAgIC5maWx0ZXIoa2V5ID0+IGtleS5pbmNsdWRlcyhcIj9cIikpXG4gICAgICAgICAgICAubWFwKGtleSA9PiBrZXkucmVwbGFjZShcIj9cIiwgXCJcIikpO1xuICAgICAgICByZXN1bHQubW9kaWZpZXJzLm9wdGlvbmFsID0gKHJlc3VsdC5tb2RpZmllcnMub3B0aW9uYWwgfHwgW10pLmNvbmNhdChcbiAgICAgICAgICAgIG9wdGlvbmFsXG4gICAgICAgICk7XG4gICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihrZXkgPT4gIWtleS5pbmNsdWRlcyhcIj9cIikpO1xuICAgIH1cbiAgICBpZiAoIWtleXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlc3VsdC5tb2RpZmllcnMubWFuZGF0b3J5ID0ga2V5cztcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgZnJvbSA9IHJlbW92ZV9wcm9wZXJ0eShcbiAgICBcIjpmcm9tXCIsXG4gICAgKG1hbmlwOiBNYW5pcHVsYXRvciwgcHJvcDogc3RyaW5nKTogTWFuaXB1bGF0b3IgPT4ge1xuICAgICAgICBtYW5pcC5mcm9tID0gZnJvbU1vZGlmaWVyKG1hbmlwLmZyb20sIHByb3ApO1xuICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgfVxuKTtcbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBjb25kaXRpb25fbWFwIH0gZnJvbSBcIi4vbGlicy9jb25kaXRpb25fbWFwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGFuZ0lucHV0U291cmNlcyB7XG4gICAgbGFuZ3VhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGxhbmcgPSBjb25kaXRpb25fbWFwKFxuICAgIFwiOmxhbmdcIixcbiAgICAobGFuZzogc3RyaW5nKTogTWFuaXB1bGF0b3JDb25kaXRpb25zID0+ICh7XG4gICAgICAgIHR5cGU6IFwiaW5wdXRfc291cmNlX2lmXCIsXG4gICAgICAgIGlucHV0X3NvdXJjZXM6IFt7IGxhbmd1YWdlOiBsYW5nIH1dLFxuICAgIH0pXG4pO1xuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IsIE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi8uLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyByZW1vdmVfcHJvcGVydHkgfSBmcm9tIFwiLi9yZW1vdmVfcHJvcGVydHlcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmRpdGlvbl9tYXAoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1hcHBlcjogKHByb3A6IHN0cmluZykgPT4gTWFuaXB1bGF0b3JDb25kaXRpb25zXG4pOiAobWFuaXA6IE1hbmlwdWxhdG9yKSA9PiBNYW5pcHVsYXRvciB7XG4gICAgcmV0dXJuIHJlbW92ZV9wcm9wZXJ0eShcbiAgICAgICAgbmFtZSxcbiAgICAgICAgKG1hbmlwOiBNYW5pcHVsYXRvciwgcHJvcDogc3RyaW5nKTogTWFuaXB1bGF0b3IgPT4ge1xuICAgICAgICAgICAgbWFuaXAuY29uZGl0aW9ucyA9IChtYW5pcC5jb25kaXRpb25zIHx8IFtdKS5jb25jYXQobWFwcGVyKHByb3ApKTtcbiAgICAgICAgICAgIHJldHVybiBtYW5pcDtcbiAgICAgICAgfVxuICAgICk7XG59XG4iLCJsZXQgbW9kaWZpZXJNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgc2hpZnQ6IFwic2hpZnRcIixcbiAgICBjbWQ6IFwiY29tbWFuZFwiLFxuICAgIGNvbTogXCJjb21tYW5kXCIsXG4gICAgb3B0OiBcIm9wdGlvblwiLFxuICAgIGFsdDogXCJhbHRcIixcbiAgICBjdHJsOiBcImNvbnRyb2xcIixcbiAgICBcIipcIjogXCJhbnlcIixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zaG9ydGN1dChzaG9ydGN1dDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBzaG9ydGN1dC5zcGxpdChcIi1cIikubWFwKGtleSA9PiBtb2RpZmllck1hcFtrZXldIHx8IGtleSk7XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi8uLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVfcHJvcGVydHkoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiAobWFuaXA6IE1hbmlwdWxhdG9yLCBwcm9wOiBzdHJpbmcpID0+IE1hbmlwdWxhdG9yXG4pIHtcbiAgICByZXR1cm4gKG1hbmlwOiBNYW5pcHVsYXRvcik6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgaWYgKCFtYW5pcFtuYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgICAgICB9XG4gICAgICAgIG1hbmlwID0gY2FsbGJhY2sobWFuaXAsIG1hbmlwW25hbWVdKTtcbiAgICAgICAgZGVsZXRlIG1hbmlwW25hbWVdO1xuICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgfTtcbn1cbiIsImltcG9ydCB7IFRvTW9kaWZpZXIgfSBmcm9tIFwiLi4vdG9cIjtcblxubGV0IHRvTW9kaWZpZXJNYXA6IHtcbiAgICBba2V5OiBzdHJpbmddOiB7XG4gICAgICAgIGtleTogc3RyaW5nO1xuICAgICAgICBtb2Q/OiBzdHJpbmc7XG4gICAgfTtcbn0gPSB7XG4gICAgXCIoXCI6IHtcbiAgICAgICAga2V5OiBcIjlcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIilcIjoge1xuICAgICAgICBrZXk6IFwiMFwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwie1wiOiB7XG4gICAgICAgIGtleTogXCJvcGVuX2JyYWNrZXRcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIn1cIjoge1xuICAgICAgICBrZXk6IFwiY2xvc2VfYnJhY2tldFwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwiPFwiOiB7XG4gICAgICAgIGtleTogXCJjb21tYVwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwiPlwiOiB7XG4gICAgICAgIGtleTogXCJwZXJpb2RcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICAnXCInOiB7XG4gICAgICAgIGtleTogXCJxdW90ZVwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwiJ1wiOiB7XG4gICAgICAgIGtleTogXCJxdW90ZVwiLFxuICAgIH0sXG4gICAgXCIsXCI6IHtcbiAgICAgICAga2V5OiBcImNvbW1hXCIsXG4gICAgfSxcbiAgICBcIi5cIjoge1xuICAgICAgICBrZXk6IFwicGVyaW9kXCIsXG4gICAgfSxcbiAgICBcIiBcIjoge1xuICAgICAgICBrZXk6IFwic3BhY2ViYXJcIixcbiAgICB9LFxuICAgIFwiPVwiOiB7XG4gICAgICAgIGtleTogXCJlcXVhbF9zaWduXCIsXG4gICAgfSxcbiAgICBcIjtcIjoge1xuICAgICAgICBrZXk6IFwic2VtaWNvbG9uXCIsXG4gICAgfSxcbiAgICBcIjpcIjoge1xuICAgICAgICBrZXk6IFwic2VtaWNvbG9uXCIsXG4gICAgICAgIG1vZDogXCJzaGlmdFwiLFxuICAgIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRjdXRfdG9fbW9kaWZpZXIoc2hvcnQ6IHN0cmluZyk6IFRvTW9kaWZpZXJbXSB7XG4gICAgcmV0dXJuIHNob3J0XG4gICAgICAgIC5yZXBsYWNlKC9eJyguKz8pJyQvLCBcIiQxXCIpXG4gICAgICAgIC5zcGxpdCgvKD86KS8pXG4gICAgICAgIC5tYXAoXG4gICAgICAgICAgICAoa2V5OiBzdHJpbmcpOiBUb01vZGlmaWVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRvTW9kaWZpZXJNYXBba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsga2V5X2NvZGU6IGtleSB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlfY29kZToga2V5LnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcnM6IFtcInNoaWZ0XCJdLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdG9Nb2RpZmllck1hcFtrZXldW1wibW9kXCJdO1xuICAgICAgICAgICAgICAgIGlmICghbW9kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGtleV9jb2RlOiB0b01vZGlmaWVyTWFwW2tleV1bXCJrZXlcIl0gfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAga2V5X2NvZGU6IHRvTW9kaWZpZXJNYXBba2V5XVtcImtleVwiXSxcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBbbW9kXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xufVxuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgZnJvbU1vZGlmaWVyIH0gZnJvbSBcIi4vZnJvbVwiO1xuaW1wb3J0IHsgdG9Nb2RpZmllciB9IGZyb20gXCIuL3RvXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwZWFyKG1hbmlwOiBNYW5pcHVsYXRvcik6IE1hbmlwdWxhdG9yIHtcbiAgICBPYmplY3Qua2V5cyhtYW5pcClcbiAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5Lm1hdGNoKC9eOi8pKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBcInN0cmluZ1wiID09PSB0eXBlb2YgbWFuaXBba2V5XSlcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIG1hbmlwLmZyb20gPSBmcm9tTW9kaWZpZXIobWFuaXAuZnJvbSwga2V5LnJlcGxhY2UoL146LywgXCJcIikpO1xuICAgICAgICAgICAgbWFuaXAudG8gPSB0b01vZGlmaWVyKG1hbmlwLnRvLCAoPGFueT5tYW5pcClba2V5XSk7XG4gICAgICAgICAgICBkZWxldGUgKDxhbnk+bWFuaXApW2tleV07XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBtYW5pcDtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ19zaG9ydGN1dChcbiAgICBtYW5pcDogTWFuaXB1bGF0b3IgfCBzdHJpbmdcbik6IE1hbmlwdWxhdG9yIHwgc3RyaW5nIHtcbiAgICBpZiAoXCJzdHJpbmdcIiAhPT0gdHlwZW9mIG1hbmlwKSB7XG4gICAgICAgIHJldHVybiBtYW5pcDtcbiAgICB9XG4gICAgbGV0IGt2ID0gbWFuaXAuc3BsaXQoXCI6XCIpO1xuICAgIGlmIChrdi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICByZXN1bHRbXCI6XCIgKyAoa3Yuc2hpZnQoKSB8fCBcIlwiKS50cmltKCldID0ga3Yuam9pbihcIjpcIikudHJpbSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBwYXJzZV9zaG9ydGN1dCB9IGZyb20gXCIuL2xpYnMvcGFyc2Vfc2hvcnRjdXRcIjtcbmltcG9ydCB7IHJlbW92ZV9wcm9wZXJ0eSB9IGZyb20gXCIuL2xpYnMvcmVtb3ZlX3Byb3BlcnR5XCI7XG5pbXBvcnQgeyBzaG9ydGN1dF90b19tb2RpZmllciB9IGZyb20gXCIuL2xpYnMvc2hvcnRjdXRfdG9fbW9kaWZpZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUb01vZGlmaWVyIHtcbiAgICBrZXlfY29kZTogc3RyaW5nO1xuICAgIG1vZGlmaWVycz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9Nb2RpZmllcihcbiAgICBiYXNlOiBUb01vZGlmaWVyW10gfCB2b2lkLFxuICAgIHNob3J0OiBzdHJpbmdcbik6IFRvTW9kaWZpZXJbXSB7XG4gICAgbGV0IHJlc3VsdHMgPSBzaG9ydFxuICAgICAgICAuc3BsaXQoLywvKVxuICAgICAgICAuZmlsdGVyKHNob3J0ID0+IHNob3J0KVxuICAgICAgICAucmVkdWNlKChiYXNlOiBUb01vZGlmaWVyW10sIHNob3J0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmICghc2hvcnQubWF0Y2goL14nLis/JyQvKSkge1xuICAgICAgICAgICAgICAgIGxldCBrZXlzID0gcGFyc2Vfc2hvcnRjdXQoc2hvcnQpO1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6IFRvTW9kaWZpZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIGtleV9jb2RlOiBrZXlzLnBvcCgpIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1vZGlmaWVycyA9IGtleXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLmNvbmNhdChyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuY29uY2F0KHNob3J0Y3V0X3RvX21vZGlmaWVyKHNob3J0KSk7XG4gICAgICAgIH0sIFtdKTtcbiAgICByZXR1cm4gKGJhc2UgfHwgW10pLmNvbmNhdChyZXN1bHRzKTtcbn1cblxuZXhwb3J0IGNvbnN0IHRvID0gcmVtb3ZlX3Byb3BlcnR5KFxuICAgIFwiOnRvXCIsXG4gICAgKG1hbmlwOiBNYW5pcHVsYXRvciwgcHJvcDogc3RyaW5nKTogTWFuaXB1bGF0b3IgPT4ge1xuICAgICAgICBtYW5pcC50byA9IHRvTW9kaWZpZXIobWFuaXAudG8sIHByb3ApO1xuICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgfVxuKTtcbiIsImltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIH0gZnJvbSBcIi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2F0dHJzKFxuICAgIHJ1bGU6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlXG4pOiB7XG4gICAgcnVsZTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGU7XG4gICAgYXR0cjogYW55O1xufSB7XG4gICAgbGV0IGF0dHJzID0gT2JqZWN0LmtleXMocnVsZSlcbiAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5Lm1hdGNoKC9eOi8pKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBcInN0cmluZ1wiID09PSB0eXBlb2YgcnVsZVtrZXldKVxuICAgICAgICAucmVkdWNlKChiYXNlLCBjdXIpID0+IHtcbiAgICAgICAgICAgIGJhc2VbY3VyXSA9IHJ1bGVbY3VyXTtcbiAgICAgICAgICAgIGRlbGV0ZSBydWxlW2N1cl07XG4gICAgICAgICAgICByZXR1cm4gYmFzZTtcbiAgICAgICAgfSwge30pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJ1bGU6IHJ1bGUsXG4gICAgICAgIGF0dHI6IGF0dHJzLFxuICAgIH07XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHR5cGVfYmFzaWMobWFuaXA6IE1hbmlwdWxhdG9yKTogTWFuaXB1bGF0b3Ige1xuICAgIG1hbmlwLnR5cGUgPSBtYW5pcC50eXBlIHx8IFwiYmFzaWNcIjtcbiAgICByZXR1cm4gbWFuaXA7XG59XG4iLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIH0gZnJvbSBcIi4vcnVsZXMvbWFrZV9ydWxlc1wiO1xuXG5pbnRlcmZhY2UgS2FyYWJpbmVySnNvblByb2ZpbGUge1xuICAgIHNlbGVjdGVkOiBib29sZWFuO1xuICAgIGNvbXBsZXhfbW9kaWZpY2F0aW9uczoge1xuICAgICAgICBydWxlczogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXTtcbiAgICB9O1xufVxuXG5pbnRlcmZhY2UgS2FyYWJpbmVySnNvbiB7XG4gICAgcHJvZmlsZXM6IEthcmFiaW5lckpzb25Qcm9maWxlW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cml0ZV9ydWxlcyhydWxlczogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXSkge1xuICAgIGxldCBrYXJhYmluZXJKc29uUGF0aCA9IGAke1xuICAgICAgICBwcm9jZXNzLmVudi5IT01FXG4gICAgfS8uY29uZmlnL2thcmFiaW5lci9rYXJhYmluZXIuanNvbmA7XG4gICAgbGV0IGthcmFiaW5lckpzb246IEthcmFiaW5lckpzb24gPSBldmFsKFxuICAgICAgICBgKCR7ZnMucmVhZEZpbGVTeW5jKGthcmFiaW5lckpzb25QYXRoKX0pYFxuICAgICk7XG4gICAga2FyYWJpbmVySnNvbi5wcm9maWxlc1xuICAgICAgICAuZmlsdGVyKHByb2ZpbGUgPT4gcHJvZmlsZS5zZWxlY3RlZClcbiAgICAgICAgLmZvckVhY2gocHJvZmlsZSA9PiAocHJvZmlsZS5jb21wbGV4X21vZGlmaWNhdGlvbnMucnVsZXMgPSBydWxlcykpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoXG4gICAgICAgIGthcmFiaW5lckpzb25QYXRoLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShrYXJhYmluZXJKc29uLCBudWxsLCBcIiAgXCIpXG4gICAgKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvdXJjZS1tYXAtc3VwcG9ydFwiKTsiXSwic291cmNlUm9vdCI6IiJ9