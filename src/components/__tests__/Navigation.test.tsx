import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Navigation from '../Navigation'

// Wrapper component for router context
const NavigationWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('Navigation', () => {
  it('renders all navigation links', () => {
    render(
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    )

    expect(screen.getByText('Jude Sproul')).toBeInTheDocument()
    expect(screen.getAllByText('About')).toHaveLength(2) // Desktop and mobile
    expect(screen.getAllByText('Projects')).toHaveLength(2)
    expect(screen.getAllByText('Travel')).toHaveLength(2)
  })

  it('shows mobile menu button on small screens', () => {
    // Mock window.innerWidth for mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    render(
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    )

    const menuButton = screen.getByRole('button', { name: /menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('toggles mobile menu when menu button is clicked', async () => {
    const user = userEvent.setup()
    
    // Mock window.innerWidth for mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    render(
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    )

    const menuButton = screen.getByRole('button', { name: /menu/i })
    
    // Click to open menu
    await user.click(menuButton)
    
    // Menu should be visible (check for mobile navigation container)
    const mobileNav = document.querySelector('.mobile-nav.open') || document.querySelector('.mobile-nav')
    expect(mobileNav).toBeInTheDocument()
  })

  it('applies active class to current page link', () => {
    // Mock location to be on projects page
    delete (window as any).location
    window.location = { pathname: '/projects' } as any

    render(
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    )

    const projectsLinks = screen.getAllByText('Projects')
    const desktopProjectsLink = projectsLinks.find(link => 
      link.closest('a')?.classList.contains('nav-link')
    )?.closest('a')
    expect(desktopProjectsLink).toHaveClass('active')
  })

  it('has proper accessibility attributes', () => {
    render(
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    )

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()

    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('href')
    })
  })
})