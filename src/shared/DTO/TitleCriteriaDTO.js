// Subclass for TitleCriteriaDTO
import {CriteriaDTO} from "@/shared/DTO/CriteriaDTO.js";

class TitleCriteriaDTO extends CriteriaDTO {
    constructor(id, type, comparingCondition, comparableName) {
        super(id, type, comparingCondition);
        this.comparableName = comparableName;
    }
}

export { TitleCriteriaDTO }