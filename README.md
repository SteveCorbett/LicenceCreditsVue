# LicenceCredits

This project demonstrates how to generate and display credits for the third party licences used within a Vue 3 application. This code should be easily adaptable to any other JavaScript front end applications, including those built with Angular or React.

There are two package.json scripts that are required to extract and format the licence details.

A post-install script runs the [NPM license-checker](https://www.npmjs.com/package/license-checker) package to create a JSON file containing the licence details of all the production dependancies of the project. Note that License Checker may not be able to identify the licences of those packages whose licence files are not available or are in unusual places. More details can be found in the License Checker documentation.

A pre-build script is run to parse the extracted JSON file and place it into the public directory. This script consolidates multiple entries for the same publisher that have the same licence.

At run-time, the LicenceCredits component reads this file and displays the details.

## Using This Code

This code is provide under the 0BSD licence, meaning that you can use, modify and adapt this code as you see fit. Refer to this project's licence file for details.

First copy the extractLicences.js file into the root directory of the project. Then add the following two scripts into the package.json file:

```
    "prebuild": "node extractLicences.js",
    "postinstall": "license-checker --production --json > ./src/assets/licences.json"

```

Add License Checker to the project. This will generate the licences.json file in the ./src/assets directory. If you are using the NPM package manager:
```
npm i license-checker --save-dev
```
If you are using the Yarn package manager:
```
yarn add license-checker 
```
Finally, add the LicenceCredits component into your project, customise the headings, and apply styling as required.

