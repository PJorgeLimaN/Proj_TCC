<script>
	import { linear } from 'svelte/easing';
	import Page from '../hub/+page.svelte';
    import {Prisma, PrismaClient} from '@prisma/client'

    export let data; // Forma geral de todos os dados que chegam na página //let é basicamente um var, que não pode ser redeclarado, a menos que dentro de um bloco {}, como um if ou iguais.


    let labs = data.labs;
    let erros = data.erros;
    let usr = data.typeUsr || 0;

    let lab = data;
    

</script>

<body>
    <section class="container">
        <form action="/labs/{lab}" method="GET">
            <div>
                <label for="id">Laboratório</label>
                <select name="id" title="laboratório" placeholder="Lab" bind:value={lab}>
                    {#each labs as labs}
                        <option value="{labs.lab_id}">{labs.lab_name}</option>
                    {/each}
                </select>
                
                <input type="submit" value="Selecionar Laboratório">
            <div>
                <!--   
                    Até eu descobrir como fazer para mostrar no select somente as maquinas do lab escolhido acima, será feita essa gambiarra para a inserção de novos erros. 
                    Começa aqui, escolhendo qual o laboratório onde se encontra o erro.
                    Daqui, segue para labs/{id}, onde escolhe somente entre as máquinas existentes no laboratório.
                    Dali, segue para maqs/{id}, onde escolhe a máquina específica e pede a descrição do erro. Também é mostrado a lista de erros existentes não resolvidos (talvez) na máquina.
                -->
            </div>

            <div>
                
            </div>
        </form>
    </section>

    <section class="container">
        <div>
            <table>
                <tr>
                    <th>Laboratório</th>
                    <th>Máquina</th>
                    <th>Erro</th>
                    {#if +usr > 0 && +usr < 4}
                    <th>Situação</th>
                    {/if}
                </tr>

                {#each erros as err}
                    <tr>
                        <td>{err.machines.labs?.lab_name}</td>
                        <td>{err.machines.maqNum}</td>
                        <td>{err.description}</td>
                        {#if +usr > 0 && +usr < 4}
                            {#if err.isFixed == 0}
                            <td>Não Resolvido</td>
                            {:else if err.isFixed == 1}
                            <td>Resolvido</td>
                            {/if}
                            {#if +usr > 0 && +usr < 3}
                            <td class="butTD"> <a href="/reports/{err.error_id}" class="button">Soluções</a></td>
                            <td class="butTD"> <a href="/reports/{err.error_id}" class="button">Deletar Erro</a></td>
                            {/if}
                        {/if}
                    </tr>
                {/each}
                
            </table>
        </div>

        <a href="./" class="button">Voltar</a>
    </section>


</body>