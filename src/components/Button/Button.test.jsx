import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
//   beforeEach(() => {
//     render(<Button className='bg-blue-600'>Click me</Button>)
//   })
  afterEach(cleanup)
  test('should render', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeDefined()
  })
  test('should have a type button', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button').type).toContain('button')
  })
  test('can have a other classes', () => {
    render(<Button className='bg-blue-600'>Click me</Button>)
    expect(screen.getByRole('button').classList).toContain('bg-blue-600')
  })
  test('can have children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button').textContent).toContain('Click me')
  })
  test('can have a type submit', () => {
    render(<Button type='submit'>Click me</Button>)
    expect(screen.getByRole('button').type).toContain('submit')
  })
  test('can be clicked', () => {
    const mockFn = () => {
      screen.getByRole('button').textContent = 'Clicked'
    }
    render(<Button onClick={mockFn}>Click me</Button>)
    screen.getByRole('button').click()
    expect(screen.getByRole('button').textContent).toContain('Clicked')
  })
})
