import React from "react";
import dayjs from "dayjs";

interface propsI {
    title: string
    text: string
    deadline: string
    status: string
    file: string
    handlePopup: (title: string, text: string, deadline: string, status: string, file: string, uiid: string) => void
    uiid: string
}

export const Todo = (props: propsI) => {
    return (
        <div
            className={[
                'wrapper_todos__list__item',
                ((dayjs(props.deadline) < dayjs(new Date()) && props.status !== 'complete')
                    || props.status === 'dead') ? 'dead' : '',
                (props.status === 'complete') ? 'complete' : ''
            ].join(' ')}
            onClick={() => {
                props.handlePopup(props.title, props.text, props.deadline, props.status, props.file, props.uiid)
            }}
        >
            <img
                src={
                    (props.file)
                        ? `https://firebasestorage.googleapis.com/v0/b/another-one-todolist-wow.appspot.com/o/${props.file}?alt=media`
                        : 'https://firebasestorage.googleapis.com/v0/b/another-one-todolist-wow.appspot.com/o/404.jpg?alt=media'}
                alt={"todo-image"}
            />
            <article>
                <p className={'wrapper_todos__list__item__title'}>
                    title:
                    <span>{props.title}</span>
                </p>
                <p className={'wrapper_todos__list__item__text'}>
                    text:
                    <span>{props.text}</span>
                </p>
                <p className={'wrapper_todos__list__item__date'}>
                    deadline:
                    <span>{props.deadline}</span>
                </p>
                <p className={'wrapper_todos__list__item__status'}>
                    status:
                    <span>{props.status}</span>
                </p>
            </article>
        </div>
    )
}