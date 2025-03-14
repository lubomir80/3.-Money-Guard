import * as z from "zod"



export const LoginSchema = z.object({
   email: z.string().email({
      message: "Email is required"
   }),
   password: z.string().min(1, {
      message: "Password is required"
   })
})
export type TLoginSchema = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
   name: z.string().min(3, {
      message: "Minimum 3 characters required"
   }),
   email: z.string().email({
      message: "Email is required"
   }),
   password: z.string().min(6, {
      message: "Minimum 6 characters required"
   }),
   confirmPassword: z.string().min(6, {
      message: 'Please confirm your password'
   }),
}).superRefine((val, ctx) => {
   if (val.password !== val.confirmPassword) {
      ctx.addIssue({
         code: z.ZodIssueCode.custom,
         message: 'Password is not the same as confirm password',
         path: ['confirmPassword'],
      })
   }
})
export type TRegisterSchema = z.infer<typeof RegisterSchema>

export const ResetSchema = z.object({
   email: z.string().email({
      message: "Email is required"
   })
})
export type TResetSchema = z.infer<typeof ResetSchema>

export const NewPasswordSchema = z.object({
   password: z.string().min(6, {
      message: "Minimum of 6 characters required"
   })
})
export type TNewPasswordSchema = z.infer<typeof NewPasswordSchema>


//TRANSACTIONS

export const AddTransactionSchema = z.object({
   type: z.boolean(),
   category: z.string(),
   comment: z.optional(z.string().min(5), {
      message: "Min 5 characters"
   }),
   amount: z.coerce.number().positive({
      message: "Must be a positive"
   }),
   transactionDate: z.string()
}).refine((data) => {
   if (data.type) {
      return !!data.category
   }
   if (!data.type) {
      return data.category = "Income"
   }
},
   {
      message: "Category is required",
      path: ["category"]
   },
)



export type TAddTransactionSchema = z.infer<typeof AddTransactionSchema>


export const EditTransactionSchema = z.object({
   type: z.boolean(),
   category: z.string(),
   comment: z.optional(z.string().min(5), {
      message: "Min 5 characters"
   }),
   amount: z.coerce.number().positive({
      message: "Must be a positive"
   }),
   transactionDate: z.string(),
   createdAt: z.date()
})



export type TEditTransactionSchema = z.infer<typeof EditTransactionSchema>