# VSCode plugins

- [VSCode plugins](#vscode-plugins)
    - [Markdown Extension Pack](#markdown-extension-pack)
        - [Setup the plugin named "markdownlint" that is inside this extension pack](#setup-the-plugin-named-markdownlint-that-is-inside-this-extension-pack)
        - [Setup format on save functionality](#setup-format-on-save-functionality)
        - [Setup the plugin "Markdown Theme Kit" inside this extension pack](#setup-the-plugin-markdown-theme-kit-inside-this-extension-pack)
        - [Markdown All in One](#markdown-all-in-one)
            - [create a table of contents with this plugin](#create-a-table-of-contents-with-this-plugin)

## [Markdown Extension Pack](vscode:extension/sugatoray.vscode-markdown-extension-pack)

### Setup the plugin named "markdownlint" that is inside this extension pack

1. go to vscode settings
   1. ctrl + shift + p
2. write: "Preferences: Open **User** Settings"
3. modify plugin configuration

```json
"markdownlint.config": {
    "no-duplicate-header": false,
    "no-hard-tabs": false,
    "no-inline-html": false,
    "single-h1": false,
    "no-bare-urls": false,
    "ul-indent": {
      "indent": 4
    }
}
```

### Setup format on save functionality

1. ctrl + shift + p
2. write: "Preferences: Open Settings **(UI)**"
3. write: format on save
4. tick the option

### Setup the plugin "Markdown Theme Kit" inside this extension pack

I don't like these themes, I just disable this plugin, you can go here to configure as you like.

[Markdown Theme Kit](vscode:extension/ms-vscode.Theme-MarkdownKit)

### [Markdown All in One](vscode:extension/yzhang.markdown-all-in-one)

#### create a table of contents with this plugin

1. select a markdown file
2. pres: ctrl + shift + p
3. write: create table of contents
