import React, { useState, useEffect } from 'react';
import Section1 from './section1';
import Section2 from './section2';
import Section3 from './section3';
import Section4 from './section4';
type Props = {};

export default function Valentine({ }: Props) {

    return (
        <div>
            <Section1/>
            <Section2/>
            <Section3/>
            <Section4/>
        </div>
    );
}
