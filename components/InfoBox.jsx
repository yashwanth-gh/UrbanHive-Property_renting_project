import React from 'react'
const InfoBox = ({
    backgroundColor = 'bg-input',
    textColor = 'text-foreground',
    btnColor = 'bg-primary',
    btnTextColor = 'text-primary-foreground',
    boxHeading = 'Heading',
    children = 'Lorem ipsum dolor sit, amet consectetur adipisicing tenetur.',
    btnText = 'Button',
    extraBoxStyle = '',
    btnLink
}) => {
    return (
        <div className={`${backgroundColor} ${textColor} ${extraBoxStyle} text-center p-6 rounded-lg shadow-lg border border-border`}>
            <h2 className={`text-2xl font-bold`}>{boxHeading}</h2>
            <p className="mt-3 mb-4 text-balance">
                {children}
            </p>
            <a
                href={btnLink}
                className={`inline-block ${btnColor} ${btnTextColor} rounded-lg w-full px-4 py-2 font-semibold hover:opacity-85 hover:shadow-md hover:shadow-gray-400`}
            >
                {btnText}
            </a>
        </div>
    )
}

export default InfoBox