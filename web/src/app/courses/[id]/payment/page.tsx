"use client";

import { useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import paymentSchema from "@/schemas/payment.schema";
import { PatternFormat } from "react-number-format";
import { useCouses } from "@/hooks/courses.hook";
import { requestBuyCourseProps } from "@/interfaces/buy-course.interface";
import { useUsers } from "@/hooks/users.hook";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const courseId = searchParams.get("courseId");

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(paymentSchema),
  }) as any;

  const { addCourse } = useCouses();

  const { user } = useUsers();

  const onSubmit = (formData: requestBuyCourseProps) => {
    const dataToSend = {
      userId: user?.id!,
      courseId: courseId!,
    };

    addCourse(dataToSend);
  };

  return (
    <div className="w-full flex flex-row justify-center gap-6 py-12 px-42">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-medium">
            Payment Method
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Controller
                name="cardNumber"
                control={control}
                render={({ field }) => (
                  <PatternFormat
                    {...field}
                    id="cardNumber"
                    format="#### #### #### ####"
                    placeholder="0000 0000 0000 0000"
                    className={errors.cardNumber ? "border-red-500" : ""}
                    customInput={Input}
                  />
                )}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Controller
                  name="expirationDate"
                  control={control}
                  render={({ field }) => (
                    <PatternFormat
                      {...field}
                      id="expirationDate"
                      format="##/##"
                      placeholder="MM/YY"
                      className={errors.expirationDate ? "border-red-500" : ""}
                      customInput={Input}
                    />
                  )}
                />
                {errors.expirationDate && (
                  <p className="text-red-500 text-sm">
                    {errors.expirationDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  {...register("cvv")}
                  className={errors.cvv ? "border-red-500" : ""}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm">{errors.cvv.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                {...register("cardholderName")}
                className={errors.cardholderName ? "border-red-500" : ""}
              />
              {errors.cardholderName && (
                <p className="text-red-500 text-sm">
                  {errors.cardholderName.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="py-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer bg-orange-400 text-white hover:bg-orange-600 w-full"
            >
              {isSubmitting ? "Processing..." : `Pay $${price}`}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default PaymentPage;
