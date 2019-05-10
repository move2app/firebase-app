import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application/application";
import firebase = require("nativescript-plugin-firebase/app");

export class MainViewModel extends Observable {

    posts: ObservableArray<any> = new ObservableArray([]);
    userCollection = firebase.firestore().collection("users");

    constructor() {
        super();
        this.getPosts();
    }

    private getPosts() {
        this.userCollection.get().then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                this.posts.push({
                    user_name: doc.data().user_name,
                    first_name: doc.data().first_name,
                    last_name: doc.data().last_name
                });
            });
        });
    }

    onItemTap(args: any) {
        dialogs.alert(args.index).then(() => {
            console.log("Dialog closed!");
        });
    }

    onDrawerButtonTap() {
        let sideDrawer: RadSideDrawer = <RadSideDrawer>getRootView();
        sideDrawer.showDrawer();
    }

    onAddTap() {
        let new_user = {
            user_name: 'new_user_name',
            first_name: 'new_first_name',
            last_name: 'new_last_name'
        }
        this.userCollection.add(new_user).then(documentRef => {
            console.log(`new user added with auto-generated ID: ${documentRef.id}`);
            this.posts.push(new_user);
        });
    }
}