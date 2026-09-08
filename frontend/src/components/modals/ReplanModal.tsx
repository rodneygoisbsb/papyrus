import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

interface ReplanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ReplanModal({ isOpen, onClose, onSuccess }: ReplanModalProps) {
    const [status, setStatus] = useState<'loading' | 'success'>('loading');

    useEffect(() => {
        if (isOpen) {
            setStatus('loading');
            const timer = setTimeout(() => {
                setStatus('success');
            }, 2500); // 2.5 seconds to simulate calculation
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center font-['Plus_Jakarta_Sans'] p-4 sm:p-0">
            {/* Backdrop com desfoque elegante */}
            <div
                className="absolute inset-0 bg-base-300/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={() => status === 'success' && onSuccess()}
            />

            {/* Modal Content */}
            <div
                className="relative bg-base-100 w-full max-w-sm rounded-[24px] shadow-2xl border border-base-200/60 overflow-hidden flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 fade-in duration-300"
            >
                {status === 'loading' ? (
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                            <div className="relative bg-primary/10 p-5 rounded-full">
                                <RefreshCw size={36} className="text-primary animate-spin" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold tracking-tight text-base-content">
                                Recalculando a rota...
                            </h3>
                            <p className="text-sm text-neutral-content max-w-[250px] mx-auto">
                                Analisando seu progresso e distribuindo os tópicos pendentes.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in-50 duration-500">
                        <div className="bg-success/10 p-5 rounded-full">
                            <CheckCircle2 size={40} className="text-success" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold tracking-tight text-base-content">
                                Cronograma Replanejado!
                            </h3>
                            <p className="text-sm text-neutral-content max-w-[250px] mx-auto">
                                As pendências foram redistribuídas de forma inteligente para os próximos dias.
                            </p>
                        </div>
                        <button
                            onClick={onSuccess}
                            className="btn btn-primary w-full rounded-xl font-bold mt-2"
                        >
                            Voltar ao Foco
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
