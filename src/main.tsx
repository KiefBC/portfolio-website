import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from "./components/Navbar.tsx";
import Header from "./components/Header.tsx";
import Timeline from "./components/Timeline.tsx";
import SocialButtons from "./components/SocialButtons.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Navbar />
        <Header />
        <SocialButtons />
        <main className="container px-6 sm:px-8 w-1/2">
            <Timeline />
        </main>
    </StrictMode>,
)
