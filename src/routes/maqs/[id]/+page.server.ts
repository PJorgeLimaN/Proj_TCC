import { PrismaClient } from '@prisma/client'

export const load = async ({ fetch , params: { id }}) => {
    
    const prisma = new PrismaClient();

    const report = await prisma.errors.findFirst({
        where: {
            error_id: +{id}.id,
        },
        select: {
            error_id: true,
            error_maq: true,
            description: true,
            lab_id: true,
        },
    })

    const labR = await prisma.labs.findUnique({
        where: {
            lab_id: report?.lab_id,
        },
        select: {
            lab_name: true,
        }
    })

    if(report){ 
        return{
            eMaq: report.error_maq,
            desc: report.description,
            nameL: labR?.lab_name,
            eId: report.error_id,
        }
    }

    /* const report = await fetch(/) */
}