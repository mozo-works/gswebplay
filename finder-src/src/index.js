import "core-js/stable"
import "regenerator-runtime/runtime"
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import 'react-app-polyfill/ie11'

const $ = document.querySelector.bind(document)

ReactDOM.render(<App />, $('#root'))
