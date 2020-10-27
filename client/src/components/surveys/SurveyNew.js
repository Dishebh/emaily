import React, { useState, useEffect } from 'react'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

const SurveyNew = ({ showFormReview }) => {
    const renderContent = () => {
        console.log('ShowFormReview: ', showFormReview);

        if (showFormReview) {
            return <SurveyFormReview
                    onCancel={() => showFormReview = false} 
                />
        }

        return <SurveyForm
                onSurveySubmit={() => showFormReview = true}
            />
    }

    return (
        <div>
            {renderContent()}
        </div>
    )
}

export default SurveyNew
