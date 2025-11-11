import React, { ReactNode, useEffect, useState } from 'react'
import Layout from '../component/Layout'
import Modal from '../../../components/UI/ModalCenter';
import { useForm } from 'react-hook-form';
import { useGetCouponMutation, useUpdateCouponMutation } from '../../../services/cms/cms';
import '../index.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'
import DebouncedInput from './debounceInput';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';

type Props = {}
export type AddBannerForm = {
    type: string;
};

export default function Alcohal({ }: Props) {
    const columns = [
        {
            accessorKey: 'coupon_code',
            header: () => 'Coupon Code',
        },
        {
            accessorFn: (row: any) => row.description,
            id: 'description',
            cell: (info: any) => info.getValue(),
            header: () => <span>Description</span>,
            size: 370,
            enableResizing: false
        },
        {
            accessorKey: 'discount_pct',
            header: () => 'Discount',
            cell: (info: any) => (
                <p>{info.row.original.discount_type == 'Flat' ? `Flat -  ₹ ${info.row.original.discount_amount}` : `${info.row.original.discount_pct} %`}</p>
            ),
        },
        {
            accessorKey: 'created_at',
            header: () => 'Status',
            cell: (cell: any) => {
                return (
                    <p>{moment(cell.row.original.created_at, '').format('DD/MM/YYYY')}</p>
                )
            },
        },
        {
            accessorKey: 'active',
            header: () => 'Status',
            cell: (cell: any) => {
                if (cell.getValue()) {
                    return (
                        <p onClick={() => {
                            setStatusModal(true)
                            setStatusCoupon([false, cell?.row?.original?.id])
                        }}
                            className='text-xs cursor-pointer font-medium bg-brand-green px-3 rounded-full text-center inline-block text-white'>
                            Active
                        </p>
                    )
                } else {
                    return (
                        <p onClick={() => {
                            setStatusModal(true)
                            setStatusCoupon([true, cell?.row?.original?.id])
                        }}
                            className='text-xs cursor-pointer font-medium bg-danger px-3 rounded-full text-center inline-block text-white'>
                            In-active
                        </p>
                    )
                }
            },
        },
        {
            accessorKey: 'id',
            header: () => 'Details',
            cell: (cell: any) => {
                return (
                    <button onClick={() => setSelectedCoupon(cell?.row?.id)} className='bg-gray-300 border border-gray-100 text-xs px-4 py-0.5 rounded'>View</button>
                )
            },
        },
    ]

    let navigate = useNavigate()
    let location = useLocation()

    const [couponObject, setCouponObject] = useState<any>({});
    const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [flitering, setFlitering] = useState('');
    const [statusModal, setStatusModal] = useState(false);
    const [statusCoupon, setStatusCoupon] = useState([false, null]);

    const [getCoupon, { isLoading: loadingQuotationData }] = useGetCouponMutation()
    const [updateCoupon, { isLoading: loadingCreate }] = useUpdateCouponMutation()

    const table = useReactTable({
        data: couponObject,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            pagination,
            globalFilter: flitering
        },
        onGlobalFilterChange: setFlitering
    })

    useEffect(() => {
        const toasterShown = localStorage.getItem('toasterShown');

        if (toasterShown == 'true') {
            toast.success('New coupon added.', {
                duration: 3000,
                position: 'bottom-right',
                style: {
                    background: '#218c41',
                    color: '#fff',
                }
            })
            localStorage.setItem('toasterShown', 'false');
        }
    }, [])

    useEffect(() => {
        getCouponList()
    }, [])

    const getCouponList = () => {
        getCoupon()
            .unwrap()
            .then((res: any) => {
                setCouponObject(res.data.coupons)
            })
            .catch((res: any) => {
                if (res.status == 401) {
                    navigate('/cms/login')
                }
            });

    }

    const JsonRuleUI = () => {
        let coupon = couponObject[selectedCoupon];
        return coupon.rules_json && coupon.rules_json.map((val: any, index: any) => {
            let value = ''
            if (val.value instanceof Array) {
                value = val.value.map((v: any, i: any) => `${v} ${i + 1 == val.value.length ? '' : ', '}`)
            } else {
                value = val.value
            }
            return (
                <div className='grid grid-cols-3' key={index}>
                    <div>
                        <p>{val.key}</p>
                    </div>
                    <div>
                        <p>{val.operator}</p>
                    </div>
                    <div>
                        <p>{value}</p>
                    </div>
                </div>
            )
        })
    }

    const couponStatus = (coupon: any) => {
        let _payload = {
            id: coupon?.[1],
            coupon: {
                "active": coupon?.[0]
            }
        };

        updateCoupon(_payload)
            .unwrap()
            .then((res: any) => {
                window.location.reload();
            })
            .catch((res: any) => {
                if (res.status == 401) {
                    navigate('/cms/login')
                }
            });
    }

    return (
        <Layout>
            {loadingQuotationData ?
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
                <p className='text-2xl font-semibold'>Coupon</p>
            </div>
            <div className='grid grid-cols-1 gap-5 mt-5'>
                <div className='col-span-1 w-full'>

                    <div className='shadow-allSide border-gray-400 rounded px-6 py-6'>
                        <div className='flex justify-between items-center mb-3'>
                            <div className="">
                                {couponObject && couponObject.length > 0 ?
                                    <DebouncedInput
                                        value={flitering ?? ''}
                                        onChange={value => setFlitering(String(value))}
                                        className="px-2 py-1.5 placeholder:text-sm border border-gray-300 rounded bg-gray-400 "
                                        placeholder="Search all columns..."
                                    />
                                    : null
                                }
                            </div>
                            <div onClick={() => navigate('/cms/add-coupon')} className='flex items-center cursor-pointer font-bold text-sm gap-1 bg-[#e6f7f9] border-[2px] border-brand-sky px-3 py-1.5 text-brand-sky rounded-lg'>
                                <p>+ Add New</p>
                            </div>
                        </div>
                        {couponObject && couponObject.length > 0 ?
                            (
                                <div>
                                    <table className='w-full border-collapse border outline outline-1 outline-brand-sky overflow-hidden text-center rounded-lg'>
                                        <thead>
                                            {table.getHeaderGroups().map(headerGroup => (
                                                <tr key={headerGroup.id}>
                                                    {headerGroup.headers.map(header => (
                                                        <th className='bg-brand-sky text-white text-left px-4 py-2.5' key={header.id}>
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody>
                                            {table.getRowModel().rows.map(row => (
                                                <tr key={row.id}>
                                                    {row.getVisibleCells().map(cell => (
                                                        <td style={{
                                                            width: cell.column.getSize(),
                                                        }} className='bg-gray-400/50 border-t border-gray-300 px-4 py-2 text-left' key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className='mt-4'>
                                        <div className="flex items-center gap-4">
                                            <button
                                                className="rounded-lg text-xs px-3 py-2 bg-brand-sky text-white"
                                                onClick={() => table.firstPage()}
                                                disabled={!table.getCanPreviousPage()}
                                            >
                                                {'<<'}
                                            </button>
                                            <button
                                                className="rounded-lg text-xs px-3 py-2 bg-brand-sky text-white"
                                                onClick={() => table.previousPage()}
                                                disabled={!table.getCanPreviousPage()}
                                            >
                                                {'< Prev'}
                                            </button>
                                            <span className="flex items-center font-bold text-sm gap-1 bg-[#e6f7f9] border-1 border-brand-sky px-3 py-[4.7px] text-brand-sky rounded-lg">
                                                <div>Page</div>
                                                <span>
                                                    {table.getState().pagination.pageIndex + 1} of{' '}
                                                    {table.getPageCount().toLocaleString()}
                                                </span>
                                            </span>
                                            <button
                                                className="rounded-lg text-xs px-3 py-2 bg-brand-sky text-white"
                                                onClick={() => table.nextPage()}
                                                disabled={!table.getCanNextPage()}
                                            >
                                                {'Next >'}
                                            </button>
                                            <button
                                                className="rounded-lg text-xs px-3 py-2 bg-brand-sky text-white"
                                                onClick={() => table.lastPage()}
                                                disabled={!table.getCanNextPage()}
                                            >
                                                {'>>'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) :
                            <div>
                                <p>No coupon found!</p>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <Modal show={selectedCoupon} align={'center'} className="w-full lg:w-2/3 relative " onClose={() => setSelectedCoupon(null)}>
                <div className=' w-full h-full bg-white p-3 pr-[7px] rounded-lg min-h-[300px]'>
                    <div
                        className='absolute right-0 lg:-right-10 -top-20 lg:-top-10 cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full'
                        onClick={() => setSelectedCoupon(null)}
                    >
                        <p className='text-sm lg:text-2xl'> X </p>
                    </div>
                    {selectedCoupon ?
                        <div className='px-5 py-5'>
                            <div className='grid grid-cols-3 mb-3'>
                                <div>
                                    <p className='text-gray-100 text-sm'>Coupon Message</p>
                                    <p className='text-sm font-semibold'>{couponObject[selectedCoupon].description}</p>
                                </div>
                                <div>
                                    <p className='text-gray-100 text-sm'>Coupon Code</p>
                                    <p className='text-sm font-semibold'>{couponObject[selectedCoupon].coupon_code}</p>
                                </div>
                                <div>
                                    <p className='text-gray-100 text-sm'>Limit Per User</p>
                                    <p className='text-sm font-semibold'>{couponObject[selectedCoupon].limit_per_user}</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-3 mb-3'>
                                <div>
                                    <p className='text-gray-100 text-sm'>Discount Type</p>
                                    <p className='text-sm font-semibold'>{couponObject[selectedCoupon].discount_type}</p>
                                </div>
                                {couponObject[selectedCoupon].discount_type == 'Flat' ? (
                                    <>
                                        <div>
                                            <p className='text-gray-100 text-sm'>Discount Amount</p>
                                            <p className='text-sm font-semibold'>{couponObject[selectedCoupon].discount_amount || 'N/A'}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <p className='text-gray-100 text-sm'>Discount %</p>
                                            <p className='text-sm font-semibold'>{couponObject[selectedCoupon].discount_pct || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className='text-gray-100 text-sm'>Maximum Discount Amount</p>
                                            <p className='text-sm font-semibold'>{couponObject[selectedCoupon].max_discount || 'N/A'}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='grid grid-cols-3 mb-3'>
                                {/* <div>
                                    <p className='text-gray-100 text-sm'>Category Name</p>
                                    <p className='text-sm font-semibold'>{couponObject[selectedCoupon].category_name}</p>
                                </div> */}
                                <div>
                                    <p className='text-gray-100 text-sm'>Valid From</p>
                                    <p className='text-sm font-semibold'>{moment(couponObject[selectedCoupon].valid_from, '').format('DD/MM/YYYY')}</p>
                                </div>
                                <div>
                                    <p className='text-gray-100 text-sm'>Valid Till</p>
                                    <p className='text-sm font-semibold'>{moment(couponObject[selectedCoupon].valid_till, '').format('DD/MM/YYYY')}</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-3 mb-3'>
                                <div>
                                    <p className='text-gray-100 text-sm'>Fare Type</p>
                                    <p className='text-sm font-semibold'>{
                                        couponObject[selectedCoupon].applies_to.map((v: any, i: any) => `${v} ${i + 1 !== couponObject[selectedCoupon].applies_to?.length ? ', ' : ''}`)
                                    }</p>
                                </div>
                                <div>
                                    <p className='text-gray-100 text-sm'>Portals</p>
                                    <p className='text-sm font-semibold'>{
                                        couponObject[selectedCoupon].portals.map((v: any, i: any) => `${v} ${i + 1 !== couponObject[selectedCoupon].portals?.length ? ', ' : ''}`)
                                    }</p>
                                </div>
                                <div>
                                    <p className='text-gray-100 text-sm'>Success Message</p>
                                    <p className='text-sm font-semibold'>{couponObject[selectedCoupon].success_message}</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-3 mb-3'>
                                <div>
                                    <p className='text-gray-100 text-sm'>Created At</p>
                                    <p className='text-sm font-semibold'>{moment(couponObject[selectedCoupon].created_at, '').format('DD/MM/YYYY')}</p>
                                </div>
                                <div>
                                    <p className='text-gray-100 text-sm'>Created By</p>
                                    <p className='text-sm font-semibold'>{couponObject[selectedCoupon].created_by.email}</p>
                                </div>
                            </div>

                            <div>
                                <h1 className='text-lg font-semibold'>Coupon Rules</h1>
                                {JsonRuleUI()}
                            </div>
                        </div>
                        : null
                    }
                </div>
            </Modal>

            <Modal show={statusModal} align={'center'} className="w-full lg:w-1/3 relative " onClose={() => setStatusModal(false)}>
                <div className=' w-full h-full bg-white p-3 pr-[7px] rounded-lg min-h-[100px]'>
                    <div className='py-4 px-16 text-center'>
                        <p className='text-lg font-semibold'>Are you sure to {statusCoupon[0] ? 'enable' : 'disable'} this coupon?</p>
                        <div className='w-full flex justify-around mt-4'>
                            <button onClick={() => couponStatus(statusCoupon)} className='text-white bg-brand-primary font-semibold px-8 py-2 rounded-md'>Yes</button>
                            <button onClick={() => setStatusModal(false)} className='text-brand-primary border-2 border-brand-primary font-semibold px-8 py-2 rounded-md'>No</button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Toaster />
        </Layout>
    );
}