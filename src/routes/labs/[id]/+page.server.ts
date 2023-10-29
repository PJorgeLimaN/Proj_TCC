import { PrismaClient } from '@prisma/client'

export const load = async ({ params: { id } }) => {
    
    const prisma = new PrismaClient();

    const lab = await prisma.labs.findUnique({
        where: {
            lab_id: +id,
        },
    })

    if(lab){ 
        return{
            idLab: lab.lab_id,
            labName: lab.lab_name,
            labMaqs: lab.maqs,
        }
    }

    /* const report = await fetch(/) */
}