export default class PageResult<T>{
    items: Array<T>;
    totalCount: number;

    constructor() {
        this.totalCount = 0,
            this.items = []
    }
}