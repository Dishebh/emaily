import React from 'react'

export const SurveyField = ({ input, label }) => {
    return (
        <div>
            <label>{label}</label>
            <input { ...input } />
        </div>
    )
}
