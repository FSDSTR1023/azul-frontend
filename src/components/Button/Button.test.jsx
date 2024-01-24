import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  beforeEach(() => {
    render(<Button className='bg-blue-600'>Click me</Button>)
  })
  afterEach(cleanup)
  test('should render', () => {
    expect(screen.getByRole('button')).toBeDefined()
  })
  test('should have a type button', () => {
    expect(screen.getByRole('button').type).toContain('button')
  })
  test('can have a other classes', () => {
    expect(screen.getByRole('button').classList).toContain('bg-blue-600')
  })
  test('can have children', () => {
    expect(screen.getByRole('button').textContent).toContain('Click me')
  })
  test('can have a type submit', () => {
    render(<Button type='submit'>Submit</Button>)
    expect(screen.getByText('Submit').type).toContain('submit')
  })
  test('can be clicked', () => {
    const mockFn = vi.fn()
    render(<Button onClick={mockFn}>Clickable</Button>)
    fireEvent.click(screen.getByText('Clickable'))
    expect(mockFn).toHaveBeenCalled()
  })
})
