import React from 'react'

const Navbar: React.FC = () => {
    return (
        <nav className="navbar bg-base-100 w-full justify-between">
            <a className="btn btn-ghost text-xl">Kiefer's Portfolio</a>
            <div className="flex space-x-4">
                <a className="btn btn-ghost">Home</a>
                <a className="btn btn-ghost">Projects</a>
                <a className="btn btn-ghost">About</a>
                <a className="btn btn-ghost">Contact</a>
            </div>
        </nav>
    )
}

export default Navbar