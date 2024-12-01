import React from 'react'

const Button = ({ children, className, onClick }) => {
    return <button onClick={onClick} className={`bg-yellow-400 rounded-full ${className}`}>{children}</button>
}

export default Button
