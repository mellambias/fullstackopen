function Header({ text, ...props }) {
  return (
    <h2 {...props}>{text}</h2>
  )
}

export { Header }