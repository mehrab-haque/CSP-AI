import PriorityQueue from "priorityqueue";

class Node {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }
}

const comparator = (a, b) => {
    return b.priority-a.priority
}

const pq = new PriorityQueue({ comparator });

pq.push(new Node(4, 6));
pq.push(new Node(2, 3));
pq.push(new Node(5, 1));
pq.push(new Node(1, 2));

console.log(pq.length)
console.log(pq.top());
console.log(pq.length)
console.log(pq.pop());
console.log(pq.length)
console.log(pq.pop());
console.log(pq.length)
console.log(pq.pop());


pq.push(new Node(3, 4));
pq.push(new Node(6, 5));
