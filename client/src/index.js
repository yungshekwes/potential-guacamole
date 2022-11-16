/**
 * Imports from packages that will be used in the file
 */
import React from 'react'
import ReactDOM from 'react-dom'

/**
 * Importing AvoChat frontend so that it can be displayed in the website
 */
import App from './App'

/**
 * This is what actually renders all the logic and stylization that we have implemented in the AvoChat frontend app on the browser.
 */
ReactDOM.render(<App />, document.getElementById('root'))