# WTWR (What to Wear?): Front End

This project is the front-end client for the WTWR (What to Wear?) application. It provides a responsive React interface for users to view the daily weather, receive clothing recommendations, and manage their virtual wardrobe. The client communicates with the WTWR backend API for authentication, user management, and clothing item operations.

## Functionality

- Fetches and displays daily weather data
- Recommends clothing based on the weather forecast
- User registration, login, and authentication
- CRUD operations for clothing items (add, view, delete, like/dislike)
- Profile management (edit user info and avatar)
- Responsive design for desktop and mobile devices
- Input validation and error handling

## Technologies & Techniques Used

- **React.js** for building the user interface
- **React Router** for client-side routing
- **Context API** for state management (user, weather, clothing items)
- **Fetch API** for HTTP requests to the backend
- **Joi** and **validator** for client-side validation
- **CSS** for styling and responsive layouts

## Project Structure

- `/src/components` — React components for UI and features
- `/src/utils` — Utility functions and API wrappers
- `/src/contexts` — React Contexts for global state
- `/src/assets` — Static assets (images, icons, etc.)

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
- [WTWR Backend Repository](../se_project_express/README.md)

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm start
   ```

3. **Configure the backend API URL** in `/src/utils/constants.js` if needed.

## Author

- [Chris Fairbanks](https://github.com/Chris2Fair88)

---

