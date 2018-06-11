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

/***/ "./src/json_to_rule.ts":
/*!*****************************!*\
  !*** ./src/json_to_rule.ts ***!
  \*****************************/
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

/***/ "./src/make_rules.ts":
/*!***************************!*\
  !*** ./src/make_rules.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const json_to_rule_1 = __webpack_require__(/*! ./json_to_rule */ "./src/json_to_rule.ts");
const map_rule_1 = __webpack_require__(/*! ./map_rule */ "./src/map_rule.ts");
const make_rule_1 = __webpack_require__(/*! ./rules/make_rule */ "./src/rules/make_rule.ts");
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

/***/ "./src/map_rule.ts":
/*!*************************!*\
  !*** ./src/map_rule.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(/*! ./rules/app */ "./src/rules/app.ts");
const device_1 = __webpack_require__(/*! ./rules/device */ "./src/rules/device.ts");
const from_1 = __webpack_require__(/*! ./rules/from */ "./src/rules/from.ts");
const lang_1 = __webpack_require__(/*! ./rules/lang */ "./src/rules/lang.ts");
const pear_1 = __webpack_require__(/*! ./rules/pear */ "./src/rules/pear.ts");
const set_attrs_1 = __webpack_require__(/*! ./rules/set_attrs */ "./src/rules/set_attrs.ts");
const string_shortcut_1 = __webpack_require__(/*! ./rules/string_shortcut */ "./src/rules/string_shortcut.ts");
const to_1 = __webpack_require__(/*! ./rules/to */ "./src/rules/to.ts");
const type_basic_1 = __webpack_require__(/*! ./rules/type_basic */ "./src/rules/type_basic.ts");
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
const make_rules_1 = __webpack_require__(/*! ./make_rules */ "./src/make_rules.ts");
function read_rules(files) {
    let results = files.map(file => {
        try {
            return make_rules_1.make_rules(file);
        }
        catch (e) {
            console.error(e.message, file.fileName);
        }
    });
    let rules;
    if (results.find(rule => rule.only)) {
        rules = results.filter(rule => rule.only).map(rule => rule.rules);
    }
    else {
        rules = results.map(rule => rule.rules);
    }
    return rules.reduce((base, cur) => base.concat(cur), []);
}
exports.read_rules = read_rules;


/***/ }),

/***/ "./src/rules/app.ts":
/*!**************************!*\
  !*** ./src/rules/app.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const condition_map_1 = __webpack_require__(/*! ./libs/condition_map */ "./src/rules/libs/condition_map.ts");
let conditionAppMap = {
    browsers: [
        "^com\\.google\\.Chrome$",
        "^org\\.mozilla\\.firefox$",
        "^com\\.apple\\.Safari$",
    ],
    chrome: ["^com\\.google\\.Chrome$"],
    jetbrains: ["^com\\.jetbrains\\."],
};
let toConditionApp = (condition) => {
    if (conditionAppMap[condition]) {
        return {
            type: "frontmost_application_if",
            bundle_identifiers: conditionAppMap[condition],
        };
    }
    if (condition.match(/^!/) && conditionAppMap[condition.replace(/^!/, "")]) {
        return {
            type: "frontmost_application_unless",
            bundle_identifiers: [conditionAppMap[condition.replace(/^!/, "")]],
        };
    }
    throw new Error(`Unknown ConditionAppMap "${condition}"`);
};
exports.app = condition_map_1.condition_map(":app", toConditionApp);


/***/ }),

/***/ "./src/rules/device.ts":
/*!*****************************!*\
  !*** ./src/rules/device.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const condition_map_1 = __webpack_require__(/*! ./libs/condition_map */ "./src/rules/libs/condition_map.ts");
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
let toConditionDevice = (condition) => {
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
};
exports.device = condition_map_1.condition_map(":device", toConditionDevice);


/***/ }),

/***/ "./src/rules/from.ts":
/*!***************************!*\
  !*** ./src/rules/from.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const parse_shortcut_1 = __webpack_require__(/*! ./libs/parse_shortcut */ "./src/rules/libs/parse_shortcut.ts");
const remove_property_1 = __webpack_require__(/*! ./libs/remove_property */ "./src/rules/libs/remove_property.ts");
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

/***/ "./src/rules/lang.ts":
/*!***************************!*\
  !*** ./src/rules/lang.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const condition_map_1 = __webpack_require__(/*! ./libs/condition_map */ "./src/rules/libs/condition_map.ts");
let toConditionLanguage = (lang) => ({
    type: "input_source_if",
    input_sources: [{ language: lang }],
});
exports.lang = condition_map_1.condition_map(":lang", toConditionLanguage);


/***/ }),

/***/ "./src/rules/libs/condition_map.ts":
/*!*****************************************!*\
  !*** ./src/rules/libs/condition_map.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const remove_property_1 = __webpack_require__(/*! ./remove_property */ "./src/rules/libs/remove_property.ts");
function condition_map(name, mapper) {
    return remove_property_1.remove_property(name, (manip, prop) => {
        manip.conditions = (manip.conditions || []).concat(mapper(prop));
        return manip;
    });
}
exports.condition_map = condition_map;


/***/ }),

/***/ "./src/rules/libs/parse_shortcut.ts":
/*!******************************************!*\
  !*** ./src/rules/libs/parse_shortcut.ts ***!
  \******************************************/
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

/***/ "./src/rules/libs/remove_property.ts":
/*!*******************************************!*\
  !*** ./src/rules/libs/remove_property.ts ***!
  \*******************************************/
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

/***/ "./src/rules/pear.ts":
/*!***************************!*\
  !*** ./src/rules/pear.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const from_1 = __webpack_require__(/*! ./from */ "./src/rules/from.ts");
const to_1 = __webpack_require__(/*! ./to */ "./src/rules/to.ts");
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

/***/ "./src/rules/string_shortcut.ts":
/*!**************************************!*\
  !*** ./src/rules/string_shortcut.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function string_shortcut(manip) {
    if ("string" !== typeof manip) {
        return manip;
    }
    let kv = manip.split(":");
    let result = {};
    result[":" + (kv.shift() || "").trim()] = kv.join(":").trim();
    return result;
}
exports.string_shortcut = string_shortcut;


/***/ }),

/***/ "./src/rules/to.ts":
/*!*************************!*\
  !*** ./src/rules/to.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const parse_shortcut_1 = __webpack_require__(/*! ./libs/parse_shortcut */ "./src/rules/libs/parse_shortcut.ts");
const remove_property_1 = __webpack_require__(/*! ./libs/remove_property */ "./src/rules/libs/remove_property.ts");
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
};
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
        let results = short
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
        return base.concat(results);
    }, []);
    return (base || []).concat(results);
}
exports.toModifier = toModifier;
exports.to = remove_property_1.remove_property(":to", (manip, prop) => {
    manip.to = toModifier(manip.to, prop);
    return manip;
});


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9qc29uX3RvX3J1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21ha2VfcnVsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcF9ydWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9kZXZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2Zyb20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xhbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpYnMvY29uZGl0aW9uX21hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbGlicy9wYXJzZV9zaG9ydGN1dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbGlicy9yZW1vdmVfcHJvcGVydHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21ha2VfcnVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcGVhci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvc2V0X2F0dHJzLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9zdHJpbmdfc2hvcnRjdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3RvLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90eXBlX2Jhc2ljLnRzIiwid2VicGFjazovLy8uL3NyYy93cml0ZV9ydWxlcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvdXJjZS1tYXAtc3VwcG9ydFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFB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aW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCAqIGFzIFNvdXJjZU1hcFN1cHBvcnQgZnJvbSBcInNvdXJjZS1tYXAtc3VwcG9ydFwiO1xuaW1wb3J0IHsgcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnMgfSBmcm9tIFwiLi9yZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgcmVhZF9ydWxlcyB9IGZyb20gXCIuL3JlYWRfcnVsZXNcIjtcbmltcG9ydCB7IHdyaXRlX3J1bGVzIH0gZnJvbSBcIi4vd3JpdGVfcnVsZXNcIjtcblxuU291cmNlTWFwU3VwcG9ydC5pbnN0YWxsKCk7XG5cbmxldCBmaWxlcyA9IHJlYWRfY29tcGxleF9tb2RpZmljYXRpb25zKFxuICAgIH5wcm9jZXNzLmFyZ3YuaW5kZXhPZihcIi0tanNvblwiKVxuICAgICAgICA/IHByb2Nlc3MuYXJndltwcm9jZXNzLmFyZ3YuaW5kZXhPZihcIi0tanNvblwiKSArIDFdXG4gICAgICAgIDogX19kaXJuYW1lXG4pO1xuaWYgKCFmaWxlcy5sZW5ndGgpIHtcbiAgICBjb25zb2xlLmVycm9yKFwibWlzc2luZyBzZXR0aW5nIGpzb24gZmlsZXNcIik7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xufVxuXG5sZXQgcnVsZXMgPSByZWFkX3J1bGVzKGZpbGVzKTtcblxuaWYgKH5wcm9jZXNzLmFyZ3YuaW5kZXhPZihcIi0tdXBkYXRlXCIpKSB7XG4gICAgd3JpdGVfcnVsZXMocnVsZXMpO1xufSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyh7XG4gICAgICAgIHRpdGxlOiBcInByaXZhdGUgc2V0dGluZ3NcIixcbiAgICAgICAgcnVsZXM6IHJ1bGVzLFxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUgfSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBqc29uX3RvX3J1bGUoanNvbjogYW55KTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXSB7XG4gICAgaWYgKGpzb24ubGVuZ3RoKSB7XG4gICAgICAgIGlmIChqc29uLmZpbmQocnVsZSA9PiBydWxlLmRlc2NyaXB0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtYW5pcHVsYXRvcnM6IGpzb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4ganNvbi5ydWxlcyB8fCBbanNvbl07XG59XG4iLCJpbXBvcnQgeyBqc29uX3RvX3J1bGUgfSBmcm9tIFwiLi9qc29uX3RvX3J1bGVcIjtcbmltcG9ydCB7IG1hcF9ydWxlIH0gZnJvbSBcIi4vbWFwX3J1bGVcIjtcbmltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25GaWxlIH0gZnJvbSBcIi4vcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IERldmljZUlkZW50aWZpZXJzIH0gZnJvbSBcIi4vcnVsZXMvZGV2aWNlXCI7XG5pbXBvcnQgeyBGcm9tTW9kaWZpZXIgfSBmcm9tIFwiLi9ydWxlcy9mcm9tXCI7XG5pbXBvcnQgeyBMYW5nSW5wdXRTb3VyY2VzIH0gZnJvbSBcIi4vcnVsZXMvbGFuZ1wiO1xuaW1wb3J0IHsgbWFrZV9ydWxlIH0gZnJvbSBcIi4vcnVsZXMvbWFrZV9ydWxlXCI7XG5pbXBvcnQgeyBUb01vZGlmaWVyIH0gZnJvbSBcIi4vcnVsZXMvdG9cIjtcblxuZXhwb3J0IGludGVyZmFjZSBNYW5pcHVsYXRvckNvbmRpdGlvbnMge1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBidW5kbGVfaWRlbnRpZmllcnM/OiBzdHJpbmdbXTtcbiAgICBpZGVudGlmaWVycz86IERldmljZUlkZW50aWZpZXJzW107XG4gICAgaW5wdXRfc291cmNlcz86IExhbmdJbnB1dFNvdXJjZXNbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYW5pcHVsYXRvciB7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICBjb25kaXRpb25zPzogTWFuaXB1bGF0b3JDb25kaXRpb25zW107XG4gICAgZnJvbT86IEZyb21Nb2RpZmllcjtcbiAgICB0bz86IFRvTW9kaWZpZXJbXTtcblxuICAgIFwiOmZyb21cIj86IHN0cmluZztcbiAgICBcIjp0b1wiPzogc3RyaW5nO1xuICAgIFwiOmFwcFwiPzogc3RyaW5nO1xuICAgIFwiOmxhbmdcIj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB7XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgbWFuaXB1bGF0b3JzPzogTWFuaXB1bGF0b3JbXTtcbiAgICBcIjptYW5pcHVsYXRvcnNcIj86IE1hbmlwdWxhdG9yIHwgTWFuaXB1bGF0b3JbXTtcbiAgICBcIjpvbmx5XCI/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZV9ydWxlcyhcbiAgICBmaWxlOiBDb21wbGV4TW9kaWZpY2F0aW9uRmlsZVxuKToge1xuICAgIG9ubHk6IGJvb2xlYW47XG4gICAgcnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW107XG59IHtcbiAgICBsZXQganNvbiA9IGV2YWwoYCgke2ZpbGUudGV4dENvbnRlbnR9KWApO1xuICAgIGxldCBydWxlcyA9IGpzb25fdG9fcnVsZShqc29uKS5tYXAocnVsZSA9PiBtYWtlX3J1bGUocnVsZSkpO1xuICAgIGxldCBvbmx5ID0gZmFsc2U7XG4gICAgaWYgKHJ1bGVzLmZpbmQocnVsZSA9PiBydWxlW1wiOm9ubHlcIl0pKSB7XG4gICAgICAgIG9ubHkgPSB0cnVlO1xuICAgICAgICBydWxlcyA9IHJ1bGVzLmZpbHRlcihydWxlID0+IHJ1bGVbXCI6b25seVwiXSkubWFwKHJ1bGUgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHJ1bGVbXCI6b25seVwiXTtcbiAgICAgICAgICAgIHJldHVybiBydWxlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25seTogb25seSxcbiAgICAgICAgcnVsZXM6IHJ1bGVzLm1hcChydWxlID0+IG1hcF9ydWxlKHJ1bGUsIGZpbGUuZmlsZU5hbWUpKSxcbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUsIE1hbmlwdWxhdG9yIH0gZnJvbSBcIi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4vcnVsZXMvYXBwXCI7XG5pbXBvcnQgeyBkZXZpY2UgfSBmcm9tIFwiLi9ydWxlcy9kZXZpY2VcIjtcbmltcG9ydCB7IGZyb20gfSBmcm9tIFwiLi9ydWxlcy9mcm9tXCI7XG5pbXBvcnQgeyBsYW5nIH0gZnJvbSBcIi4vcnVsZXMvbGFuZ1wiO1xuaW1wb3J0IHsgcGVhciB9IGZyb20gXCIuL3J1bGVzL3BlYXJcIjtcbmltcG9ydCB7IHNldF9hdHRycyB9IGZyb20gXCIuL3J1bGVzL3NldF9hdHRyc1wiO1xuaW1wb3J0IHsgc3RyaW5nX3Nob3J0Y3V0IH0gZnJvbSBcIi4vcnVsZXMvc3RyaW5nX3Nob3J0Y3V0XCI7XG5pbXBvcnQgeyB0byB9IGZyb20gXCIuL3J1bGVzL3RvXCI7XG5pbXBvcnQgeyB0eXBlX2Jhc2ljIH0gZnJvbSBcIi4vcnVsZXMvdHlwZV9iYXNpY1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwX3J1bGUoXG4gICAganNvbjogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUsXG4gICAgZmlsZU5hbWU6IHN0cmluZ1xuKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUge1xuICAgIGxldCB7cnVsZSwgYXR0cn0gPSBzZXRfYXR0cnMoanNvbik7XG4gICAgcnVsZS5kZXNjcmlwdGlvbiA9IHJ1bGUuZGVzY3JpcHRpb24gfHwgZmlsZU5hbWUucmVwbGFjZSgvXFwuXFx3Ky8sIFwiXCIpO1xuICAgIHJ1bGUubWFuaXB1bGF0b3JzID0gcnVsZS5tYW5pcHVsYXRvcnNcbiAgICAgICAgLm1hcChzdHJpbmdfc2hvcnRjdXQpXG4gICAgICAgIC5tYXAoKG1hbmlwOiBNYW5pcHVsYXRvcik6IE1hbmlwdWxhdG9yID0+IE9iamVjdC5hc3NpZ24oe30sIG1hbmlwLCBhdHRyKSlcbiAgICAgICAgLm1hcCh0eXBlX2Jhc2ljKVxuICAgICAgICAubWFwKGFwcClcbiAgICAgICAgLm1hcChkZXZpY2UpXG4gICAgICAgIC5tYXAobGFuZylcbiAgICAgICAgLm1hcChmcm9tKVxuICAgICAgICAubWFwKHRvKVxuICAgICAgICAubWFwKHBlYXIpO1xuICAgIHJldHVybiBydWxlO1xufVxuIiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGxleE1vZGlmaWNhdGlvbkZpbGUge1xuICAgIGZpbGVOYW1lOiBzdHJpbmc7XG4gICAgdGV4dENvbnRlbnQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRfY29tcGxleF9tb2RpZmljYXRpb25zKFxuICAgIGRpcm5hbWU6IHN0cmluZ1xuKTogQ29tcGxleE1vZGlmaWNhdGlvbkZpbGVbXSB7XG4gICAgcmV0dXJuIGZzXG4gICAgICAgIC5yZWFkZGlyU3luYyhkaXJuYW1lKVxuICAgICAgICAuZmlsdGVyKGZpbGUgPT4gZmlsZS5tYXRjaCgvXFwuanNvbiQvKSlcbiAgICAgICAgLm1hcChmaWxlID0+IHtcbiAgICAgICAgICAgIGxldCBwYXRoID0gYCR7ZGlybmFtZX0vJHtmaWxlfWA7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBmaWxlLFxuICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBTdHJpbmcoZnMucmVhZEZpbGVTeW5jKHBhdGgpKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUsIG1ha2VfcnVsZXMgfSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uRmlsZSB9IGZyb20gXCIuL3JlYWRfY29tcGxleF9tb2RpZmljYXRpb25zXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkX3J1bGVzKFxuICAgIGZpbGVzOiBDb21wbGV4TW9kaWZpY2F0aW9uRmlsZVtdXG4pOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVtdIHtcbiAgICBsZXQgcmVzdWx0cyA9IGZpbGVzLm1hcChmaWxlID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBtYWtlX3J1bGVzKGZpbGUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSwgZmlsZS5maWxlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBsZXQgcnVsZXM7XG4gICAgaWYgKHJlc3VsdHMuZmluZChydWxlID0+IHJ1bGUub25seSkpIHtcbiAgICAgICAgcnVsZXMgPSByZXN1bHRzLmZpbHRlcihydWxlID0+IHJ1bGUub25seSkubWFwKHJ1bGUgPT4gcnVsZS5ydWxlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcnVsZXMgPSByZXN1bHRzLm1hcChydWxlID0+IHJ1bGUucnVsZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcnVsZXMucmVkdWNlKChiYXNlLCBjdXIpID0+IGJhc2UuY29uY2F0KGN1ciksIFtdKTtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBjb25kaXRpb25fbWFwIH0gZnJvbSBcIi4vbGlicy9jb25kaXRpb25fbWFwXCI7XG5cbmxldCBjb25kaXRpb25BcHBNYXAgPSB7XG4gICAgYnJvd3NlcnM6IFtcbiAgICAgICAgXCJeY29tXFxcXC5nb29nbGVcXFxcLkNocm9tZSRcIixcbiAgICAgICAgXCJeb3JnXFxcXC5tb3ppbGxhXFxcXC5maXJlZm94JFwiLFxuICAgICAgICBcIl5jb21cXFxcLmFwcGxlXFxcXC5TYWZhcmkkXCIsXG4gICAgXSxcbiAgICBjaHJvbWU6IFtcIl5jb21cXFxcLmdvb2dsZVxcXFwuQ2hyb21lJFwiXSxcbiAgICBqZXRicmFpbnM6IFtcIl5jb21cXFxcLmpldGJyYWluc1xcXFwuXCJdLFxufTtcblxubGV0IHRvQ29uZGl0aW9uQXBwID0gKGNvbmRpdGlvbjogc3RyaW5nKTogTWFuaXB1bGF0b3JDb25kaXRpb25zID0+IHtcbiAgICBpZiAoY29uZGl0aW9uQXBwTWFwW2NvbmRpdGlvbl0pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiZnJvbnRtb3N0X2FwcGxpY2F0aW9uX2lmXCIsXG4gICAgICAgICAgICBidW5kbGVfaWRlbnRpZmllcnM6IGNvbmRpdGlvbkFwcE1hcFtjb25kaXRpb25dLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoY29uZGl0aW9uLm1hdGNoKC9eIS8pICYmIGNvbmRpdGlvbkFwcE1hcFtjb25kaXRpb24ucmVwbGFjZSgvXiEvLCBcIlwiKV0pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiZnJvbnRtb3N0X2FwcGxpY2F0aW9uX3VubGVzc1wiLFxuICAgICAgICAgICAgYnVuZGxlX2lkZW50aWZpZXJzOiBbY29uZGl0aW9uQXBwTWFwW2NvbmRpdGlvbi5yZXBsYWNlKC9eIS8sIFwiXCIpXV0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBDb25kaXRpb25BcHBNYXAgXCIke2NvbmRpdGlvbn1cImApO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcCA9IGNvbmRpdGlvbl9tYXAoXCI6YXBwXCIsIHRvQ29uZGl0aW9uQXBwKTtcbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBjb25kaXRpb25fbWFwIH0gZnJvbSBcIi4vbGlicy9jb25kaXRpb25fbWFwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGV2aWNlSWRlbnRpZmllcnMge1xuICAgIHZlbmRvcl9pZDogbnVtYmVyO1xuICAgIHByb2R1Y3RfaWQ6IG51bWJlcjtcbn1cblxubGV0IGNvbmRpdGlvbkRldmljZU1hcCA9IHtcbiAgICBiYXJvY2NvOiB7XG4gICAgICAgIHZlbmRvcl9pZDogMTI0MSxcbiAgICAgICAgcHJvZHVjdF9pZDogMzIzLFxuICAgIH0sXG4gICAgYXBwbGU6IHtcbiAgICAgICAgdmVuZG9yX2lkOiAxNDUyLFxuICAgICAgICBwcm9kdWN0X2lkOiA2MjksXG4gICAgfSxcbn07XG5cbmxldCB0b0NvbmRpdGlvbkRldmljZSA9IChjb25kaXRpb24pOiBNYW5pcHVsYXRvckNvbmRpdGlvbnMgPT4ge1xuICAgIGlmIChjb25kaXRpb25EZXZpY2VNYXBbY29uZGl0aW9uXSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJkZXZpY2VfaWZcIixcbiAgICAgICAgICAgIGlkZW50aWZpZXJzOiBbY29uZGl0aW9uRGV2aWNlTWFwW2NvbmRpdGlvbl1dLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAgIGNvbmRpdGlvbi5tYXRjaCgvXiEvKSAmJlxuICAgICAgICBjb25kaXRpb25EZXZpY2VNYXBbY29uZGl0aW9uLnJlcGxhY2UoL14hLywgXCJcIildXG4gICAgKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcImRldmljZV91bmxlc3NcIixcbiAgICAgICAgICAgIGlkZW50aWZpZXJzOiBbY29uZGl0aW9uRGV2aWNlTWFwW2NvbmRpdGlvbi5yZXBsYWNlKC9eIS8sIFwiXCIpXV0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBDb25kaXRpb25EZXZpY2UgXCIke2NvbmRpdGlvbn1cImApO1xufTtcblxuZXhwb3J0IGNvbnN0IGRldmljZSA9IGNvbmRpdGlvbl9tYXAoXCI6ZGV2aWNlXCIsIHRvQ29uZGl0aW9uRGV2aWNlKTtcbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IHBhcnNlX3Nob3J0Y3V0IH0gZnJvbSBcIi4vbGlicy9wYXJzZV9zaG9ydGN1dFwiO1xuaW1wb3J0IHsgcmVtb3ZlX3Byb3BlcnR5IH0gZnJvbSBcIi4vbGlicy9yZW1vdmVfcHJvcGVydHlcIjtcblxuZXhwb3J0IGludGVyZmFjZSBGcm9tTW9kaWZpZXIge1xuICAgIGtleV9jb2RlOiBzdHJpbmc7XG4gICAgbW9kaWZpZXJzPzoge1xuICAgICAgICBvcHRpb25hbD86IHN0cmluZ1tdO1xuICAgICAgICBtYW5kYXRvcnk6IHN0cmluZ1tdO1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tTW9kaWZpZXIoXG4gICAgYmFzZTogRnJvbU1vZGlmaWVyIHwgdm9pZCxcbiAgICBzaG9ydDogc3RyaW5nXG4pOiBGcm9tTW9kaWZpZXIge1xuICAgIGxldCBrZXlzID0gcGFyc2Vfc2hvcnRjdXQoc2hvcnQpO1xuICAgIGxldCByZXN1bHQ6IEZyb21Nb2RpZmllciA9IE9iamVjdC5hc3NpZ24oYmFzZSB8fCB7fSwge1xuICAgICAgICBrZXlfY29kZToga2V5cy5wb3AoKSxcbiAgICB9KTtcbiAgICBpZiAoIWtleXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlc3VsdC5tb2RpZmllcnMgPSByZXN1bHQubW9kaWZpZXJzIHx8IHtcbiAgICAgICAgbWFuZGF0b3J5OiBbXSxcbiAgICB9O1xuICAgIGlmICh+a2V5cy5pbmRleE9mKFwiYW55XCIpKSB7XG4gICAgICAgIHJlc3VsdC5tb2RpZmllcnMub3B0aW9uYWwgPSBbXCJhbnlcIl07XG4gICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihrZXkgPT4ga2V5ICE9PSBcImFueVwiKTtcbiAgICB9XG4gICAgaWYgKGtleXMuZmluZChrZXkgPT4ga2V5LmluY2x1ZGVzKFwiP1wiKSkpIHtcbiAgICAgICAgbGV0IG9wdGlvbmFsID0ga2V5c1xuICAgICAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5LmluY2x1ZGVzKFwiP1wiKSlcbiAgICAgICAgICAgIC5tYXAoa2V5ID0+IGtleS5yZXBsYWNlKFwiP1wiLCBcIlwiKSk7XG4gICAgICAgIHJlc3VsdC5tb2RpZmllcnMub3B0aW9uYWwgPSAocmVzdWx0Lm1vZGlmaWVycy5vcHRpb25hbCB8fCBbXSkuY29uY2F0KFxuICAgICAgICAgICAgb3B0aW9uYWxcbiAgICAgICAgKTtcbiAgICAgICAga2V5cyA9IGtleXMuZmlsdGVyKGtleSA9PiAha2V5LmluY2x1ZGVzKFwiP1wiKSk7XG4gICAgfVxuICAgIGlmICgha2V5cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVzdWx0Lm1vZGlmaWVycy5tYW5kYXRvcnkgPSBrZXlzO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBmcm9tID0gcmVtb3ZlX3Byb3BlcnR5KFxuICAgIFwiOmZyb21cIixcbiAgICAobWFuaXA6IE1hbmlwdWxhdG9yLCBwcm9wOiBzdHJpbmcpOiBNYW5pcHVsYXRvciA9PiB7XG4gICAgICAgIG1hbmlwLmZyb20gPSBmcm9tTW9kaWZpZXIobWFuaXAuZnJvbSwgcHJvcCk7XG4gICAgICAgIHJldHVybiBtYW5pcDtcbiAgICB9XG4pO1xuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3JDb25kaXRpb25zIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IGNvbmRpdGlvbl9tYXAgfSBmcm9tIFwiLi9saWJzL2NvbmRpdGlvbl9tYXBcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMYW5nSW5wdXRTb3VyY2VzIHtcbiAgICBsYW5ndWFnZTogc3RyaW5nO1xufVxuXG5sZXQgdG9Db25kaXRpb25MYW5ndWFnZSA9IChsYW5nOiBzdHJpbmcpOiBNYW5pcHVsYXRvckNvbmRpdGlvbnMgPT4gKHtcbiAgICB0eXBlOiBcImlucHV0X3NvdXJjZV9pZlwiLFxuICAgIGlucHV0X3NvdXJjZXM6IFt7IGxhbmd1YWdlOiBsYW5nIH1dLFxufSk7XG5cbmV4cG9ydCBjb25zdCBsYW5nID0gY29uZGl0aW9uX21hcChcIjpsYW5nXCIsIHRvQ29uZGl0aW9uTGFuZ3VhZ2UpO1xuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IsIE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi8uLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyByZW1vdmVfcHJvcGVydHkgfSBmcm9tIFwiLi9yZW1vdmVfcHJvcGVydHlcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmRpdGlvbl9tYXAoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1hcHBlcjogKHByb3A6IHN0cmluZykgPT4gTWFuaXB1bGF0b3JDb25kaXRpb25zXG4pOiAobWFuaXA6IE1hbmlwdWxhdG9yKSA9PiBNYW5pcHVsYXRvciB7XG4gICAgcmV0dXJuIHJlbW92ZV9wcm9wZXJ0eShcbiAgICAgICAgbmFtZSxcbiAgICAgICAgKG1hbmlwOiBNYW5pcHVsYXRvciwgcHJvcDogc3RyaW5nKTogTWFuaXB1bGF0b3IgPT4ge1xuICAgICAgICAgICAgbWFuaXAuY29uZGl0aW9ucyA9IChtYW5pcC5jb25kaXRpb25zIHx8IFtdKS5jb25jYXQobWFwcGVyKHByb3ApKTtcbiAgICAgICAgICAgIHJldHVybiBtYW5pcDtcbiAgICAgICAgfVxuICAgICk7XG59XG4iLCJsZXQgbW9kaWZpZXJNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgc2hpZnQ6IFwic2hpZnRcIixcbiAgICBjbWQ6IFwiY29tbWFuZFwiLFxuICAgIGNvbTogXCJjb21tYW5kXCIsXG4gICAgb3B0OiBcIm9wdGlvblwiLFxuICAgIGFsdDogXCJhbHRcIixcbiAgICBjdHJsOiBcImNvbnRyb2xcIixcbiAgICBcIipcIjogXCJhbnlcIixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zaG9ydGN1dChzaG9ydGN1dDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBzaG9ydGN1dC5zcGxpdChcIi1cIikubWFwKGtleSA9PiBtb2RpZmllck1hcFtrZXldIHx8IGtleSk7XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi8uLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVfcHJvcGVydHkoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiAobWFuaXA6IE1hbmlwdWxhdG9yLCBwcm9wOiBzdHJpbmcpID0+IE1hbmlwdWxhdG9yXG4pIHtcbiAgICByZXR1cm4gKG1hbmlwOiBNYW5pcHVsYXRvcik6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgaWYgKCFtYW5pcFtuYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgICAgICB9XG4gICAgICAgIG1hbmlwID0gY2FsbGJhY2sobWFuaXAsIG1hbmlwW25hbWVdKTtcbiAgICAgICAgZGVsZXRlIG1hbmlwW25hbWVdO1xuICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgfTtcbn1cbiIsImltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VfcnVsZShydWxlOiBhbnkpOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB7XG4gICAgaWYgKHJ1bGUubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYW5pcHVsYXRvcnM6IHJ1bGUsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChydWxlW1wiOm1hbmlwdWxhdG9yc1wiXSkge1xuICAgICAgICBydWxlLm1hbmlwdWxhdG9ycyA9IChydWxlLm1hbmlwdWxhdG9ycyB8fCBbXSkuY29uY2F0KFxuICAgICAgICAgICAgcnVsZVtcIjptYW5pcHVsYXRvcnNcIl1cbiAgICAgICAgKTtcbiAgICAgICAgZGVsZXRlIHJ1bGVbXCI6bWFuaXB1bGF0b3JzXCJdO1xuICAgIH1cbiAgICByZXR1cm4gcnVsZTtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IGZyb21Nb2RpZmllciB9IGZyb20gXCIuL2Zyb21cIjtcbmltcG9ydCB7IHRvTW9kaWZpZXIgfSBmcm9tIFwiLi90b1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcGVhcihtYW5pcDogTWFuaXB1bGF0b3IpOiBNYW5pcHVsYXRvciB7XG4gICAgT2JqZWN0LmtleXMobWFuaXApXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGtleS5tYXRjaCgvXjovKSlcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG1hbmlwW2tleV0pXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBtYW5pcC5mcm9tID0gZnJvbU1vZGlmaWVyKG1hbmlwLmZyb20sIGtleS5yZXBsYWNlKC9eOi8sIFwiXCIpKTtcbiAgICAgICAgICAgIG1hbmlwLnRvID0gdG9Nb2RpZmllcihtYW5pcC50bywgKDxhbnk+bWFuaXApW2tleV0pO1xuICAgICAgICAgICAgZGVsZXRlICg8YW55Pm1hbmlwKVtrZXldO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gbWFuaXA7XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfYXR0cnMoXG4gICAgcnVsZTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVcbik6IHtcbiAgICBydWxlOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSxcbiAgICBhdHRyOiBhbnk7XG59IHtcbiAgICBsZXQgYXR0cnMgPSBPYmplY3Qua2V5cyhydWxlKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBrZXkubWF0Y2goL146LykpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IFwic3RyaW5nXCIgPT09IHR5cGVvZiBydWxlW2tleV0pXG4gICAgICAgIC5yZWR1Y2UoKGJhc2UsIGN1cikgPT4ge1xuICAgICAgICAgICAgYmFzZVtjdXJdID0gcnVsZVtjdXJdO1xuICAgICAgICAgICAgZGVsZXRlIHJ1bGVbY3VyXTtcbiAgICAgICAgICAgIHJldHVybiBiYXNlO1xuICAgICAgICB9LCB7fSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcnVsZTogcnVsZSxcbiAgICAgICAgYXR0cjogYXR0cnMsXG4gICAgfTtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ19zaG9ydGN1dChtYW5pcDogTWFuaXB1bGF0b3IgfCBzdHJpbmcpOiBNYW5pcHVsYXRvciB7XG4gICAgaWYgKFwic3RyaW5nXCIgIT09IHR5cGVvZiBtYW5pcCkge1xuICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgfVxuICAgIGxldCBrdiA9IG1hbmlwLnNwbGl0KFwiOlwiKTtcbiAgICBsZXQgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICByZXN1bHRbXCI6XCIgKyAoa3Yuc2hpZnQoKSB8fCBcIlwiKS50cmltKCldID0ga3Yuam9pbihcIjpcIikudHJpbSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBwYXJzZV9zaG9ydGN1dCB9IGZyb20gXCIuL2xpYnMvcGFyc2Vfc2hvcnRjdXRcIjtcbmltcG9ydCB7IHJlbW92ZV9wcm9wZXJ0eSB9IGZyb20gXCIuL2xpYnMvcmVtb3ZlX3Byb3BlcnR5XCI7XG5cbmxldCB0b01vZGlmaWVyTWFwOiB7XG4gICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICBrZXk6IHN0cmluZztcbiAgICAgICAgbW9kPzogc3RyaW5nO1xuICAgIH07XG59ID0ge1xuICAgIFwiKFwiOiB7XG4gICAgICAgIGtleTogXCI5XCIsXG4gICAgICAgIG1vZDogXCJzaGlmdFwiLFxuICAgIH0sXG4gICAgXCIpXCI6IHtcbiAgICAgICAga2V5OiBcIjBcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIntcIjoge1xuICAgICAgICBrZXk6IFwib3Blbl9icmFja2V0XCIsXG4gICAgICAgIG1vZDogXCJzaGlmdFwiLFxuICAgIH0sXG4gICAgXCJ9XCI6IHtcbiAgICAgICAga2V5OiBcImNsb3NlX2JyYWNrZXRcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIjxcIjoge1xuICAgICAgICBrZXk6IFwiY29tbWFcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIj5cIjoge1xuICAgICAgICBrZXk6IFwicGVyaW9kXCIsXG4gICAgICAgIG1vZDogXCJzaGlmdFwiLFxuICAgIH0sXG4gICAgJ1wiJzoge1xuICAgICAgICBrZXk6IFwicXVvdGVcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIidcIjoge1xuICAgICAgICBrZXk6IFwicXVvdGVcIixcbiAgICB9LFxuICAgIFwiLFwiOiB7XG4gICAgICAgIGtleTogXCJjb21tYVwiLFxuICAgIH0sXG4gICAgXCIuXCI6IHtcbiAgICAgICAga2V5OiBcInBlcmlvZFwiLFxuICAgIH0sXG4gICAgXCIgXCI6IHtcbiAgICAgICAga2V5OiBcInNwYWNlYmFyXCIsXG4gICAgfSxcbiAgICBcIj1cIjoge1xuICAgICAgICBrZXk6IFwiZXF1YWxfc2lnblwiLFxuICAgIH0sXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFRvTW9kaWZpZXIge1xuICAgIGtleV9jb2RlOiBzdHJpbmc7XG4gICAgbW9kaWZpZXJzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b01vZGlmaWVyKFxuICAgIGJhc2U6IFRvTW9kaWZpZXJbXSB8IHZvaWQsXG4gICAgc2hvcnQ6IHN0cmluZ1xuKTogVG9Nb2RpZmllcltdIHtcbiAgICBsZXQgcmVzdWx0cyA9IHNob3J0XG4gICAgICAgIC5zcGxpdCgvLC8pXG4gICAgICAgIC5maWx0ZXIoc2hvcnQgPT4gc2hvcnQpXG4gICAgICAgIC5yZWR1Y2UoKGJhc2U6IFRvTW9kaWZpZXJbXSwgc2hvcnQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaG9ydC5tYXRjaCgvXicuKz8nJC8pKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleXMgPSBwYXJzZV9zaG9ydGN1dChzaG9ydCk7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogVG9Nb2RpZmllciA9IHtcbiAgICAgICAgICAgICAgICAgICAga2V5X2NvZGU6IGtleXMucG9wKCkgfHwgXCJcIixcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChrZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQubW9kaWZpZXJzID0ga2V5cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuY29uY2F0KHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVzdWx0cyA9IHNob3J0XG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL14nKC4rPyknJC8sIFwiJDFcIilcbiAgICAgICAgICAgICAgICAuc3BsaXQoLyg/OikvKVxuICAgICAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChrZXk6IHN0cmluZyk6IFRvTW9kaWZpZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0b01vZGlmaWVyTWFwW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBrZXlfY29kZToga2V5IH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleV9jb2RlOiBrZXkudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBbXCJzaGlmdFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRvTW9kaWZpZXJNYXBba2V5XVtcIm1vZFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbW9kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsga2V5X2NvZGU6IHRvTW9kaWZpZXJNYXBba2V5XVtcImtleVwiXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlfY29kZTogdG9Nb2RpZmllck1hcFtrZXldW1wia2V5XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyczogW21vZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBiYXNlLmNvbmNhdChyZXN1bHRzKTtcbiAgICAgICAgfSwgW10pO1xuICAgIHJldHVybiAoYmFzZSB8fCBbXSkuY29uY2F0KHJlc3VsdHMpO1xufVxuXG5leHBvcnQgY29uc3QgdG8gPSByZW1vdmVfcHJvcGVydHkoXG4gICAgXCI6dG9cIixcbiAgICAobWFuaXA6IE1hbmlwdWxhdG9yLCBwcm9wOiBzdHJpbmcpOiBNYW5pcHVsYXRvciA9PiB7XG4gICAgICAgIG1hbmlwLnRvID0gdG9Nb2RpZmllcihtYW5pcC50bywgcHJvcCk7XG4gICAgICAgIHJldHVybiBtYW5pcDtcbiAgICB9XG4pO1xuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdHlwZV9iYXNpYyhtYW5pcDogTWFuaXB1bGF0b3IpOiBNYW5pcHVsYXRvciB7XG4gICAgbWFuaXAudHlwZSA9IG1hbmlwLnR5cGUgfHwgXCJiYXNpY1wiO1xuICAgIHJldHVybiBtYW5pcDtcbn1cbiIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUgfSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5cbmludGVyZmFjZSBLYXJhYmluZXJKc29uUHJvZmlsZSB7XG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgY29tcGxleF9tb2RpZmljYXRpb25zOiB7XG4gICAgICAgIHJ1bGVzOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVtdO1xuICAgIH07XG59XG5cbmludGVyZmFjZSBLYXJhYmluZXJKc29uIHtcbiAgICBwcm9maWxlczogS2FyYWJpbmVySnNvblByb2ZpbGVbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyaXRlX3J1bGVzKHJ1bGVzOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVtdKSB7XG4gICAgbGV0IGthcmFiaW5lckpzb25QYXRoID0gYCR7XG4gICAgICAgIHByb2Nlc3MuZW52LkhPTUVcbiAgICB9Ly5jb25maWcva2FyYWJpbmVyL2thcmFiaW5lci5qc29uYDtcbiAgICBsZXQga2FyYWJpbmVySnNvbjogS2FyYWJpbmVySnNvbiA9IGV2YWwoXG4gICAgICAgIGAoJHtmcy5yZWFkRmlsZVN5bmMoa2FyYWJpbmVySnNvblBhdGgpfSlgXG4gICAgKTtcbiAgICBrYXJhYmluZXJKc29uLnByb2ZpbGVzXG4gICAgICAgIC5maWx0ZXIocHJvZmlsZSA9PiBwcm9maWxlLnNlbGVjdGVkKVxuICAgICAgICAuZm9yRWFjaChwcm9maWxlID0+IChwcm9maWxlLmNvbXBsZXhfbW9kaWZpY2F0aW9ucy5ydWxlcyA9IHJ1bGVzKSk7XG4gICAgZnMud3JpdGVGaWxlU3luYyhcbiAgICAgICAga2FyYWJpbmVySnNvblBhdGgsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGthcmFiaW5lckpzb24sIG51bGwsIFwiICBcIilcbiAgICApO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic291cmNlLW1hcC1zdXBwb3J0XCIpOyJdLCJzb3VyY2VSb290IjoiIn0=