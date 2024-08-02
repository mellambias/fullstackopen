
import { Header } from './Header'
import { Content } from './Content'
import { Total } from './Total'
function Course({
  course,
}) {
  const { name, parts } = course
  return (
    <>
      <Header text={name} />
      <Content parts={parts} />
      <strong><Total parts={parts} /></strong>
    </>
  )
}

export { Course }