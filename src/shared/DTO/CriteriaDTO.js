// Define a base class
class CriteriaDTO {
  constructor(id, type, comparingCondition) {
    this.id = id;
    this.type = type;
    this.comparingCondition = comparingCondition;
  }
}

export { CriteriaDTO }