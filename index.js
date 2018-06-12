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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9yZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvanNvbl90b19ydWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9qc29uX3RyYW5zZm9ybS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbWFrZV9ydWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9tYWtlX3J1bGVfc2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9tYWtlX3J1bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9tYXBfcnVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvb25seV9maWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL2RldmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS9mcm9tLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL2xhbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvbGlicy9jb25kaXRpb25fbWFwLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL2xpYnMvcGFyc2Vfc2hvcnRjdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvbGlicy9yZW1vdmVfcHJvcGVydHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvbGlicy9zaG9ydGN1dF90b19tb2RpZmllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS9wZWFyLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL3N0cmluZ19zaG9ydGN1dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS90by50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvc2V0X2F0dHJzLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90eXBlX2Jhc2ljLnRzIiwid2VicGFjazovLy8uL3NyYy93cml0ZV9ydWxlcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvdXJjZS1tYXAtc3VwcG9ydFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSw2RkFBdUQ7QUFDdkQsb0lBQTBFO0FBQzFFLG9GQUEwQztBQUMxQyx1RkFBNEM7QUFFNUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7QUFFM0IsSUFBSSxLQUFLLEdBQUcsdURBQTBCLENBQ2xDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxD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QUssQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDO0lBQ25DLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFIRCxnQ0FHQzs7Ozs7Ozs7Ozs7Ozs7O0FDTEQsK0NBQXlCO0FBY3pCLHFCQUE0QixLQUFnQztJQUN4RCxJQUFJLGlCQUFpQixHQUFHLEdBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFDaEIsbUNBQW1DLENBQUM7SUFDcEMsSUFBSSxhQUFhLEdBQWtCLElBQUksQ0FDbkMsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQ3JELENBQUM7SUFDRixhQUFhLENBQUMsUUFBUTtTQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLEVBQUUsQ0FBQyxhQUFhLENBQ1osaUJBQWlCLEVBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDNUMsQ0FBQztBQUNOLENBQUM7QUFkRCxrQ0FjQzs7Ozs7Ozs7Ozs7O0FDNUJELCtCOzs7Ozs7Ozs7OztBQ0FBLCtDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgKiBhcyBTb3VyY2VNYXBTdXBwb3J0IGZyb20gXCJzb3VyY2UtbWFwLXN1cHBvcnRcIjtcbmltcG9ydCB7IHJlYWRfY29tcGxleF9tb2RpZmljYXRpb25zIH0gZnJvbSBcIi4vcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IHJlYWRfcnVsZXMgfSBmcm9tIFwiLi9yZWFkX3J1bGVzXCI7XG5pbXBvcnQgeyB3cml0ZV9ydWxlcyB9IGZyb20gXCIuL3dyaXRlX3J1bGVzXCI7XG5cblNvdXJjZU1hcFN1cHBvcnQuaW5zdGFsbCgpO1xuXG5sZXQgZmlsZXMgPSByZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucyhcbiAgICB+cHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLWpzb25cIilcbiAgICAgICAgPyBwcm9jZXNzLmFyZ3ZbcHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLWpzb25cIikgKyAxXVxuICAgICAgICA6IF9fZGlybmFtZVxuKTtcbmlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgY29uc29sZS5lcnJvcihcIm1pc3Npbmcgc2V0dGluZyBqc29uIGZpbGVzXCIpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbn1cblxubGV0IHJ1bGVzID0gcmVhZF9ydWxlcyhmaWxlcyk7XG5cbmlmICh+cHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLXVwZGF0ZVwiKSkge1xuICAgIHdyaXRlX3J1bGVzKHJ1bGVzKTtcbn0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coe1xuICAgICAgICB0aXRsZTogXCJwcml2YXRlIHNldHRpbmdzXCIsXG4gICAgICAgIHJ1bGVzOiBydWxlcyxcbiAgICB9KTtcbn1cbiIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsZXhNb2RpZmljYXRpb25GaWxlIHtcbiAgICBmaWxlTmFtZTogc3RyaW5nO1xuICAgIHRleHRDb250ZW50OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucyhcbiAgICBkaXJuYW1lOiBzdHJpbmdcbik6IENvbXBsZXhNb2RpZmljYXRpb25GaWxlW10ge1xuICAgIHJldHVybiBmc1xuICAgICAgICAucmVhZGRpclN5bmMoZGlybmFtZSlcbiAgICAgICAgLmZpbHRlcihmaWxlID0+IGZpbGUubWF0Y2goL1xcLmpzb24kLykpXG4gICAgICAgIC5tYXAoZmlsZSA9PiB7XG4gICAgICAgICAgICBsZXQgcGF0aCA9IGAke2Rpcm5hbWV9LyR7ZmlsZX1gO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogZmlsZSxcbiAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogZnMucmVhZEZpbGVTeW5jKHBhdGgsIFwidXRmLThcIiksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbn1cbiIsImltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25GaWxlIH0gZnJvbSBcIi4vcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IGpzb25fdHJhbnNmb3JtIH0gZnJvbSBcIi4vcnVsZXMvanNvbl90cmFuc2Zvcm1cIjtcbmltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlLCBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVNldCB9IGZyb20gXCIuL3J1bGVzL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IG9ubHlfZmlsdGVyIH0gZnJvbSBcIi4vcnVsZXMvb25seV9maWx0ZXJcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRfcnVsZXMoXG4gICAgZmlsZXM6IENvbXBsZXhNb2RpZmljYXRpb25GaWxlW11cbik6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW10ge1xuICAgIGxldCByZXN1bHRzID0gZmlsZXMubWFwKFxuICAgICAgICAoZmlsZSk6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlU2V0ID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGpzb24gPSBldmFsKGAoJHtmaWxlLnRleHRDb250ZW50fSlgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ganNvbl90cmFuc2Zvcm0oanNvbiwgZmlsZS5maWxlTmFtZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlLm1lc3NhZ2UsIGZpbGUuZmlsZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gb25seV9maWx0ZXIocmVzdWx0cyk7XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGpzb25fdG9fcnVsZShqc29uOiBhbnkpOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVtdIHtcbiAgICBpZiAoanNvbi5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGpzb24uZmluZChydWxlID0+IHJ1bGUuZGVzY3JpcHRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1hbmlwdWxhdG9yczoganNvbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBqc29uLnJ1bGVzIHx8IFtqc29uXTtcbn1cbiIsImltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlU2V0LCBtYWtlX3J1bGVzIH0gZnJvbSBcIi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgbWFwX3J1bGUgfSBmcm9tIFwiLi9tYXBfcnVsZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24ganNvbl90cmFuc2Zvcm0oanNvbjogYW55LCBmaWxlTmFtZTogc3RyaW5nKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVTZXQge1xuICAgIGxldCBydWxlU2V0ID0gbWFrZV9ydWxlcyhqc29uKTtcbiAgICBydWxlU2V0LnJ1bGVzID0gcnVsZVNldC5ydWxlcy5tYXAocnVsZSA9PlxuICAgICAgICBtYXBfcnVsZShydWxlLCBmaWxlTmFtZSlcbiAgICApO1xuICAgIHJldHVybiBydWxlU2V0O1xufSIsImltcG9ydCB7IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIH0gZnJvbSBcIi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFrZV9ydWxlKHJ1bGU6IGFueSk6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIHtcbiAgICBpZiAocnVsZS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1hbmlwdWxhdG9yczogcnVsZSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHJ1bGVbXCI6bWFuaXB1bGF0b3JzXCJdKSB7XG4gICAgICAgIHJ1bGUubWFuaXB1bGF0b3JzID0gKHJ1bGUubWFuaXB1bGF0b3JzIHx8IFtdKS5jb25jYXQoXG4gICAgICAgICAgICBydWxlW1wiOm1hbmlwdWxhdG9yc1wiXVxuICAgICAgICApO1xuICAgICAgICBkZWxldGUgcnVsZVtcIjptYW5pcHVsYXRvcnNcIl07XG4gICAgfVxuICAgIHJldHVybiBydWxlO1xufVxuIiwiaW1wb3J0IHtcbiAgICBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSxcbiAgICBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVNldCxcbn0gZnJvbSBcIi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFrZV9ydWxlX3NldChcbiAgICBydWxlczogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXVxuKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVTZXQge1xuICAgIGlmICghcnVsZXMuZmluZChydWxlID0+IHJ1bGVbXCI6b25seVwiXSkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgcnVsZXM6IHJ1bGVzLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBvbmx5OiB0cnVlLFxuICAgICAgICBydWxlczogcnVsZXMubWFwKHJ1bGUgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHJ1bGVbXCI6b25seVwiXTtcbiAgICAgICAgICAgIHJldHVybiBydWxlO1xuICAgICAgICB9KSxcbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgQ29tcGxleE1vZGlmaWNhdGlvbkZpbGUgfSBmcm9tIFwiLi4vcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IGpzb25fdG9fcnVsZSB9IGZyb20gXCIuL2pzb25fdG9fcnVsZVwiO1xuaW1wb3J0IHsgbWFrZV9ydWxlIH0gZnJvbSBcIi4vbWFrZV9ydWxlXCI7XG5pbXBvcnQgeyBtYWtlX3J1bGVfc2V0IH0gZnJvbSBcIi4vbWFrZV9ydWxlX3NldFwiO1xuaW1wb3J0IHsgbWFwX3J1bGUgfSBmcm9tIFwiLi9tYXBfcnVsZVwiO1xuaW1wb3J0IHsgRGV2aWNlSWRlbnRpZmllcnMgfSBmcm9tIFwiLi9ydWxlL2RldmljZVwiO1xuaW1wb3J0IHsgRnJvbU1vZGlmaWVyIH0gZnJvbSBcIi4vcnVsZS9mcm9tXCI7XG5pbXBvcnQgeyBMYW5nSW5wdXRTb3VyY2VzIH0gZnJvbSBcIi4vcnVsZS9sYW5nXCI7XG5pbXBvcnQgeyBUb01vZGlmaWVyIH0gZnJvbSBcIi4vcnVsZS90b1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGJ1bmRsZV9pZGVudGlmaWVycz86IHN0cmluZ1tdO1xuICAgIGlkZW50aWZpZXJzPzogRGV2aWNlSWRlbnRpZmllcnNbXTtcbiAgICBpbnB1dF9zb3VyY2VzPzogTGFuZ0lucHV0U291cmNlc1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hbmlwdWxhdG9yIHtcbiAgICB0eXBlPzogc3RyaW5nO1xuICAgIGNvbmRpdGlvbnM/OiBNYW5pcHVsYXRvckNvbmRpdGlvbnNbXTtcbiAgICBmcm9tPzogRnJvbU1vZGlmaWVyO1xuICAgIHRvPzogVG9Nb2RpZmllcltdO1xuXG4gICAgXCI6ZnJvbVwiPzogc3RyaW5nO1xuICAgIFwiOnRvXCI/OiBzdHJpbmc7XG4gICAgXCI6YXBwXCI/OiBzdHJpbmc7XG4gICAgXCI6ZGV2aWNlXCI/OiBzdHJpbmc7XG4gICAgXCI6bGFuZ1wiPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsZXhNb2RpZmljYXRpb25SdWxlIHtcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBtYW5pcHVsYXRvcnM/OiBNYW5pcHVsYXRvcltdO1xuICAgIFwiOm1hbmlwdWxhdG9yc1wiPzogTWFuaXB1bGF0b3IgfCBNYW5pcHVsYXRvcltdO1xuICAgIFwiOm9ubHlcIj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVTZXQge1xuICAgIG9ubHk6IGJvb2xlYW47XG4gICAgcnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlX3J1bGVzKGpzb246IGFueSk6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlU2V0IHtcbiAgICBsZXQgcnVsZXMgPSBqc29uX3RvX3J1bGUoanNvbikubWFwKHJ1bGUgPT4gbWFrZV9ydWxlKHJ1bGUpKTtcbiAgICByZXR1cm4gbWFrZV9ydWxlX3NldChydWxlcyk7XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSwgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi9ydWxlL2FwcFwiO1xuaW1wb3J0IHsgZGV2aWNlIH0gZnJvbSBcIi4vcnVsZS9kZXZpY2VcIjtcbmltcG9ydCB7IGZyb20gfSBmcm9tIFwiLi9ydWxlL2Zyb21cIjtcbmltcG9ydCB7IGxhbmcgfSBmcm9tIFwiLi9ydWxlL2xhbmdcIjtcbmltcG9ydCB7IHBlYXIgfSBmcm9tIFwiLi9ydWxlL3BlYXJcIjtcbmltcG9ydCB7IHN0cmluZ19zaG9ydGN1dCB9IGZyb20gXCIuL3J1bGUvc3RyaW5nX3Nob3J0Y3V0XCI7XG5pbXBvcnQgeyB0byB9IGZyb20gXCIuL3J1bGUvdG9cIjtcbmltcG9ydCB7IHNldF9hdHRycyB9IGZyb20gXCIuL3NldF9hdHRyc1wiO1xuaW1wb3J0IHsgdHlwZV9iYXNpYyB9IGZyb20gXCIuL3R5cGVfYmFzaWNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcF9ydWxlKFxuICAgIGpzb246IENvbXBsZXhNb2RpZmljYXRpb25SdWxlLFxuICAgIGZpbGVOYW1lOiBzdHJpbmdcbik6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIHtcbiAgICBsZXQgeyBydWxlLCBhdHRyIH0gPSBzZXRfYXR0cnMoanNvbik7XG4gICAgcnVsZS5kZXNjcmlwdGlvbiA9IHJ1bGUuZGVzY3JpcHRpb24gfHwgZmlsZU5hbWUucmVwbGFjZSgvXFwuXFx3Ky8sIFwiXCIpO1xuICAgIHJ1bGUubWFuaXB1bGF0b3JzID0gcnVsZS5tYW5pcHVsYXRvcnNcbiAgICAgICAgLm1hcChzdHJpbmdfc2hvcnRjdXQpXG4gICAgICAgIC5tYXAoXG4gICAgICAgICAgICAobWFuaXA6IE1hbmlwdWxhdG9yKTogTWFuaXB1bGF0b3IgPT4gT2JqZWN0LmFzc2lnbih7fSwgbWFuaXAsIGF0dHIpXG4gICAgICAgIClcbiAgICAgICAgLm1hcCh0eXBlX2Jhc2ljKVxuICAgICAgICAubWFwKGFwcClcbiAgICAgICAgLm1hcChkZXZpY2UpXG4gICAgICAgIC5tYXAobGFuZylcbiAgICAgICAgLm1hcChmcm9tKVxuICAgICAgICAubWFwKHRvKVxuICAgICAgICAubWFwKHBlYXIpO1xuICAgIHJldHVybiBydWxlO1xufVxuIiwiaW1wb3J0IHtcbiAgICBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSxcbiAgICBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVNldCxcbn0gZnJvbSBcIi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gb25seV9maWx0ZXIoXG4gICAgcnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlU2V0W11cbik6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW10ge1xuICAgIGxldCBpc09ubHkgPSBydWxlcy5maW5kKHJ1bGUgPT4gcnVsZS5vbmx5KTtcbiAgICBsZXQgZmlsdGVyZWRSdWxlcyA9IGlzT25seSA/IHJ1bGVzLmZpbHRlcihydWxlID0+IHJ1bGUub25seSkgOiBydWxlcztcbiAgICByZXR1cm4gZmlsdGVyZWRSdWxlc1xuICAgICAgICAubWFwKHJ1bGUgPT4gcnVsZS5ydWxlcylcbiAgICAgICAgLnJlZHVjZSgoYmFzZSwgY3VyKSA9PiBiYXNlLmNvbmNhdChjdXIpLCBbXSk7XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvckNvbmRpdGlvbnMgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgY29uZGl0aW9uX21hcCB9IGZyb20gXCIuL2xpYnMvY29uZGl0aW9uX21hcFwiO1xuXG5sZXQgY29uZGl0aW9uQXBwTWFwID0ge1xuICAgIGJyb3dzZXJzOiBbXG4gICAgICAgIFwiXmNvbVxcXFwuZ29vZ2xlXFxcXC5DaHJvbWUkXCIsXG4gICAgICAgIFwiXm9yZ1xcXFwubW96aWxsYVxcXFwuZmlyZWZveCRcIixcbiAgICAgICAgXCJeY29tXFxcXC5hcHBsZVxcXFwuU2FmYXJpJFwiLFxuICAgIF0sXG4gICAgY2hyb21lOiBbXCJeY29tXFxcXC5nb29nbGVcXFxcLkNocm9tZSRcIl0sXG4gICAgamV0YnJhaW5zOiBbXCJeY29tXFxcXC5qZXRicmFpbnNcXFxcLlwiXSxcbn07XG5cbmV4cG9ydCBjb25zdCBhcHAgPSBjb25kaXRpb25fbWFwKFxuICAgIFwiOmFwcFwiLFxuICAgIChjb25kaXRpb246IHN0cmluZyk6IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyA9PiB7XG4gICAgICAgIGlmIChjb25kaXRpb25BcHBNYXBbY29uZGl0aW9uXSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZyb250bW9zdF9hcHBsaWNhdGlvbl9pZlwiLFxuICAgICAgICAgICAgICAgIGJ1bmRsZV9pZGVudGlmaWVyczogY29uZGl0aW9uQXBwTWFwW2NvbmRpdGlvbl0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvbmRpdGlvbi5tYXRjaCgvXiEvKSAmJlxuICAgICAgICAgICAgY29uZGl0aW9uQXBwTWFwW2NvbmRpdGlvbi5yZXBsYWNlKC9eIS8sIFwiXCIpXVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJmcm9udG1vc3RfYXBwbGljYXRpb25fdW5sZXNzXCIsXG4gICAgICAgICAgICAgICAgYnVuZGxlX2lkZW50aWZpZXJzOiBbXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbkFwcE1hcFtjb25kaXRpb24ucmVwbGFjZSgvXiEvLCBcIlwiKV0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIENvbmRpdGlvbkFwcE1hcCBcIiR7Y29uZGl0aW9ufVwiYCk7XG4gICAgfVxuKTtcbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBjb25kaXRpb25fbWFwIH0gZnJvbSBcIi4vbGlicy9jb25kaXRpb25fbWFwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGV2aWNlSWRlbnRpZmllcnMge1xuICAgIHZlbmRvcl9pZDogbnVtYmVyO1xuICAgIHByb2R1Y3RfaWQ6IG51bWJlcjtcbn1cblxubGV0IGNvbmRpdGlvbkRldmljZU1hcCA9IHtcbiAgICBiYXJvY2NvOiB7XG4gICAgICAgIHZlbmRvcl9pZDogMTI0MSxcbiAgICAgICAgcHJvZHVjdF9pZDogMzIzLFxuICAgIH0sXG4gICAgYXBwbGU6IHtcbiAgICAgICAgdmVuZG9yX2lkOiAxNDUyLFxuICAgICAgICBwcm9kdWN0X2lkOiA2MjksXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBkZXZpY2UgPSBjb25kaXRpb25fbWFwKFxuICAgIFwiOmRldmljZVwiLFxuICAgIChjb25kaXRpb24pOiBNYW5pcHVsYXRvckNvbmRpdGlvbnMgPT4ge1xuICAgICAgICBpZiAoY29uZGl0aW9uRGV2aWNlTWFwW2NvbmRpdGlvbl0pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJkZXZpY2VfaWZcIixcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyczogW2NvbmRpdGlvbkRldmljZU1hcFtjb25kaXRpb25dXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29uZGl0aW9uLm1hdGNoKC9eIS8pICYmXG4gICAgICAgICAgICBjb25kaXRpb25EZXZpY2VNYXBbY29uZGl0aW9uLnJlcGxhY2UoL14hLywgXCJcIildXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImRldmljZV91bmxlc3NcIixcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyczogW2NvbmRpdGlvbkRldmljZU1hcFtjb25kaXRpb24ucmVwbGFjZSgvXiEvLCBcIlwiKV1dLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gQ29uZGl0aW9uRGV2aWNlIFwiJHtjb25kaXRpb259XCJgKTtcbiAgICB9XG4pO1xuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgcGFyc2Vfc2hvcnRjdXQgfSBmcm9tIFwiLi9saWJzL3BhcnNlX3Nob3J0Y3V0XCI7XG5pbXBvcnQgeyByZW1vdmVfcHJvcGVydHkgfSBmcm9tIFwiLi9saWJzL3JlbW92ZV9wcm9wZXJ0eVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZyb21Nb2RpZmllciB7XG4gICAga2V5X2NvZGU6IHN0cmluZztcbiAgICBtb2RpZmllcnM/OiB7XG4gICAgICAgIG9wdGlvbmFsPzogc3RyaW5nW107XG4gICAgICAgIG1hbmRhdG9yeTogc3RyaW5nW107XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Nb2RpZmllcihcbiAgICBiYXNlOiBGcm9tTW9kaWZpZXIgfCB2b2lkLFxuICAgIHNob3J0OiBzdHJpbmdcbik6IEZyb21Nb2RpZmllciB7XG4gICAgbGV0IGtleXMgPSBwYXJzZV9zaG9ydGN1dChzaG9ydCk7XG4gICAgbGV0IHJlc3VsdDogRnJvbU1vZGlmaWVyID0gT2JqZWN0LmFzc2lnbihiYXNlIHx8IHt9LCB7XG4gICAgICAgIGtleV9jb2RlOiBrZXlzLnBvcCgpLFxuICAgIH0pO1xuICAgIGlmICgha2V5cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVzdWx0Lm1vZGlmaWVycyA9IHJlc3VsdC5tb2RpZmllcnMgfHwge1xuICAgICAgICBtYW5kYXRvcnk6IFtdLFxuICAgIH07XG4gICAgaWYgKH5rZXlzLmluZGV4T2YoXCJhbnlcIikpIHtcbiAgICAgICAgcmVzdWx0Lm1vZGlmaWVycy5vcHRpb25hbCA9IFtcImFueVwiXTtcbiAgICAgICAga2V5cyA9IGtleXMuZmlsdGVyKGtleSA9PiBrZXkgIT09IFwiYW55XCIpO1xuICAgIH1cbiAgICBpZiAoa2V5cy5maW5kKGtleSA9PiBrZXkuaW5jbHVkZXMoXCI/XCIpKSkge1xuICAgICAgICBsZXQgb3B0aW9uYWwgPSBrZXlzXG4gICAgICAgICAgICAuZmlsdGVyKGtleSA9PiBrZXkuaW5jbHVkZXMoXCI/XCIpKVxuICAgICAgICAgICAgLm1hcChrZXkgPT4ga2V5LnJlcGxhY2UoXCI/XCIsIFwiXCIpKTtcbiAgICAgICAgcmVzdWx0Lm1vZGlmaWVycy5vcHRpb25hbCA9IChyZXN1bHQubW9kaWZpZXJzLm9wdGlvbmFsIHx8IFtdKS5jb25jYXQoXG4gICAgICAgICAgICBvcHRpb25hbFxuICAgICAgICApO1xuICAgICAgICBrZXlzID0ga2V5cy5maWx0ZXIoa2V5ID0+ICFrZXkuaW5jbHVkZXMoXCI/XCIpKTtcbiAgICB9XG4gICAgaWYgKCFrZXlzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXN1bHQubW9kaWZpZXJzLm1hbmRhdG9yeSA9IGtleXM7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGZyb20gPSByZW1vdmVfcHJvcGVydHkoXG4gICAgXCI6ZnJvbVwiLFxuICAgIChtYW5pcDogTWFuaXB1bGF0b3IsIHByb3A6IHN0cmluZyk6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgbWFuaXAuZnJvbSA9IGZyb21Nb2RpZmllcihtYW5pcC5mcm9tLCBwcm9wKTtcbiAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgIH1cbik7XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvckNvbmRpdGlvbnMgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgY29uZGl0aW9uX21hcCB9IGZyb20gXCIuL2xpYnMvY29uZGl0aW9uX21hcFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIExhbmdJbnB1dFNvdXJjZXMge1xuICAgIGxhbmd1YWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBsYW5nID0gY29uZGl0aW9uX21hcChcbiAgICBcIjpsYW5nXCIsXG4gICAgKGxhbmc6IHN0cmluZyk6IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyA9PiAoe1xuICAgICAgICB0eXBlOiBcImlucHV0X3NvdXJjZV9pZlwiLFxuICAgICAgICBpbnB1dF9zb3VyY2VzOiBbeyBsYW5ndWFnZTogbGFuZyB9XSxcbiAgICB9KVxuKTtcbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yLCBNYW5pcHVsYXRvckNvbmRpdGlvbnMgfSBmcm9tIFwiLi4vLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgcmVtb3ZlX3Byb3BlcnR5IH0gZnJvbSBcIi4vcmVtb3ZlX3Byb3BlcnR5XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25kaXRpb25fbWFwKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtYXBwZXI6IChwcm9wOiBzdHJpbmcpID0+IE1hbmlwdWxhdG9yQ29uZGl0aW9uc1xuKTogKG1hbmlwOiBNYW5pcHVsYXRvcikgPT4gTWFuaXB1bGF0b3Ige1xuICAgIHJldHVybiByZW1vdmVfcHJvcGVydHkoXG4gICAgICAgIG5hbWUsXG4gICAgICAgIChtYW5pcDogTWFuaXB1bGF0b3IsIHByb3A6IHN0cmluZyk6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgICAgIG1hbmlwLmNvbmRpdGlvbnMgPSAobWFuaXAuY29uZGl0aW9ucyB8fCBbXSkuY29uY2F0KG1hcHBlcihwcm9wKSk7XG4gICAgICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgICAgIH1cbiAgICApO1xufVxuIiwibGV0IG1vZGlmaWVyTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgIHNoaWZ0OiBcInNoaWZ0XCIsXG4gICAgY21kOiBcImNvbW1hbmRcIixcbiAgICBjb206IFwiY29tbWFuZFwiLFxuICAgIG9wdDogXCJvcHRpb25cIixcbiAgICBhbHQ6IFwiYWx0XCIsXG4gICAgY3RybDogXCJjb250cm9sXCIsXG4gICAgXCIqXCI6IFwiYW55XCIsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc2hvcnRjdXQoc2hvcnRjdXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gc2hvcnRjdXQuc3BsaXQoXCItXCIpLm1hcChrZXkgPT4gbW9kaWZpZXJNYXBba2V5XSB8fCBrZXkpO1xufVxuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vLi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlX3Byb3BlcnR5KFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBjYWxsYmFjazogKG1hbmlwOiBNYW5pcHVsYXRvciwgcHJvcDogc3RyaW5nKSA9PiBNYW5pcHVsYXRvclxuKSB7XG4gICAgcmV0dXJuIChtYW5pcDogTWFuaXB1bGF0b3IpOiBNYW5pcHVsYXRvciA9PiB7XG4gICAgICAgIGlmICghbWFuaXBbbmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBtYW5pcDtcbiAgICAgICAgfVxuICAgICAgICBtYW5pcCA9IGNhbGxiYWNrKG1hbmlwLCBtYW5pcFtuYW1lXSk7XG4gICAgICAgIGRlbGV0ZSBtYW5pcFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgIH07XG59XG4iLCJpbXBvcnQgeyBUb01vZGlmaWVyIH0gZnJvbSBcIi4uL3RvXCI7XG5cbmxldCB0b01vZGlmaWVyTWFwOiB7XG4gICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICBrZXk6IHN0cmluZztcbiAgICAgICAgbW9kPzogc3RyaW5nO1xuICAgIH07XG59ID0ge1xuICAgIFwiKFwiOiB7XG4gICAgICAgIGtleTogXCI5XCIsXG4gICAgICAgIG1vZDogXCJzaGlmdFwiLFxuICAgIH0sXG4gICAgXCIpXCI6IHtcbiAgICAgICAga2V5OiBcIjBcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIntcIjoge1xuICAgICAgICBrZXk6IFwib3Blbl9icmFja2V0XCIsXG4gICAgICAgIG1vZDogXCJzaGlmdFwiLFxuICAgIH0sXG4gICAgXCJ9XCI6IHtcbiAgICAgICAga2V5OiBcImNsb3NlX2JyYWNrZXRcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIjxcIjoge1xuICAgICAgICBrZXk6IFwiY29tbWFcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIj5cIjoge1xuICAgICAgICBrZXk6IFwicGVyaW9kXCIsXG4gICAgICAgIG1vZDogXCJzaGlmdFwiLFxuICAgIH0sXG4gICAgJ1wiJzoge1xuICAgICAgICBrZXk6IFwicXVvdGVcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIidcIjoge1xuICAgICAgICBrZXk6IFwicXVvdGVcIixcbiAgICB9LFxuICAgIFwiLFwiOiB7XG4gICAgICAgIGtleTogXCJjb21tYVwiLFxuICAgIH0sXG4gICAgXCIuXCI6IHtcbiAgICAgICAga2V5OiBcInBlcmlvZFwiLFxuICAgIH0sXG4gICAgXCIgXCI6IHtcbiAgICAgICAga2V5OiBcInNwYWNlYmFyXCIsXG4gICAgfSxcbiAgICBcIj1cIjoge1xuICAgICAgICBrZXk6IFwiZXF1YWxfc2lnblwiLFxuICAgIH0sXG4gICAgXCI7XCI6IHtcbiAgICAgICAga2V5OiBcInNlbWljb2xvblwiLFxuICAgIH0sXG4gICAgXCI6XCI6IHtcbiAgICAgICAga2V5OiBcInNlbWljb2xvblwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0Y3V0X3RvX21vZGlmaWVyKHNob3J0OiBzdHJpbmcpOiBUb01vZGlmaWVyW10ge1xuICAgIHJldHVybiBzaG9ydFxuICAgICAgICAucmVwbGFjZSgvXicoLis/KSckLywgXCIkMVwiKVxuICAgICAgICAuc3BsaXQoLyg/OikvKVxuICAgICAgICAubWFwKFxuICAgICAgICAgICAgKGtleTogc3RyaW5nKTogVG9Nb2RpZmllciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0b01vZGlmaWVyTWFwW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleS50b0xvd2VyQ2FzZSgpID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGtleV9jb2RlOiBrZXkgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5X2NvZGU6IGtleS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBbXCJzaGlmdFwiXSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRvTW9kaWZpZXJNYXBba2V5XVtcIm1vZFwiXTtcbiAgICAgICAgICAgICAgICBpZiAoIW1vZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBrZXlfY29kZTogdG9Nb2RpZmllck1hcFtrZXldW1wia2V5XCJdIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGtleV9jb2RlOiB0b01vZGlmaWVyTWFwW2tleV1bXCJrZXlcIl0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyczogW21vZF0sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IGZyb21Nb2RpZmllciB9IGZyb20gXCIuL2Zyb21cIjtcbmltcG9ydCB7IHRvTW9kaWZpZXIgfSBmcm9tIFwiLi90b1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcGVhcihtYW5pcDogTWFuaXB1bGF0b3IpOiBNYW5pcHVsYXRvciB7XG4gICAgT2JqZWN0LmtleXMobWFuaXApXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGtleS5tYXRjaCgvXjovKSlcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG1hbmlwW2tleV0pXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBtYW5pcC5mcm9tID0gZnJvbU1vZGlmaWVyKG1hbmlwLmZyb20sIGtleS5yZXBsYWNlKC9eOi8sIFwiXCIpKTtcbiAgICAgICAgICAgIG1hbmlwLnRvID0gdG9Nb2RpZmllcihtYW5pcC50bywgKDxhbnk+bWFuaXApW2tleV0pO1xuICAgICAgICAgICAgZGVsZXRlICg8YW55Pm1hbmlwKVtrZXldO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gbWFuaXA7XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdfc2hvcnRjdXQoXG4gICAgbWFuaXA6IE1hbmlwdWxhdG9yIHwgc3RyaW5nXG4pOiBNYW5pcHVsYXRvciB8IHN0cmluZyB7XG4gICAgaWYgKFwic3RyaW5nXCIgIT09IHR5cGVvZiBtYW5pcCkge1xuICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgfVxuICAgIGxldCBrdiA9IG1hbmlwLnNwbGl0KFwiOlwiKTtcbiAgICBpZiAoa3YubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBtYW5pcDtcbiAgICB9XG4gICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgcmVzdWx0W1wiOlwiICsgKGt2LnNoaWZ0KCkgfHwgXCJcIikudHJpbSgpXSA9IGt2LmpvaW4oXCI6XCIpLnRyaW0oKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgcGFyc2Vfc2hvcnRjdXQgfSBmcm9tIFwiLi9saWJzL3BhcnNlX3Nob3J0Y3V0XCI7XG5pbXBvcnQgeyByZW1vdmVfcHJvcGVydHkgfSBmcm9tIFwiLi9saWJzL3JlbW92ZV9wcm9wZXJ0eVwiO1xuaW1wb3J0IHsgc2hvcnRjdXRfdG9fbW9kaWZpZXIgfSBmcm9tIFwiLi9saWJzL3Nob3J0Y3V0X3RvX21vZGlmaWVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9Nb2RpZmllciB7XG4gICAga2V5X2NvZGU6IHN0cmluZztcbiAgICBtb2RpZmllcnM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvTW9kaWZpZXIoXG4gICAgYmFzZTogVG9Nb2RpZmllcltdIHwgdm9pZCxcbiAgICBzaG9ydDogc3RyaW5nXG4pOiBUb01vZGlmaWVyW10ge1xuICAgIGxldCByZXN1bHRzID0gc2hvcnRcbiAgICAgICAgLnNwbGl0KC8sLylcbiAgICAgICAgLmZpbHRlcihzaG9ydCA9PiBzaG9ydClcbiAgICAgICAgLnJlZHVjZSgoYmFzZTogVG9Nb2RpZmllcltdLCBzaG9ydDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXNob3J0Lm1hdGNoKC9eJy4rPyckLykpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5cyA9IHBhcnNlX3Nob3J0Y3V0KHNob3J0KTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBUb01vZGlmaWVyID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXlfY29kZToga2V5cy5wb3AoKSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tb2RpZmllcnMgPSBrZXlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5jb25jYXQocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBiYXNlLmNvbmNhdChzaG9ydGN1dF90b19tb2RpZmllcihzaG9ydCkpO1xuICAgICAgICB9LCBbXSk7XG4gICAgcmV0dXJuIChiYXNlIHx8IFtdKS5jb25jYXQocmVzdWx0cyk7XG59XG5cbmV4cG9ydCBjb25zdCB0byA9IHJlbW92ZV9wcm9wZXJ0eShcbiAgICBcIjp0b1wiLFxuICAgIChtYW5pcDogTWFuaXB1bGF0b3IsIHByb3A6IHN0cmluZyk6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgbWFuaXAudG8gPSB0b01vZGlmaWVyKG1hbmlwLnRvLCBwcm9wKTtcbiAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgIH1cbik7XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9hdHRycyhcbiAgICBydWxlOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVxuKToge1xuICAgIHJ1bGU6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlO1xuICAgIGF0dHI6IGFueTtcbn0ge1xuICAgIGxldCBhdHRycyA9IE9iamVjdC5rZXlzKHJ1bGUpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGtleS5tYXRjaCgvXjovKSlcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gXCJzdHJpbmdcIiA9PT0gdHlwZW9mIHJ1bGVba2V5XSlcbiAgICAgICAgLnJlZHVjZSgoYmFzZSwgY3VyKSA9PiB7XG4gICAgICAgICAgICBiYXNlW2N1cl0gPSBydWxlW2N1cl07XG4gICAgICAgICAgICBkZWxldGUgcnVsZVtjdXJdO1xuICAgICAgICAgICAgcmV0dXJuIGJhc2U7XG4gICAgICAgIH0sIHt9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBydWxlOiBydWxlLFxuICAgICAgICBhdHRyOiBhdHRycyxcbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBlX2Jhc2ljKG1hbmlwOiBNYW5pcHVsYXRvcik6IE1hbmlwdWxhdG9yIHtcbiAgICBtYW5pcC50eXBlID0gbWFuaXAudHlwZSB8fCBcImJhc2ljXCI7XG4gICAgcmV0dXJuIG1hbmlwO1xufVxuIiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuL3J1bGVzL21ha2VfcnVsZXNcIjtcblxuaW50ZXJmYWNlIEthcmFiaW5lckpzb25Qcm9maWxlIHtcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcbiAgICBjb21wbGV4X21vZGlmaWNhdGlvbnM6IHtcbiAgICAgICAgcnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW107XG4gICAgfTtcbn1cblxuaW50ZXJmYWNlIEthcmFiaW5lckpzb24ge1xuICAgIHByb2ZpbGVzOiBLYXJhYmluZXJKc29uUHJvZmlsZVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JpdGVfcnVsZXMocnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW10pIHtcbiAgICBsZXQga2FyYWJpbmVySnNvblBhdGggPSBgJHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuSE9NRVxuICAgIH0vLmNvbmZpZy9rYXJhYmluZXIva2FyYWJpbmVyLmpzb25gO1xuICAgIGxldCBrYXJhYmluZXJKc29uOiBLYXJhYmluZXJKc29uID0gZXZhbChcbiAgICAgICAgYCgke2ZzLnJlYWRGaWxlU3luYyhrYXJhYmluZXJKc29uUGF0aCwgXCJ1dGYtOFwiKX0pYFxuICAgICk7XG4gICAga2FyYWJpbmVySnNvbi5wcm9maWxlc1xuICAgICAgICAuZmlsdGVyKHByb2ZpbGUgPT4gcHJvZmlsZS5zZWxlY3RlZClcbiAgICAgICAgLmZvckVhY2gocHJvZmlsZSA9PiAocHJvZmlsZS5jb21wbGV4X21vZGlmaWNhdGlvbnMucnVsZXMgPSBydWxlcykpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoXG4gICAgICAgIGthcmFiaW5lckpzb25QYXRoLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShrYXJhYmluZXJKc29uLCBudWxsLCBcIiAgXCIpXG4gICAgKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvdXJjZS1tYXAtc3VwcG9ydFwiKTsiXSwic291cmNlUm9vdCI6IiJ9