class Sorter {
  constructor(list) {
    this.list = list;
    this.isSorting = false;
    this.stop = false;
  }

  startSorting() {
        this.stop = false
        this.list.stop = false
  }

  stopSorting() {
    this.stop = true;
    this.list.stop = true;
  }

  async selectionSort() {
    return new Promise(async (resolve) => {
      for (let i = 0; i < list.list.length - 1; i++) {
        if (this.stop) { 
          this.stopSorting
          resolve()
        };
        let min = i;
        for (let j = i + 1; j < list.list.length; j++) {
          if (this.stop) { 
            this.stopSorting
            resolve()
          };
          if (list.list[j] < list.list[min]) {  
            min = j;
          }
        }
        await list.swap(i, min);
      }
      await list.sweepBack();
      await list.sweep();
      resolve();
    })

  }

  async bubbleSort() {
    if (this.stop) return this.stopSorting;
    console.log(1);
    for (let i = 0; i < list.list.length - 1; i++) {
      for (let j = 0; j < list.list.length - i - 1; j++) {
        if (this.stop) return this.stopSorting;
        if (list.list[j] > list.list[j + 1]) {
          list.highlight(j, "green");
          list.highlight(j + 1);
          await list.swap(j, j + 1);
        }
      }
    }
    await list.sweepBack();
    await list.sweep();
  }
}
