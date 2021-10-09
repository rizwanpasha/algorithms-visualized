import { Component, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('listItemSortAnimation', [
      state("1", style({ left: "0%" })),
      state("2", style({ left: "10%" })),
      state("3", style({ left: "20%" })),
      state("4", style({ left: "30%" })),
      state("5", style({ left: "40%" })),
      state("6", style({ left: "50%" })),
      state("7", style({ left: "60%" })),
      state("8", style({ left: "70%" })),
      state("9", style({ left: "80%" })),
      state("10", style({ left: "90%" })),
      //transition('void => *', animate(0)), // skip animation at the begining
      transition('* <=> *', animate('500ms linear'))
    ])
  ]
})

export class AppComponent {
  @ViewChild('sortDropDownMenuRef') sortDropDownMenuRef !: MatSelect;

  title: string = 'algorithms-visualized';
  disableToggleGroup: boolean = false;
  disableDropdown: boolean = false;
  disableRandomize: boolean = false;
  disableStartButton: boolean = false;
  defaultDropDownOptions = "Bubble Sort";
  currentSortType = "";

  // index = position of the donut
  // value = number of donuts
  initialItemsPositionValuesRef: string[] = ["3", "10", "7", "4", "8", "1", "5", "9", "2", "6"];

  currentItemsPositionValuesRef: string[] = [...this.initialItemsPositionValuesRef];

  // elements position ref for animation state
  // number of donuts = position of donuts
  gridItemOneState: string = "3";
  gridItemTwoState: string = "10";
  gridItemThreeState: string = "7";
  gridItemFourState: string = "4";
  gridItemFiveState: string = "8";
  gridItemSixState: string = "1";
  gridItemSevenState: string = "5";
  gridItemEightState: string = "9";
  gridItemNineState: string = "2";
  gridItemTenState: string = "6";

  constructor(private _snackBar: MatSnackBar) { };

  ngOnInit() {
    this.updatePositions(this.initialItemsPositionValuesRef);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", { duration: 3000 });
  }

  startSort(option: string) {
    if (this.disableToggleGroup && this.defaultDropDownOptions) return;

    let selectedOption = "";

    if (option === "") {
      selectedOption = this.sortDropDownMenuRef.value;
    } else {
      selectedOption = option;
    }

    this.currentSortType = selectedOption;
    this.openSnackBar(this.currentSortType + " Running....");

    switch (selectedOption) {
      case "Bubble Sort": this.doBubbleSort([...this.currentItemsPositionValuesRef]);
        break;
      case "Selection Sort": this.doSelectionSort(this.currentItemsPositionValuesRef);
        break;
      case "Insertion Sort": this.doInsertionSort(this.currentItemsPositionValuesRef);
        break;
    }
  }

  updatePositions(newItemsPositionValuesRef: string[]) {
    newItemsPositionValuesRef.map((element, index) => {
      let position = (index + 1).toString();

      switch (element) {
        case "1": this.gridItemOneState = position; break;
        case "2": this.gridItemTwoState = position; break;
        case "3": this.gridItemThreeState = position; break;
        case "4": this.gridItemFourState = position; break;
        case "5": this.gridItemFiveState = position; break;
        case "6": this.gridItemSixState = position; break;
        case "7": this.gridItemSevenState = position; break;
        case "8": this.gridItemEightState = position; break;
        case "9": this.gridItemNineState = position; break;
        case "10": this.gridItemTenState = position; break;
      }
    });

    this.currentItemsPositionValuesRef = [];
    this.currentItemsPositionValuesRef = [...newItemsPositionValuesRef];
  }

  randomize(currentItemsPositionValuesRef: string[]) {
    let numArray = [...currentItemsPositionValuesRef];
    let numArrayLength = numArray.length;
    let newItemsPositionValuesRef: string[] = [];

    this.clearAllActiveStates();
    this.clearAllDoneStates();

    for (let i = 0; i < numArrayLength; i++) {
      let randomIndex = Math.floor(Math.random() * numArray.length);
      let randomValue = numArray.splice(randomIndex, 1)[0];
      newItemsPositionValuesRef.push(randomValue);
    }

    this.updatePositions(newItemsPositionValuesRef);
  }

  doBubbleSort(currentItemsPositionValuesRef: string[]) {
    let arrayLength = currentItemsPositionValuesRef.length;
    let allUpdatedPositionValuesArray: any[] = [];

    for (let i = 0; i < arrayLength; i++) {
      for (let j = 0; j < arrayLength - i - 1; j++) {
        let statusUpdate = {};

        if (Number(currentItemsPositionValuesRef[j]) > Number(currentItemsPositionValuesRef[j + 1])) {
          [currentItemsPositionValuesRef[j], currentItemsPositionValuesRef[j + 1]] = [currentItemsPositionValuesRef[j + 1], currentItemsPositionValuesRef[j]];
        }

        statusUpdate = {
          position: [...currentItemsPositionValuesRef],
          activeElementOne: currentItemsPositionValuesRef[j],
          activeElementTwo: currentItemsPositionValuesRef[j + 1],
          isDone: false
        };

        allUpdatedPositionValuesArray.push(statusUpdate);
      }

      allUpdatedPositionValuesArray[allUpdatedPositionValuesArray.length - 1].isDone = true;
    }

    this.render(allUpdatedPositionValuesArray);
  }

  doSelectionSort(currentItemsPositionValuesRef: string[]) {
    let arrayLength = currentItemsPositionValuesRef.length;
    let allUpdatedPositionValuesArray: any[] = [];

    for (let i = 0; i < arrayLength - 1; i++) {
      for (let j = i + 1; j < arrayLength; j++) {
        let statusUpdate = {};

        if (Number(currentItemsPositionValuesRef[j]) < Number(currentItemsPositionValuesRef[i])) {
          [currentItemsPositionValuesRef[j], currentItemsPositionValuesRef[i]] = [currentItemsPositionValuesRef[i], currentItemsPositionValuesRef[j]];
        }

        statusUpdate = {
          position: [...currentItemsPositionValuesRef],
          activeElementOne: currentItemsPositionValuesRef[j],
          activeElementTwo: currentItemsPositionValuesRef[i],
          isDone: false
        };

        allUpdatedPositionValuesArray.push(statusUpdate);
      }

      allUpdatedPositionValuesArray[allUpdatedPositionValuesArray.length - 1].isDone = true;
    }

    this.render(allUpdatedPositionValuesArray);
  }

  doInsertionSort(currentItemsPositionValuesRef: string[]) {
    let arrayLength = currentItemsPositionValuesRef.length;
    let allUpdatedPositionValuesArray: any[] = [];

    for (let i = 1; i < arrayLength; i++) {
      let j = i;

      while (j > 0 && Number(currentItemsPositionValuesRef[j - 1]) > Number(currentItemsPositionValuesRef[j])) {
        let statusUpdate = {};

        [currentItemsPositionValuesRef[j - 1], currentItemsPositionValuesRef[j]] = [currentItemsPositionValuesRef[j], currentItemsPositionValuesRef[j - 1]];

        statusUpdate = {
          position: [...currentItemsPositionValuesRef],
          activeElementOne: currentItemsPositionValuesRef[j - 1],
          activeElementTwo: currentItemsPositionValuesRef[j],
          isDone: false
        };

        allUpdatedPositionValuesArray.push(statusUpdate);
        j--;
      }

      // NOTE: Dont set done state for insertion sort, because it not possible to know if any element has reached 
      //       its final position untill the last element.
    }

    this.render(allUpdatedPositionValuesArray);
  }

  render(allUpdatedPositionValuesArray: any[]) {
    let count = 0;
    let totalTimesToRender = allUpdatedPositionValuesArray.length;
    let intervalFunctionRef: any = null;
    let veryFirstElementRef = "";

    this.disableAllButtons();
    this.clearAllActiveStates();
    this.clearAllDoneStates();

    const renderFunction = () => {
      if (count < totalTimesToRender) {
        let currentValues = allUpdatedPositionValuesArray[count];
        let currentPositions = currentValues.position;
        let activeElementOne = currentValues.activeElementOne;
        veryFirstElementRef = activeElementOne;
        let activeElementTwo = currentValues.activeElementTwo;
        let isDoneState = currentValues.isDone;

        this.setActiveElementState(activeElementOne);
        this.setActiveElementState(activeElementTwo);
        this.updatePositions(currentPositions);

        if (isDoneState === true) {
          this.setDoneElementState(activeElementTwo);
        }

        intervalFunctionRef = setTimeout(() => {
          count++;
          this.clearActiveElementState(activeElementOne);
          this.clearActiveElementState(activeElementTwo);
          renderFunction();
        }, 750)
      } else {
        clearTimeout(intervalFunctionRef);

        // set the very first element as done at the end
        this.setDoneElementState(veryFirstElementRef);

        // for Insertion Sort set all elements as done state at the end
        this.setAllDoneStates();

        this.enableAllButtons();
        this.openSnackBar(this.currentSortType + " Done 🎉🎉🎉🎉");
        this.currentSortType = "";
      }
    }

    renderFunction();
  }

  disableAllButtons() {
    this.disableToggleGroup = true;
    this.disableDropdown = true;
    this.disableRandomize = true;
    this.disableStartButton = true;
  }

  enableAllButtons() {
    this.disableToggleGroup = false;
    this.disableDropdown = false;
    this.disableRandomize = false;
    this.disableStartButton = false;
  }

  setActiveElementState(elementRef: string) {
    switch (elementRef) {
      case "1": this.addClass("#sort-active-mark-1", "active"); break;
      case "2": this.addClass("#sort-active-mark-2", "active"); break;
      case "3": this.addClass("#sort-active-mark-3", "active"); break;
      case "4": this.addClass("#sort-active-mark-4", "active"); break;
      case "5": this.addClass("#sort-active-mark-5", "active"); break;
      case "6": this.addClass("#sort-active-mark-6", "active"); break;
      case "7": this.addClass("#sort-active-mark-7", "active"); break;
      case "8": this.addClass("#sort-active-mark-8", "active"); break;
      case "9": this.addClass("#sort-active-mark-9", "active"); break;
      case "10": this.addClass("#sort-active-mark-10", "active"); break;
    }
  }

  addClass(selector: string, className: string) {
    document.querySelector(selector)?.classList.add(className)
  }

  clearActiveElementState(elementRef: string) {
    switch (elementRef) {
      case "1": this.removeClass("#sort-active-mark-1", "active"); break;
      case "2": this.removeClass("#sort-active-mark-2", "active"); break;
      case "3": this.removeClass("#sort-active-mark-3", "active"); break;
      case "4": this.removeClass("#sort-active-mark-4", "active"); break;
      case "5": this.removeClass("#sort-active-mark-5", "active"); break;
      case "6": this.removeClass("#sort-active-mark-6", "active"); break;
      case "7": this.removeClass("#sort-active-mark-7", "active"); break;
      case "8": this.removeClass("#sort-active-mark-8", "active"); break;
      case "9": this.removeClass("#sort-active-mark-9", "active"); break;
      case "10": this.removeClass("#sort-active-mark-10", "active"); break;
    }
  }

  clearAllActiveStates() {
    let elements = document.querySelectorAll(".main-wrapper .grid-list .grid-item .status-icons .sort-active-mark");

    elements.forEach((element) => {
      element?.classList.remove("active");
    });
  }

  clearAllDoneStates() {
    let elements = document.querySelectorAll(".main-wrapper .grid-list .grid-item .status-icons .sort-done-check-mark");

    elements.forEach((element) => {
      element?.classList.remove("active");
    })
  }

  setAllDoneStates() {
    let elements = document.querySelectorAll(".main-wrapper .grid-list .grid-item .status-icons .sort-done-check-mark");

    elements.forEach((element) => {
      element?.classList.add("active");
    })
  }

  removeClass(selector: string, className: string) {
    document.querySelector(selector)?.classList.remove(className)
  }

  setDoneElementState(elementRef: string) {
    switch (elementRef) {
      case "1": this.addClass("#sort-done-check-mark-1", "active"); break;
      case "2": this.addClass("#sort-done-check-mark-2", "active"); break;
      case "3": this.addClass("#sort-done-check-mark-3", "active"); break;
      case "4": this.addClass("#sort-done-check-mark-4", "active"); break;
      case "5": this.addClass("#sort-done-check-mark-5", "active"); break;
      case "6": this.addClass("#sort-done-check-mark-6", "active"); break;
      case "7": this.addClass("#sort-done-check-mark-7", "active"); break;
      case "8": this.addClass("#sort-done-check-mark-8", "active"); break;
      case "9": this.addClass("#sort-done-check-mark-9", "active"); break;
      case "10": this.addClass("#sort-done-check-mark-10", "active"); break;
    }
  }
}
