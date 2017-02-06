import React, { Component } from 'react'
import { connect } from 'react-redux'

/* SERVICES --- */
import * as FormUI from 'services/FormUI'
import * as Format from 'services/Format'

/* COMPONENTS --- */
import Form from "react-jsonschema-form"
import FieldTemplate from 'components/FieldTemplate'

let IntakeSchema = require('schemas/Intake')

/* FORMAT TO ACCOMODATE DIFFERENCES BETWEEN SERVER SIDE AND CLIENT SIDE SCHEMA --- */
IntakeSchema = Format.schema(IntakeSchema)

/* GROUP FORM ELEMENTS --- */
IntakeSchema = FormUI.GroupSchema(IntakeSchema)

console.log(IntakeSchema)

/* GENERATE UI SCHEMA --- */
const uiSchema = FormUI.Schema(IntakeSchema)

const widgets = FormUI.Widgets;
const formData = { title: "First task", done: true }

const schema = {
    type: "object",
    properties: IntakeSchema
}

console.log(uiSchema)

class IntakeAdd extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleError() {
        console.log("there is an error!")
        console.log(arguments)
    }

    handleSubmit(formData) {
        alert('form data logged in console')
        console.log(formData.formData)
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1> Intakes </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> Intakes</a></li>
                    </ol>
                </section>
                <section className="content">
                    <Form
                        FieldTemplate={FieldTemplate}
                        schema={schema}
                        uiSchema={uiSchema}
                        widgets={widgets}
                        onError={this.handleError}
                        onSubmit={this.handleSubmit} />
                </section>
            </div>
        );
    }
}

export default IntakeAdd