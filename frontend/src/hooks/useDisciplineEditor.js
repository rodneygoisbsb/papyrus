import { useState } from 'react';

export function useDisciplineEditor(activeDisciplineEditor, setActiveDisciplineEditor) {
    const [newTopicText, setNewTopicText] = useState('');
    const [draggedTopicIndex, setDraggedTopicIndex] = useState(null);

    const handleAddTopic = () => {
        if (!newTopicText.trim()) return;

        const newTopic = {
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

    const handleRemoveTopic = (topicId) => {
        setActiveDisciplineEditor(prev => ({
            ...prev,
            topics: (prev.topics || []).filter(t => t.id !== topicId)
        }));
    };

    const handleDragStart = (e, index) => {
        setDraggedTopicIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Requerido pelo Firefox
        e.dataTransfer.setData('text/html', e.target.parentNode);
    };

    const handleDragOver = (e, index) => {
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
