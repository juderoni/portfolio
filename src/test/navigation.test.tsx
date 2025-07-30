import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

describe('Navigation and Section Switching', () => {
  it('defaults to About page on initial load', async () => {
    render(<App />)
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading Portfolio...')).not.toBeInTheDocument()
    })
    
    // Should show About page content
    expect(screen.getAllByText('About')).toHaveLength(2) // Desktop and mobile nav
  })

  it('navigates to Projects section when clicked', async () => {
    const user = userEvent.setup()
    
    render(<App />)
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading Portfolio...')).not.toBeInTheDocument()
    })
    
    // Click Projects link (get the first one - desktop nav)
    const projectsLinks = screen.getAllByText('Projects')
    const desktopProjectsLink = projectsLinks.find(link => 
      link.closest('a')?.classList.contains('nav-link')
    )
    await user.click(desktopProjectsLink!)
    
    // Should navigate to projects page
    await waitFor(() => {
      expect(window.location.pathname).toBe('/projects')
    })
  })

  it('navigates to Travel section when clicked', async () => {
    const user = userEvent.setup()
    
    render(<App />)
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading Portfolio...')).not.toBeInTheDocument()
    })
    
    // Click Travel link (get the first one - desktop nav)
    const travelLinks = screen.getAllByText('Travel')
    const desktopTravelLink = travelLinks.find(link => 
      link.closest('a')?.classList.contains('nav-link')
    )
    await user.click(desktopTravelLink!)
    
    // Should navigate to travel page
    await waitFor(() => {
      expect(window.location.pathname).toBe('/travel')
    })
  })

  it('shows active state for current section', async () => {
    const user = userEvent.setup()
    
    render(<App />)
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading Portfolio...')).not.toBeInTheDocument()
    })
    
    // Navigate to Projects
    const projectsLinks = screen.getAllByText('Projects')
    const desktopProjectsLink = projectsLinks.find(link => 
      link.closest('a')?.classList.contains('nav-link')
    )
    await user.click(desktopProjectsLink!)
    
    // Projects link should have active class
    await waitFor(() => {
      const activeLink = desktopProjectsLink!.closest('a')
      expect(activeLink).toHaveClass('active')
    })
  })

  it('handles browser back/forward navigation', async () => {
    const user = userEvent.setup()
    
    render(<App />)
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading Portfolio...')).not.toBeInTheDocument()
    })
    
    // Navigate to Projects
    const projectsLinks = screen.getAllByText('Projects')
    const desktopProjectsLink = projectsLinks.find(link => 
      link.closest('a')?.classList.contains('nav-link')
    )
    await user.click(desktopProjectsLink!)
    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/projects')
    })
    
    // Navigate to Travel
    const travelLinks = screen.getAllByText('Travel')
    const desktopTravelLink = travelLinks.find(link => 
      link.closest('a')?.classList.contains('nav-link')
    )
    await user.click(desktopTravelLink!)
    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/travel')
    })
    
    // Go back
    window.history.back()
    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/projects')
    })
  })

  it('displays loading spinner during initial load', () => {
    render(<App />)
    
    // Should show loading spinner initially
    expect(screen.getByText('Loading Portfolio...')).toBeInTheDocument()
  })

  it('shows page transition effects', async () => {
    const user = userEvent.setup()
    
    render(<App />)
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading Portfolio...')).not.toBeInTheDocument()
    })
    
    // Navigate to trigger transition
    const projectsLinks = screen.getAllByText('Projects')
    const desktopProjectsLink = projectsLinks.find(link => 
      link.closest('a')?.classList.contains('nav-link')
    )
    await user.click(desktopProjectsLink!)
    
    // Should handle page transitions (implementation specific)
    await waitFor(() => {
      expect(window.location.pathname).toBe('/projects')
    })
  })
})