# DevTinder

 - Created a Vite + React app
 - Remove unnecessary files/code and create a Hello World app
 - install tailwind css
 - install daisy ui
 - add Navbar component to app.jsx (add button to toggle theme and functionality)
 - (lucide-react for icons)
 - create a NavBar.jsx separate component file

 - Install react-router-dom
 - Create BrowserRouter > Routes > Route=/ Body > RouteChildren
 - Create an Outlet in your Body component (for child routes)
 - Create a footer component (fixed bottom-0) (so everything lies in between the header and footer)  
 
 - Create a Login.jsx component 
 - install axios
 - CORS - install cors in backend ==> add middleware with the configurations: origin: ****, credentials: true
 - whenever you are making an API call so pass axios ==> {withCredentials: true}, (if we don't pass it, the BE will not send the token back in the other api-calls)

 -- Install react-redux + @reduxjs/toolkit  -> https://redux-toolkit.js.org/tutorials/quick-start

 - then configureStroe => Provider (in App.jsx) => createSlice (export reducer & actions) => add ***Slice to the store

 - Add Redux-devTools in chrome
 - Login and see if your data is coming properly in the store
 - NavBar should update as soon as user logs in
 - Refactor our code to add constants (BE-URL) file + create a componenents folder 

- You should not be access other routes without login
- If token is not present. redirect user to login page
- Logout Feature
- Get the feed and add the feed in the store
- build the user card on feed








---

# Component Design
 - Body (component)
    -NavBar
    Route=/  => Feed
    Route=/login => Login
    Route=/connections => Connections
    Route=/profile =? => Profile