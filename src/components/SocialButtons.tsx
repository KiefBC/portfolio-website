import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // React Icons for social icons

const Socials: React.FC = () => {
    return (
        <div className="socials fixed bottom-0 left-10 flex flex-col items-center space-y-6">
            <a
                href="https://github.com/your-github"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-500 transition duration-300"
            >
                <FaGithub size={24} />
            </a>
            <a
                href="https://linkedin.com/in/your-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-500 transition duration-300"
            >
                <FaLinkedin size={24} />
            </a>
            <a
                href="https://twitter.com/your-twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-500 transition duration-300"
            >
                <FaTwitter size={24} />
            </a>
            <div className="w-0.5 h-24 bg-gray-500 mt-4"></div> {/* Line below the icons */}
        </div>
    );
};

export default Socials;
