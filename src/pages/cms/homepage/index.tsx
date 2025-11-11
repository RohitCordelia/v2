import React, { ReactNode, useEffect, useState } from 'react'
import Layout from '../component/Layout'
import Modal from '../../../components/UI/ModalCenter';
import { Input, Select as SelectField } from '../../../components/UI/Forms/Inputs';
import { useForm } from 'react-hook-form';
import { SelectAnyValue, AnyValidString } from '../../../utils/validations/formValidations';
import { useHomepageBannerUpdateMutation, useUploadBannerMutation, useGetBannerMutation } from '../../../services/cms/cms';
import '../index.css'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../services/cms/cmsSlice';
type Props = {}
export type AddBannerForm = {
    type: string;
};

export default function Alcohal({ }: Props) {
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const [homepageBannerUpdate] = useHomepageBannerUpdateMutation();
    const [uploadBanner] = useUploadBannerMutation();

    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [bannerObject, setBannerObject] = useState<any>({});
    const [addBannerModal, setAddBannerModal] = useState(false);
    const [bannerType, setBannerType] = useState('');
    const [getBanner, { isLoading: loadingQuotationData }] = useGetBannerMutation()

    useEffect(() => {
        getBannerList()
    }, [])

    const getBannerList = () => {
        setLoading(true)
        getBanner()
            .unwrap()
            .then((res: any) => {
                setLoading(false)
                setBannerObject(res.data.banner)
            })
            .catch((res: any) => {
                setLoading(false)
                console.log('Error: ', res);
                if (res.status == 401) {
                    dispatch(logout());
                    navigate('/cms/login')
                }
            });

    }

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        clearErrors,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            desktopLink: '',
            mobileLink: '',
            desktopthumbnailLink: '',
            mobilethumbnailLink: '',
            redirection: '',
            altTag: '',
            type: '',
            position: '',
        }
    });

    const onSubmit = (data: any) => {
        setUpdateLoading(true)
        let newbannerObject = JSON.parse(JSON.stringify(bannerObject));
        let desktopData = {
            "url": data.desktopLink,
            "link": data.redirection,
            "type": data.type,
            "altTag": data.altTag,
            "thumbnail": data.desktopthumbnailLink,
        }
        let mobileData = {
            "url": data.mobileLink,
            "link": data.redirection,
            "type": data.type,
            "altTag": data.altTag,
            "thumbnail": data.mobilethumbnailLink,
        }
        newbannerObject.mobileImages.splice((data.position - 1), 0, mobileData);
        newbannerObject.images.splice((data.position - 1), 0, desktopData);

        console.log('roh newbarrner', newbannerObject);

        const _payload = {
            banner: newbannerObject,
            trigger_deployment: true
        }

        homepageBannerUpdate(_payload)
            .unwrap()
            .then((res: any) => {
                getBannerList()
                setUpdateLoading(false)
                setAddBannerModal(false)
                console.log('roh', res);
                reset();

            })
            .catch((res: any) => {
                setUpdateLoading(false)
                console.log('Error: ', res);
                if (res.status == 401) {
                    navigate('/cms/login')
                }
            });
    }

    const onUploadFile = async (state: any, file: any) => {
        setUploadLoading(true)
        const formData = new FormData();
        formData.append('file', file[0]);

        await uploadBanner(formData)
            .then((res: any) => {
                if (res.data.url) {
                    setValue(state, res.data.url)
                }
                setUploadLoading(false)
            })
            .catch((res: any) => {
                setUploadLoading(false)
                console.log('Error: ', res);
                if (res.status == 401) {
                    navigate('/cms/login')
                }
            });
    }

    const onDeleteBanner = (i: any) => {
        setLoading(true)
        const updatedImages = [...bannerObject.images];
        updatedImages.splice(i, 1);
        const updatedMobileImages = [...bannerObject.mobileImages];
        updatedMobileImages.splice(i, 1);
        let newBanner = { ...bannerObject, images: updatedImages, mobileImages: updatedMobileImages }

        const _payload = {
            banner: newBanner,
            trigger_deployment: true
        }

        homepageBannerUpdate(_payload)
            .unwrap()
            .then((res: any) => {
                getBannerList()
                setLoading(false)
                setAddBannerModal(false)
                console.log('roh', res);
                reset();

            })
            .catch((res: any) => {
                setLoading(false)
                console.log('Error: ', res);
                if (res.status == 401) {
                    navigate('/cms/login')
                }
            });
    }



    return (
        <Layout>
            {loading ?
                <div className='h-screen w-full flex justify-center items-center overflow-hidden absolute top-0 bottom-0 left-0 bg-black/80 z-50'>
                    <img
                        className='w-32 lg:w-44'
                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
                        alt=""
                    />
                </div>
                : null
            }
            <div className='flex justify-between'>
                <p className='text-2xl font-semibold'>Banner</p>
                <div>
                    <p className='text-brand-primary font-bold cursor-pointer' onClick={() => setAddBannerModal(true)}>Add New</p>
                </div>
            </div>
            <div className='grid grid-cols-10 gap-5 mt-5'>
                <div className='col-span-5'>
                    <table className='w-full text-left'>
                        <tr>
                            <th colSpan={5} className='text-center border px-2 py-2'>Desktop</th>
                        </tr>
                        <tr>
                            <th className='border px-2 py-1.5'>#</th>
                            <th className='border px-2 py-1.5'>Link</th>
                            <th className='border px-2 py-1.5'>Type</th>
                            <th className='border px-2 py-1.5'>Redirection</th>
                            <th className='border px-2 py-1.5'>Alt Tag</th>
                        </tr>
                        {bannerObject?.images?.map((val: any, i: number) => {
                            return (
                                <tr className=''>
                                    <td className='border px-2 py-1.5 text-sm'>{i + 1}</td>
                                    <td className='border px-2 py-1.5 text-sm font-semibold text-brand-primary'><a href={val.url} target='_blank'>Link</a></td>
                                    <td className='border px-2 py-1.5 text-sm'>{val.type}</td>
                                    <td className='border px-2 py-1.5 text-sm'>{val.link}</td>
                                    <td className='border px-2 py-1.5 text-sm'>{val.altTag}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                <div className='col-span-5'>
                    <table className='w-full text-left'>
                        <tr>
                            <th colSpan={6} className='text-center border px-2 py-2'>Mobile</th>
                        </tr>
                        <tr>
                            <th className='border px-2 py-1.5'>#</th>
                            <th className='border px-2 py-1.5'>Link</th>
                            <th className='border px-2 py-1.5'>Type</th>
                            <th className='border px-2 py-1.5'>Redirection</th>
                            <th className='border px-2 py-1.5'>Alt Tag</th>
                            <th className='border px-2 py-1.5'>Delete</th>
                        </tr>
                        {bannerObject?.mobileImages?.map((val: any, i: number) => {
                            return (
                                <tr className=''>
                                    <td className='border px-2 py-1.5 text-sm'>{i + 1}</td>
                                    <td className='border px-2 py-1.5 text-sm font-semibold text-brand-primary'><a href={val.url} target='_blank'>Link</a></td>
                                    <td className='border px-2 py-1.5 text-sm'>{val.type}</td>
                                    <td className='border px-2 py-1.5 text-sm'>{val.link}</td>
                                    <td className='border px-2 py-1.5 text-sm'>{val.altTag}</td>
                                    <td className='border px-2 text-sm'><img onClick={() => onDeleteBanner(i)} className='h-5 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PAN-invaild.svg" alt="" /></td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>

            <Modal show={addBannerModal} align={'center'} className="w-full lg:w-2/3 relative " onClose={() => setAddBannerModal(false)}>
                <div className=' w-full h-full bg-white p-3 pr-[7px] rounded-lg min-h-[300px]'>
                    <div
                        className='absolute right-0 lg:-right-10 -top-20 lg:-top-10 cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full'
                        onClick={() => setAddBannerModal(false)}
                    >
                        <p className='text-sm lg:text-2xl'> X </p>
                    </div>
                    <div>
                        <form className='' onSubmit={handleSubmit(onSubmit)}>
                            <div className='w-1/2'>
                                <label>Select Banner Type</label>
                                <SelectField
                                    name={`type`}
                                    options={[
                                        { code: 'image', name: 'Image' },
                                        { code: 'video', name: 'Video' }
                                    ]}
                                    register={register}
                                    onChange={(e: any) => setBannerType(e)}
                                    validation={SelectAnyValue}
                                    selectClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2 placeholder:text-gray-100 w-full"
                                    className='!mb-4'
                                    placeholder="Select Banner Type"
                                    error={errors && errors?.type}
                                    errorText={errors && errors.type?.message}
                                />
                            </div>
                            {bannerType == 'image' ? (
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className="text-sm font-semibold">Desktop Image Link:</label>
                                        <div className='flex items-center justify-between inputUpload'>
                                            <Input
                                                type="text"
                                                register={register}
                                                validation={AnyValidString}
                                                onChange={(e: any) => setValue('desktopLink', e.target.value)}
                                                name="desktopLink"
                                                inputClassName="border-0 shadow-allSide rounded-md text-sm lg:text-base lg:text-base placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                                                placeholder="Desktop Image S3 Link"
                                                className='mb-0 w-full'
                                            />
                                            <div className="bg-grey-lighter">
                                                <label className="bg-brand-primary w-32 flex flex-row items-center justify-center cursor-pointer text-white px-[10px] py-[16px] rounded-r">
                                                    <span className="text-sm">{uploadLoading ? 'Loading...' : 'Select a file'}</span>
                                                    <input disabled={uploadLoading} onChange={(e) => onUploadFile('desktopLink', e.target.files)} type='file' className="hidden" />
                                                </label>
                                            </div>
                                        </div>
                                        {errors && errors.desktopLink && <p className="text-xs text-danger mt-1">Select mobile banner</p>}
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold">Mobile Image Link:</label>
                                        <div className='flex items-center justify-between inputUpload'>
                                            <Input
                                                type="text"
                                                register={register}
                                                validation={AnyValidString}
                                                onChange={(e: any) => setValue('mobileLink', e.target.value)}
                                                name="mobileLink"
                                                inputClassName="border-0 shadow-allSide rounded-md text-sm lg:text-base lg:text-base placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                                                placeholder="Mobile Image S3 Link"
                                                className='mb-0 w-full'
                                            />
                                            <div className="bg-grey-lighter">
                                                <label className="bg-brand-primary w-32 flex flex-row items-center justify-center cursor-pointer text-white px-[10px] py-[16px] rounded-r">
                                                    <span className="text-sm">{uploadLoading ? 'Loading...' : 'Select a file'}</span>
                                                    <input disabled={uploadLoading} onChange={(e) => onUploadFile('mobileLink', e.target.files)} type='file' className="hidden" />
                                                </label>
                                            </div>
                                        </div>
                                        {errors && errors.mobileLink && <p className="text-xs text-danger mt-1">Select mobile banner</p>}
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold">Position:</label>
                                        <Input
                                            type="number"
                                            register={register}
                                            validation={AnyValidString}
                                            onChange={(e: any) => setValue('position', e.target.value)}
                                            name="position"
                                            inputClassName="border border-gray-300/80 shadow-allSide rounded-md text-sm lg:text-base py-3.5 lg:py-4 lg:text-base px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                                            placeholder="Image Position"
                                            className='mb-0'
                                            error={
                                                errors &&
                                                errors?.position
                                            }
                                            errorText={errors && errors.position?.message}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold">Redirection:</label>
                                        <Input
                                            type="text"
                                            register={register}
                                            validation={AnyValidString}
                                            onChange={(e: any) => setValue('redirection', e.target.value)}
                                            name="redirection"
                                            inputClassName="border border-gray-300/80 shadow-allSide rounded-md text-sm lg:text-base py-3.5 lg:py-4 lg:text-base px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                                            placeholder="Image Redirection"
                                            className='mb-0'
                                            error={
                                                errors &&
                                                errors?.redirection
                                            }
                                            errorText={errors && errors.redirection?.message}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold">AltTag:</label>
                                        <Input
                                            type="text"
                                            register={register}
                                            validation={AnyValidString}
                                            onChange={(e: any) => setValue('altTag', e.target.value)}
                                            name="altTag"
                                            inputClassName="border border-gray-300/80 shadow-allSide rounded-md text-sm lg:text-base py-3.5 lg:py-4 lg:text-base px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                                            placeholder="Image AltTag"
                                            className='mb-0'
                                            error={
                                                errors &&
                                                errors?.altTag
                                            }
                                            errorText={errors && errors.altTag?.message}
                                        />
                                    </div>
                                </div>
                            ) : bannerType == 'video' ? (
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className="text-sm font-semibold">Desktop Video Link:</label>
                                        <Input
                                            type="text"
                                            register={register}
                                            validation={AnyValidString}
                                            onChange={(e: any) => setValue('desktopLink', e.target.value)}
                                            name="desktopLink"
                                            inputClassName="border border-gray-300/80 shadow-allSide rounded-md text-sm lg:text-base py-3.5 lg:py-4 lg:text-base px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                                            placeholder="Desktop Video Link"
                                            className='mb-0'
                                            error={
                                                errors &&
                                                errors?.desktopLink
                                            }
                                            errorText={errors && errors.desktopLink?.message}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold">Mobile Video Link:</label>
                                        <Input
                                            type="text"
                                            register={register}
                                            validation={AnyValidString}
                                            onChange={(e: any) => setValue('mobileLink', e.target.value)}
                                            name="mobileLink"
                                            inputClassName="border border-gray-300/80 shadow-allSide rounded-md text-sm lg:text-base py-3.5 lg:py-4 lg:text-base px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                                            placeholder="Mobile Video Link"
                                            className='mb-0'
                                            error={
                                                errors &&
                                                errors?.mobileLink
                                            }
                                            errorText={errors && errors.mobileLink?.message}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold">Desktop Video Thumbnail Link:</label>
                                        <div className='flex items-center justify-between inputUpload'>
                                            <Input
                                                type="text"
                                                register={register}
                                                validation={AnyValidString}
                                                onChange={(e: any) => setValue('desktopthumbnailLink', e.target.value)}
                                                name="desktopthumbnailLink"
                                                inputClassName="border-0 shadow-allSide rounded-md text-sm lg:text-base lg:text-base placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                                                placeholder="Desktop Video Thumbnail S3 Link"
                                                className='mb-0 w-full'
                                            />
                                            <div className="bg-grey-lighter">
                                                <label className="bg-brand-primary w-32 flex flex-row items-center justify-center cursor-pointer text-white px-[10px] py-[16px] rounded-r">
                                                    <span className="text-sm">{uploadLoading ? 'Loading...' : 'Select a file'}</span>
                                                    <input disabled={uploadLoading} onChange={(e) => onUploadFile('desktopthumbnailLink', e.target.files)} type='file' className="hidden" />
                                                </label>
                                            </div>
                                        </div>
                                        {errors && errors.desktopthumbnailLink && <p className="text-xs text-danger mt-1">Select mobile banner</p>}
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold">Mobile Video Thumbnail Link:</label>
                                        <div className='flex items-center justify-between inputUpload'>
                                            <Input
                                                type="text"
                                                register={register}
                                                validation={AnyValidString}
                                                onChange={(e: any) => setValue('mobilethumbnailLink', e.target.value)}
                                                name="mobilethumbnailLink"
                                                inputClassName="border-0 shadow-allSide rounded-md text-sm lg:text-base lg:text-base placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                                                placeholder="Mobile Video Thumbnail S3 Link"
                                                className='mb-0 w-full'
                                            />
                                            <div className="bg-grey-lighter">
                                                <label className="bg-brand-primary w-32 flex flex-row items-center justify-center cursor-pointer text-white px-[10px] py-[16px] rounded-r">
                                                    <span className="text-sm">{uploadLoading ? 'Loading...' : 'Select a file'}</span>
                                                    <input disabled={uploadLoading} onChange={(e) => onUploadFile('mobilethumbnailLink', e.target.files)} type='file' className="hidden" />
                                                </label>
                                            </div>
                                        </div>
                                        {errors && errors.mobilethumbnailLink && <p className="text-xs text-danger mt-1">Select mobile banner</p>}
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold">Position:</label>
                                        <Input
                                            type="number"
                                            register={register}
                                            validation={AnyValidString}
                                            onChange={(e: any) => setValue('position', e.target.value)}
                                            name="position"
                                            inputClassName="border border-gray-300/80 shadow-allSide rounded-md text-sm lg:text-base py-3.5 lg:py-4 lg:text-base px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                                            placeholder="Image Position"
                                            className='mb-0'
                                            error={
                                                errors &&
                                                errors?.position
                                            }
                                            errorText={errors && errors.position?.message}
                                        />
                                    </div>
                                </div>
                            ) : null}
                            <div className='col-span-2 mt-4'>
                                <button disabled={updateLoading} className='py-4 px-4 disabled:bg-brand-primary/30 bg-brand-primary text-white rounded-r'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
}