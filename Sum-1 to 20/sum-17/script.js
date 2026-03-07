// Write a JavaScript program to calculate total marks and percentage of 5 subjects.
  
 let  gujrati = 80;
 let  hindi = 90;
 let  english = 85;
 let  math = 95;
 let  science = 88;
  
    let totalMarks = gujrati + hindi + english + math + science;
    let percentage = (totalMarks / 500) * 100;
  
    console.log(totalMarks);
    console.log(percentage.toFixed(2) + "%");