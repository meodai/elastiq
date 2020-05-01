# elastiq.ch
https://elastiq.ch/ website

[![Netlify Status](https://api.netlify.com/api/v1/badges/1badacb4-da50-4464-a79e-d102bd32dc1d/deploy-status)](https://app.netlify.com/sites/boring-euclid-25977c/deploys)

## edit contents
[edit website here](https://github.com/meodai/elastiq/blob/master/content.yml)

## local installation
This setup uses node and NPM to built the website statically.

1. install node and npm (https://nodejs.org/en/)
2. use the terminal/command-line to navigate to the folder where you checked out the project
3. install deps by typing `npm install`
4. once done type `npm start` to work on the project

## setup
- [parcel.js](https://parceljs.org/) builds everything
- [posthtml-expressions](https://github.com/posthtml/posthtml-expressions) This plugin provides a syntax for including local variables and expressions in your templates, and also extends custom tags to act as helpers for conditionals and looping. Mainly used to include content from [data.yml](https://github.com/meodai/exalt.biz/blob/master/data.yml). [posthtml-load-config](https://github.com/posthtml/posthtml-load-config) makes sure [.posthtmlrc.js](https://github.com/meodai/exalt.biz/blob/master/.posthtmlrc.js) the data from the YML ends up in the `locals` from `posthtml-expressions`.
- [.browserslistrc](https://github.com/meodai/exalt.biz/blob/master/.browserslistrc) Sets the browser compatibility for [autoprefixer](https://github.com/postcss/autoprefixer)

```
┌──────────┐    ┌────────────────────┐
│ data.yml │───▶│posthtml-expressions│──┐
└──────────┘    └────────────────────┘  │
┌──────────┐    ┌───────────────────┐   │
│style.scss│───▶│  sass & postCSS   │──┐│  ┌─────────────┐
└──────────┘    └───────────────────┘  ├┴─▶│ /index.html │
┌──────────┐    ┌───────────────────┐  │   └──────┬──────┘
│ main.js  │───▶│     babel.js      │──┤         ┌┘
└──────────┘    └───────────────────┘  │         │
                         ┌──────────┐  │         ▼
                         │  images  │──┘    ┌─────────┐
                         └──────────┘       │ Magic * │
                                            └─────────┘
                                                 │
                                                 │
                                                 │
     * Magic = parcel.js             ┌───────────▼─────────┐
                                     │       ./dist        │
                                    ┌┴─────────────────────┴┐
                                    │      index.html       │
                                    ├───────────────────────┤
                                    │       style.css       │
                                    ├───────────────────────┤
                                    │  *.{jpg|png|gif...}   │
                                    └┬─────────────────────┬┘
                                     └─────────────────────┘
```

## license 
© David Aerne
Feel free to do whatever with the sources. Except for the illustrations. Don't share or reuse them.
