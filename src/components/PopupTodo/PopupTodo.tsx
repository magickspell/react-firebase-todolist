import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {collection, getFirestore} from "firebase/firestore";
import {doc, setDoc, deleteDoc} from "firebase/firestore";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import dayjs from "dayjs";

interface propsI {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    text: string
    setText: React.Dispatch<React.SetStateAction<string>>
    deadline: string
    setDeadline: React.Dispatch<React.SetStateAction<string>>
    status: string
    setStatus: React.Dispatch<React.SetStateAction<string>>
    file: string
    uiid: string
}

export const PopupTodo = (props: propsI) => {

    const {fireApp} = useContext(Context)

    // upload and file handlers
    const storage = getStorage();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File>();
    const [url, setUrl] = useState<string>();
    const [progress, setProgress] = useState(0);
    const onFileUpload = () => {
        if (!file) return;
        setIsLoading(true);
        const storageRef = ref(storage, `${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // https://dev.to/ashusharmatech/uploading-files-to-firebase-storage-using-react-517p
        uploadTask.on("state_changed", (snapshot) => {
                let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            }, (err) => {
                console.log(err);
                setIsLoading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        setUrl(url);
                        setIsLoading(false);
                    })
            }
        )
    }
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            setFile(e.target.files![0])
        }
    }

    // CRUD task
    function clear() {
        setUrl('')
        setProgress(0)
        setIsLoading(false)
        props.setStatus('progress')
        props.setDeadline('')
        props.setText('')
        props.setTitle('')
        props.setVisible(false)
    }

    async function postTodo() {
        if (props.title.length > 0) {
            if (file?.name) {
                try {
                    onFileUpload()
                } catch (e) {
                    console.warn(e)
                }
            }

            try {
                const uiid = (props.uiid.length > 0) ? props.uiid : `${Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)}`
                await setDoc(doc(collection(getFirestore(fireApp), 'todos'), uiid), {
                    title: props.title,
                    deadline: props.deadline.length > 0 ? props.deadline : dayjs().format('YYYY-MM-DD'),
                    status: props.status,
                    text: props.text,
                    file: file ? file.name : props.file,
                    timestamp: dayjs().unix(),
                    id: uiid
                }).then((res) => {
                    clear()
                    window.location.reload() // reload to get new images
                });
            } catch (e) {
                console.warn(e)
                alert(e)
            }
        } else {
            alert('INPUT TITLE!!!')
        }
    }

    async function deleteTodo() {
        try {
            await deleteDoc(doc(collection(getFirestore(fireApp), "todos"), props.uiid))
                .then((res) => {
                    clear()
                });

        } catch (e) {
            console.warn(e)
            alert(e)
        }
    }

    return (
        <div className={[
            'wrapper_todos__todo-popup',
            props.visible ? '' : 'popup_invisible'
        ].join(' ')
        }>
            <div className={'wrapper_todos__todo__body'}>
                {
                    !isLoading
                        ?
                        <form onSubmit={(e) => {
                            e.preventDefault()
                        }}>

                            <div className={'input-bullet file_img'}>
                                <label htmlFor="image">
                                    img:
                                </label>
                                <img
                                    src={
                                        props.file.length > 0
                                            ? `https://firebasestorage.googleapis.com/v0/b/another-one-todolist-wow.appspot.com/o/${props.file}?alt=media`
                                            : "https://firebasestorage.googleapis.com/v0/b/another-one-todolist-wow.appspot.com/o/404.jpg?alt=media"
                                    }
                                    alt="task-image"/>
                                <input
                                    name={'image'}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        onFileChange(e)
                                    }}
                                />
                            </div>

                            <div className={'input-bullet'}>
                                <label htmlFor="title">
                                    title:
                                </label>
                                <input
                                    className={(props.title.length === 0) ? 'invalid' : ''}
                                    name={'title'}
                                    type="text"
                                    value={props.title}
                                    maxLength={20}
                                    onChange={(e) => {
                                        props.setTitle(e.target.value)
                                    }}
                                />
                            </div>

                            <div className={'input-bullet'}>
                                <label htmlFor="deadline">
                                    dead:
                                </label>
                                <input
                                    name={'deadline'}
                                    type="date"
                                    value={props.deadline}
                                    onChange={(e) => {
                                        props.setDeadline(e.target.value)
                                    }}
                                />
                            </div>

                            <div className={'input-bullet'}>
                                <label htmlFor="deadline">
                                    status:
                                </label>
                                <select
                                    name={'status'}
                                    onChange={(e) => {
                                        props.setStatus(e.target.value)
                                    }}
                                    value={props.status}
                                >
                                    <option value="progress">progress</option>
                                    <option value="complete">complete</option>
                                    <option value="dead">dead</option>
                                </select>
                            </div>

                            <div className={'input-bullet'}>
                                <label htmlFor="text">
                                    text:
                                </label>
                                <textarea
                                    name={'text'}
                                    placeholder={'input text'}
                                    maxLength={60}
                                    value={props.text}
                                    onChange={(e) => {
                                        props.setText(e.target.value)
                                    }}
                                />
                            </div>

                            <div className={'wrapper_todos__todo__body__btns'}>
                                <button
                                    onClick={() => {
                                        deleteTodo()
                                    }}
                                >del
                                </button>
                                <button
                                    onClick={() => {
                                        props.setVisible(false)
                                    }}
                                >cancel
                                </button>
                                <button
                                    onClick={() => {
                                        postTodo()
                                    }}
                                >save
                                </button>
                            </div>
                        </form>
                        : <p>LOADING: {progress}</p>
                }
            </div>
        </div>
    )
}