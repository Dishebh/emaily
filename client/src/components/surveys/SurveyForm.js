import React from 'react'
import  _ from 'lodash'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { SurveyField } from './SurveyField'
import { validateEmail } from '../../utils/validateEmail'
import formFields from './formFields'

const validate = (values) => {
    const errors = {}

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value!'
        }
    })

    errors.emails = validateEmail(values.emails || '')
    return errors
}

const SurveyForm = ({ onSurveySubmit }) => {
    const renderFields = () => {
        return _.map(formFields, ({ label, name }) => {
            return <Field
                    key={name}
                    component={SurveyField}
                    type='text'
                    label={label}
                    name={name}
                />
        })
    }

    return (
        <div>
            <form onSubmit={onSurveySubmit}>
                {renderFields()}
                <Link to='/surveys' className='red btn-flat white-text'>
                    Cancel
                </Link>
                <button type='submit' className='teal btn-flat right white-text'>
                    Next
                    <i className='material-icons right'>done</i>
                </button>
            </form>
        </div>
    )
}

export default reduxForm({
    validate, 
    form: 'surveyForm'
})(SurveyForm)
