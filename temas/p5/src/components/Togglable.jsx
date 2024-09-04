import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

//https://react.dev/reference/react/forwardRef
//https://react.dev/reference/react/useImperativeHandle

/**
 * Para que el componente pueda recibir una referencia creada con _useRef_, tenemos que envolverlo
 * en un _forwardRef_, esta se encargará de llamar al componente pasandole las `props` y las `refs`
 * Para personalizar la respuesta, cuando se utilicen las `refs` fuera del componente, usamos _useImperativeHandle_
 */
const Tooglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => ({
    toggleVisibility
  }))

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button type="button" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
})

Tooglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
export default Tooglable