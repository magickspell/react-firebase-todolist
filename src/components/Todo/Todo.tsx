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

/** TODO - This is component for render todos cards
 * @name Todo
 * @function
 * @param props {propsI} - contains parameters below
 * @param title {string} - todos titles
 * @param text {string} - todos texts
 * @param deadline {string} - todos deadline, its string, but it will be parsed to dates via dayjs lib
 * @param status {string} - todos statuses
 * @param file {string} - todos files, its url to uploaded file. !!! as file i use images to display them in cards
 * @param uiid {string} - todos uiid, generated unique id
 * */

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