import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '../../../../src/components/Layout';
import { useNavigate } from 'react-router-dom';

type Props = {}

export default function DeckSelection({ }: Props) {
    const navigate = useNavigate();
    const [deck, setDeck] = useState<any>('https://images.cordeliacruises.com/cordelia_v2/public/assets/deck-3-image.svg');
    // const [deckImg , setDeckImg] = useState('');
    const deckImage = (deckNo: any) => {

        if (deckNo === 3) {
            setDeck('https://images.cordeliacruises.com/cordelia_v2/public/assets/deck-3-image.svg')
        }
        else if (deckNo === 4) {
            setDeck('https://images.cordeliacruises.com/cordelia_v2/public/assets/deck-4-image.svg')
        }
        else if (deckNo === 5) {
            setDeck('https://images.cordeliacruises.com/cordelia_v2/public/assets/deck-5-image.svg')
        }
        else if (deckNo === 6) {
            setDeck('https://images.cordeliacruises.com/cordelia_v2/public/assets/deck-6-image.svg')
        }
        else if (deckNo === 7) {
            setDeck('https://images.cordeliacruises.com/cordelia_v2/public/assets/deck-7-image.svg')
        }
        else if (deckNo === 8) {
            setDeck('https://images.cordeliacruises.com/cordelia_v2/public/assets/deck-8-image.svg')
        }
        else if (deckNo === 9) {
            setDeck('https://images.cordeliacruises.com/cordelia_v2/public/assets/deck-9-image.svg')
        }
    }
    let deckArr = [1, 2, 4, 5, 6, 7, 8]
    return (
        <Layout>
            <div className='mb-28 lg:mt-28 mt-20 px-4 lg:px-40' >
                <div className="flex items-center cursor-pointer">
                    <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
                        alt="arrow"
                        onClick={() => navigate(-1)}
                        className={`self-center mt-1 justify-self-start mr-2 h-6 p-1 cursor-pointer`}
                    />
                    <p className="text-xl font-bold lg:text-xl ">
                        Choose a Deck
                    </p>
                </div>
                <div className='flex gap-3 items-start lg:py-4 px-2 py-2 mt-4 rounded-md lg:px-5 bg-brand-secondary/[0.1]' >
                    <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/note-icon.svg' alt='noteIcon' />
                    <p className='' > Please select a deck from below to see the available room options</p>
                </div>

                <div className='lg:mt-12 lg:px-20'>
                    <div className='w-full flex flex-wrap justify-center' >
                        <img className='lg:h-56 h-32' src={deck} alt='deckImage' />
                    </div>
                    <div className='lg:mt-12 mt-6' >
                        <div className="grid grid-cols-10 gap-4 bg-brand-primary text-white py-2 px-5 rounded-t-md">
                            <div className="lg:col-span-1 col-span-10">Deck No.</div>
                            <div className="lg:col-span-9 hidden ">Details</div>
                           
                        </div>
                        {deckArr?.map((data: any,index:number) => (
                            <div className="grid grid-cols-10 border-b items-center border-gray-400 gap-4 py-4 px-5 rounded-t-md hover:bg-brand-secondary/[0.1]" onClick={() => deckImage(index+3)} >
                                <div className="col-span-1 text-center font-bold ">{`0${index+3}`}</div>
                                <div className="col-span-7 text-gray-100  ml-3 ">Cordelia Business Centre</div>
                                <div className="col-span-2">
                                    <div className='hidden cursor-pointer lg:inline-block rounded-md border border-brand-primary text-brand-primary py-2 font-bold px-8 text-sm ml-2 hover:bg-brand-primary hover:text-white' >
                                     Select
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
               <div className='flex flex-wrap justify-center mt-6' >
               <div className='cursor-pointer hidden lg:inline-block rounded-sm bg-brand-primary text-white py-3 font-semibold px-10 text-sm' >Select Your Cabin</div>

               </div>
            </div >
        </Layout >
    );
}