# Reactlandia: boilerplate (lite)

Minimalistic universal server-rendered code-split redux-first-routed boilerplate based on [react-universal-component](https://github.com/faceyspacey/react-universal-component) and other amazing packages from the miraculous continent of Reactlandia.

Heavy and opinionated version of this boilerplate with various (unnecessary) bells and whistles will be available here: [not yet](TODO) 

## Introduction

**Reactlandia: boilerplate (lite)** is basically a functional replacement of Next.js, but without Next.js or any other monolithic framework. Instead it uses a set of cool packages from [faceyspacey](https://github.com/faceyspacey?tab=repositories) & Co. In this boilerplate nothing is hidden from you. You will find all the vanilla config files, components and HTML template string as they are, without intermediaries, without pre/postprocessing and ready to be hacked.

Most of the code is *shame\[less|full\]y* copied from Reactlandia demos/examples. The best things are carefully extracted, combined and prettified. 

Goals of this light bolerplate are:

 - to integrate all the Reactlandia demos into a single working demo
 - to produce a starting point for new tweakable projects
 - to create a project that would support future development, and testing of 
 Reactlandia packages involved (think of it as a dumbed-down version of integration testing)  
 - to not add anything that is not absolutely necessary for most universal SSR codesplit React/Redux webapps (this requirement is lifted in upcoming [heavy version of this boilerplate](TODO))


## What it has

 - React 16, Redux 4, Webpack 4, Babel 7, hot reloading
 
 - Simultaneous Server-side rendering (SSR) + Code Splitting, thanks to:
 
     - [react-universal-component](https://github.com/faceyspacey/react-universal-component)
     - [webpack-flush-chunks](https://github.com/faceyspacey/webpack-flush-chunks)
     - [extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin) 
     - [babel-plugin-universal-import](https://github.com/faceyspacey/babel-plugin-universal-import)

  - Redux-based routing with:
  
     - [redux-first-router](https://github.com/faceyspacey/redux-first-router)
     - [redux-first-router-link](https://github.com/faceyspacey/redux-first-router-link)
     - [redux-first-router-restore-scroll](https://github.com/faceyspacey/redux-first-router-restore-scroll)
  
  - (optional) Page-based architecture, similar to Next.js
  
    "Universalized" components are aggregated into `pages` directory and routing is happening in `Switch` component, which simply replaces the universal component when `redux-first-router` updates the `page` part of the redux state.
    
    The route-to-component mapping is done in `routes.js`.
    
    Not everyone likes this design, because it locks you down to the classic rigid router 
    (similar to Next.js and react-router) and defeats the purpose of redux-based routing.
    The good news is that it is easy to change if you want to: just replace the 
    `Switch` component with the one you like better. You may also remove it completely.
    Or the opposite, create multiple of them. Potentially, multiple or even all of the components may act as "switches", reacting in different ways on routing events and producing these events.


## What it does not have (proudly)

  This boilerplate tries to not include anything that you would remove and replace with 
  your favourite alternatives anyway. Notably: 

  - No languages or Javascript flavors like TypeScript or Flow. Almost vanilla ES6 with `babel-preset-env` and `babel-preset-react` is used. Add loaders and babel plugins for your favourite languages if you want to.
  
  - No styling solution. Nothing like Styled components, Styled JSX, Stylus, 
  Sass or PostCSS is included. Feel the zen of plain HTML/CSS. Add your own fluff or ship as is ;)
  Any reasonable styling package should work, because you have full control over babel and webpack directly.
  
  - No Redux frameworks. No sagas, thunks, fetching, persistence or anything similar. 
  Only a couple of debugging middleware packages is included.
  
  - No server-side packages, only barebone Express. Server is very skinny and dumb. It sends 404 to favicon request! You might want to add something (a lot actually).


## How to

  Node.js >= 8 and yarn >= 1.8 are assumed to be available on your machine.

  Install dependencies:

    yarn install
    
  Run development server with hot reloading:
  
    yarn dev
    
  Or run production server:

    yarn prod
    
  In both cases open a browser and navigate to `http://localhost:3000`.


## Static export

  You can export static HTML version of the app, for deployment to static 
  hosting. In this case, we server-render all the pages in advance and save them
  as .html files, so you don't need Node.js server at all. This feature is
  similar to "export" feature of Next.js.

  Run:

    yarn static

  The result will be in `exported-static-website/`.
  You can upload it to static hosting or to serve locally with any HTTP server.
  
  For testing, you may, for example, run `http-server` package:
  
    cd exported-static-website/
    npx http-server

  By default, `http-server` will be listening on `http://127.0.0.1:8080`

# Hacking

  When making modifications:

   - Verify that both, JS and CSS are being reloaded automatically in dev mode:
  edits of components or CSS files should be reflected in the browser immediately without refreshing the page.
  
   - Verify that server correctly renders the entire page: disable javascript in 
  your browser and try to reload any page. You should see the page, and not 
  "Loading" placeholder component.
  
   - Verify the HTML content of server-rendered page with curl:
  
          curl -k http://localhost:3000
     
      It is handy to highlight `<h1>` tags:

          curl -k http://localhost:3000 | grep h1

  ### Hacking reactlandia packages

  Here is how you can setup this boilerplate to make modifications to 
  reactlandia packages and to test them all at once:

   - fork and clone reactlandia packages into a separate directory 
   inside the boilerplate, let's say into `3rdparty/`
   
    git clone https://github.com/YOUR_NAME/react-universal-component 3rdparty/react-universal-component
    git clone https://github.com/YOUR_NAME/webpack-flush-chunks 3rdparty/webpack-flush-chunks
    git clone https://github.com/YOUR_NAME/extract-css-chunks-webpack-plugin 3rdparty/extract-css-chunks-webpack-plugin
    git clone https://github.com/YOUR_NAME/babel-plugin-universal-import 3rdparty/babel-plugin-universal-import
   
   - link these local packages to npm: in `package.json` replace 
   `"<package>": "<version>"`  with `"package": "link:3rdparty/<package>"`
   - run `yarn install`
   - any changes to these packages will be now picked up by the boilerplate
   - some of the packages have to be built, so you will need to run
   appropriate build steps (you can automate rebuilding with e.g. `nodemon`)
   - implement a new feature or fix a bug, make pull request and convince 
   maintaiers to merge your changes into upstream
   
## Known issues

 - CSS reloading sometimes randomly breaks, especially for the first loaded page ([#1](https://github.com/ivan-aksamentov/reactlandia-bolerplate-lite/issues/1))
 - Webpack emits duplicated files with `-css` suffix ([#6](https://github.com/ivan-aksamentov/reactlandia-bolerplate-lite/issues/6))

## Acknowledgements:

Huge shoutout to all folks who work on Reactlandia awesomeness, especially James Gillmore ([FaceySpacey](https://github.com/faceyspacey)) and Zack Jackson ([ScriptedAlchemy](https://github.com/ScriptedAlchemy)), and of course to developers of React, Redux, Webpack, Babel, and other cool packages and frameworks we use daily and take for granted. Keep up the great work!
