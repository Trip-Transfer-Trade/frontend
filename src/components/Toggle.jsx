import React from "react";
import "./Toggle.css"

const Toggle = ({ label, isChecked, onChange}) => {
    return (
        <div className="toggle-container">
            <span className="toggle-label">{label}</span>
            <label className="toggle-switch">
                <input type="checkbox" checked={isChecked} onChange={onChange} />
                <span className="slider"></span>
            </label>
        </div>
    )
}

export default Toggle