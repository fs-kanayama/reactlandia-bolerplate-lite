# Reactlandia: boilerplate (lite)

Minimalistic universal server-rendered code-split redux-first-routed boilerplate based on   
[react-universal-component](https://github.com/faceyspacey/react-universal-component) 
and other amazing packages from the miraculous continent of Reactlandia.

Heavy and opinionated version of this boilerplate with various (unnecessary) bells and whistles will be available here: [not yet](TODO) 

## Introduction

**Reactlandia: boilerplate (lite)** is basically a minimal version of Next.js, but without Next.js or any other monolithic framework. Instead it uses a set of cool packages from [faceyspacey](https://github.com/faceyspacey?tab=repositories) & Co. In this boilerplate nothing is hidden from you. You will find all the vanilla config files, components and HTML template string as they are, without intermediaries, without pre/postprocessing and ready to be hacked.

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
  Only a couple of debugging mddleware packages is included.
  
  - No server-side packages, only barebone Express. Server is very skinny and dumb. It sends 404 to favicon request! You might want to add something (a lot actually).


## How to

  Node.js >= 8 and yarn >= 6 are assumed to be available on your machine.

  Install dependencies:

    yarn install
    
  Run development server with hot reloading:
  
    yarn dev
    
  Or run production server:

    yarn prod
    
  In both cases open a browser and navigate to `http://localhost:3000`.


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


## Known issues

 - The following packages are "frozen" to slightly older versions, until related issues are resolved:
 
        "react-universal-component": "2.9.0",
        "webpack": "4.16.1",

 - CSS reloading sometimes randomly breaks, especially for the first loaded page ([#1](https://github.com/ivan-aksamentov/reactlandia-bolerplate-lite/issues/1))

 - React-DOM may emit server-client mismatch warnings ([#2](https://github.com/ivan-aksamentov/reactlandia-bolerplate-lite/issues/2))
 
 - Flush-chunks thinks it is unable to find the page chunks ([#3](https://github.com/ivan-aksamentov/reactlandia-bolerplate-lite/issues/3))

 - Hot reload emits warnings ([#4](https://github.com/ivan-aksamentov/reactlandia-bolerplate-lite/issues/4))
 
 - Latest version of webpack emits warnings ([#5](https://github.com/ivan-aksamentov/reactlandia-bolerplate-lite/issues/5))


## Acknowledgements:

Huge shoutout to all folks who work on Reactlandia awesomeness, especially James Gillmore ([FaceySpacey](https://github.com/faceyspacey)) and Zack Jackson ([ScriptedAlchemy](https://github.com/ScriptedAlchemy)), and of course to developers of React, Redux, Webpack, Babel, and other cool packages and frameworks we use daily and take for granted. Keep up the great work!
