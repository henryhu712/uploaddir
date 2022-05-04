oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g uploaddir
$ uploaddir COMMAND
running command...
$ uploaddir (--version)
uploaddir/0.0.0 linux-x64 node-v14.15.1
$ uploaddir --help [COMMAND]
USAGE
  $ uploaddir COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`uploaddir hello PERSON`](#uploaddir-hello-person)
* [`uploaddir hello world`](#uploaddir-hello-world)
* [`uploaddir help [COMMAND]`](#uploaddir-help-command)
* [`uploaddir plugins`](#uploaddir-plugins)
* [`uploaddir plugins:install PLUGIN...`](#uploaddir-pluginsinstall-plugin)
* [`uploaddir plugins:inspect PLUGIN...`](#uploaddir-pluginsinspect-plugin)
* [`uploaddir plugins:install PLUGIN...`](#uploaddir-pluginsinstall-plugin-1)
* [`uploaddir plugins:link PLUGIN`](#uploaddir-pluginslink-plugin)
* [`uploaddir plugins:uninstall PLUGIN...`](#uploaddir-pluginsuninstall-plugin)
* [`uploaddir plugins:uninstall PLUGIN...`](#uploaddir-pluginsuninstall-plugin-1)
* [`uploaddir plugins:uninstall PLUGIN...`](#uploaddir-pluginsuninstall-plugin-2)
* [`uploaddir plugins update`](#uploaddir-plugins-update)

## `uploaddir hello PERSON`

Say hello

```
USAGE
  $ uploaddir hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/henryhu712/uploaddir/blob/v0.0.0/dist/commands/hello/index.ts)_

## `uploaddir hello world`

Say hello world

```
USAGE
  $ uploaddir hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `uploaddir help [COMMAND]`

Display help for uploaddir.

```
USAGE
  $ uploaddir help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for uploaddir.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `uploaddir plugins`

List installed plugins.

```
USAGE
  $ uploaddir plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ uploaddir plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/index.ts)_

## `uploaddir plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ uploaddir plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ uploaddir plugins add

EXAMPLES
  $ uploaddir plugins:install myplugin 

  $ uploaddir plugins:install https://github.com/someuser/someplugin

  $ uploaddir plugins:install someuser/someplugin
```

## `uploaddir plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ uploaddir plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ uploaddir plugins:inspect myplugin
```

## `uploaddir plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ uploaddir plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ uploaddir plugins add

EXAMPLES
  $ uploaddir plugins:install myplugin 

  $ uploaddir plugins:install https://github.com/someuser/someplugin

  $ uploaddir plugins:install someuser/someplugin
```

## `uploaddir plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ uploaddir plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ uploaddir plugins:link myplugin
```

## `uploaddir plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ uploaddir plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ uploaddir plugins unlink
  $ uploaddir plugins remove
```

## `uploaddir plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ uploaddir plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ uploaddir plugins unlink
  $ uploaddir plugins remove
```

## `uploaddir plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ uploaddir plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ uploaddir plugins unlink
  $ uploaddir plugins remove
```

## `uploaddir plugins update`

Update installed plugins.

```
USAGE
  $ uploaddir plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
