import { v4 as uuidv4 } from "uuid"
import { prisma } from "@/prisma/prisma";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generateResetPasswordToken = async (email: string) => {
   const token = uuidv4()
   const expires = new Date(new Date().getTime() + 2 * 3600 * 1000);

   const existingToken = await getPasswordResetTokenByEmail(email)

   if (existingToken) {
      await prisma.passwordResetToken.delete({
         where: {
            id: existingToken.id
         }
      })
   }


   const passwordResetToken = await prisma.passwordResetToken.create({
      data: {
         email,
         token,
         expires
      }
   })
   return passwordResetToken
}



export const generateVerificationToken = async (email: string) => {
   const token = uuidv4()
   const expires = new Date(new Date().getTime() + 2 * 3600 * 1000);

   const existingToken = await getVerificationTokenByEmail(email)

   if (existingToken) {
      await prisma.verificationToken.delete({
         where: {
            id: existingToken.id
         }
      })
   }

   const verificationToken = await prisma.verificationToken.create({
      data: {
         email,
         token,
         expires
      }
   })
   return verificationToken
}