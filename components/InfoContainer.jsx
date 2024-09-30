import React from 'react'
import InfoBox from './InfoBox'
import renters from '@/public/images/renter.svg'
import owners from '@/public/images/owner.svg'

const InfoContainer = () => {
    return (
        <section className='my-8'>
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 mt-12 rounded-lg">
                    <InfoBox
                        boxHeading='For Renters'
                        children='Explore a variety of rental properties tailored to your own lifestyle and preferences.'
                        btnText='Browse Rentals'
                        backgroundColor='bg-primary-foreground'
                        btnColor='bg-foreground'
                        btnTextColor='text-primary-foreground'
                        btnLink='/properties'
                        extraBoxStyle=''
                        imgSrc={owners}
                        imgClass='' // Flip horizontally and resize
                        flexRowReverse={true}
                    />
                    <InfoBox
                        boxHeading='For Owners'
                        children='Easily list your property and connect with potential renters looking for new home.'
                        btnText='List Your Property'
                        extraBoxStyle=''
                        btnLink='/properties/add'
                        imgSrc={renters}
                        imgClass='' // Resize without flipping
                    />
                </div>
            </div>
        </section>
    )
}

export default InfoContainer



// import React from 'react'
// import InfoBox from './InfoBox'
// import renters from '@/public/images/blueish.svg'
// import owners from '@/public/images/greenish.svg'
// const InfoContainer = () => {
//     return (
//         <section className='my-8'>
//             <div className="container-xl lg:container m-auto">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
//                     <InfoBox
//                         boxHeading='For Renters'
//                         children='Explore a variety of rental properties tailored to your lifestyle and preferences.'
//                         btnText='Browse Rentals'
//                         backgroundColor='bg-secondary'
//                         btnColor='bg-foreground'
//                         btnTextColor='text-primary-foreground'
//                         btnLink='/properties'
//                         extraBoxStyle='py-8'
//                         imgSrc={renters}

//                     />
//                     <InfoBox
//                         boxHeading='For Property Owners'
//                         children='Easily list your property and connect with potential renters looking for new home.'
//                         btnText='List Your Property'
//                         extraBoxStyle='py-8'
//                         btnLink='/properties/add'
//                         imgSrc={owners}
//                     />

//                 </div>
//             </div>
//         </section>
//     )
// }

// export default InfoContainer