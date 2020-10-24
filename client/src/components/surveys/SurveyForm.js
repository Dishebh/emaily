import React from 'react'
import  _ from 'lodash'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { SurveyField } from './SurveyField'

const FIELDS = [
    { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipeient List', name: 'emails' },
]

const SurveyForm = () => {
    const renderFields = () => {
        return _.map(FIELDS, ({ label, name }) => {
            return <Field
                    key={name}
                    component={SurveyField}
                    type='text'
                    label={label}
                    name={name}
                />
        })
    }

    const handleSubmit = (values) => {
        console.log('values: ', values);
    }

    return (
        <div>
            <form onSubmit={values => handleSubmit(values)}>
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

export default reduxForm({ form: 'surveyForm' })(SurveyForm)
