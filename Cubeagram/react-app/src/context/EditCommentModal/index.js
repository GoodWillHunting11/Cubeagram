import React, { useState } from 'react';
import { Modal } from '../Modal';
import "../Modal.css"
import EditCommentForm from '../../components/EditCommentForm';

function EditCommentModal({ comment }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id="post-preview-edit" onClick={() => setShowModal(true)}><i class="fas fa-edit"></i></button>
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
