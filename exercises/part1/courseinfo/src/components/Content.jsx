import { Part } from "./Part"
function Content({ parts }) {
  return (
    <>
      {parts.map((part) => (
        <p key={part.name}>
          <Part
            part={part.name}
            exercises={part.exercises} />
        </p>))}
    </>
  )
}

export { Content }