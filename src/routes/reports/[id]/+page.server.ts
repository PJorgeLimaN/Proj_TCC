import { PrismaClient } from '@prisma/client'
import type { Actions } from '@sveltejs/kit';
import { redirect} from '@sveltejs/kit';

export const actions = {



}satisfies Actions;


export const load = async ({ params: { id } , cookies}) => {
    
    const prisma = new PrismaClient();

    // Refatorar esse código para condizer com as novas tabelas COMPLETO

    console.log(id);
    const report = await prisma.errors.findUnique({                                                                                         /* Aparentemente Includes tem limite de quantos podem ter antes de dar erro */
        include: {
            users: {
                select: {
                    user_name: true,
                }
            }, machines: {
                include: {
                    labs: {
                        select: {
                            lab_name: true,
                        }
                    }
                },
            },
        }, where: {
            error_id: +{id}.id,
        }, 
    });

    const solutions = await prisma.solutions.findMany({
        where: {
            sol_err: +{id}.id
        }, include: {
            users: {
                select: {
                    user_name: true,
                }
            }
        }
    })


    if(!cookies.get('userType') || !cookies.get('userName')){
        throw redirect(307, `/login`);
    }
        const typeUsr = cookies.get('userType');
        const nameUsr = cookies.get('userName');
        const idUsr = cookies.get('userId');

        return{ 
            typeUsr, nameUsr, idUsr, report, solutions
        }

    /* const report = await fetch(/) Não faço idéia de como o fetch funciona no Svelte. */
}