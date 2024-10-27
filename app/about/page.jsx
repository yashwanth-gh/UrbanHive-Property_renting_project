import AboutHero from '@/components/AboutHero';
import AboutStory from '@/components/AboutStory';
import AboutTeam from '@/components/AboutTeam';
import React from 'react';


const AboutPage = () => {
    return (
        <section>
            <AboutHero/>
            <AboutTeam/>
            <AboutStory/>
        </section>
    )

};

export default AboutPage;
