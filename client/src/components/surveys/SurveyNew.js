import React from 'react'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

export const SurveyNew = () => {
    let showFormReview = false;

    const renderContent = () => {
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
