import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Tooglable from "./Togglable"
import { describe, beforeEach, expect } from "vitest"

describe("<Togglable />", () => {
  let container

  beforeEach(() => {
    container = render(
      <Tooglable buttonLabel="show...">
        <div className="testDiv">
          togglable content
        </div>
      </Tooglable>).container
  })

  test("renderiza sus hijos", async () => {
    await screen.findAllByText("togglable content")
  })

  test("al principio el primer hijo no se muestra", async () => {
    const div = container.querySelector(".togglableContent")
    expect(div).toHaveStyle('display:none')
  })

  test("una vez pulsado el boton, los hijos son mostrados", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("show...")
    await user.click(button)

    const div = container.querySelector(".togglableContent")
    expect(div).not.toHaveStyle('display:none')
  })

  test("El contenido puede ser cerrado", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("show...")
    await user.click(button)

    const closeButton = screen.getByText("cancel")
    await user.click(closeButton)

    const div = container.querySelector(".togglableContent")
    expect(div).toHaveStyle('display:none')
  })
})