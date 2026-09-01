import { useRef, RefObject } from 'react';

export function useRichTextEditor(onSave?: (content: string) => void) {
    const editorRef = useRef<HTMLDivElement>(null);

    const execCmd = (command: string, value: string | null = null) => {
        if (!editorRef.current) return;
        document.execCommand(command, false, value ?? undefined);
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
