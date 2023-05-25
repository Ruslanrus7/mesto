// export default class Section {
//   constructor ({items, renderer}, containerSelector) {
//     this._renderedItems = items;
//     this.renderer = renderer;
//     this._container = document.querySelector(containerSelector);
//   }

//   addItem (element) {
//     this._container.prepend(element);
//   }

//   renderItems () {
//     console.log(this._renderedItems)
//     this._renderedItems.forEach(item => {
//       this.renderer(item);
//     })
//   }
// }

export default class Section {
  constructor ({renderer}, containerSelector) {
    //this._renderedItems =  Array.from(items);
   // this._renderedItems =  items;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem (element) {
    this._container.prepend(element);
  }

  renderItems (items) {
    items.forEach(item => {
      this.renderer(item);
    })
  }
}
