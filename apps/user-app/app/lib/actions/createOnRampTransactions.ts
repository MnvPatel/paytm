"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function createOnRampTransactions(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session.user.id;
    if(!userId){
        return {
            message: "User not logged in!"
        }
    }
    await prisma.onRampTransactions.create({
        data : {
            userId: Number(userId),
            amount: amount,
            provider,
            startTime: new Date(),
            token: token,
            status: "Processing",
        }
    })

    return {
        message: "On ramp transaction added!"
    }
}