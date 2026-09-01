import React, { useState, Dispatch, SetStateAction } from 'react';
import { Discipline, Topic } from '../types/study';

export function useDisciplineEditor(
  activeDisciplineEditor: Partial<Discipline>,
  setActiveDisciplineEditor: Dispatch<SetStateAction<Partial<Discipline>>>
) {
    const [newTopicText, setNewTopicText] = useState('');
    const [draggedTopicIndex, setDraggedTopicIndex] = useState<number | null>(null);

    const handleAddTopic = () => {
        if (!newTopicText.trim()) return;

        const newTopic: Topic = {
            id: `temp-${Date.now()}`,
            name: newTopicText.trim(),
            theoryCompleted: false
        };

        setActiveDisciplineEditor(prev => ({
            ...prev,
            topics: [...(prev.topics || []), newTopic]
        }));
        setNewTopicText('');
    };

    const handleRemoveTopic = (topicId: string) => {
        setActiveDisciplineEditor(prev => ({
            ...prev,
            topics: (prev.topics || []).filter(t => t.id !== topicId)
        }));
    };

    const handleDragStart = (e: React.DragEvent<HTMLElement>, index: number) => {
        setDraggedTopicIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Requerido pelo Firefox
        e.dataTransfer.setData('text/html', (e.target as HTMLElement).parentElement?.innerHTML || '');
    };

    const handleDragOver = (e: React.DragEvent<HTMLElement>, index: number) => {
        e.preventDefault();
        if (draggedTopicIndex === null) return;
        
        const draggedOverIndex = index;
        if (draggedTopicIndex === draggedOverIndex) {
            return;
        }

        const items = Array.from(activeDisciplineEditor.topics || []);
        const draggedItem = items[draggedTopicIndex];

        items.splice(draggedTopicIndex, 1);
        items.splice(draggedOverIndex, 0, draggedItem);

        setActiveDisciplineEditor(prev => ({
            ...prev,
            topics: items
        }));
        
        setDraggedTopicIndex(draggedOverIndex);
    };

    const handleDragEnd = () => {
        setDraggedTopicIndex(null);
    };

    return {
        newTopicText,
        setNewTopicText,
        handleAddTopic,
        handleRemoveTopic,
        draggedTopicIndex,
        handleDragStart,
        handleDragOver,
        handleDragEnd
    };
}
