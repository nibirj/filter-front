import {AmountCriteriaDTO} from "@/shared/DTO/AmountCriteriaDTO.js";

function addNewCriteria(criteriaList) {
    criteriaList.push(new AmountCriteriaDTO(null, "Amount", "More", 0))
}

function resizeModal(event, multiplayer, modal) {
    const modalDialog = modal;
    const startY = event.clientY;
    const startHeight = modalDialog.clientHeight;

    const resizeHandler = (e) => {
        modalDialog.style.height = startHeight + multiplayer * (e.clientY - startY) + 'px';
    };

    const stopResize = () => {
        document.removeEventListener('mousemove', resizeHandler);
        document.removeEventListener('mouseup', stopResize);
    };

    document.addEventListener('mousemove', resizeHandler);
    document.addEventListener('mouseup', stopResize);
}



export { addNewCriteria, resizeModal }