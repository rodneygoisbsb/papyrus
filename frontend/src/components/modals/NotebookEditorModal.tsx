import React from 'react';
import { X, Save, Bold, Italic, Underline, Strikethrough, List, ListOrdered, Heading1, Heading2, Heading3, AlignLeft, AlignCenter, AlignRight, Quote, Undo, Redo, Highlighter } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import UnderlineExtension from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';

interface NotebookEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const btnClass = (isActive: boolean) => 
        `p-1.5 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`;

    return (
        <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 bg-white border-b border-slate-100 shadow-sm shrink-0 overflow-x-auto">
            {/* Histórico */}
            <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={btnClass(false)} title="Desfazer">
                <Undo size={15} />
            </button>
            <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={btnClass(false)} title="Refazer">
                <Redo size={15} />
            </button>

            <div className="w-px h-5 bg-slate-200 mx-1" />

            {/* Estilos Base */}
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Negrito">
                <Bold size={15} />
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Itálico">
                <Italic size={15} />
            </button>
            <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))} title="Sublinhado">
                <Underline size={15} />
            </button>
            <button onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive('strike'))} title="Tachado">
                <Strikethrough size={15} />
            </button>
            <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={btnClass(editor.isActive('highlight'))} title="Marca Texto">
                <Highlighter size={15} />
            </button>

            <div className="w-px h-5 bg-slate-200 mx-1" />

            {/* Títulos */}
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive('heading', { level: 1 }))} title="Título 1">
                <Heading1 size={15} />
            </button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))} title="Título 2">
                <Heading2 size={15} />
            </button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive('heading', { level: 3 }))} title="Título 3">
                <Heading3 size={15} />
            </button>

            <div className="w-px h-5 bg-slate-200 mx-1" />

            {/* Listas e Citações */}
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Lista de Marcadores">
                <List size={15} />
            </button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="Lista Numerada">
                <ListOrdered size={15} />
            </button>
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))} title="Citação">
                <Quote size={15} />
            </button>

            <div className="w-px h-5 bg-slate-200 mx-1" />

            {/* Alinhamento */}
            <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btnClass(editor.isActive({ textAlign: 'left' }))} title="Alinhar à Esquerda">
                <AlignLeft size={15} />
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btnClass(editor.isActive({ textAlign: 'center' }))} title="Centralizar">
                <AlignCenter size={15} />
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btnClass(editor.isActive({ textAlign: 'right' }))} title="Alinhar à Direita">
                <AlignRight size={15} />
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={btnClass(editor.isActive({ textAlign: 'justify' }))} title="Justificar">
                <span className="text-[10px] font-bold">JUST</span>
            </button>
        </div>
    );
};

export default function NotebookEditorModal({ isOpen, onClose, onSave }: NotebookEditorModalProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            UnderlineExtension,
            Highlight,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
            }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base prose-blue max-w-none focus:outline-none min-h-[300px] h-full p-6 bg-slate-50/30'
            }
        }
    });

    if (!isOpen) return null;

    const handleSave = () => {
        if (editor) {
            onSave(editor.getHTML());
            editor.commands.clearContent();
        }
        onClose();
    };

    const handleCancel = () => {
        editor?.commands.clearContent();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.18)] flex flex-col h-[85vh] max-h-[850px] overflow-hidden border border-slate-200">
                <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/50 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">
                            Bloco de Anotações
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">Tiptap Editor</p>
                    </div>
                    <button
                        onClick={handleCancel}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer transform-gpu"
                    >
                        <X size={15} />
                    </button>
                </header>

                <MenuBar editor={editor} />

                <div className="flex-1 overflow-y-auto">
                    <EditorContent editor={editor} className="h-full" />
                </div>

                <footer className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-end gap-3 shrink-0">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer transform-gpu"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-sm shadow-blue-500/30 cursor-pointer transition-transform duration-200 ease-out flex items-center gap-2 transform-gpu"
                    >
                        <Save size={16} />
                        Salvar anotações
                    </button>
                </footer>
            </div>
        </div>
    );
}
