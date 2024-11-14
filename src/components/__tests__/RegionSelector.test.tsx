import { render, screen } from '@testing-library/react'
import RegionSelector from '../RegionSelector'

import '@testing-library/jest-dom'

describe('RegionSelector Component', () => {
  it('should render globe icon and caret-down icon', () => {
    render(<RegionSelector />)

    const globeIcon = screen.getByAltText('globe')
    const caretDownIcon = screen.getByAltText('caret-down')

    expect(globeIcon).toBeInTheDocument()
    expect(caretDownIcon).toBeInTheDocument()
  })
})
