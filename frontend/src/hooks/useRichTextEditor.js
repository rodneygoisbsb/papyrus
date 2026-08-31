import { useRef } from 'react';

export function useRichTextEditor(onSave) {
    const editorRef = useRef(null);

    const execCmd = (command, value = null) => {
        if (!editorRef.current) return;
        document.execCommand(command, false, value);
        editorRef.current.focus();
    };

    const saveEditorContent = () => {
        if (editorRef.current && onSave) {
            onSave(editorRef.current.innerHTML);
        }
    };

    return {
        editorRef,
        execCmd,
        saveEditorContent,
    };
}
