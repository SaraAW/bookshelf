// 🐨 you'll need to import react and createRoot from react-dom up here
import React from "react";
import { createRoot } from "react-dom/client";

// 🐨 you'll also need to import the Logo component from './components/logo'
import { Logo } from "components/logo";
// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked

const App = () => {
  return (
    <div>
        <Logo/>
        <h1>Bookshelf</h1>
        <button onClick={() => alert('Login button was clicked')}>Login</button>
        <button onClick={() => alert('Register button was clicked')}>Register</button>
    </div>

  )
}

export default App

// 🐨 use createRoot to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')


const root = createRoot(
    document.getElementById('root')
  );
  root.render(<App/>);