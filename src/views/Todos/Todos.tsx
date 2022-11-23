import React, {useContext, useEffect, useState} from "react";
import {Todo} from "../../components/Todo/Todo";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../index";
import {getFirestore, collection} from "firebase/firestore";
import {PopupTodo} from "../../components/PopupTodo/PopupTodo";
import dayjs from "dayjs";

/*
для чтения из баззы надо разрешить доступ в фб
https://stackoverflow.com/questions/46590155/firestore-permission-denied-missing-or-insufficient-permissions
*/
export const Todos = () => {

    const {fireApp} = useContext(Context)
    const [todos, loading, error] = useCollectionData(
        collection(getFirestore(fireApp), "todos"), // collection без слеша
        {
            snapshotListenOptions: {includeMetadataChanges: true},
        }
    )
    const [parsedTodos, setParsedTodos] = useState<typeof todos>([])
    const [page, setPage] = useState<number>(1)
    const [pageTodos, setPageTodos] = useState<typeof todos>([])
    useEffect(() => {
        if (todos) { // sort arr
            setParsedTodos(
                todos.slice(0).sort(function (a, b) {
                    return dayjs(a.deadline).unix() - dayjs(b.deadline).unix()
                })
            )
        }
    }, [todos])

    function nextPage() {
        if (page < Math.ceil(parsedTodos!.length / 5)) {
            setPage(page + 1)
        }
    }

    function prevPage() {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    useEffect(() => {
        setPageTodos(
            parsedTodos!.map(i => i).slice((page - 1) * 5, page * 5)
        )
    }, [page, parsedTodos])

    const [popupText, setPopupText] = useState<string>('')
    const [popupTile, setPopupTitle] = useState<string>('')
    const [popupDeadline, setPopupDeadline] = useState<string>('')
    const [popupStatus, setPopupStatus] = useState<string>('progress')
    const [popupFile, setPopupFile] = useState<string>('')
    const [popupUiid, setPopupUiid] = useState<string>('')
    const [popup, setPopup] = useState<boolean>(false)

    function handlePopup(title: string, text: string, deadline: string, status: string, file: string, uiid:string) {
        setPopupText(text)
        setPopupTitle(title)
        setPopupDeadline(deadline)
        setPopupStatus(status)
        setPopupFile(file)
        setPopupUiid(uiid)
        setPopup(true)
    }

    return (
        <div className={'wrapper_todos'}>
            <div className={'wrapper_todos__header'}>
                <button
                    onClick={() => {
                        handlePopup('', '', '', 'progress', '', '')
                    }}
                >&#129313;
                </button>
                <p>
                    already <b> {new Date().toLocaleDateString()}</b>
                    , and you haven't become happy
                </p>
            </div>

            <h1>Oh my, this is another one <span>GREAT TODOLIST</span></h1>

            {
                todos
                    ? <div className={'wrapper_todos__pagination'}>
                        <button onClick={() => {
                            prevPage()
                        }}>Prev
                        </button>
                        {page} / {Math.ceil(todos!.length / 5)} - 5 on page
                        <button onClick={() => {
                            nextPage()
                        }}>Next</button>
                    </div>
                    : []
            }


            {
                loading
                    ? <p>Loading...</p>
                    : <div className={'wrapper_todos__list'}>
                        {
                            pageTodos
                                ? pageTodos.map((i) => {
                                    return <Todo key={`todo-${i.title}-${i.timestamp}`}
                                                 status={i.status}
                                                 deadline={i.deadline}
                                                 title={i.title}
                                                 text={i.text}
                                                 file={i.file}
                                                 handlePopup={handlePopup}
                                                 uiid={i.id}
                                    />
                                })
                                : <p>...</p>
                        }

                    </div>
            }

            <PopupTodo
                visible={popup}
                setVisible={setPopup}
                text={popupText}
                setText={setPopupText}
                title={popupTile}
                setTitle={setPopupTitle}
                deadline={popupDeadline}
                setDeadline={setPopupDeadline}
                status={popupStatus}
                setStatus={setPopupStatus}
                file={popupFile}
                uiid={popupUiid}
            />
        </div>
    )
}