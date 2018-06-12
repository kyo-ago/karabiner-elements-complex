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
if (!~process.argv.indexOf("--noUpdate")) {
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
        .filter(file => !file.match(/\.result\.json$/))
        .map(file => {
        let path = `${dirname}/${file}`;
        return {
            fileName: file,
            textContent: fs.readFileSync(path, "utf-8"),
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
const json_transform_1 = __webpack_require__(/*! ./rules/json_transform */ "./src/rules/json_transform.ts");
const only_filter_1 = __webpack_require__(/*! ./rules/only_filter */ "./src/rules/only_filter.ts");
function read_rules(files) {
    let results = files.map((file) => {
        try {
            let json = eval(`(${file.textContent})`);
            return json_transform_1.json_transform(json, file.fileName);
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

/***/ "./src/rules/json_transform.ts":
/*!*************************************!*\
  !*** ./src/rules/json_transform.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const make_rules_1 = __webpack_require__(/*! ./make_rules */ "./src/rules/make_rules.ts");
const map_rule_1 = __webpack_require__(/*! ./map_rule */ "./src/rules/map_rule.ts");
function json_transform(json, fileName) {
    let ruleSet = make_rules_1.make_rules(json);
    ruleSet.rules = ruleSet.rules.map(rule => map_rule_1.map_rule(rule, fileName));
    return ruleSet;
}
exports.json_transform = json_transform;


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

/***/ "./src/rules/make_rule_set.ts":
/*!************************************!*\
  !*** ./src/rules/make_rule_set.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function make_rule_set(rules) {
    if (!rules.find(rule => rule[":only"])) {
        return {
            only: false,
            rules: rules,
        };
    }
    return {
        only: true,
        rules: rules.map(rule => {
            delete rule[":only"];
            return rule;
        }),
    };
}
exports.make_rule_set = make_rule_set;


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
const make_rule_1 = __webpack_require__(/*! ./make_rule */ "./src/rules/make_rule.ts");
const make_rule_set_1 = __webpack_require__(/*! ./make_rule_set */ "./src/rules/make_rule_set.ts");
function make_rules(json) {
    let rules = json_to_rule_1.json_to_rule(json).map(rule => make_rule_1.make_rule(rule));
    return make_rule_set_1.make_rule_set(rules);
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
const string_shortcut_1 = __webpack_require__(/*! ./rule/string_shortcut */ "./src/rules/rule/string_shortcut.ts");
const to_1 = __webpack_require__(/*! ./rule/to */ "./src/rules/rule/to.ts");
const set_attrs_1 = __webpack_require__(/*! ./set_attrs */ "./src/rules/set_attrs.ts");
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
    let karabinerJson = eval(`(${fs.readFileSync(karabinerJsonPath, "utf-8")})`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9yZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvanNvbl90b19ydWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9qc29uX3RyYW5zZm9ybS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbWFrZV9ydWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9tYWtlX3J1bGVfc2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9tYWtlX3J1bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9tYXBfcnVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvb25seV9maWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL2RldmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS9mcm9tLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL2xhbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvbGlicy9jb25kaXRpb25fbWFwLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL2xpYnMvcGFyc2Vfc2hvcnRjdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvbGlicy9yZW1vdmVfcHJvcGVydHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvbGlicy9zaG9ydGN1dF90b19tb2RpZmllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS9wZWFyLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL3N0cmluZ19zaG9ydGN1dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS90by50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvc2V0X2F0dHJzLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90eXBlX2Jhc2ljLnRzIiwid2VicGFjazovLy8uL3NyYy93cml0ZV9ydWxlcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvdXJjZS1tYXAtc3VwcG9ydFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSw2RkFBdUQ7QUFDdkQsb0lBQTBFO0FBQzFFLG9GQUEwQztBQUMxQyx1RkFBNEM7QUFFNUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7QUFFM0IsSUFBSSxLQUFLLEdBQUcsdURBQTBCLENBQ2xDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxD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TixDQUFDO0FBbEJELDhCQWtCQzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJELG9CQUEyQixLQUFrQjtJQUN6QyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDO0lBQ25DLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFIRCxnQ0FHQzs7Ozs7Ozs7Ozs7Ozs7O0FDTEQsK0NBQXlCO0FBY3pCLHFCQUE0QixLQUFnQztJQUN4RCxJQUFJLGlCQUFpQixHQUFHLEdBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFDaEIsbUNBQW1DLENBQUM7SUFDcEMsSUFBSSxhQUFhLEdBQWtCLElBQUksQ0FDbkMsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQ3JELENBQUM7SUFDRixhQUFhLENBQUMsUUFBUTtTQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLEVBQUUsQ0FBQyxhQUFhLENBQ1osaUJBQWlCLEVBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDNUMsQ0FBQztBQUNOLENBQUM7QUFkRCxrQ0FjQzs7Ozs7Ozs7Ozs7O0FDNUJELCtCOzs7Ozs7Ozs7OztBQ0FBLCtDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgKiBhcyBTb3VyY2VNYXBTdXBwb3J0IGZyb20gXCJzb3VyY2UtbWFwLXN1cHBvcnRcIjtcbmltcG9ydCB7IHJlYWRfY29tcGxleF9tb2RpZmljYXRpb25zIH0gZnJvbSBcIi4vcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IHJlYWRfcnVsZXMgfSBmcm9tIFwiLi9yZWFkX3J1bGVzXCI7XG5pbXBvcnQgeyB3cml0ZV9ydWxlcyB9IGZyb20gXCIuL3dyaXRlX3J1bGVzXCI7XG5cblNvdXJjZU1hcFN1cHBvcnQuaW5zdGFsbCgpO1xuXG5sZXQgZmlsZXMgPSByZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucyhcbiAgICB+cHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLWpzb25cIilcbiAgICAgICAgPyBwcm9jZXNzLmFyZ3ZbcHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLWpzb25cIikgKyAxXVxuICAgICAgICA6IF9fZGlybmFtZVxuKTtcbmlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgY29uc29sZS5lcnJvcihcIm1pc3Npbmcgc2V0dGluZyBqc29uIGZpbGVzXCIpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbn1cblxubGV0IHJ1bGVzID0gcmVhZF9ydWxlcyhmaWxlcyk7XG5cbmlmICghfnByb2Nlc3MuYXJndi5pbmRleE9mKFwiLS1ub1VwZGF0ZVwiKSkge1xuICAgIHdyaXRlX3J1bGVzKHJ1bGVzKTtcbn0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coe1xuICAgICAgICB0aXRsZTogXCJwcml2YXRlIHNldHRpbmdzXCIsXG4gICAgICAgIHJ1bGVzOiBydWxlcyxcbiAgICB9KTtcbn1cbiIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsZXhNb2RpZmljYXRpb25GaWxlIHtcbiAgICBmaWxlTmFtZTogc3RyaW5nO1xuICAgIHRleHRDb250ZW50OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucyhcbiAgICBkaXJuYW1lOiBzdHJpbmdcbik6IENvbXBsZXhNb2RpZmljYXRpb25GaWxlW10ge1xuICAgIHJldHVybiBmc1xuICAgICAgICAucmVhZGRpclN5bmMoZGlybmFtZSlcbiAgICAgICAgLmZpbHRlcihmaWxlID0+IGZpbGUubWF0Y2goL1xcLmpzb24kLykpXG4gICAgICAgIC5maWx0ZXIoZmlsZSA9PiAhZmlsZS5tYXRjaCgvXFwucmVzdWx0XFwuanNvbiQvKSlcbiAgICAgICAgLm1hcChmaWxlID0+IHtcbiAgICAgICAgICAgIGxldCBwYXRoID0gYCR7ZGlybmFtZX0vJHtmaWxlfWA7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBmaWxlLFxuICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBmcy5yZWFkRmlsZVN5bmMocGF0aCwgXCJ1dGYtOFwiKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgQ29tcGxleE1vZGlmaWNhdGlvbkZpbGUgfSBmcm9tIFwiLi9yZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsganNvbl90cmFuc2Zvcm0gfSBmcm9tIFwiLi9ydWxlcy9qc29uX3RyYW5zZm9ybVwiO1xuaW1wb3J0IHtcbiAgICBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSxcbiAgICBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVNldCxcbn0gZnJvbSBcIi4vcnVsZXMvbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgb25seV9maWx0ZXIgfSBmcm9tIFwiLi9ydWxlcy9vbmx5X2ZpbHRlclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVhZF9ydWxlcyhcbiAgICBmaWxlczogQ29tcGxleE1vZGlmaWNhdGlvbkZpbGVbXVxuKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXSB7XG4gICAgbGV0IHJlc3VsdHMgPSBmaWxlcy5tYXAoXG4gICAgICAgIChmaWxlKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVTZXQgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQganNvbiA9IGV2YWwoYCgke2ZpbGUudGV4dENvbnRlbnR9KWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBqc29uX3RyYW5zZm9ybShqc29uLCBmaWxlLmZpbGVOYW1lKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSwgZmlsZS5maWxlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiBvbmx5X2ZpbHRlcihyZXN1bHRzKTtcbn1cbiIsImltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIH0gZnJvbSBcIi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24ganNvbl90b19ydWxlKGpzb246IGFueSk6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW10ge1xuICAgIGlmIChqc29uLmxlbmd0aCkge1xuICAgICAgICBpZiAoanNvbi5maW5kKHJ1bGUgPT4gcnVsZS5kZXNjcmlwdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbWFuaXB1bGF0b3JzOiBqc29uLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgcmV0dXJuIGpzb24ucnVsZXMgfHwgW2pzb25dO1xufVxuIiwiaW1wb3J0IHsgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVTZXQsIG1ha2VfcnVsZXMgfSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBtYXBfcnVsZSB9IGZyb20gXCIuL21hcF9ydWxlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBqc29uX3RyYW5zZm9ybShcbiAgICBqc29uOiBhbnksXG4gICAgZmlsZU5hbWU6IHN0cmluZ1xuKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVTZXQge1xuICAgIGxldCBydWxlU2V0ID0gbWFrZV9ydWxlcyhqc29uKTtcbiAgICBydWxlU2V0LnJ1bGVzID0gcnVsZVNldC5ydWxlcy5tYXAocnVsZSA9PiBtYXBfcnVsZShydWxlLCBmaWxlTmFtZSkpO1xuICAgIHJldHVybiBydWxlU2V0O1xufVxuIiwiaW1wb3J0IHsgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUgfSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlX3J1bGUocnVsZTogYW55KTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUge1xuICAgIGlmIChydWxlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWFuaXB1bGF0b3JzOiBydWxlLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAocnVsZVtcIjptYW5pcHVsYXRvcnNcIl0pIHtcbiAgICAgICAgcnVsZS5tYW5pcHVsYXRvcnMgPSAocnVsZS5tYW5pcHVsYXRvcnMgfHwgW10pLmNvbmNhdChcbiAgICAgICAgICAgIHJ1bGVbXCI6bWFuaXB1bGF0b3JzXCJdXG4gICAgICAgICk7XG4gICAgICAgIGRlbGV0ZSBydWxlW1wiOm1hbmlwdWxhdG9yc1wiXTtcbiAgICB9XG4gICAgcmV0dXJuIHJ1bGU7XG59XG4iLCJpbXBvcnQge1xuICAgIENvbXBsZXhNb2RpZmljYXRpb25SdWxlLFxuICAgIENvbXBsZXhNb2RpZmljYXRpb25SdWxlU2V0LFxufSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlX3J1bGVfc2V0KFxuICAgIHJ1bGVzOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVtdXG4pOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVNldCB7XG4gICAgaWYgKCFydWxlcy5maW5kKHJ1bGUgPT4gcnVsZVtcIjpvbmx5XCJdKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25seTogZmFsc2UsXG4gICAgICAgICAgICBydWxlczogcnVsZXMsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG9ubHk6IHRydWUsXG4gICAgICAgIHJ1bGVzOiBydWxlcy5tYXAocnVsZSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgcnVsZVtcIjpvbmx5XCJdO1xuICAgICAgICAgICAgcmV0dXJuIHJ1bGU7XG4gICAgICAgIH0pLFxuICAgIH07XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uRmlsZSB9IGZyb20gXCIuLi9yZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsganNvbl90b19ydWxlIH0gZnJvbSBcIi4vanNvbl90b19ydWxlXCI7XG5pbXBvcnQgeyBtYWtlX3J1bGUgfSBmcm9tIFwiLi9tYWtlX3J1bGVcIjtcbmltcG9ydCB7IG1ha2VfcnVsZV9zZXQgfSBmcm9tIFwiLi9tYWtlX3J1bGVfc2V0XCI7XG5pbXBvcnQgeyBtYXBfcnVsZSB9IGZyb20gXCIuL21hcF9ydWxlXCI7XG5pbXBvcnQgeyBEZXZpY2VJZGVudGlmaWVycyB9IGZyb20gXCIuL3J1bGUvZGV2aWNlXCI7XG5pbXBvcnQgeyBGcm9tTW9kaWZpZXIgfSBmcm9tIFwiLi9ydWxlL2Zyb21cIjtcbmltcG9ydCB7IExhbmdJbnB1dFNvdXJjZXMgfSBmcm9tIFwiLi9ydWxlL2xhbmdcIjtcbmltcG9ydCB7IFRvTW9kaWZpZXIgfSBmcm9tIFwiLi9ydWxlL3RvXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFuaXB1bGF0b3JDb25kaXRpb25zIHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgYnVuZGxlX2lkZW50aWZpZXJzPzogc3RyaW5nW107XG4gICAgaWRlbnRpZmllcnM/OiBEZXZpY2VJZGVudGlmaWVyc1tdO1xuICAgIGlucHV0X3NvdXJjZXM/OiBMYW5nSW5wdXRTb3VyY2VzW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFuaXB1bGF0b3Ige1xuICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgY29uZGl0aW9ucz86IE1hbmlwdWxhdG9yQ29uZGl0aW9uc1tdO1xuICAgIGZyb20/OiBGcm9tTW9kaWZpZXI7XG4gICAgdG8/OiBUb01vZGlmaWVyW107XG5cbiAgICBcIjpmcm9tXCI/OiBzdHJpbmc7XG4gICAgXCI6dG9cIj86IHN0cmluZztcbiAgICBcIjphcHBcIj86IHN0cmluZztcbiAgICBcIjpkZXZpY2VcIj86IHN0cmluZztcbiAgICBcIjpsYW5nXCI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUge1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIG1hbmlwdWxhdG9ycz86IE1hbmlwdWxhdG9yW107XG4gICAgXCI6bWFuaXB1bGF0b3JzXCI/OiBNYW5pcHVsYXRvciB8IE1hbmlwdWxhdG9yW107XG4gICAgXCI6b25seVwiPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVNldCB7XG4gICAgb25seTogYm9vbGVhbjtcbiAgICBydWxlczogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VfcnVsZXMoanNvbjogYW55KTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVTZXQge1xuICAgIGxldCBydWxlcyA9IGpzb25fdG9fcnVsZShqc29uKS5tYXAocnVsZSA9PiBtYWtlX3J1bGUocnVsZSkpO1xuICAgIHJldHVybiBtYWtlX3J1bGVfc2V0KHJ1bGVzKTtcbn1cbiIsImltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlLCBNYW5pcHVsYXRvciB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuL3J1bGUvYXBwXCI7XG5pbXBvcnQgeyBkZXZpY2UgfSBmcm9tIFwiLi9ydWxlL2RldmljZVwiO1xuaW1wb3J0IHsgZnJvbSB9IGZyb20gXCIuL3J1bGUvZnJvbVwiO1xuaW1wb3J0IHsgbGFuZyB9IGZyb20gXCIuL3J1bGUvbGFuZ1wiO1xuaW1wb3J0IHsgcGVhciB9IGZyb20gXCIuL3J1bGUvcGVhclwiO1xuaW1wb3J0IHsgc3RyaW5nX3Nob3J0Y3V0IH0gZnJvbSBcIi4vcnVsZS9zdHJpbmdfc2hvcnRjdXRcIjtcbmltcG9ydCB7IHRvIH0gZnJvbSBcIi4vcnVsZS90b1wiO1xuaW1wb3J0IHsgc2V0X2F0dHJzIH0gZnJvbSBcIi4vc2V0X2F0dHJzXCI7XG5pbXBvcnQgeyB0eXBlX2Jhc2ljIH0gZnJvbSBcIi4vdHlwZV9iYXNpY1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwX3J1bGUoXG4gICAganNvbjogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUsXG4gICAgZmlsZU5hbWU6IHN0cmluZ1xuKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUge1xuICAgIGxldCB7IHJ1bGUsIGF0dHIgfSA9IHNldF9hdHRycyhqc29uKTtcbiAgICBydWxlLmRlc2NyaXB0aW9uID0gcnVsZS5kZXNjcmlwdGlvbiB8fCBmaWxlTmFtZS5yZXBsYWNlKC9cXC5cXHcrLywgXCJcIik7XG4gICAgcnVsZS5tYW5pcHVsYXRvcnMgPSBydWxlLm1hbmlwdWxhdG9yc1xuICAgICAgICAubWFwKHN0cmluZ19zaG9ydGN1dClcbiAgICAgICAgLm1hcChcbiAgICAgICAgICAgIChtYW5pcDogTWFuaXB1bGF0b3IpOiBNYW5pcHVsYXRvciA9PiBPYmplY3QuYXNzaWduKHt9LCBtYW5pcCwgYXR0cilcbiAgICAgICAgKVxuICAgICAgICAubWFwKHR5cGVfYmFzaWMpXG4gICAgICAgIC5tYXAoYXBwKVxuICAgICAgICAubWFwKGRldmljZSlcbiAgICAgICAgLm1hcChsYW5nKVxuICAgICAgICAubWFwKGZyb20pXG4gICAgICAgIC5tYXAodG8pXG4gICAgICAgIC5tYXAocGVhcik7XG4gICAgcmV0dXJuIHJ1bGU7XG59XG4iLCJpbXBvcnQge1xuICAgIENvbXBsZXhNb2RpZmljYXRpb25SdWxlLFxuICAgIENvbXBsZXhNb2RpZmljYXRpb25SdWxlU2V0LFxufSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvbmx5X2ZpbHRlcihcbiAgICBydWxlczogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVTZXRbXVxuKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXSB7XG4gICAgbGV0IGlzT25seSA9IHJ1bGVzLmZpbmQocnVsZSA9PiBydWxlLm9ubHkpO1xuICAgIGxldCBmaWx0ZXJlZFJ1bGVzID0gaXNPbmx5ID8gcnVsZXMuZmlsdGVyKHJ1bGUgPT4gcnVsZS5vbmx5KSA6IHJ1bGVzO1xuICAgIHJldHVybiBmaWx0ZXJlZFJ1bGVzXG4gICAgICAgIC5tYXAocnVsZSA9PiBydWxlLnJ1bGVzKVxuICAgICAgICAucmVkdWNlKChiYXNlLCBjdXIpID0+IGJhc2UuY29uY2F0KGN1ciksIFtdKTtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBjb25kaXRpb25fbWFwIH0gZnJvbSBcIi4vbGlicy9jb25kaXRpb25fbWFwXCI7XG5cbmxldCBjb25kaXRpb25BcHBNYXAgPSB7XG4gICAgYnJvd3NlcnM6IFtcbiAgICAgICAgXCJeY29tXFxcXC5nb29nbGVcXFxcLkNocm9tZSRcIixcbiAgICAgICAgXCJeb3JnXFxcXC5tb3ppbGxhXFxcXC5maXJlZm94JFwiLFxuICAgICAgICBcIl5jb21cXFxcLmFwcGxlXFxcXC5TYWZhcmkkXCIsXG4gICAgXSxcbiAgICBjaHJvbWU6IFtcIl5jb21cXFxcLmdvb2dsZVxcXFwuQ2hyb21lJFwiXSxcbiAgICBqZXRicmFpbnM6IFtcIl5jb21cXFxcLmpldGJyYWluc1xcXFwuXCJdLFxufTtcblxuZXhwb3J0IGNvbnN0IGFwcCA9IGNvbmRpdGlvbl9tYXAoXG4gICAgXCI6YXBwXCIsXG4gICAgKGNvbmRpdGlvbjogc3RyaW5nKTogTWFuaXB1bGF0b3JDb25kaXRpb25zID0+IHtcbiAgICAgICAgaWYgKGNvbmRpdGlvbkFwcE1hcFtjb25kaXRpb25dKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZnJvbnRtb3N0X2FwcGxpY2F0aW9uX2lmXCIsXG4gICAgICAgICAgICAgICAgYnVuZGxlX2lkZW50aWZpZXJzOiBjb25kaXRpb25BcHBNYXBbY29uZGl0aW9uXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29uZGl0aW9uLm1hdGNoKC9eIS8pICYmXG4gICAgICAgICAgICBjb25kaXRpb25BcHBNYXBbY29uZGl0aW9uLnJlcGxhY2UoL14hLywgXCJcIildXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZyb250bW9zdF9hcHBsaWNhdGlvbl91bmxlc3NcIixcbiAgICAgICAgICAgICAgICBidW5kbGVfaWRlbnRpZmllcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uQXBwTWFwW2NvbmRpdGlvbi5yZXBsYWNlKC9eIS8sIFwiXCIpXSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gQ29uZGl0aW9uQXBwTWFwIFwiJHtjb25kaXRpb259XCJgKTtcbiAgICB9XG4pO1xuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3JDb25kaXRpb25zIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IGNvbmRpdGlvbl9tYXAgfSBmcm9tIFwiLi9saWJzL2NvbmRpdGlvbl9tYXBcIjtcblxuZXhwb3J0IGludGVyZmFjZSBEZXZpY2VJZGVudGlmaWVycyB7XG4gICAgdmVuZG9yX2lkOiBudW1iZXI7XG4gICAgcHJvZHVjdF9pZDogbnVtYmVyO1xufVxuXG5sZXQgY29uZGl0aW9uRGV2aWNlTWFwID0ge1xuICAgIGJhcm9jY286IHtcbiAgICAgICAgdmVuZG9yX2lkOiAxMjQxLFxuICAgICAgICBwcm9kdWN0X2lkOiAzMjMsXG4gICAgfSxcbiAgICBhcHBsZToge1xuICAgICAgICB2ZW5kb3JfaWQ6IDE0NTIsXG4gICAgICAgIHByb2R1Y3RfaWQ6IDYyOSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGRldmljZSA9IGNvbmRpdGlvbl9tYXAoXG4gICAgXCI6ZGV2aWNlXCIsXG4gICAgKGNvbmRpdGlvbik6IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyA9PiB7XG4gICAgICAgIGlmIChjb25kaXRpb25EZXZpY2VNYXBbY29uZGl0aW9uXSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImRldmljZV9pZlwiLFxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXJzOiBbY29uZGl0aW9uRGV2aWNlTWFwW2NvbmRpdGlvbl1dLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb25kaXRpb24ubWF0Y2goL14hLykgJiZcbiAgICAgICAgICAgIGNvbmRpdGlvbkRldmljZU1hcFtjb25kaXRpb24ucmVwbGFjZSgvXiEvLCBcIlwiKV1cbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZGV2aWNlX3VubGVzc1wiLFxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXJzOiBbY29uZGl0aW9uRGV2aWNlTWFwW2NvbmRpdGlvbi5yZXBsYWNlKC9eIS8sIFwiXCIpXV0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBDb25kaXRpb25EZXZpY2UgXCIke2NvbmRpdGlvbn1cImApO1xuICAgIH1cbik7XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBwYXJzZV9zaG9ydGN1dCB9IGZyb20gXCIuL2xpYnMvcGFyc2Vfc2hvcnRjdXRcIjtcbmltcG9ydCB7IHJlbW92ZV9wcm9wZXJ0eSB9IGZyb20gXCIuL2xpYnMvcmVtb3ZlX3Byb3BlcnR5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRnJvbU1vZGlmaWVyIHtcbiAgICBrZXlfY29kZTogc3RyaW5nO1xuICAgIG1vZGlmaWVycz86IHtcbiAgICAgICAgb3B0aW9uYWw/OiBzdHJpbmdbXTtcbiAgICAgICAgbWFuZGF0b3J5OiBzdHJpbmdbXTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbU1vZGlmaWVyKFxuICAgIGJhc2U6IEZyb21Nb2RpZmllciB8IHZvaWQsXG4gICAgc2hvcnQ6IHN0cmluZ1xuKTogRnJvbU1vZGlmaWVyIHtcbiAgICBsZXQga2V5cyA9IHBhcnNlX3Nob3J0Y3V0KHNob3J0KTtcbiAgICBsZXQgcmVzdWx0OiBGcm9tTW9kaWZpZXIgPSBPYmplY3QuYXNzaWduKGJhc2UgfHwge30sIHtcbiAgICAgICAga2V5X2NvZGU6IGtleXMucG9wKCksXG4gICAgfSk7XG4gICAgaWYgKCFrZXlzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXN1bHQubW9kaWZpZXJzID0gcmVzdWx0Lm1vZGlmaWVycyB8fCB7XG4gICAgICAgIG1hbmRhdG9yeTogW10sXG4gICAgfTtcbiAgICBpZiAofmtleXMuaW5kZXhPZihcImFueVwiKSkge1xuICAgICAgICByZXN1bHQubW9kaWZpZXJzLm9wdGlvbmFsID0gW1wiYW55XCJdO1xuICAgICAgICBrZXlzID0ga2V5cy5maWx0ZXIoa2V5ID0+IGtleSAhPT0gXCJhbnlcIik7XG4gICAgfVxuICAgIGlmIChrZXlzLmZpbmQoa2V5ID0+IGtleS5pbmNsdWRlcyhcIj9cIikpKSB7XG4gICAgICAgIGxldCBvcHRpb25hbCA9IGtleXNcbiAgICAgICAgICAgIC5maWx0ZXIoa2V5ID0+IGtleS5pbmNsdWRlcyhcIj9cIikpXG4gICAgICAgICAgICAubWFwKGtleSA9PiBrZXkucmVwbGFjZShcIj9cIiwgXCJcIikpO1xuICAgICAgICByZXN1bHQubW9kaWZpZXJzLm9wdGlvbmFsID0gKHJlc3VsdC5tb2RpZmllcnMub3B0aW9uYWwgfHwgW10pLmNvbmNhdChcbiAgICAgICAgICAgIG9wdGlvbmFsXG4gICAgICAgICk7XG4gICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihrZXkgPT4gIWtleS5pbmNsdWRlcyhcIj9cIikpO1xuICAgIH1cbiAgICBpZiAoIWtleXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlc3VsdC5tb2RpZmllcnMubWFuZGF0b3J5ID0ga2V5cztcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgZnJvbSA9IHJlbW92ZV9wcm9wZXJ0eShcbiAgICBcIjpmcm9tXCIsXG4gICAgKG1hbmlwOiBNYW5pcHVsYXRvciwgcHJvcDogc3RyaW5nKTogTWFuaXB1bGF0b3IgPT4ge1xuICAgICAgICBtYW5pcC5mcm9tID0gZnJvbU1vZGlmaWVyKG1hbmlwLmZyb20sIHByb3ApO1xuICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgfVxuKTtcbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBjb25kaXRpb25fbWFwIH0gZnJvbSBcIi4vbGlicy9jb25kaXRpb25fbWFwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGFuZ0lucHV0U291cmNlcyB7XG4gICAgbGFuZ3VhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGxhbmcgPSBjb25kaXRpb25fbWFwKFxuICAgIFwiOmxhbmdcIixcbiAgICAobGFuZzogc3RyaW5nKTogTWFuaXB1bGF0b3JDb25kaXRpb25zID0+ICh7XG4gICAgICAgIHR5cGU6IFwiaW5wdXRfc291cmNlX2lmXCIsXG4gICAgICAgIGlucHV0X3NvdXJjZXM6IFt7IGxhbmd1YWdlOiBsYW5nIH1dLFxuICAgIH0pXG4pO1xuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IsIE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi8uLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyByZW1vdmVfcHJvcGVydHkgfSBmcm9tIFwiLi9yZW1vdmVfcHJvcGVydHlcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmRpdGlvbl9tYXAoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1hcHBlcjogKHByb3A6IHN0cmluZykgPT4gTWFuaXB1bGF0b3JDb25kaXRpb25zXG4pOiAobWFuaXA6IE1hbmlwdWxhdG9yKSA9PiBNYW5pcHVsYXRvciB7XG4gICAgcmV0dXJuIHJlbW92ZV9wcm9wZXJ0eShcbiAgICAgICAgbmFtZSxcbiAgICAgICAgKG1hbmlwOiBNYW5pcHVsYXRvciwgcHJvcDogc3RyaW5nKTogTWFuaXB1bGF0b3IgPT4ge1xuICAgICAgICAgICAgbWFuaXAuY29uZGl0aW9ucyA9IChtYW5pcC5jb25kaXRpb25zIHx8IFtdKS5jb25jYXQobWFwcGVyKHByb3ApKTtcbiAgICAgICAgICAgIHJldHVybiBtYW5pcDtcbiAgICAgICAgfVxuICAgICk7XG59XG4iLCJsZXQgbW9kaWZpZXJNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgc2hpZnQ6IFwic2hpZnRcIixcbiAgICBjbWQ6IFwiY29tbWFuZFwiLFxuICAgIGNvbTogXCJjb21tYW5kXCIsXG4gICAgb3B0OiBcIm9wdGlvblwiLFxuICAgIGFsdDogXCJhbHRcIixcbiAgICBjdHJsOiBcImNvbnRyb2xcIixcbiAgICBcIipcIjogXCJhbnlcIixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zaG9ydGN1dChzaG9ydGN1dDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBzaG9ydGN1dC5zcGxpdChcIi1cIikubWFwKGtleSA9PiBtb2RpZmllck1hcFtrZXldIHx8IGtleSk7XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi8uLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVfcHJvcGVydHkoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiAobWFuaXA6IE1hbmlwdWxhdG9yLCBwcm9wOiBzdHJpbmcpID0+IE1hbmlwdWxhdG9yXG4pIHtcbiAgICByZXR1cm4gKG1hbmlwOiBNYW5pcHVsYXRvcik6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgaWYgKCFtYW5pcFtuYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgICAgICB9XG4gICAgICAgIG1hbmlwID0gY2FsbGJhY2sobWFuaXAsIG1hbmlwW25hbWVdKTtcbiAgICAgICAgZGVsZXRlIG1hbmlwW25hbWVdO1xuICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgfTtcbn1cbiIsImltcG9ydCB7IFRvTW9kaWZpZXIgfSBmcm9tIFwiLi4vdG9cIjtcblxubGV0IHRvTW9kaWZpZXJNYXA6IHtcbiAgICBba2V5OiBzdHJpbmddOiB7XG4gICAgICAgIGtleTogc3RyaW5nO1xuICAgICAgICBtb2Q/OiBzdHJpbmc7XG4gICAgfTtcbn0gPSB7XG4gICAgXCIoXCI6IHtcbiAgICAgICAga2V5OiBcIjlcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIilcIjoge1xuICAgICAgICBrZXk6IFwiMFwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwie1wiOiB7XG4gICAgICAgIGtleTogXCJvcGVuX2JyYWNrZXRcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIn1cIjoge1xuICAgICAgICBrZXk6IFwiY2xvc2VfYnJhY2tldFwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwiPFwiOiB7XG4gICAgICAgIGtleTogXCJjb21tYVwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwiPlwiOiB7XG4gICAgICAgIGtleTogXCJwZXJpb2RcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICAnXCInOiB7XG4gICAgICAgIGtleTogXCJxdW90ZVwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwiJ1wiOiB7XG4gICAgICAgIGtleTogXCJxdW90ZVwiLFxuICAgIH0sXG4gICAgXCIsXCI6IHtcbiAgICAgICAga2V5OiBcImNvbW1hXCIsXG4gICAgfSxcbiAgICBcIi5cIjoge1xuICAgICAgICBrZXk6IFwicGVyaW9kXCIsXG4gICAgfSxcbiAgICBcIiBcIjoge1xuICAgICAgICBrZXk6IFwic3BhY2ViYXJcIixcbiAgICB9LFxuICAgIFwiPVwiOiB7XG4gICAgICAgIGtleTogXCJlcXVhbF9zaWduXCIsXG4gICAgfSxcbiAgICBcIjtcIjoge1xuICAgICAgICBrZXk6IFwic2VtaWNvbG9uXCIsXG4gICAgfSxcbiAgICBcIjpcIjoge1xuICAgICAgICBrZXk6IFwic2VtaWNvbG9uXCIsXG4gICAgICAgIG1vZDogXCJzaGlmdFwiLFxuICAgIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRjdXRfdG9fbW9kaWZpZXIoc2hvcnQ6IHN0cmluZyk6IFRvTW9kaWZpZXJbXSB7XG4gICAgcmV0dXJuIHNob3J0XG4gICAgICAgIC5yZXBsYWNlKC9eJyguKz8pJyQvLCBcIiQxXCIpXG4gICAgICAgIC5zcGxpdCgvKD86KS8pXG4gICAgICAgIC5tYXAoXG4gICAgICAgICAgICAoa2V5OiBzdHJpbmcpOiBUb01vZGlmaWVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRvTW9kaWZpZXJNYXBba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsga2V5X2NvZGU6IGtleSB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlfY29kZToga2V5LnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcnM6IFtcInNoaWZ0XCJdLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdG9Nb2RpZmllck1hcFtrZXldW1wibW9kXCJdO1xuICAgICAgICAgICAgICAgIGlmICghbW9kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGtleV9jb2RlOiB0b01vZGlmaWVyTWFwW2tleV1bXCJrZXlcIl0gfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAga2V5X2NvZGU6IHRvTW9kaWZpZXJNYXBba2V5XVtcImtleVwiXSxcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBbbW9kXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xufVxuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgZnJvbU1vZGlmaWVyIH0gZnJvbSBcIi4vZnJvbVwiO1xuaW1wb3J0IHsgdG9Nb2RpZmllciB9IGZyb20gXCIuL3RvXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwZWFyKG1hbmlwOiBNYW5pcHVsYXRvcik6IE1hbmlwdWxhdG9yIHtcbiAgICBPYmplY3Qua2V5cyhtYW5pcClcbiAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5Lm1hdGNoKC9eOi8pKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBcInN0cmluZ1wiID09PSB0eXBlb2YgbWFuaXBba2V5XSlcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIG1hbmlwLmZyb20gPSBmcm9tTW9kaWZpZXIobWFuaXAuZnJvbSwga2V5LnJlcGxhY2UoL146LywgXCJcIikpO1xuICAgICAgICAgICAgbWFuaXAudG8gPSB0b01vZGlmaWVyKG1hbmlwLnRvLCAoPGFueT5tYW5pcClba2V5XSk7XG4gICAgICAgICAgICBkZWxldGUgKDxhbnk+bWFuaXApW2tleV07XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBtYW5pcDtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ19zaG9ydGN1dChcbiAgICBtYW5pcDogTWFuaXB1bGF0b3IgfCBzdHJpbmdcbik6IE1hbmlwdWxhdG9yIHwgc3RyaW5nIHtcbiAgICBpZiAoXCJzdHJpbmdcIiAhPT0gdHlwZW9mIG1hbmlwKSB7XG4gICAgICAgIHJldHVybiBtYW5pcDtcbiAgICB9XG4gICAgbGV0IGt2ID0gbWFuaXAuc3BsaXQoXCI6XCIpO1xuICAgIGlmIChrdi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICByZXN1bHRbXCI6XCIgKyAoa3Yuc2hpZnQoKSB8fCBcIlwiKS50cmltKCldID0ga3Yuam9pbihcIjpcIikudHJpbSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBwYXJzZV9zaG9ydGN1dCB9IGZyb20gXCIuL2xpYnMvcGFyc2Vfc2hvcnRjdXRcIjtcbmltcG9ydCB7IHJlbW92ZV9wcm9wZXJ0eSB9IGZyb20gXCIuL2xpYnMvcmVtb3ZlX3Byb3BlcnR5XCI7XG5pbXBvcnQgeyBzaG9ydGN1dF90b19tb2RpZmllciB9IGZyb20gXCIuL2xpYnMvc2hvcnRjdXRfdG9fbW9kaWZpZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUb01vZGlmaWVyIHtcbiAgICBrZXlfY29kZTogc3RyaW5nO1xuICAgIG1vZGlmaWVycz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9Nb2RpZmllcihcbiAgICBiYXNlOiBUb01vZGlmaWVyW10gfCB2b2lkLFxuICAgIHNob3J0OiBzdHJpbmdcbik6IFRvTW9kaWZpZXJbXSB7XG4gICAgbGV0IHJlc3VsdHMgPSBzaG9ydFxuICAgICAgICAuc3BsaXQoLywvKVxuICAgICAgICAuZmlsdGVyKHNob3J0ID0+IHNob3J0KVxuICAgICAgICAucmVkdWNlKChiYXNlOiBUb01vZGlmaWVyW10sIHNob3J0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmICghc2hvcnQubWF0Y2goL14nLis/JyQvKSkge1xuICAgICAgICAgICAgICAgIGxldCBrZXlzID0gcGFyc2Vfc2hvcnRjdXQoc2hvcnQpO1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6IFRvTW9kaWZpZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIGtleV9jb2RlOiBrZXlzLnBvcCgpIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1vZGlmaWVycyA9IGtleXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLmNvbmNhdChyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuY29uY2F0KHNob3J0Y3V0X3RvX21vZGlmaWVyKHNob3J0KSk7XG4gICAgICAgIH0sIFtdKTtcbiAgICByZXR1cm4gKGJhc2UgfHwgW10pLmNvbmNhdChyZXN1bHRzKTtcbn1cblxuZXhwb3J0IGNvbnN0IHRvID0gcmVtb3ZlX3Byb3BlcnR5KFxuICAgIFwiOnRvXCIsXG4gICAgKG1hbmlwOiBNYW5pcHVsYXRvciwgcHJvcDogc3RyaW5nKTogTWFuaXB1bGF0b3IgPT4ge1xuICAgICAgICBtYW5pcC50byA9IHRvTW9kaWZpZXIobWFuaXAudG8sIHByb3ApO1xuICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgfVxuKTtcbiIsImltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIH0gZnJvbSBcIi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2F0dHJzKFxuICAgIHJ1bGU6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlXG4pOiB7XG4gICAgcnVsZTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGU7XG4gICAgYXR0cjogYW55O1xufSB7XG4gICAgbGV0IGF0dHJzID0gT2JqZWN0LmtleXMocnVsZSlcbiAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5Lm1hdGNoKC9eOi8pKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBcInN0cmluZ1wiID09PSB0eXBlb2YgcnVsZVtrZXldKVxuICAgICAgICAucmVkdWNlKChiYXNlLCBjdXIpID0+IHtcbiAgICAgICAgICAgIGJhc2VbY3VyXSA9IHJ1bGVbY3VyXTtcbiAgICAgICAgICAgIGRlbGV0ZSBydWxlW2N1cl07XG4gICAgICAgICAgICByZXR1cm4gYmFzZTtcbiAgICAgICAgfSwge30pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJ1bGU6IHJ1bGUsXG4gICAgICAgIGF0dHI6IGF0dHJzLFxuICAgIH07XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHR5cGVfYmFzaWMobWFuaXA6IE1hbmlwdWxhdG9yKTogTWFuaXB1bGF0b3Ige1xuICAgIG1hbmlwLnR5cGUgPSBtYW5pcC50eXBlIHx8IFwiYmFzaWNcIjtcbiAgICByZXR1cm4gbWFuaXA7XG59XG4iLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIH0gZnJvbSBcIi4vcnVsZXMvbWFrZV9ydWxlc1wiO1xuXG5pbnRlcmZhY2UgS2FyYWJpbmVySnNvblByb2ZpbGUge1xuICAgIHNlbGVjdGVkOiBib29sZWFuO1xuICAgIGNvbXBsZXhfbW9kaWZpY2F0aW9uczoge1xuICAgICAgICBydWxlczogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXTtcbiAgICB9O1xufVxuXG5pbnRlcmZhY2UgS2FyYWJpbmVySnNvbiB7XG4gICAgcHJvZmlsZXM6IEthcmFiaW5lckpzb25Qcm9maWxlW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cml0ZV9ydWxlcyhydWxlczogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXSkge1xuICAgIGxldCBrYXJhYmluZXJKc29uUGF0aCA9IGAke1xuICAgICAgICBwcm9jZXNzLmVudi5IT01FXG4gICAgfS8uY29uZmlnL2thcmFiaW5lci9rYXJhYmluZXIuanNvbmA7XG4gICAgbGV0IGthcmFiaW5lckpzb246IEthcmFiaW5lckpzb24gPSBldmFsKFxuICAgICAgICBgKCR7ZnMucmVhZEZpbGVTeW5jKGthcmFiaW5lckpzb25QYXRoLCBcInV0Zi04XCIpfSlgXG4gICAgKTtcbiAgICBrYXJhYmluZXJKc29uLnByb2ZpbGVzXG4gICAgICAgIC5maWx0ZXIocHJvZmlsZSA9PiBwcm9maWxlLnNlbGVjdGVkKVxuICAgICAgICAuZm9yRWFjaChwcm9maWxlID0+IChwcm9maWxlLmNvbXBsZXhfbW9kaWZpY2F0aW9ucy5ydWxlcyA9IHJ1bGVzKSk7XG4gICAgZnMud3JpdGVGaWxlU3luYyhcbiAgICAgICAga2FyYWJpbmVySnNvblBhdGgsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGthcmFiaW5lckpzb24sIG51bGwsIFwiICBcIilcbiAgICApO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic291cmNlLW1hcC1zdXBwb3J0XCIpOyJdLCJzb3VyY2VSb290IjoiIn0=