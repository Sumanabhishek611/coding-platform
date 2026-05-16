# coding-platform
This project is a full-stack coding platform designed to help users practice programming, improve problem-solving skills, and prepare for technical interviews. The platform provides a seamless environment where users can explore coding challenges, write and execute code, and receive instant feedback.

It features a user-friendly interface with secure authentication, allowing users to register, log in, and track their progress. The platform supports multiple programming languages and includes an in-built code editor for real-time coding and execution.

Users can solve problems categorized by difficulty levels, view test case results, and analyze their performance. The system is designed to handle code execution efficiently while maintaining accuracy and speed.

Built using modern web technologies, this platform focuses on scalability, performance, and a smooth user experience. It aims to simulate real-world coding environments and enhance users' confidence in tackling technical challenges.

Optional (Add this if your stack is MERN)

This project is developed using the MERN stack (MongoDB, Express.js, React.js, Node.js), ensuring a robust backend, dynamic frontend, and efficient database management.
user
 {

    "emailId":"hi@gmail.com",
    "password":"787769Aa#"
 }
admin

{
  "firstName":"Abhishek",
  "emailId":"abhi@gmail.com",
  "password":"787769Aa#"
}

{
   "firstName":"Brijesh",
   "emailId":"brijesh@gmail.com",
   "password":"787769Bb#",
   "role":"admin"
}
{
   "emailId":"brijesh@gmail.com",
   "password":"787769Bb#"
}

{
  "title": "Sum of Two Numbers",
  "description": "Given two integers a and b, return their sum.",
  "difficulty": "easy",
  "tags": "array",
  "visibleTestCases": [
    {
      "input": "a = 2, b = 3",
      "output": "5",
      "explanation": "Because 2 + 3 = 5"
    }
  ],
  "hiddenTestCases": [
    {
      "input": "a = 10, b = 20",
      "output": "30"
    }
  ],
  "startCode": [
    {
      "language": "cpp",
      "initialCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint sum(int a, int b) {\n    // write your code here\n}"
    },
    {
      "language": "javascript",
      "initialCode": "function sum(a, b) {\n    // write your code here\n}"
    },
    {
      "language": "java",
      "initialCode": "class Main {\n    public static int sum(int a, int b) {\n        // write your code here\n        return 0;\n    }\n}"
    }
  ],
  "referenceSolution": [
    {
      "language": "cpp",
      "completeCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint sum(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int a = 2, b = 3;\n    cout << sum(a, b);\n    return 0;\n}"
    },
    {
      "language": "javascript",
      "completeCode": "function sum(a, b) {\n    return a + b;\n}\n\nlet a = 2, b = 3;\nconsole.log(sum(a, b));"
    },
    {
      "language": "java",
      "completeCode": "public class Main {\n    public static int sum(int a, int b) {\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        int a = 2, b = 3;\n        System.out.println(sum(a, b));\n    }\n}"
    }
  ]
 
}
