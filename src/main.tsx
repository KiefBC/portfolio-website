import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from "./components/Navbar.tsx";
import Header from "./components/Header.tsx";
import SocialButtons from "./components/SocialButtons.tsx";
import { SpeedInsights } from "@vercel/speed-insights/next"

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Navbar />
        <Header />
        <SocialButtons />
    </StrictMode >,
)
