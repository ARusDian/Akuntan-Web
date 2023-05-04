import React, { MouseEventHandler, ReactNode } from 'react';

interface Props {
    title: ReactNode;
    onClick: MouseEventHandler;
    id: string;
    newIcon?: ReactNode;
    titleIcon?: ReactNode;
}
export default function AddNewHeader(props: Props) {
    return (
        <div className="grid grid-cols-2 gap-4 border-black border-b-2">
            <label htmlFor={props.id} className='text-lg font-semibold'>
                {props.titleIcon || null} {props.title}
            </label>
            <div className="flex justify-end">
                <button
                    id={props.id}
                    type="button"
                    className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold m-5"
                    onClick={props.onClick}
                >
                    {props.newIcon || null} Add New
                </button>
            </div>
        </div>
    );
}
