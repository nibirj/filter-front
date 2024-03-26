// Subclass for AmountCriteriaDTO
import {CriteriaDTO} from "@/shared/DTO/CriteriaDTO.js";

class AmountCriteriaDTO extends CriteriaDTO {
    constructor(id, type, comparingCondition, comparableValue) {
        super(id, type, comparingCondition);
        this.comparableValue = comparableValue;
    }
}

export { AmountCriteriaDTO }