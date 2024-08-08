function Footer() {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: '16px',
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Ejemplo de estilo en linea</em>
    </div>
  )
}

export { Footer }