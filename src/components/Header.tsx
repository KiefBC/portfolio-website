import React from 'react';

const Header: React.FC = () => {
    return (
        <section className="header-container max-w-7xl mx-auto p-8 lg:py-16 lg:px-20">
            {/* Left section with name, title, and brief intro */}
            <div className="header-left w-full lg:w-1/2 lg:pr-12">
                <h1 className="text-5xl font-bold mb-4 text-gray-800">Kiefer Hay</h1>
                <h2 className="text-3xl text-gray-600 mb-4">Fullstack Developer</h2>
                <p className="text-lg text-gray-500 mb-6">
                    I'm a passionate programmer who loves creating meaningful and innovative solutions.
                </p>
            </div>
        </section>
    );
};

export default Header;
