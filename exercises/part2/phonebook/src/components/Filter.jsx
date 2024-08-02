function Filter({ value, onChange }) {

  return (
    <div>
      filter show with <input
        type='text'
        value={value}
        onChange={onChange} />
    </div>
  )

}

export {
  Filter
}