import React, {useState, useEffect} from 'react';
import DragHandle from '../DragHandle';
import './option.css';
import {Trash} from 'react-feather';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Option(props) {

    const [option, editOption] = useState(props.option);
    const [dragging, toggleDragging] = useState('supported');

    useEffect(() => {
        if (props.thisPanel !== 'questions') getOption();
    }, [props.option, props.partnerData]);

    function getOption() {
        if (props.partnerData.find(o => o.id === props.option)) {
            let value = props.partnerData.find(o => o.id === props.option).text;
            editOption([...value]);
        } else {
            props.onRemoveOption(props.number);
        }
    }

    function handleChange(event) {
        editOption(event.target.value);
        props.onCheckComplete(event.target.value.length);
    }

    function handleRemove() {
        if (props.thisPanel === 'questions') {
            if (props.item.selection.length > 2) props.onRemoveOption(props.number);
        } else {
            props.onRemoveOption(props.number);
        }
    }

    return (
        // <Draggable draggableId={'id-' + option.id} index={props.number}>
        //     {provided => (
                <div
                    // ref={provided.innerRef}
                    // {...provided.draggableProps}
                    // {...provided.dragHandleProps}
                    data-id={props.item.id}
                    data-option={props.number}
                    draggable={dragging === 'true'}
                    className={'item-option' + (props.editing ? ' editing' : '') + (props.number === props.correct ? ' selected-option' : '')}
                    onClick={event => event.preventDefault()}>
                    {props.editing ?
                        <button
                            title='remove option'
                            value={props.number}
                            data-panel={props.thisPanel}
                            data-item={props.item.id}
                            className='remove-option'
                            onClick={handleRemove}
                        >
                            <Trash
                                size={14}
                            />
                        </button>
                        :
                        <div>
                        </div>
                    }
                    {props.thisPanel === 'questions' && props.editing ?
                        <input
                            className='item-option-input'
                            value={option.text}
                            placeholder='type something!'
                            onChange={handleChange}
                            onBlur={() => props.onEditOption(props.number, option)}
                        />
                        :
                        <button
                            onClick={props.thisPanel === 'questions' ? props.onStartEdit : undefined}
                        >
                            {option.text}
                        </button>
                    }
                    {props.thisPanel === 'questions' && props.editing &&
                        <button
                            aria-roledescription='radio button'
                            className={'correct-option' + (props.number === props.correct ? ' selected-button' : '')}
                            onClick={() => props.onSetCorrect(props.number)}
                        >
                        </button>
                    }
                    {props.editing &&
                        <DragHandle
                            description={'rearrange'}
                            dragging={dragging}
                            onToggleDragging={toggleDragging}
                        />
                    }
                </div>
        //     )}
        // </Draggable>
    );
}
