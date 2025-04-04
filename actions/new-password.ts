"use server"

import * as z from "zod"
import { prisma } from "@/prisma/prisma"
import { hash } from "bcryptjs"
import { NewPasswordSchema } from "@/schemas"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"



export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
   if (!token) {
      return { error: "Missing token!" }
   }

   const validateFields = NewPasswordSchema.safeParse(values)

   if (!validateFields.success) {
      return { error: "Invalid fields!" }
   }

   const { password } = validateFields.data

   const existingToken = await getPasswordResetTokenByToken(token)

   if (!existingToken) {
      return { error: "Invalid token!" }
   }

   const hesExpired = new Date(existingToken.expires) < new Date();

   if (hesExpired) {
      return { error: "Expired token!" }
   }

   const existingUser = await getUserByEmail(existingToken.email)

   if (!existingUser) {
      return { error: "Email does not exist!" }
   }

   const hashedPassword = await hash(password, 10);

   await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword }
   })

   await prisma.passwordResetToken.delete({
      where: { id: existingToken.id }
   })


   return { success: "Password updated!" }
}