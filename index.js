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
            }
        ];
    }
    return (json.rules || [json]);
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
    let rules = json_to_rule_1.json_to_rule(json).map((rule) => make_rule_1.make_rule(rule));
    let only = false;
    if (rules.find((rule) => rule[':only'])) {
        only = true;
        rules = rules.filter((rule) => rule[':only']).map((rule) => {
            delete rule[':only'];
            return rule;
        });
    }
    return {
        only: only,
        rules: rules.map((rule) => map_rule_1.map_rule(rule, file.fileName)),
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
    let result = set_attrs_1.set_attrs(json);
    result.description = result.description || fileName.replace(/\.\w+/, "");
    result.manipulators = result.manipulators
        .map(string_shortcut_1.string_shortcut)
        .map(type_basic_1.type_basic)
        .map(app_1.app)
        .map(device_1.device)
        .map(lang_1.lang)
        .map(from_1.from)
        .map(to_1.to)
        .map(pear_1.pear);
    return result;
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
    let results = files
        .map(file => {
        try {
            return make_rules_1.make_rules(file);
        }
        catch (e) {
            console.error(e.message, file.fileName);
        }
    });
    let rules;
    if (results.find((rule) => rule.only)) {
        rules = results.filter((rule) => rule.only).map((rule) => rule.rules);
    }
    else {
        rules = results.map((rule) => rule.rules);
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
    rule.manipulators = rule.manipulators.map(manip => Object.assign({}, manip, attrs));
    return rule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9qc29uX3RvX3J1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21ha2VfcnVsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcF9ydWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9kZXZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2Zyb20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xhbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpYnMvY29uZGl0aW9uX21hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbGlicy9wYXJzZV9zaG9ydGN1dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbGlicy9yZW1vdmVfcHJvcGVydHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21ha2VfcnVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcGVhci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvc2V0X2F0dHJzLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9zdHJpbmdfc2hvcnRjdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3RvLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90eXBlX2Jhc2ljLnRzIiwid2VicGFjazovLy8uL3NyYy93cml0ZV9ydWxlcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvdXJjZS1tYXAtc3VwcG9ydFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFB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IiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0ICogYXMgU291cmNlTWFwU3VwcG9ydCBmcm9tIFwic291cmNlLW1hcC1zdXBwb3J0XCI7XG5pbXBvcnQgeyByZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucyB9IGZyb20gXCIuL3JlYWRfY29tcGxleF9tb2RpZmljYXRpb25zXCI7XG5pbXBvcnQgeyByZWFkX3J1bGVzIH0gZnJvbSBcIi4vcmVhZF9ydWxlc1wiO1xuaW1wb3J0IHsgd3JpdGVfcnVsZXMgfSBmcm9tIFwiLi93cml0ZV9ydWxlc1wiO1xuXG5Tb3VyY2VNYXBTdXBwb3J0Lmluc3RhbGwoKTtcblxubGV0IGZpbGVzID0gcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnMoXG4gICAgfnByb2Nlc3MuYXJndi5pbmRleE9mKFwiLS1qc29uXCIpXG4gICAgICAgID8gcHJvY2Vzcy5hcmd2W3Byb2Nlc3MuYXJndi5pbmRleE9mKFwiLS1qc29uXCIpICsgMV1cbiAgICAgICAgOiBfX2Rpcm5hbWVcbik7XG5pZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJtaXNzaW5nIHNldHRpbmcganNvbiBmaWxlc1wiKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG59XG5cbmxldCBydWxlcyA9IHJlYWRfcnVsZXMoZmlsZXMpO1xuXG5pZiAofnByb2Nlc3MuYXJndi5pbmRleE9mKFwiLS11cGRhdGVcIikpIHtcbiAgICB3cml0ZV9ydWxlcyhydWxlcyk7XG59IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKHtcbiAgICAgICAgdGl0bGU6IFwicHJpdmF0ZSBzZXR0aW5nc1wiLFxuICAgICAgICBydWxlczogcnVsZXMsXG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGpzb25fdG9fcnVsZShcbiAgICBqc29uOiBhbnksXG4pOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVtdIHtcbiAgICBpZiAoanNvbi5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGpzb24uZmluZChydWxlID0+IHJ1bGUuZGVzY3JpcHRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1hbmlwdWxhdG9yczoganNvbixcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICB9XG4gICAgcmV0dXJuIChqc29uLnJ1bGVzIHx8IFtqc29uXSk7XG59XG4iLCJpbXBvcnQgeyBqc29uX3RvX3J1bGUgfSBmcm9tIFwiLi9qc29uX3RvX3J1bGVcIjtcbmltcG9ydCB7IG1hcF9ydWxlIH0gZnJvbSBcIi4vbWFwX3J1bGVcIjtcbmltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25GaWxlIH0gZnJvbSBcIi4vcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IERldmljZUlkZW50aWZpZXJzIH0gZnJvbSBcIi4vcnVsZXMvZGV2aWNlXCI7XG5pbXBvcnQgeyBGcm9tTW9kaWZpZXIgfSBmcm9tIFwiLi9ydWxlcy9mcm9tXCI7XG5pbXBvcnQgeyBMYW5nSW5wdXRTb3VyY2VzIH0gZnJvbSBcIi4vcnVsZXMvbGFuZ1wiO1xuaW1wb3J0IHsgbWFrZV9ydWxlIH0gZnJvbSBcIi4vcnVsZXMvbWFrZV9ydWxlXCI7XG5pbXBvcnQgeyBUb01vZGlmaWVyIH0gZnJvbSBcIi4vcnVsZXMvdG9cIjtcblxuZXhwb3J0IGludGVyZmFjZSBNYW5pcHVsYXRvckNvbmRpdGlvbnMge1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBidW5kbGVfaWRlbnRpZmllcnM/OiBzdHJpbmdbXTtcbiAgICBpZGVudGlmaWVycz86IERldmljZUlkZW50aWZpZXJzW107XG4gICAgaW5wdXRfc291cmNlcz86IExhbmdJbnB1dFNvdXJjZXNbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYW5pcHVsYXRvciB7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICBjb25kaXRpb25zPzogTWFuaXB1bGF0b3JDb25kaXRpb25zW107XG4gICAgZnJvbT86IEZyb21Nb2RpZmllcjtcbiAgICB0bz86IFRvTW9kaWZpZXJbXTtcblxuICAgIFwiOmZyb21cIj86IHN0cmluZztcbiAgICBcIjp0b1wiPzogc3RyaW5nO1xuICAgIFwiOmFwcFwiPzogc3RyaW5nO1xuICAgIFwiOmxhbmdcIj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB7XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgbWFuaXB1bGF0b3JzPzogTWFuaXB1bGF0b3JbXTtcbiAgICBcIjptYW5pcHVsYXRvcnNcIj86IE1hbmlwdWxhdG9yIHwgTWFuaXB1bGF0b3JbXTtcbiAgICBcIjpvbmx5XCI/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZV9ydWxlcyhcbiAgICBmaWxlOiBDb21wbGV4TW9kaWZpY2F0aW9uRmlsZVxuKToge1xuICAgIG9ubHk6IGJvb2xlYW47XG4gICAgcnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW107XG59IHtcbiAgICBsZXQganNvbiA9IGV2YWwoYCgke2ZpbGUudGV4dENvbnRlbnR9KWApO1xuICAgIGxldCBydWxlcyA9IGpzb25fdG9fcnVsZShqc29uKS5tYXAoKHJ1bGUpID0+IG1ha2VfcnVsZShydWxlKSk7XG4gICAgbGV0IG9ubHkgPSBmYWxzZTtcbiAgICBpZiAocnVsZXMuZmluZCgocnVsZSkgPT4gcnVsZVsnOm9ubHknXSkpIHtcbiAgICAgICAgb25seSA9IHRydWU7XG4gICAgICAgIHJ1bGVzID0gcnVsZXMuZmlsdGVyKChydWxlKSA9PiBydWxlWyc6b25seSddKS5tYXAoKHJ1bGUpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSBydWxlWyc6b25seSddO1xuICAgICAgICAgICAgcmV0dXJuIHJ1bGU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBvbmx5OiBvbmx5LFxuICAgICAgICBydWxlczogcnVsZXMubWFwKChydWxlKSA9PiBtYXBfcnVsZShydWxlLCBmaWxlLmZpbGVOYW1lKSksXG4gICAgfTtcbn1cbiIsImltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIH0gZnJvbSBcIi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4vcnVsZXMvYXBwXCI7XG5pbXBvcnQgeyBkZXZpY2UgfSBmcm9tIFwiLi9ydWxlcy9kZXZpY2VcIjtcbmltcG9ydCB7IGZyb20gfSBmcm9tIFwiLi9ydWxlcy9mcm9tXCI7XG5pbXBvcnQgeyBsYW5nIH0gZnJvbSBcIi4vcnVsZXMvbGFuZ1wiO1xuaW1wb3J0IHsgcGVhciB9IGZyb20gXCIuL3J1bGVzL3BlYXJcIjtcbmltcG9ydCB7IHNldF9hdHRycyB9IGZyb20gXCIuL3J1bGVzL3NldF9hdHRyc1wiO1xuaW1wb3J0IHsgc3RyaW5nX3Nob3J0Y3V0IH0gZnJvbSBcIi4vcnVsZXMvc3RyaW5nX3Nob3J0Y3V0XCI7XG5pbXBvcnQgeyB0byB9IGZyb20gXCIuL3J1bGVzL3RvXCI7XG5pbXBvcnQgeyB0eXBlX2Jhc2ljIH0gZnJvbSBcIi4vcnVsZXMvdHlwZV9iYXNpY1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwX3J1bGUoXG4gICAganNvbjogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUsXG4gICAgZmlsZU5hbWU6IHN0cmluZ1xuKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUge1xuICAgIGxldCByZXN1bHQgPSBzZXRfYXR0cnMoanNvbik7XG4gICAgcmVzdWx0LmRlc2NyaXB0aW9uID0gcmVzdWx0LmRlc2NyaXB0aW9uIHx8IGZpbGVOYW1lLnJlcGxhY2UoL1xcLlxcdysvLCBcIlwiKTtcbiAgICByZXN1bHQubWFuaXB1bGF0b3JzID0gcmVzdWx0Lm1hbmlwdWxhdG9yc1xuICAgICAgICAubWFwKHN0cmluZ19zaG9ydGN1dClcbiAgICAgICAgLm1hcCh0eXBlX2Jhc2ljKVxuICAgICAgICAubWFwKGFwcClcbiAgICAgICAgLm1hcChkZXZpY2UpXG4gICAgICAgIC5tYXAobGFuZylcbiAgICAgICAgLm1hcChmcm9tKVxuICAgICAgICAubWFwKHRvKVxuICAgICAgICAubWFwKHBlYXIpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb21wbGV4TW9kaWZpY2F0aW9uRmlsZSB7XG4gICAgZmlsZU5hbWU6IHN0cmluZztcbiAgICB0ZXh0Q29udGVudDogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnMoXG4gICAgZGlybmFtZTogc3RyaW5nXG4pOiBDb21wbGV4TW9kaWZpY2F0aW9uRmlsZVtdIHtcbiAgICByZXR1cm4gZnNcbiAgICAgICAgLnJlYWRkaXJTeW5jKGRpcm5hbWUpXG4gICAgICAgIC5maWx0ZXIoZmlsZSA9PiBmaWxlLm1hdGNoKC9cXC5qc29uJC8pKVxuICAgICAgICAubWFwKGZpbGUgPT4ge1xuICAgICAgICAgICAgbGV0IHBhdGggPSBgJHtkaXJuYW1lfS8ke2ZpbGV9YDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IGZpbGUsXG4gICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFN0cmluZyhmcy5yZWFkRmlsZVN5bmMocGF0aCkpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSwgbWFrZV9ydWxlcyB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25GaWxlIH0gZnJvbSBcIi4vcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRfcnVsZXMoZmlsZXM6IENvbXBsZXhNb2RpZmljYXRpb25GaWxlW10pOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVtdIHtcbiAgICBsZXQgcmVzdWx0cyA9IGZpbGVzXG4gICAgICAgIC5tYXAoZmlsZSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYWtlX3J1bGVzKGZpbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlLCBmaWxlLmZpbGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgbGV0IHJ1bGVzO1xuICAgIGlmIChyZXN1bHRzLmZpbmQoKHJ1bGUpID0+IHJ1bGUub25seSkpIHtcbiAgICAgICAgcnVsZXMgPSByZXN1bHRzLmZpbHRlcigocnVsZSkgPT4gcnVsZS5vbmx5KS5tYXAoKHJ1bGUpID0+IHJ1bGUucnVsZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJ1bGVzID0gcmVzdWx0cy5tYXAoKHJ1bGUpID0+IHJ1bGUucnVsZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcnVsZXMucmVkdWNlKChiYXNlLCBjdXIpID0+IGJhc2UuY29uY2F0KGN1ciksIFtdKTtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBjb25kaXRpb25fbWFwIH0gZnJvbSBcIi4vbGlicy9jb25kaXRpb25fbWFwXCI7XG5cbmxldCBjb25kaXRpb25BcHBNYXAgPSB7XG4gICAgYnJvd3NlcnM6IFtcbiAgICAgICAgXCJeY29tXFxcXC5nb29nbGVcXFxcLkNocm9tZSRcIixcbiAgICAgICAgXCJeb3JnXFxcXC5tb3ppbGxhXFxcXC5maXJlZm94JFwiLFxuICAgICAgICBcIl5jb21cXFxcLmFwcGxlXFxcXC5TYWZhcmkkXCIsXG4gICAgXSxcbiAgICBjaHJvbWU6IFtcIl5jb21cXFxcLmdvb2dsZVxcXFwuQ2hyb21lJFwiXSxcbiAgICBqZXRicmFpbnM6IFtcIl5jb21cXFxcLmpldGJyYWluc1xcXFwuXCJdLFxufTtcblxubGV0IHRvQ29uZGl0aW9uQXBwID0gKGNvbmRpdGlvbjogc3RyaW5nKTogTWFuaXB1bGF0b3JDb25kaXRpb25zID0+IHtcbiAgICBpZiAoY29uZGl0aW9uQXBwTWFwW2NvbmRpdGlvbl0pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiZnJvbnRtb3N0X2FwcGxpY2F0aW9uX2lmXCIsXG4gICAgICAgICAgICBidW5kbGVfaWRlbnRpZmllcnM6IGNvbmRpdGlvbkFwcE1hcFtjb25kaXRpb25dLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoY29uZGl0aW9uLm1hdGNoKC9eIS8pICYmIGNvbmRpdGlvbkFwcE1hcFtjb25kaXRpb24ucmVwbGFjZSgvXiEvLCBcIlwiKV0pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiZnJvbnRtb3N0X2FwcGxpY2F0aW9uX3VubGVzc1wiLFxuICAgICAgICAgICAgYnVuZGxlX2lkZW50aWZpZXJzOiBbY29uZGl0aW9uQXBwTWFwW2NvbmRpdGlvbi5yZXBsYWNlKC9eIS8sIFwiXCIpXV0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBDb25kaXRpb25BcHBNYXAgXCIke2NvbmRpdGlvbn1cImApO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcCA9IGNvbmRpdGlvbl9tYXAoXCI6YXBwXCIsIHRvQ29uZGl0aW9uQXBwKTtcbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBjb25kaXRpb25fbWFwIH0gZnJvbSBcIi4vbGlicy9jb25kaXRpb25fbWFwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGV2aWNlSWRlbnRpZmllcnMge1xuICAgIHZlbmRvcl9pZDogbnVtYmVyO1xuICAgIHByb2R1Y3RfaWQ6IG51bWJlcjtcbn1cblxubGV0IGNvbmRpdGlvbkRldmljZU1hcCA9IHtcbiAgICBiYXJvY2NvOiB7XG4gICAgICAgIHZlbmRvcl9pZDogMTI0MSxcbiAgICAgICAgcHJvZHVjdF9pZDogMzIzLFxuICAgIH0sXG4gICAgYXBwbGU6IHtcbiAgICAgICAgdmVuZG9yX2lkOiAxNDUyLFxuICAgICAgICBwcm9kdWN0X2lkOiA2MjksXG4gICAgfSxcbn07XG5cbmxldCB0b0NvbmRpdGlvbkRldmljZSA9IChjb25kaXRpb24pOiBNYW5pcHVsYXRvckNvbmRpdGlvbnMgPT4ge1xuICAgIGlmIChjb25kaXRpb25EZXZpY2VNYXBbY29uZGl0aW9uXSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJkZXZpY2VfaWZcIixcbiAgICAgICAgICAgIGlkZW50aWZpZXJzOiBbY29uZGl0aW9uRGV2aWNlTWFwW2NvbmRpdGlvbl1dLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAgIGNvbmRpdGlvbi5tYXRjaCgvXiEvKSAmJlxuICAgICAgICBjb25kaXRpb25EZXZpY2VNYXBbY29uZGl0aW9uLnJlcGxhY2UoL14hLywgXCJcIildXG4gICAgKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcImRldmljZV91bmxlc3NcIixcbiAgICAgICAgICAgIGlkZW50aWZpZXJzOiBbY29uZGl0aW9uRGV2aWNlTWFwW2NvbmRpdGlvbi5yZXBsYWNlKC9eIS8sIFwiXCIpXV0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBDb25kaXRpb25EZXZpY2UgXCIke2NvbmRpdGlvbn1cImApO1xufTtcblxuZXhwb3J0IGNvbnN0IGRldmljZSA9IGNvbmRpdGlvbl9tYXAoXCI6ZGV2aWNlXCIsIHRvQ29uZGl0aW9uRGV2aWNlKTtcbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IHBhcnNlX3Nob3J0Y3V0IH0gZnJvbSBcIi4vbGlicy9wYXJzZV9zaG9ydGN1dFwiO1xuaW1wb3J0IHsgcmVtb3ZlX3Byb3BlcnR5IH0gZnJvbSBcIi4vbGlicy9yZW1vdmVfcHJvcGVydHlcIjtcblxuZXhwb3J0IGludGVyZmFjZSBGcm9tTW9kaWZpZXIge1xuICAgIGtleV9jb2RlOiBzdHJpbmc7XG4gICAgbW9kaWZpZXJzPzoge1xuICAgICAgICBvcHRpb25hbD86IHN0cmluZ1tdO1xuICAgICAgICBtYW5kYXRvcnk6IHN0cmluZ1tdO1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tTW9kaWZpZXIoXG4gICAgYmFzZTogRnJvbU1vZGlmaWVyIHwgdm9pZCxcbiAgICBzaG9ydDogc3RyaW5nXG4pOiBGcm9tTW9kaWZpZXIge1xuICAgIGxldCBrZXlzID0gcGFyc2Vfc2hvcnRjdXQoc2hvcnQpO1xuICAgIGxldCByZXN1bHQ6IEZyb21Nb2RpZmllciA9IE9iamVjdC5hc3NpZ24oYmFzZSB8fCB7fSwge1xuICAgICAgICBrZXlfY29kZToga2V5cy5wb3AoKSxcbiAgICB9KTtcbiAgICBpZiAoIWtleXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlc3VsdC5tb2RpZmllcnMgPSByZXN1bHQubW9kaWZpZXJzIHx8IHtcbiAgICAgICAgbWFuZGF0b3J5OiBbXSxcbiAgICB9O1xuICAgIGlmICh+a2V5cy5pbmRleE9mKFwiYW55XCIpKSB7XG4gICAgICAgIHJlc3VsdC5tb2RpZmllcnMub3B0aW9uYWwgPSBbXCJhbnlcIl07XG4gICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihrZXkgPT4ga2V5ICE9PSBcImFueVwiKTtcbiAgICB9XG4gICAgaWYgKGtleXMuZmluZChrZXkgPT4ga2V5LmluY2x1ZGVzKFwiP1wiKSkpIHtcbiAgICAgICAgbGV0IG9wdGlvbmFsID0ga2V5c1xuICAgICAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5LmluY2x1ZGVzKFwiP1wiKSlcbiAgICAgICAgICAgIC5tYXAoa2V5ID0+IGtleS5yZXBsYWNlKFwiP1wiLCBcIlwiKSk7XG4gICAgICAgIHJlc3VsdC5tb2RpZmllcnMub3B0aW9uYWwgPSAocmVzdWx0Lm1vZGlmaWVycy5vcHRpb25hbCB8fCBbXSkuY29uY2F0KFxuICAgICAgICAgICAgb3B0aW9uYWxcbiAgICAgICAgKTtcbiAgICAgICAga2V5cyA9IGtleXMuZmlsdGVyKGtleSA9PiAha2V5LmluY2x1ZGVzKFwiP1wiKSk7XG4gICAgfVxuICAgIGlmICgha2V5cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVzdWx0Lm1vZGlmaWVycy5tYW5kYXRvcnkgPSBrZXlzO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBmcm9tID0gcmVtb3ZlX3Byb3BlcnR5KFxuICAgIFwiOmZyb21cIixcbiAgICAobWFuaXA6IE1hbmlwdWxhdG9yLCBwcm9wOiBzdHJpbmcpOiBNYW5pcHVsYXRvciA9PiB7XG4gICAgICAgIG1hbmlwLmZyb20gPSBmcm9tTW9kaWZpZXIobWFuaXAuZnJvbSwgcHJvcCk7XG4gICAgICAgIHJldHVybiBtYW5pcDtcbiAgICB9XG4pO1xuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3JDb25kaXRpb25zIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IGNvbmRpdGlvbl9tYXAgfSBmcm9tIFwiLi9saWJzL2NvbmRpdGlvbl9tYXBcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMYW5nSW5wdXRTb3VyY2VzIHtcbiAgICBsYW5ndWFnZTogc3RyaW5nO1xufVxuXG5sZXQgdG9Db25kaXRpb25MYW5ndWFnZSA9IChsYW5nOiBzdHJpbmcpOiBNYW5pcHVsYXRvckNvbmRpdGlvbnMgPT4gKHtcbiAgICB0eXBlOiBcImlucHV0X3NvdXJjZV9pZlwiLFxuICAgIGlucHV0X3NvdXJjZXM6IFt7IGxhbmd1YWdlOiBsYW5nIH1dLFxufSk7XG5cbmV4cG9ydCBjb25zdCBsYW5nID0gY29uZGl0aW9uX21hcChcIjpsYW5nXCIsIHRvQ29uZGl0aW9uTGFuZ3VhZ2UpO1xuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IsIE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi8uLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyByZW1vdmVfcHJvcGVydHkgfSBmcm9tIFwiLi9yZW1vdmVfcHJvcGVydHlcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmRpdGlvbl9tYXAoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1hcHBlcjogKHByb3A6IHN0cmluZykgPT4gTWFuaXB1bGF0b3JDb25kaXRpb25zXG4pOiAobWFuaXA6IE1hbmlwdWxhdG9yKSA9PiBNYW5pcHVsYXRvciB7XG4gICAgcmV0dXJuIHJlbW92ZV9wcm9wZXJ0eShcbiAgICAgICAgbmFtZSxcbiAgICAgICAgKG1hbmlwOiBNYW5pcHVsYXRvciwgcHJvcDogc3RyaW5nKTogTWFuaXB1bGF0b3IgPT4ge1xuICAgICAgICAgICAgbWFuaXAuY29uZGl0aW9ucyA9IChtYW5pcC5jb25kaXRpb25zIHx8IFtdKS5jb25jYXQobWFwcGVyKHByb3ApKTtcbiAgICAgICAgICAgIHJldHVybiBtYW5pcDtcbiAgICAgICAgfVxuICAgICk7XG59XG4iLCJsZXQgbW9kaWZpZXJNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgc2hpZnQ6IFwic2hpZnRcIixcbiAgICBjbWQ6IFwiY29tbWFuZFwiLFxuICAgIGNvbTogXCJjb21tYW5kXCIsXG4gICAgb3B0OiBcIm9wdGlvblwiLFxuICAgIGFsdDogXCJhbHRcIixcbiAgICBjdHJsOiBcImNvbnRyb2xcIixcbiAgICBcIipcIjogXCJhbnlcIixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zaG9ydGN1dChzaG9ydGN1dDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBzaG9ydGN1dC5zcGxpdChcIi1cIikubWFwKGtleSA9PiBtb2RpZmllck1hcFtrZXldIHx8IGtleSk7XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi8uLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVfcHJvcGVydHkoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiAobWFuaXA6IE1hbmlwdWxhdG9yLCBwcm9wOiBzdHJpbmcpID0+IE1hbmlwdWxhdG9yXG4pIHtcbiAgICByZXR1cm4gKG1hbmlwOiBNYW5pcHVsYXRvcik6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgaWYgKCFtYW5pcFtuYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgICAgICB9XG4gICAgICAgIG1hbmlwID0gY2FsbGJhY2sobWFuaXAsIG1hbmlwW25hbWVdKTtcbiAgICAgICAgZGVsZXRlIG1hbmlwW25hbWVdO1xuICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgfTtcbn1cbiIsImltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VfcnVsZShydWxlOiBhbnkpOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB7XG4gICAgaWYgKHJ1bGUubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYW5pcHVsYXRvcnM6IHJ1bGUsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChydWxlW1wiOm1hbmlwdWxhdG9yc1wiXSkge1xuICAgICAgICBydWxlLm1hbmlwdWxhdG9ycyA9IChydWxlLm1hbmlwdWxhdG9ycyB8fCBbXSkuY29uY2F0KFxuICAgICAgICAgICAgcnVsZVtcIjptYW5pcHVsYXRvcnNcIl1cbiAgICAgICAgKTtcbiAgICAgICAgZGVsZXRlIHJ1bGVbXCI6bWFuaXB1bGF0b3JzXCJdO1xuICAgIH1cbiAgICByZXR1cm4gcnVsZTtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IGZyb21Nb2RpZmllciB9IGZyb20gXCIuL2Zyb21cIjtcbmltcG9ydCB7IHRvTW9kaWZpZXIgfSBmcm9tIFwiLi90b1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcGVhcihtYW5pcDogTWFuaXB1bGF0b3IpOiBNYW5pcHVsYXRvciB7XG4gICAgT2JqZWN0LmtleXMobWFuaXApXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGtleS5tYXRjaCgvXjovKSlcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG1hbmlwW2tleV0pXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBtYW5pcC5mcm9tID0gZnJvbU1vZGlmaWVyKG1hbmlwLmZyb20sIGtleS5yZXBsYWNlKC9eOi8sIFwiXCIpKTtcbiAgICAgICAgICAgIG1hbmlwLnRvID0gdG9Nb2RpZmllcihtYW5pcC50bywgKDxhbnk+bWFuaXApW2tleV0pO1xuICAgICAgICAgICAgZGVsZXRlICg8YW55Pm1hbmlwKVtrZXldO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gbWFuaXA7XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfYXR0cnMocnVsZTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUpOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB7XG4gICAgbGV0IGF0dHJzID0gT2JqZWN0LmtleXMocnVsZSlcbiAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5Lm1hdGNoKC9eOi8pKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBcInN0cmluZ1wiID09PSB0eXBlb2YgcnVsZVtrZXldKVxuICAgICAgICAucmVkdWNlKChiYXNlLCBjdXIpID0+IHtcbiAgICAgICAgICAgIGJhc2VbY3VyXSA9IHJ1bGVbY3VyXTtcbiAgICAgICAgICAgIGRlbGV0ZSBydWxlW2N1cl07XG4gICAgICAgICAgICByZXR1cm4gYmFzZTtcbiAgICAgICAgfSwge30pO1xuICAgIHJ1bGUubWFuaXB1bGF0b3JzID0gcnVsZS5tYW5pcHVsYXRvcnMubWFwKG1hbmlwID0+XG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIG1hbmlwLCBhdHRycylcbiAgICApO1xuICAgIHJldHVybiBydWxlO1xufVxuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nX3Nob3J0Y3V0KG1hbmlwOiBNYW5pcHVsYXRvciB8IHN0cmluZyk6IE1hbmlwdWxhdG9yIHtcbiAgICBpZiAoXCJzdHJpbmdcIiAhPT0gdHlwZW9mIG1hbmlwKSB7XG4gICAgICAgIHJldHVybiBtYW5pcDtcbiAgICB9XG4gICAgbGV0IGt2ID0gbWFuaXAuc3BsaXQoXCI6XCIpO1xuICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuICAgIHJlc3VsdFtcIjpcIiArIChrdi5zaGlmdCgpIHx8IFwiXCIpLnRyaW0oKV0gPSBrdi5qb2luKFwiOlwiKS50cmltKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IHBhcnNlX3Nob3J0Y3V0IH0gZnJvbSBcIi4vbGlicy9wYXJzZV9zaG9ydGN1dFwiO1xuaW1wb3J0IHsgcmVtb3ZlX3Byb3BlcnR5IH0gZnJvbSBcIi4vbGlicy9yZW1vdmVfcHJvcGVydHlcIjtcblxubGV0IHRvTW9kaWZpZXJNYXA6IHtcbiAgICBba2V5OiBzdHJpbmddOiB7XG4gICAgICAgIGtleTogc3RyaW5nO1xuICAgICAgICBtb2Q/OiBzdHJpbmc7XG4gICAgfTtcbn0gPSB7XG4gICAgXCIoXCI6IHtcbiAgICAgICAga2V5OiBcIjlcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIilcIjoge1xuICAgICAgICBrZXk6IFwiMFwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwie1wiOiB7XG4gICAgICAgIGtleTogXCJvcGVuX2JyYWNrZXRcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIn1cIjoge1xuICAgICAgICBrZXk6IFwiY2xvc2VfYnJhY2tldFwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwiPFwiOiB7XG4gICAgICAgIGtleTogXCJjb21tYVwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwiPlwiOiB7XG4gICAgICAgIGtleTogXCJwZXJpb2RcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICAnXCInOiB7XG4gICAgICAgIGtleTogXCJxdW90ZVwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwiJ1wiOiB7XG4gICAgICAgIGtleTogXCJxdW90ZVwiLFxuICAgIH0sXG4gICAgXCIsXCI6IHtcbiAgICAgICAga2V5OiBcImNvbW1hXCIsXG4gICAgfSxcbiAgICBcIi5cIjoge1xuICAgICAgICBrZXk6IFwicGVyaW9kXCIsXG4gICAgfSxcbiAgICBcIiBcIjoge1xuICAgICAgICBrZXk6IFwic3BhY2ViYXJcIixcbiAgICB9LFxuICAgIFwiPVwiOiB7XG4gICAgICAgIGtleTogXCJlcXVhbF9zaWduXCIsXG4gICAgfSxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9Nb2RpZmllciB7XG4gICAga2V5X2NvZGU6IHN0cmluZztcbiAgICBtb2RpZmllcnM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvTW9kaWZpZXIoXG4gICAgYmFzZTogVG9Nb2RpZmllcltdIHwgdm9pZCxcbiAgICBzaG9ydDogc3RyaW5nXG4pOiBUb01vZGlmaWVyW10ge1xuICAgIGxldCByZXN1bHRzID0gc2hvcnRcbiAgICAgICAgLnNwbGl0KC8sLylcbiAgICAgICAgLmZpbHRlcihzaG9ydCA9PiBzaG9ydClcbiAgICAgICAgLnJlZHVjZSgoYmFzZTogVG9Nb2RpZmllcltdLCBzaG9ydDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXNob3J0Lm1hdGNoKC9eJy4rPyckLykpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5cyA9IHBhcnNlX3Nob3J0Y3V0KHNob3J0KTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBUb01vZGlmaWVyID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXlfY29kZToga2V5cy5wb3AoKSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tb2RpZmllcnMgPSBrZXlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5jb25jYXQocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gc2hvcnRcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXicoLis/KSckLywgXCIkMVwiKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgvKD86KS8pXG4gICAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKGtleTogc3RyaW5nKTogVG9Nb2RpZmllciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRvTW9kaWZpZXJNYXBba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkudG9Mb3dlckNhc2UoKSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGtleV9jb2RlOiBrZXkgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5X2NvZGU6IGtleS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcnM6IFtcInNoaWZ0XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9kID0gdG9Nb2RpZmllck1hcFtrZXldW1wibW9kXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtb2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBrZXlfY29kZTogdG9Nb2RpZmllck1hcFtrZXldW1wia2V5XCJdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleV9jb2RlOiB0b01vZGlmaWVyTWFwW2tleV1bXCJrZXlcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBbbW9kXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGJhc2UuY29uY2F0KHJlc3VsdHMpO1xuICAgICAgICB9LCBbXSk7XG4gICAgcmV0dXJuIChiYXNlIHx8IFtdKS5jb25jYXQocmVzdWx0cyk7XG59XG5cbmV4cG9ydCBjb25zdCB0byA9IHJlbW92ZV9wcm9wZXJ0eShcbiAgICBcIjp0b1wiLFxuICAgIChtYW5pcDogTWFuaXB1bGF0b3IsIHByb3A6IHN0cmluZyk6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgbWFuaXAudG8gPSB0b01vZGlmaWVyKG1hbmlwLnRvLCBwcm9wKTtcbiAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgIH1cbik7XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBlX2Jhc2ljKG1hbmlwOiBNYW5pcHVsYXRvcik6IE1hbmlwdWxhdG9yIHtcbiAgICBtYW5pcC50eXBlID0gbWFuaXAudHlwZSB8fCBcImJhc2ljXCI7XG4gICAgcmV0dXJuIG1hbmlwO1xufVxuIiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcblxuaW50ZXJmYWNlIEthcmFiaW5lckpzb25Qcm9maWxlIHtcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcbiAgICBjb21wbGV4X21vZGlmaWNhdGlvbnM6IHtcbiAgICAgICAgcnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW107XG4gICAgfTtcbn1cblxuaW50ZXJmYWNlIEthcmFiaW5lckpzb24ge1xuICAgIHByb2ZpbGVzOiBLYXJhYmluZXJKc29uUHJvZmlsZVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JpdGVfcnVsZXMocnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW10pIHtcbiAgICBsZXQga2FyYWJpbmVySnNvblBhdGggPSBgJHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuSE9NRVxuICAgIH0vLmNvbmZpZy9rYXJhYmluZXIva2FyYWJpbmVyLmpzb25gO1xuICAgIGxldCBrYXJhYmluZXJKc29uOiBLYXJhYmluZXJKc29uID0gZXZhbChgKCR7ZnMucmVhZEZpbGVTeW5jKGthcmFiaW5lckpzb25QYXRoKX0pYCk7XG4gICAga2FyYWJpbmVySnNvbi5wcm9maWxlc1xuICAgICAgICAuZmlsdGVyKHByb2ZpbGUgPT4gcHJvZmlsZS5zZWxlY3RlZClcbiAgICAgICAgLmZvckVhY2gocHJvZmlsZSA9PiAocHJvZmlsZS5jb21wbGV4X21vZGlmaWNhdGlvbnMucnVsZXMgPSBydWxlcykpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoXG4gICAgICAgIGthcmFiaW5lckpzb25QYXRoLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShrYXJhYmluZXJKc29uLCBudWxsLCBcIiAgXCIpXG4gICAgKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvdXJjZS1tYXAtc3VwcG9ydFwiKTsiXSwic291cmNlUm9vdCI6IiJ9