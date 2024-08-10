import PropertyAddForm from '@/components/PropertyAddForm'
import React from 'react'

const PropertiesAddPage = () => {
    return (
        <section className='container'>
            <div className='m-auto max-w-5xl py-12'>
                <div className="px-6 py-8 mb-4 rounded-md  m-4 md:m-0">
                    <PropertyAddForm />
                </div>
            </div>
        </section>
    )
}

export default PropertiesAddPage