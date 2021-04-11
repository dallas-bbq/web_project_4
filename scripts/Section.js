export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._data = items
        this._renderer = renderer
        this._containerSelector = containerSelector
    }

    renderItems() {
        this._data.forEach((item) => {
            this._renderer(item),
            console.log('renderer')
        })
    }

    addItem() {
        this._containerSelector.append(this._data),
        console.log('card')
    }
}