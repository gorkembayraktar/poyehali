import { numbers } from './src/data/vocabulary.js';

console.log('Numbers array length:', numbers.length);
console.log('Numbers content:', numbers);

const source = numbers.slice(10);
console.log('Slice(10) length:', source.length);
console.log('Slice(10) content:', source);
