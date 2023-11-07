const courses = [{
  id: 1,
  name: "Introduction to React Native",
  instructor: "John Doe",
  description:
    "Learn the basics of React Native development and build your first mobile app.",
  enrollmentStatus: "Open",
  tags: ["React Native"],
  thumbnail: "your.image.here",
  duration: "8 weeks", 
  schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
  location: "Online",
  prerequisites: ["Basic JavaScript knowledge", "Familiarity with React"],
  syllabus: [
    {
      week: 1,
      topic: "Introduction to React Native",
      content: "Overview of React Native, setting up your development environment.",
    },
    {
      week: 2,
      topic: "Building Your First App",
      content: "Creating a simple mobile app using React Native components.",
    },
    {
      week: 3,
      topic: "Working with Components",
      content: "Understanding and using React Native components effectively.",
    },
    {
      week: 4,
      topic: "Styling and Theming",
      content: "Customizing the look and feel of your mobile app.",
    },
    {
      week: 5,
      topic: "State Management",
      content: "Managing app state and user interactions with state management.",
    },
    {
      week: 6,
      topic: "Navigation and Routing",
      content: "Implementing navigation and routing within your app.",
    },
    {
      week: 7,
      topic: "Data Persistence",
      content: "Storing and retrieving data on the mobile device.",
    },
    {
      week: 8,
      topic: "Testing and Deployment",
      content: "Testing your app and deploying it to app stores.",
    },
  ],
  students: [
    {
      id: 101,
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    {
      id: 102,
      name: "Bob Smith",
      email: "bob@example.com",
    },
    {
      id: 103,
      name: "Charlie Brown",
      email: "charlie@example.com",
    },
    {
      id: 104,
      name: "David Lee",
      email: "david@example.com",
    },
    {
      id: 105,
      name: "Ella Davis",
      email: "ella@example.com",
    },
    {
      id: 106,
      name: "Frank Miller",
      email: "frank@example.com",
    },
  ],
},
{
  id: 2,
  name: "Advanced JavaScript Fundamentals",
  instructor: "Jane Smith",
  description: "Deepen your JavaScript knowledge and master advanced concepts.",
  enrollmentStatus: "Open",
  thumbnail: "your.image.here",
  duration: "10 weeks",
  tags: ["Javascript"],
  schedule: "Mondays and Wednesdays, 7:00 PM - 9:00 PM",
  location: "Online",
  prerequisites: ["Solid understanding of JavaScript", "Intermediate programming skills"],
  syllabus: [
    {
      week: 1,
      topic: "ES6 Features",
      content: "Exploring the latest ES6 features and syntax.",
    },
    {
      week: 2,
      topic: "Asynchronous Programming",
      content: "Understanding async/await and handling async operations.",
    },
    // Additional weeks and topics...
  ],
  students: [
    {
      id: 201,
      name: "Carol Wilson",
      email: "carol@example.com",
    },
    {
      id: 202,
      name: "David Turner",
      email: "david@example.com",
    },
    // Additional enrolled students...
  ],
},
];

export default courses;