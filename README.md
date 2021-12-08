# karabiner-elements-complex

karabiner-elements complex_modifications manager

# Motivation

karabiner-elements is very awesome. but complex_modifications setting json is very ugly and complicated.

karabiner-elements-complex makes it easy to write complex_modifications setting json.

Of course you can also use [pqrs\-org/KE\-complex\_modifications](https://github.com/pqrs-org/KE-complex_modifications). But "KE-complex_modifications" is written in Ruby.

<table>
<thead><tr><th>karabiner-elements</th><th>karabiner-elements-complex</th></tr></thead>
<tbody>
<tr>
<td><pre><code>{
    "title": "karabiner-elements settings...",
    "rules": [
        {
            "description": "complex_modifications settings...",
            "manipulators": [
                {
                    // ...
                }
            ]
        }
    ]
}</code></pre>
</td><td>
<pre><code>{
  // line comment here
  "description": "complex_modifications settings...",
  "manipulators": [
  /* block comment out
    {
        // ...
    },
  */
  ], // You can write a trailing comma.
}
or
[
  {
    "description": "first settings...",
    "manipulators": [
      {
          // ...
      }
    ]
  },
  {
    "description": "second settings...",
    "manipulators": [
      {
          // ...
      }
    ]
  }
]
</code></pre></td>
</tr>
<tr>
<td><pre><code>{
    "title": "karabiner-elements settings...",
    "rules": [
        {
            "description": "complex_modifications settings...",
            "manipulators": [
                {
                    "from": {
                      "key_code": "o",
                      "modifiers": {
                        "optional": [
                          "any"
                        ],
                        "mandatory": [
                          "command"
                        ]
                      }
                    },
                    "to": [
                      {
                        "key_code": "o",
                        "modifiers": [
                          "control",
                          "option"
                        ]
                      }
                    ]
                }
            ]
        }
    ]
}</code></pre>
</td><td>
<pre><code>{
  "description": "complex_modifications settings...",
  "manipulators": [
    "*-com-o:ctrl-opt-o"
  ]
}
or
{
  "description": "complex_modifications settings...",
  "manipulators": [
    {
      ":from": "*-com-o",
      ":to": "ctrl-opt-o"
    }
  ]
}</code></pre></td>
</tr>
<tr>
<td><pre><code>{
    "title": "karabiner-elements settings...",
    "rules": [
        {
            "description": "command-shift-o => console.log()",
            "manipulators": [
                {
                  // snip(too large...)
                }
            ]
        }
    ]
}</code></pre>
</td><td>
<pre><code>{
  "description": "complex_modifications settings...",
  "manipulators": [
    "cmd-shift-o:japanese_eisuu,'console.log()',left_arrow"
  ]
}</code></pre></td>
</tr>
</tbody>
</table>

See [samples](/tree/master/samples).

# Installation

```
$ brew install node
$ wget https://raw.githubusercontent.com/kyo-ago/karabiner-elements-complex/master/index.js
$ node index.js
```

# Usage

```
$ head *.json
==> barocco-escape.json <==
{
  "description": "barocco rules",
  ":device": "barocco",
  ":manipulators": [
    "com-escape:grave_accent_and_tilde",
    "shift-escape:shift-grave_accent_and_tilde",
    "*-backslash:delete_or_backspace",
    "*-delete_or_backspace:backslash",
    "left_gui:left_alt",
    "left_alt:japanese_eisuu",

==> ctrl.json <==
[
  {
    "description": "browsers",
    ":app": "browsers",
    ":manipulators": [
      "com-q:opt-com-left_arrow",
      "com-e:opt-com-right_arrow",
      "com-b:com-open_bracket",
      "cmd-s:cmd-r"
    ]

==> jetbrains.json <==
{
  "description": "ctrl-1 to Find in Path...",
  ":app": "jetbrains",
  ":manipulators": [
    "com-1:shift-com-f",
    "com-o:ctrl-opt-o",
  ]
}
==> macro.json <==
{
  "description": "macro",
  ":manipulators": [
    "cmd-shift-c:japanese_eisuu,'const '",
    "cmd-shift-o:japanese_eisuu,'console.log()',left_arrow",
    "cmd-shift-i:japanese_eisuu,'if () {}',left_arrow,return_or_enter,up_arrow,right_arrow,right_arrow",
    "cmd-shift-u:japanese_eisuu,'undefined'",
    "cmd-shift-r:japanese_eisuu,'return'",
    "cmd-shift-f:japanese_eisuu,'() => {}',left_arrow,left_arrow,left_arrow,left_arrow,left_arrow,left_arrow,left_arrow",
    "cmd-shift-l:japanese_eisuu,'.length'",
...
$ npm run build
$ node dist/index.js --noUpdate # update karabiner-elements setting
```

# Options

## --json

Target json directory path. (default `__dirname`)

## --noUpdate

Skip update karabiner-elements selected setting. (`~/.config/karabiner/karabiner.json`)
