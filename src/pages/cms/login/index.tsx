import React, { ReactNode, useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { useLoginMutation } from '../../../services/cms/cms';
import { useDispatch, useSelector } from 'react-redux'
import { saveToken } from '../../../services/cms/cmsSlice';
import { useNavigate } from 'react-router-dom';

type Props = {}

export default function Alcohal({ }: Props) {
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    let navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const Auth = useSelector((state: any) => state?.CMSAuth?.token);

    useEffect(() => {
        if (Auth) {
            navigate('/cms/homepage')
        }
    }, [])
    const submit = () => {
        if (email && password) {
            setLoginError('')
            const _payload = {
                email: email,
                password: password
            }
            login(_payload)
                .unwrap()
                .then((res: any) => {
                    setLoading(false);
                    dispatch(saveToken(res.token));
                    navigate('/cms/homepage')
                })
                .catch((res: any) => {
                    console.log('Error: ', res);
                    setLoading(false);
                    setLoginError(res.data.message)
                });
        } else {
            setLoginError('Please enter login email and password')
        }
    }
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{
            backgroundImage: 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/photo02.webp)'
        }}>
            <div className="w-[450px] rounded-xl bg-white/10 border border-white shadow-allSide px-16 py-16 backdrop-blur-md max-sm:px-8">
                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <p className="mb-2 text-5xl font-bold font-outfit">Login</p>
                    </div>
                    <div className="mb-4 text-lg">
                        <input
                            className="rounded-3xl w-full border-none px-6 py-3 mt-2 text-white placeholder-gray-400/70 shadow-lg outline-none focus:outline-none focus:border-white focus:ring-0 bg-white/0 border border-white"
                            style={{
                                borderStyle: 'solid'
                            }}
                            type="text"
                            name="name"
                            placeholder="id@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4 text-lg">
                        <input
                            className="rounded-3xl w-full border-none px-6 py-3 mt-2 text-white placeholder-gray-400/70 shadow-lg outline-none focus:outline-none focus:border-white focus:ring-0 bg-white/0 border border-white"
                            style={{
                                borderStyle: 'solid'
                            }}
                            type="Password"
                            name="name"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-8 flex justify-center text-lg text-black">
                        <button onClick={() => submit()} type="submit" className="w-full rounded-3xl bg-white px-10 py-3 text-black shadow-xl font-semibold backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
                    </div>
                    <div className='mt-3'>
                        {loginError ? <p className='text-danger font-semibold'>{loginError}</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}