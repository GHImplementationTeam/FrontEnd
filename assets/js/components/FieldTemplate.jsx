import React, { Component } from 'react'

class FieldTemplate extends Component {
  constructor(props){
      super(props)
  }

  render() {
    const {id, classNames, label, help, required, description, errors, children, schema} = this.props
    if (schema.type == "object") {
        return (
            <div>
                {children}
            </div>
        )
    }
    return (
        <div className={classNames}>
            {description}
            <div className="field-input-wrapper">
                <label htmlFor={id}>{label}{required ? "*" : null}</label>
                {children}
            </div>
            <div className="field-errors">
                {errors}
                {help}
            </div>
        </div>
    );
  }
}

export default FieldTemplate