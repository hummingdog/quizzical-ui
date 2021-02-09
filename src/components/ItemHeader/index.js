import React from 'react';
import CategorySelect from '../CategorySelect';
import './item-header.css';

export default function ItemHeader(props) {
    return (
        <div className='item-header'>
            <div className='item-admin'>
                <button
                    className='expand'
                    onClick={!props.editingThis ? props.onToggleItem : undefined}
                >
                    &#9660;
                </button>
                <CategorySelect
                    category={props.type.category}
                    thisPanel={props.thisPanel}
                    isItem={props.type.text}
                />
                <select className='item-privacy'>
                    <option>
                        private
                    </option>
                </select>
                <button
                    className='delete'
                    data-id={props.type.id}
                    onClick={props.onDeleteItem}
                >
                    delete
                </button>
            </div>
            {props.editingThis ?
                <div>
                    <button
                        className='edit-item'
                        onClick={props.onCancel}
                    >
                        cancel
                    </button>
                    <button
                        className='edit-item'
                        onClick={props.onSave}
                    >
                        save
                    </button>
                </div>
                :
                <button
                    className='edit-item'
                    onClick={!props.editing ? props.onStartEdit : undefined}
                >
                    edit
                </button>
            }
        </div>
    );
}
