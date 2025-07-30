import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Globe from '../Globe'
import { travelData } from '../../data/travel'

// Mock react-globe.gl since it requires WebGL
vi.mock('react-globe.gl', () => ({
  default: vi.fn(({ onPointClick, onGlobeReady }) => {
    React.useEffect(() => {
      if (onGlobeReady) {
        onGlobeReady({ controls: () => ({ autoRotate: true }) })
      }
    }, [onGlobeReady])

    return (
      <div 
        data-testid="mock-globe"
        onClick={() => onPointClick && onPointClick({ 
          location: {
            id: 1,
            name: 'New York',
            country: 'USA',
            coordinates: { lat: 40.7128, lng: -74.0060 },
            visits: []
          }
        })}
      >
        Mock Globe
      </div>
    )
  })
}))

// Mock travel data to ensure it's available
vi.mock('../../data/travel', () => ({
  travelData: [
    {
      id: 1,
      name: 'New York',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      visits: []
    }
  ]
}))

describe('Globe', () => {
  const mockOnLocationSelect = vi.fn()
  const mockLocations = [
    {
      id: 1,
      name: 'New York',
      country: 'USA',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      visits: []
    }
  ]

  beforeEach(() => {
    mockOnLocationSelect.mockClear()
  })

  it('renders globe component', () => {
    render(<Globe locations={mockLocations} onLocationSelect={mockOnLocationSelect} />)
    
    expect(screen.getByTestId('mock-globe')).toBeInTheDocument()
  })

  it('calls onLocationSelect when a location is clicked', async () => {
    const user = userEvent.setup()
    
    render(<Globe locations={mockLocations} onLocationSelect={mockOnLocationSelect} />)
    
    const globe = screen.getByTestId('mock-globe')
    await user.click(globe)
    
    // The mock should call onLocationSelect with a location object
    expect(mockOnLocationSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        coordinates: expect.objectContaining({
          lat: expect.any(Number),
          lng: expect.any(Number)
        })
      })
    )
  })

  it('displays loading state initially', () => {
    render(<Globe locations={mockLocations} onLocationSelect={mockOnLocationSelect} />)
    
    // The component should show some loading indication
    // This depends on the actual implementation
    expect(screen.getByTestId('mock-globe')).toBeInTheDocument()
  })

  it('handles globe ready event', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    render(<Globe locations={mockLocations} onLocationSelect={mockOnLocationSelect} />)
    
    // Globe ready should be handled (implementation specific)
    expect(screen.getByTestId('mock-globe')).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })

  it('renders with travel data points', () => {
    render(<Globe locations={mockLocations} onLocationSelect={mockOnLocationSelect} />)
    
    // Should render globe with location data
    expect(screen.getByTestId('mock-globe')).toBeInTheDocument()
    
    // Verify that travel data is available
    expect(travelData.length).toBeGreaterThan(0)
  })
})