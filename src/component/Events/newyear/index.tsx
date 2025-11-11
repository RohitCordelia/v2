import React, { useState, useEffect } from 'react';
import Section1 from './section1';
import Section2 from './section2';
import Section3 from './section3';
type Props = {};

export default function NewYear({ }: Props) {

    return (
        <div>
            <Section1/>
            <Section2/>
            <Section3/>
        </div>
    );
}
