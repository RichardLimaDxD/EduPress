import { z } from "zod";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(19, "Card number must be 16 digits")
    .max(19, "Card number must be 16 digits"),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid format (MM/YY)")
    .refine((date) => {
      const [month, year] = date.split("/").map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      return (
        year >= currentYear || (year === currentYear && month >= currentMonth)
      );
    }, "Expiration date must be in the future"),

  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),

  cardholderName: z.string().min(2, "Cardholder name is required"),
});

export default paymentSchema;
