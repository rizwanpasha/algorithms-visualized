import { Component, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSelect } from '@angular/material/select';

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
      transition('* <=> *', animate('1000ms linear'))
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

  ngOnInit() {
    this.updatePositions(this.initialItemsPositionValuesRef);
  }

  startSort(option: string) {
    if (this.disableToggleGroup && this.defaultDropDownOptions) return;

    let selectedOption = "";

    if (option === "") {
      selectedOption = this.sortDropDownMenuRef.value;
    } else {
      selectedOption = option;
    }

    switch (selectedOption) {
      case "Bubble Sort": this.doBubbleSort(this.currentItemsPositionValuesRef);
        break;
      case "Selection Sort": this.doSelectionSort(this.currentItemsPositionValuesRef);
        break;
      case "Insertion Sort": this.doInsertionSort(this.currentItemsPositionValuesRef);
        break;
    }
  }

  updatePositions(newItemsPositionValuesRef: string[]) {
    newItemsPositionValuesRef.map((value, index) => {
      let element = value;
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

    for (let i = 0; i < numArrayLength; i++) {
      let randomIndex = Math.floor(Math.random() * numArray.length);
      let randomValue = numArray.splice(randomIndex, 1)[0];
      newItemsPositionValuesRef.push(randomValue);
    }

    this.updatePositions(newItemsPositionValuesRef);
  }

  doBubbleSort(currentItemsPositionValuesRef: string[]) {
    let newArray = [...currentItemsPositionValuesRef];
    let arrayLength = newArray.length;
    let allUpdatedPositionValuesArray: string[][] = [];

    for (let i = 0; i < arrayLength; i++) {
      for (let j = 0; j < arrayLength - i - 1; j++) {
        if (Number(newArray[j]) > Number(newArray[j + 1])) {
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
        }
        allUpdatedPositionValuesArray.push([...newArray]);
      }
    }

    this.render(allUpdatedPositionValuesArray);
  }

  doSelectionSort(currentItemsPositionValuesRef: string[]) {
    let newArray = [...currentItemsPositionValuesRef];
    let arrayLength = newArray.length;
    let allUpdatedPositionValuesArray: string[][] = [];

    for (let i = 0; i < arrayLength - 1; i++) {
      for (let j = i + 1; j < arrayLength; j++) {
        if (Number(newArray[j]) < Number(newArray[i])) {
          [newArray[j], newArray[i]] = [newArray[i], newArray[j]];
          allUpdatedPositionValuesArray.push([...newArray]);
        }
      }
    }

    this.render(allUpdatedPositionValuesArray);
  }

  doInsertionSort(currentItemsPositionValuesRef: string[]) {
    let newArray = [...currentItemsPositionValuesRef];
    let arrayLength = newArray.length;
    let allUpdatedPositionValuesArray: string[][] = [];

    for (let i = 1; i < arrayLength; i++) {
      let j = i;

      while (j > 0 && Number(newArray[j - 1]) > Number(newArray[j])) {
        [newArray[j - 1], newArray[j]] = [newArray[j], newArray[j - 1]];
        allUpdatedPositionValuesArray.push([...newArray]);
        j--;
      }
    }

    this.render(allUpdatedPositionValuesArray);
  }

  render(allUpdatedPositionValuesArray: string[][]) {
    this.disableAllButtons();

    let count = 0;
    let totalTimesToRender = allUpdatedPositionValuesArray.length;
    let intervalFunctionRef: any = null;

    const renderFunction = () => {
      if (count < totalTimesToRender) {
        this.updatePositions([...allUpdatedPositionValuesArray[count]]);

        intervalFunctionRef = setTimeout(() => {
          count++;
          renderFunction();
        }, 1000)
      } else {
        clearTimeout(intervalFunctionRef);
        this.enableAllButtons();
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
}
