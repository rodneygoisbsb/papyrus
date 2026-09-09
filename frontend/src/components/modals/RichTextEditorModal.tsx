import React from 'react';
import {
    FileText,
    PenTool,
    X,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Heading1,
    Heading2,
    List,
    ListOrdered as ListNum,
    AlignLeft,
    AlignCenter
} from 'lucide-react';
import { useRichTextEditor } from '../../hooks/useRichTextEditor';
import { useModalLenis } from '../../hooks/useModalLenis';

export default function RichTextEditorModal({
    isOpen,
    onClose,
    activeStudyModal,
    onSave,
    title = 'Anotações',
    type = 'notes' // 'notes' ou 'errors'
}) {
    const { editorRef, execCmd, saveEditorContent } = useRichTextEditor(onSave);
    const { wrapperRef, contentRef } = useModalLenis();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in">
            <div className="bg-base-100 rounded-3xl w-full max-w-4xl h-[85vh] shadow-2xl flex flex-col overflow-hidden border border-base-300">
                <div className="px-6 py-4 border-b border-base-300 flex justify-between items-center bg-base-100 shrink-0">
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-9 h-9 rounded-2xl flex items-center justify-center ${type ==='errors' ? 'bg-error/15 text-error' : 'bg-primary/15 text-primary'
                                }`}
                        >
                            {type === 'errors' ? <FileText size={20} /> : <PenTool size={20} />}
                        </div>
                        <div>
                            <h3 className="text-base font-extrabold text-base-content">{title}</h3>
                            <p className="text-xs text-neutral-content">
                                {activeStudyModal?.subject} • {activeStudyModal?.topicName}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-ghost btn-xs btn-circle text-neutral-content hover:text-base-content transform-gpu"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 py-2.5 bg-base-200/60 border-b border-base-300 flex flex-wrap items-center gap-1 text-xs select-none shrink-0">
                    <button type="button" onClick={() => execCmd('bold')} className="p-2 hover:bg-base-200 text-base-content rounded-xl cursor-pointer">
                        <Bold size={15} />
                    </button>
                    <button type="button" onClick={() => execCmd('italic')} className="p-2 hover:bg-base-200 text-base-content rounded-xl cursor-pointer">
                        <Italic size={15} />
                    </button>
                    <button type="button" onClick={() => execCmd('underline')} className="p-2 hover:bg-base-200 text-base-content rounded-xl cursor-pointer">
                        <Underline size={15} />
                    </button>
                    <button type="button" onClick={() => execCmd('strikeThrough')} className="p-2 hover:bg-base-200 text-base-content rounded-xl cursor-pointer">
                        <Strikethrough size={15} />
                    </button>
                    <div className="w-[1px] h-5 bg-base-300 mx-1" />
                    <button type="button" onClick={() => execCmd('formatBlock', '<h1>')} className="p-2 hover:bg-base-200 text-base-content rounded-xl cursor-pointer">
                        <Heading1 size={15} />
                    </button>
                    <button type="button" onClick={() => execCmd('formatBlock', '<h2>')} className="p-2 hover:bg-base-200 text-base-content rounded-xl cursor-pointer">
                        <Heading2 size={15} />
                    </button>
                    <div className="w-[1px] h-5 bg-base-300 mx-1" />
                    <button type="button" onClick={() => execCmd('insertUnorderedList')} className="p-2 hover:bg-base-200 text-base-content rounded-xl cursor-pointer">
                        <List size={15} />
                    </button>
                    <button type="button" onClick={() => execCmd('insertOrderedList')} className="p-2 hover:bg-base-200 text-base-content rounded-xl cursor-pointer">
                        <ListNum size={15} />
                    </button>
                    <div className="w-[1px] h-5 bg-base-300 mx-1" />
                    <button type="button" onClick={() => execCmd('justifyLeft')} className="p-2 hover:bg-base-200 text-base-content rounded-xl cursor-pointer">
                        <AlignLeft size={15} />
                    </button>
                    <button type="button" onClick={() => execCmd('justifyCenter')} className="p-2 hover:bg-base-200 text-base-content rounded-xl cursor-pointer">
                        <AlignCenter size={15} />
                    </button>
                </div>

                <div className="flex-1 flex overflow-y-auto" data-lenis-prevent="true" ref={wrapperRef}>
                    <div className="flex-1 p-8 bg-base-100 text-base-content outline-none leading-relaxed prose max-w-none text-sm font-sans" ref={contentRef}>
                        <div
                            ref={editorRef}
                            contentEditable
                            className="outline-none"
                            style={{ minHeight: '300px' }}
                        />
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-base-300 flex justify-between items-center bg-base-100 shrink-0">
                    <span className="text-xs text-neutral-content">As formatações ficam salvas no seu caderno de estudos.</span>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-xs font-bold text-neutral-content hover:text-base-content px-4 py-2.5 transition-colors cursor-pointer transform-gpu"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={saveEditorContent}
                            className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md shadow-primary/20 transition-transform duration-200 ease-out active:scale-95 cursor-pointer transform-gpu"
                        >
                            Salvar Anotações
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}