import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CreateBlogForm from "./CreateBlogForm"

test("El formulario llama al controlador con los detalles correctos", async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<CreateBlogForm createBlog={createBlog} />)

  const title = container.querySelector("input[name='title']")
  const author = container.querySelector("input[name='author']")
  const url = container.querySelector("input[name='url']")
  await user.type(title, 'testing a form')
  await user.type(author, 'autor del blog')
  await user.type(url, 'url del blog')

  const createButton = screen.getByText("create")
  await user.click(createButton)

  expect(createBlog.mock.calls[0][0].title).toBe('testing a form')
  expect(createBlog.mock.calls[0][0].author).toBe('autor del blog')
  expect(createBlog.mock.calls[0][0].url).toBe('url del blog')
})