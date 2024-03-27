1. Create the manifest file
   https://developer.chrome.com/docs/extensions/reference/manifest?hl=en
2. Add the icon
   In the manifest file
   Add the icon file here in the resources of the extension
3. Add
   1. First install yarn
      npm install --global yarn
      Verify the installation < yarn --version
      yarn init -y
4. Install react
   yarn add react react-dom
5. Install webpack
   yarn add webpack webpack-cli --dev
   create the file manually: webpack.config.js
   add the code manually to the webpack.config.js file
   create manually the directory src and inside it the file test.tsx
   add manually the code inside test.tsx
6. Install typescript to our machine
   yarn add global typescript
7. Add a ts-loader < dunno what is this :( < it will convert the typescript file into a javascript file
   yarn add ts-loader
8. Add rules within the modules inside the webpack.config.js to indicate to translate all the tsx files into js with the ts-loader
   then add a resolve to indicate to resolve all these extensions
9. Create the tsconfig.json
   In this case we copy it from his repository < https://github.com/manshu/reactjs-chrome-extension/blob/master/tsconfig.json
10. test it
    yarn run
    dev
11. Add version control
    git init
    create file .gitignore
    write: node_modules < to ignore the node modules
12. Use a plugin: https://webpack.js.org/plugins/copy-webpack-plugin/
    yarn add -D copy-webpack-plugin < Install the plugin
13. Add the plugin in the webpack file in the first line of the file
    const CopyPlugin = require('copy-webpack-plugin');
    also create the object plugin and paste the "new copy plugin" section from the website insite module.exports
    delete the second line (others)
    also import path: const parth = require('path')
    modify the patterns content as the video demands (min 3:52): https://youtu.be/23ou8OJPCPI?si=uAxz2Q7w5v90ZTGM&t=232
    to execute this correctly the file manifest.json will have to be moved inside the /src directory. Otherwise the copyplugin, as it has been configured to resolve from src/manifest.json won't find it
    run with: yarn run --watch
    Do the same with the icon: create the assets directory, copy manually the icon inside. Add in webpack to copy the asset icon to dist
    from now, upload the extension from the "dist" folder, not from the rest
14. Add the HTML plugin
    install the module: yarn add -D html-webpack-plugin
    const HtmlPlugin = require('html-webpack-plugin')
    inside src create the directory popup
    inside src/popup create the file popup.tsx
    copy the content of test.tsx to popup.tsx to start working. Then delete test.tsx, this will require to change the entry point in the webpack file, as it was test.tsx
    inside the webpack file, declare the html plugin
    also in the manifest file add the action method with the default_title and the default_popup with its respective values
    now the app should compile again, and if we click the extension, it will show a blank square
15. Enhance the webpack file
    change the popup file route written in the previous step to path.resolve, just thinking in the long term
    Add the chunk, for the moment only popup. The explanation of the chunk is not clear, however we will do it. Ok the explanationis to change the output filename value from index.js to ['name'].js, and it will take the name from the chunk
16. solve error
    When following the steps until now, an error will be presented by the extension. Solve the error by adding in the webpack file < devtool: 'cheap-module-source-map',
    check the documentation to see why does this work
    index.js file can be deleted as we changed its name in the previous step 15
    after the yarn run --watch command the popup.js.map file will be generated
17. Import the React DOM
    import {createRoot} from 'react-dom/client' < in the popup.tsx file
    then we add some lines to create a div as a container, and inside that container we add the content of a variable named test with a div inside, and insite this dive an h1 with a hello world. At the end we see a h1 inside div inside div
18. Add css with tailwind
    create the css file inside the popup directory < popup.css
    Add the file in the webpack file. For this we need loaders for css: yarn add -D style-loader css-loader
    Once the loaders are installed, add the object in webpack, inside modules > rules < to add both loaders
    add in popup.tsx the following line to import the css file: import './popup.css'
19. Add twilwindcss
    install it: yarn add -D tailwindcss postcss autoprefixer
    create the file postcss.config.js
    add code from step 2 from the postcss documentation; https://tailwindcss.com/docs/installation/using-postcss
20. Create tailwindcss config file (tsx file)
    run the command: npx tailwindcss init -p
    inside the src directory create a new directory named: static
    insidde src/static: move all the files (icon and manifest) from src/assets to static
    move popup.css inside assets and rename it as: tailwind.css
    copy the content of the step 4 of the documentation inside tailwind.css
    finally modify the popup.tsx to correct the route to the css file and the routes of the icon and manifest files inside the webpack file
21. Install post-loader: yarn add -D postcss-loader
    Modify the module rules as stated in react js part 5 6:20
    This will require to import taildind css in the webpack file: const tailwindcss = require('tailwindcss')
    next import: const autoprefixer = require('autoprefixer')
22. Modify the tailwind.config.js file
    Add the line: "./src/\*_/_.{js,jsx,ts,tsx}",
    Add the line inside of content
23. Test it: go to poupp tsx and in the h1 add the following class: className="text-5xl text-green-500"
24. Add the options page
    first create a new directory inside src named options
    create options.tsx inside options directory
    copy paste the content of popup.tsx into options.tsx
    next add the options page to the webpack configuration file. To do so, add inside entry: options: path.resolve('./src/options/options.tsx')
    next: modify the html plugin usage to allow us generate both popup.html file and options.html file. To do so, split the chunk generation in multiple chunks through a function: getHtmlPlugins(chunks) function
    this function can be directly added to the position where the previous popup html function was. To call the function use 3 dots: ...getHtmlPlugins([
    'popup',
    'options'
    ])
    Now the options have been added, and to reflext the changes in the browser the extension has to be uploaded again.
    Lastly add the options page in the manifest file: "options_page": "options.html",
25. Add images to the extension
    Adding images in webpack requires to add a new rule, and indicate to take the image file formats from asset/resource. The images can be stored in src/static
    modify from the copy plugin to take all the files inside src/static, so they don't have to be entried manually file by file: from: path.resolve('src/static'),
26. Add background scripts
    Add it in manifest
    create in src the directory background and the file background.ts
    add the file (ts file route) in the webpack as entry file
    rerun with yan and once it is updated in the extension, the "Inspect views service worker" will apper then managing the extension through the chrome extension lister. This SOULD NOT appear as "inactive"
    Add a line in the background.ts file to add a console log message after the extensoin installation. This may cause an error to yarn, however it is being updated in the dist/background.js file
27. Install more libraries
    yarn add -D @types/react @types/react-dom @types/chrome
    use them in the background js file
28. Add the content script to the extension
    create the directory contentScript within src and the file contentScript.tsx within the directory
    Add the entry in the webpack file: contentScript: path.resolve('./src/contentScript/contentScript.ts')
    add it in the manifest file
    test the content script with a console log events to view its successfull execution
29. Convert the dev mode of the webpack file in a prod mode
    For this, just use 2 webpack files: webpack.dev.js and webpack.prod.js
    Use these 2 files as per their corresponding end
    Rename the webpack file used until now for: webpack.common.js
    install the webpack merge package: yarn add -D webpack-merge
    start filling the files as per the video (6:50)
    build it again. This time with the dev mode webpack: yarn run webpack --watch --progress --config webpack.dev.js
