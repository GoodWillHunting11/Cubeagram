import React, { useState } from 'react';
import { Modal } from '../Modal';
import "../Modal.css"
import EditCommentForm from '../../components/EditCommentForm';

function EditCommentModal({ comment }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <i id="edit-pencil-single-post" onClick={() => setShowModal(true)} className="fas fa-pencil"></i>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                }}>
                    <EditCommentForm comment={comment} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditCommentModal;
