# CarStats  
A fullstack website with an authentication system where you can add your cars and monitor the money you spend on them using REST APIs.  

This is my first fullstack project, with the frontend built in ReactJS and the backend in ASP.NET Core Web API using minimal APIs.  

## Features  
- **Authentication System**:  
  - Passwords are hashed and verified on the server.  
  - Each account can add up to 3 cars and assign an unlimited number of expenses to each car.  

- **Responsive Design**:  
  - Created using `@media` queries to ensure usability across different devices.  

- **Backend API**:  
  - Supports `GET`, `POST`, and `DELETE` requests.  
  - Includes 8 endpoints.  
  - Manages two separate databases:  
    - One for cars and expenses (a table for each).  
    - One for user accounts.  

- **Session Data Handling**:  
  - Data is saved using `sessionStorage` in React.  

- **Expense Tracking**:  
  - Displays the total amount spent for the selected car using a dynamic label.  

## How It Works  
1. Users register and log in securely with hashed passwords.  
2. After logging in, users can:  
   - Add up to 3 cars.  
   - Track expenses for each car without limitations.  
3. The backend processes and stores all data, ensuring seamless interaction between the frontend and backend via REST APIs.  

## Technologies Used  
- **Frontend**: ReactJS  
- **Backend**: ASP.NET Core Web API (Minimal APIs)  
- **Databases**: PostgreSQL
- **Responsive Design**: `@media` queries  

Feel free to explore the project and provide feedback! 🚗💻  

## License
This project is licensed under the [MIT License](LICENSE).

## Credits
- **Author**: Felix-Marian STOENOIU
- **Email**: Stoenoiu.Felix1@gmail.com
- **GitHub**: [My GitHub profile](https://github.com/FelixMarian)
