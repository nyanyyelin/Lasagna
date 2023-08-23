package dto;

public abstract class BasePaymentDto {

    private String uniqueId;
    public Double amount;

    public BasePaymentDto() {

    }

    public BasePaymentDto(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public BasePaymentDto setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
        return this;
    }

    public BasePaymentDto setAmount(Double amount) {
        this.amount = amount;
        return this;
    }

}
