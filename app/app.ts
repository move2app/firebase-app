
import * as application from "tns-core-modules/application";

import firebase = require("nativescript-plugin-firebase");

firebase.init({
  persist: false
}).then(
  () => {
    console.log("firebase.init done");
  },
  error => {
    console.log(`firebase.init error: ${error}`);
  }
);





application.run({ moduleName: "app-root" });


