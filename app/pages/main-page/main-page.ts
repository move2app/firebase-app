
import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { MainViewModel } from "./main-view-model";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new MainViewModel();
}
