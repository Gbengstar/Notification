const hanna = [
  { age: 10, sex: 'female', occupation: 'student' },
  { age: 13, sex: 'male', occupation: 'nurse' },
  { age: 40, sex: 'female', occupation: 'farmer' },
];

//hanna.forEach((element) => {});

const result = hanna.find((value, index) => {
  if (value.sex === 'male') {
    return true;
  }
});
console.log(result);

const bus = [{ age: 10 }];
