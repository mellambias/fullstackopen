import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import { expect } from "vitest"
import { describe } from "vitest"
import { beforeEach } from "vitest"

describe("<Blog/>", () => {
  let container
  const blog = {
    id: "123",
    title: "Test title",
    author: "Autor del blog",
    url: "http://localhost",
    likes: 0,
    user: {
      id: "1",
      name: "nombre usuario",
      username: "username"
    }
  }
  const onLikes = vi.fn()
  const onRemove = vi.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} handleLikes={onLikes} handleRemove={onRemove} />).container
  })

  test("El blog muestra el titulo y autor pero no la url o likes", () => {
    const title = container.querySelector(".cssTitle")
    const author = container.querySelector(".cssAuthor")
    const url = screen.queryByText(blog.url)
    const likes = screen.queryByText(blog.likes)

    expect(title).toHaveTextContent(blog.title)
    expect(author).toHaveTextContent(blog.author)
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })
  test("La URL y el numero de Likes se muestra al pulsar el boton view", async () => {
    const user = userEvent.setup()
    const button = await screen.findByText("view")
    await user.click(button)

    const url = container.querySelector(".cssUrl")
    const likes = container.querySelector(".cssLikes")
    expect(url).toHaveTextContent(blog.url)
    expect(likes).toHaveTextContent(blog.likes)
  })

  test("Si realiza click dos veces sobre like, se llama dos veces al controlador", async () => {
    const user = userEvent.setup()
    const button = await screen.findByText("view")
    await user.click(button)

    const buttonLike = await screen.findByText("like")
    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(onLikes.mock.calls).toHaveLength(2)
  })
})

