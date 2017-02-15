import PhoneNumber from 'components/PhoneNumber'
import IncrementInput from 'components/IncrementInput'
import AltBooleanInput from 'components/AltBooleanInput'
import AltDate from 'components/AltDate'

export const Widgets = {
  phoneNumber: PhoneNumber,
  increment: IncrementInput,
  boolean: AltBooleanInput,
  date: AltDate
}

export const Excluded = new Set([
    /* EXCLUDE INPUTS HERE --- */
])

export const Remove = new Set([
    'uuid'
])

export const Schema = (schema) => {
    let uiSchema = {}
    Object.keys(schema).forEach(function(key){
        if (Remove.has(key)) {
            delete schema[key]
            return
        }
        if (Excluded.has(key)) return
        if (schema[key].type == 'object') {
            if (schema[key].properties) uiSchema[key] = Schema(schema[key].properties)
        } else if (schema[key].type == 'number' || schema[key].type == 'integer') {
            uiSchema[key] = {
                "ui:widget": "increment"
            }
        } else if (schema[key].type == 'boolean') {
            uiSchema[key] = {
                "ui:widget": "boolean"
            }
        } else if (schema[key].format == 'alt-date') {
            uiSchema[key] = {
                "ui:widget": "date"
            }
        }
    })
    return uiSchema;
}



export const GroupSchema = (schema, excluded=new Set()) => {
    let groupSchema = {}
    Object.keys(schema).forEach(function(key){
        if (excluded.has(key)) {
            groupSchema[key] = schema[key]
        } else {
            let groupKey = key.replace(/_.*/, '')
            if (!groupSchema[groupKey]) {
                groupSchema[groupKey] = {
                    type: "object",
                    title: groupKey,
                    properties: {}
                }
            }
            groupSchema[groupKey]['properties'][key] = schema[key];
        }
    })
    return groupSchema
}

export const GroupData = (schema, excluded=new Set()) => {
    let groupData = {}
    Object.keys(schema).forEach(function(key){
        if (excluded.has(key)) {
            groupData[key] = schema[key]
        } else {
            let groupKey = key.replace(/_.*/, '')
            if (!groupData[groupKey]) groupData[groupKey] = {}
            groupData[groupKey][key] = schema[key];
        }
    })
    return groupData
}

export const defaults = (schema) => {
    var defaults = {}
    console.log( schema )
    Object.keys(schema).forEach(function(key){
        if (schema[key].required) {
            if (schema[key].type == 'integer') defaults[key] = 0
            else if (schema[key].type == 'boolean') defaults[key] = false
            else if (schema[key].type == 'string') defaults[key] = ''
        }
    })
    return defaults
}