import React from "react";

export interface propsPopupTodoI {
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

export function generateUiid(): string {
    return `${Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)}`
}
