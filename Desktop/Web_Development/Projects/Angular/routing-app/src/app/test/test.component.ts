import { Component } from "@angular/core";

@Component({
  selector: "app-test",
  templateUrl: "test.component.html",
  styleUrls: ["test.component.css"]
})
export class TestComponent {
  counter = 0;
  name: string;

  keyPress($event) {
    if ($event.keyCode === 13) {
      alert("Enter is pressed");
    }
  }

  btnClicked() {
    this.counter += 1;
  }
}
