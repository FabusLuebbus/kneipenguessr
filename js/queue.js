export class Queue {
  constructor() {
    this.elements = {}; // Stores the elements of the queue
    this.head = 0; // Points to the first element in the queue
    this.tail = 0; // Points to the next position for a new element
  }

  enqueue(element) {
    // Adds a new element to the end of the queue
    this.elements[this.tail] = element;
    this.tail++;
  }

  dequeue() {
    // Removes and returns the first element from the queue
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }

  peek() {
    // Returns the first element without removing it
    return this.elements[this.head];
  }

  get length() {
    // Returns the number of elements in the queue
    return this.tail - this.head;
  }

  get isEmpty() {
    // Checks if the queue is empty
    return this.length === 0;
  }
}
