function Total({ parts }) {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0)
  return (
    <p>Total of {total} exercises</p>
  )
}
export { Total }