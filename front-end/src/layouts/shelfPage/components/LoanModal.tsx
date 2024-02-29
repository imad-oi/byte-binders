import { useState } from 'react';
import Modal from 'react-modal';
import ShelfCurrentLoansModel from '../../../models/ShelfCurrentLoansModel';

import { BiX } from 'react-icons/bi';

type LoanModalProps = {
    loan: ShelfCurrentLoansModel | undefined;
    openLoanModal: boolean;
    onClose: () => void;
    returnBook: (bookId: number) => void;
    renewLoan: (bookId: number) => void;
}

const LoanModal: React.FC<LoanModalProps> = ({ loan, openLoanModal, onClose, returnBook, renewLoan }) => {

    const customStyles = {
        content: {
            top: '40%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
            backgroundColor: 'white',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    if (!loan) {
        return null;
    }

    return (
        <Modal
            isOpen={openLoanModal}
            onRequestClose={onClose}
            contentLabel="Example Modal"
            style={customStyles}
            ariaHideApp={false}
        >
            <div className='px-4'>
                <div id='header' className='flex justify-between items-center gap-4 mb-1'>
                    <h5>Loan Options</h5>
                    <button
                        onClick={onClose}
                        type='button' role='close' aria-label='close' className='p-1 hover:bg-slate-100 rounded-md'>
                        <BiX />
                    </button>
                </div>
                <hr />
                <div id='body' className='py-4'>
                    <div className='flex justify-start items-start gap-4'>
                        <div className='ring-1 ring-slate-200 p-2 rounded-sm'>
                            <img src={loan?.book.img} alt="book"
                                width={56} height={87} />
                        </div>
                        <div>
                            <p className='text-slate-600'>{loan?.book.author}</p>
                            <p className='text-lg font-semibold'>{loan?.book.title}</p>
                        </div>
                    </div>
                    <div className='py-2'>
                        <p className="text-green-700 text-md font-semibold py-4">
                            {
                                parseInt(loan.daysLeft.toLocaleString()) > 0 && `
                            Due in ${loan.daysLeft.toLocaleString()} days`
                            }
                            {
                                parseInt(loan.daysLeft.toLocaleString()) < 0 && `
                            Due in ${loan.daysLeft.toLocaleString()} days`
                            }
                            {
                                parseInt(loan.daysLeft.toLocaleString()) == 0 && `
                            Due in ${loan.daysLeft.toLocaleString()} `
                            }
                        </p>

                        <div className='space-y-2'>
                            <button className='btn-secondary'
                                onClick={() => returnBook(loan?.book?.id)}>Return Book</button>
                            <button
                                onClick={(e) => {
                                    parseInt(loan.daysLeft.toLocaleString()) < 0 ? e.preventDefault() :
                                        renewLoan(loan?.book?.id);
                                }}
                                className='btn-secondary'
                            // disabled={loan && parseInt(loan.daysLeft.toLocaleString()) > 0}
                            >
                                {
                                    parseInt(loan.daysLeft.toLocaleString()) < 0 ? "Late dues cannot be renewed " : "Renew loan for 7 days"
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div id='footer' className='flex justify-end w-full'>
                    <div>
                        <button className='bg-white btn-secondary' onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default LoanModal;
