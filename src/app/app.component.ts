import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  title = 'algorithms-visualized';
  animationDuration: number = 1000;

  // initial positions never changes
  initialItemsPositionValuesRef: string[] = ["3", "10", "7", "4", "8", "1", "5", "9", "2", "6"];
  currentItemsPositionValuesRef: string[] = [...this.initialItemsPositionValuesRef];

  // elements position ref for animation state
  gridItemOneState: string = "";
  gridItemTwoState: string = "";
  gridItemThreeState: string = "";
  gridItemFourState: string = "";
  gridItemFiveState: string = "";
  gridItemSixState: string = "";
  gridItemSevenState: string = "";
  gridItemEightState: string = "";
  gridItemNineState: string = "";
  gridItemTenState: string = "";

  updatePositions(newItemsPositionValuesRef: string[]) {
    this.gridItemOneState = newItemsPositionValuesRef[0];
    this.gridItemTwoState = newItemsPositionValuesRef[1];
    this.gridItemThreeState = newItemsPositionValuesRef[2];
    this.gridItemFourState = newItemsPositionValuesRef[3];
    this.gridItemFiveState = newItemsPositionValuesRef[4];
    this.gridItemSixState = newItemsPositionValuesRef[5];
    this.gridItemSevenState = newItemsPositionValuesRef[6];
    this.gridItemEightState = newItemsPositionValuesRef[7];
    this.gridItemNineState = newItemsPositionValuesRef[8];
    this.gridItemTenState = newItemsPositionValuesRef[9];

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
          allUpdatedPositionValuesArray.push([...newArray]);
        }
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
      }
    }

    renderFunction();
  }
}
