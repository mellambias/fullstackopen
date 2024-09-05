
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from "./note"
import { expect } from 'vitest'

test('renderiza el contenido', (t) => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText("Component testing is done with react-testing-library")
  expect(element).toBeDefined()
})
test('otra forma de comprobar el renderizado del contenido', (t) => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true
  }

  const { container } = render(<Note note={note} />)

  screen.debug() // muestra el HTML resultante del renderizado

  const div = container.querySelector(".note")
  screen.debug(div) // muestra el elemento
  expect(div).toHaveTextContent("Component testing is done with react-testing-library")
})

test('al pulsar el boton se llama al event handler una vez', async (t) => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true
  }

  const mockHandler = vi.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText("make not important")
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})