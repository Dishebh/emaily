import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys } from '../../actions/index'

const SurveyList = ({ surveys, fetchSurveys }) => {
    useEffect(() => {
        fetchSurveys();
    }, [fetchSurveys])

    const renderSurveys = () => {
        return surveys.reverse().map(survey => {
            return <div className="card darken-1" key={survey._id}>
                <div className='card-content'>
                    <span className='card-title'>{survey.title}</span>
                    <p>{survey.body}</p>
                    <p className='right'>
                        Sent On: { new Date(survey.dateSent).toLocaleDateString() }
                    </p>
                </div>
                <div className='card-action'>
                    <span>Yes: {survey.yes}</span>
                    {' '}
                    <span>No: {survey.no}</span>
                </div>
            </div>
        })
    }

    return (
        <div>
            {renderSurveys()}
        </div>
    )
}

const mapStateToProps = state => ({
    surveys: state.surveys
})

export default connect(mapStateToProps, { fetchSurveys })(SurveyList)
