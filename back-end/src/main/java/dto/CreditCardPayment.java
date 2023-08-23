package dto;

public class CreditCardPayment extends BasePaymentDto {

    private String cardNumber;
    private String securityCode;

    public CreditCardPayment(String cardNumber,String securityCode,Double amount) {
        super();
        this.amount = amount;
        this.cardNumber = cardNumber;
        this.securityCode = securityCode;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public String getSecurityCode() {
        return securityCode;
    }


}
