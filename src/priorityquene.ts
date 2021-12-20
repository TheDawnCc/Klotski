class PriorityQueue<T>{
    private _heap: T[] = [];
    private _compare: (a: T, b: T) => number;

    constructor(compare: (a: T, b: T) => number) {
        this._compare = compare;
    }

    public enqueue(item: T) {
        this._heap.push(item);
        this.siftUp();
    }

    public dequeue(): T {
        if (this.isEmpty()) {
            throw new Error("PriorityQueue is empty");
        }
        const item = this._heap[0];
        this._heap[0] = this._heap[this._heap.length - 1];
        this._heap.pop();
        this.siftDown();
        return item;
    }

    public peek(): T {
        if (this.isEmpty()) {
            throw new Error("PriorityQueue is empty");
        }
        return this._heap[0];
    }

    public isEmpty(): boolean {
        return this._heap.length === 0;
    }

    private siftUp() {
        let index = this._heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this._compare(this._heap[index], this._heap[parentIndex]) >= 0) {
                break;
            }
            this._swap(index, parentIndex);
            index = parentIndex;
        }
    }

    private siftDown() {
        let index = 0;
        const length = this._heap.length;
        const element = this._heap[0];
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let swapIndex = -1;
            if (leftChildIndex < length) {
                const leftChild = this._heap[leftChildIndex];
                if (this._compare(leftChild, element) < 0) {
                    swapIndex = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                const rightChild = this._heap[rightChildIndex];
                if (this._compare(rightChild, swapIndex === -1 ? element : this._heap[leftChildIndex]) < 0) {
                    swapIndex = rightChildIndex;
                }
            }
            if (swapIndex === -1) {
                break;
            }
            this._swap(index, swapIndex);
            index = swapIndex;
        }
    }

    private _swap(i: number, j: number) {
        const temp = this._heap[i];
        this._heap[i] = this._heap[j];
        this._heap[j] = temp;
    }

    public size() : number {
        return this._heap.length;
    }

    public clear() {
        this._heap = [];
    }
}