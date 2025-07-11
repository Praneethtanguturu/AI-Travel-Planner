import React from 'react'
import { Button } from '../ui/button'
import Hero from './Hero'

const Header = () => {
  return (
  <div>
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <img src="/logo.svg" alt="Logo" className="max-h-10 w-auto object-contain" />

        {/* Sign In Button */}
        <Button className="ml-auto">Sign In</Button>
      </div>
    </header>
  </div>    
  )
}

export default Header
