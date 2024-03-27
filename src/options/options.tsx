import {createRoot} from 'react-dom/client'
import React from 'react'
import '../assets/tailwind.css'


const test = (
    <div>
        <h1 className="text-5xl text-green-500">OPTIONS</h1>
    </div>
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(test)