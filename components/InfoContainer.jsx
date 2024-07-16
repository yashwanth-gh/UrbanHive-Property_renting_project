import React from 'react'
import InfoBox from './InfoBox'

const InfoContainer = () => {
    return (
        <section className='my-8'>
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <InfoBox
                        boxHeading='For Renters'
                        children='Explore a variety of rental properties tailored to your lifestyle and preferences.'
                        btnText='Browse Rentals'
                        backgroundColor='bg-secondary'
                        btnColor='bg-foreground'
                        btnTextColor='text-primary-foreground'
                        btnLink='/properties'
                        extraBoxStyle='py-8'

                    />
                    <InfoBox
                        boxHeading='For Property Owners'
                        children='Easily list your property and connect with potential renters looking for new home.'
                        btnText='List Your Property'
                        extraBoxStyle='py-8'
                        btnLink='/properties/add'
                    />

                </div>
            </div>
        </section>
    )
}

export default InfoContainer