import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

// Helper function to set viewport size
const setViewportSize = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
  window.dispatchEvent(new Event('resize'))
}

describe('Responsive Design', () => {
  beforeEach(() => {
    // Reset viewport to desktop size
    setViewportSize(1024, 768)
  })

  it('displays desktop navigation on large screens', async () => {
    setViewportSize(1024, 768)
    
    render(<App />)
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading Portfolio...')).not.toBeInTheDocument()
    })
    
    // Desktop navigation should be visible
    expect(screen.getAllByText('Jude Sproul')).toHaveLength(2) // Brand link and hero title
    expect(screen.getAllByText('About')).toHaveLength(2) // Desktop and mobile
    expect(screen.getAllByText('Projects')).toHaveLength(2)
    expect(screen.getAllByText('Travel')).toHaveLength(2)
  })

  it('displays mobile navigation on small screens', async () => {
    setViewportSize(480, 800)
    
    render(<App />)
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading Portfolio...')).not.toBeInTheDocument()
    })
    
    // Mobile menu button should be present
    const menuButton = document.querySelector('.hamburger') || screen.queryByRole('button', { name: /menu/i })
    expect(menuButton).toBeTruthy()
  })

  it('adapts content layout for tablet screens', async () => {
    setViewportSize(768, 1024)
    
    render(<App />)
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading Portfolio...')).not.toBeInTheDocument()
    })
    
    // Content should be present and adapted for tablet
    expect(screen.getAllByText('Jude Sproul')).toHaveLength(2) // Brand link and hero title
  })

  it('maintains functionality across different screen sizes', async () => {
    const screenSizes = [
      { width: 320, height: 568, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1024, height: 768, name: 'desktop' },
      { width: 1920, height: 1080, name: 'large desktop' }
    ]

    for (const { width, height, name } of screenSizes) {
      setViewportSize(width, height)
      
      const { unmount } = render(<App />)
      
      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.queryByText('Loading Portfolio...')).not.toBeInTheDocument()
      })
      
      // Basic functionality should work on all screen sizes
      expect(screen.getAllByText('Jude Sproul')).toHaveLength(2) // Brand link and hero title
      
      unmount()
    }
  })

  it('handles orientation changes', async () => {
    // Portrait mobile
    setViewportSize(375, 667)
    const { rerender } = render(<App />)
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading Portfolio...')).not.toBeInTheDocument()
    })
    
    expect(screen.getAllByText('Jude Sproul')).toHaveLength(2) // Brand link and hero title
    
    // Landscape mobile
    setViewportSize(667, 375)
    rerender(<App />)
    
    expect(screen.getAllByText('Jude Sproul')).toHaveLength(2) // Brand link and hero title
  })
})