import {Prisma, PrismaClient} from '@prisma/client'

export async function load({ cookies }) {
    const prisma = new PrismaClient();
    const errData = await prisma.errors.findMany({include:{labs:true}});
    const labData = await prisma.labs.findMany();

    const labErrCount = await prisma.labs.findMany({
        include: {
            _count: {
                select: {
                    errors:{
                        where: {
                            isFixed: 0,
                        }
                    }
                }
            }
        }
    });

    const typeUsr = cookies.get('userType');
    const idUsr = cookies.get('userID')

    return {labErrCount, typeUsr
        
    }
}











