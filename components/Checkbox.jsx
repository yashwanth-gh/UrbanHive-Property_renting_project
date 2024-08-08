import React from 'react'

const Checkbox = ({ id = '', name = '', value = '', labelName = 'label-name' }) => {
    return (
        <div className="uv-checkbox-wrapper checkbox-wrapper">
            <input type="checkbox" id={id}
                className="uv-checkbox mr-2" name={name} value={value} />
            <label htmlFor={id} className="uv-checkbox-label">
                <div className="uv-checkbox-icon">
                    <svg viewBox="0 0 24 24" className="uv-checkmark">
                        <path d="M4.1,12.7 9,17.6 20.3,6.3"
                            fill="none"></path>
                    </svg>
                </div>
                &nbsp;&nbsp;{labelName}
            </label>
        </div>
    )
}

export default Checkbox