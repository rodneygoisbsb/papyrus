// src/components/modals/StudySessionModal.jsx
// Redirecionamento blindado: Qualquer chamada ao modal antigo renderiza o modal oficial novo
import React from 'react';
import RegisterStudyModal from './RegisterStudyModal';

export default function StudySessionModal(props) {
    return <RegisterStudyModal {...props} />;
}