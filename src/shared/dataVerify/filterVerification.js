function criteriasVerification(criterias) {
    return criterias.length === 0;
}

function nameVerification(name, input) {
    input.classList.remove("is-invalid")
    if (name.replace(" ", "").length === 0) {
        input.classList.add("is-invalid")
    }
}



export { criteriasVerification, nameVerification }