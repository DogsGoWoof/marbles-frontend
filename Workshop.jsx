const letterList = ['a', 'b', 'c', 'def', 'az', 'cb', 'efgdf432423', 'zcfvdsfs', 'z', 'y' ];
const numberList = [1, 2, 3, 4, 645654365, 31, 523, 11, 23, 12, 10, ];

const sortList = (list) => list.sort((a, b) => a < b);

console.log('letters sorting');
const sortedLetters = sortList(letterList);
console.log(sortedLetters);
console.log('\nnumbers sorting');
const sortedNumbers = sortList(numberList);
console.log(sortedNumbers);

const Workshop = () => {

    return (
        <>
            <main>
                {String(sortedLetters)}
            </main>        
        </>
    )
};

export default Workshop;