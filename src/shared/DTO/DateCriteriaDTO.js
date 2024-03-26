// Subclass for DateCriteriaDTO
import {CriteriaDTO} from "@/shared/DTO/CriteriaDTO.js";

class DateCriteriaDTO extends CriteriaDTO {
    constructor(id, type, comparingCondition, comparableDate) {
        super(id, type, comparingCondition);
        this.comparableDate = comparableDate;
    }
}

export { DateCriteriaDTO }