<script lang="ts">
	import { redirect } from '@sveltejs/kit';


    export let data;

    const usrType = data.typeUsr || 0;
    const usrName = data.nameUsr || "";
    const usrId = data.idUsr || 0;
    const machine = data.maq;
    const ers = data.report;
    console.log(machine);


    /* Pagina Maqs agora deve:
    Mostrar as informações da Máquina (ID, Nome, e Lab em que se encontra) 
    Lista de erros da máquina (Talvez separar entre erros resolvidos e não resolvidos)
    
    Permitir edição do lab e nome da máquina (Transferencia de máquina)
    */

</script>

<body>

    <section class="insert"> <!-- Adicionar Novo Erro -->
        <h1>{machine?.maqName}</h1>
        <div>
            <form>
                <form action="/reports?/createError" method="POST">
                    <input type="text" name="usrId" value="{usrId}" hidden>
                    <div>
                        <label for="labName">Laboratório: </label>
                        <input type="text" name="labName" id="labName" disabled value="{machine?.labs?.lab_name}">
                    </div>

                    <div>
                        <label for="maqN">Máquina: </label>
                        <input type="text" name="maqN" id="maqN" disabled value="{machine?.maqName}">
                        <input type="number" name="maqId" hidden value="{machine?.maqId}">
                    </div>

                    <div>
                        <label for="desc">Descrição do Erro: </label>
                        <input type="text" name="desc" id="desc" required class="descText">
                    </div>

                    <input type="submit" value="Adicionar Erro">

                    <a href="./" class="button">Voltar</a>
                </form>
            </form>
        </div>
    </section>

        <section class="container">
            <div>
                <table>
                    <tr>
                        {#if +usrType < 4 && +usrType > 0}
                            <th>ID do Erro</th>
                        {/if}
                        <th>Descrição</th>
                        <th>Status</th>
                        {#if +usrType < 4 && +usrType > 0}
                            <th>Criado por</th>
                            <th>Criado</th>
                            <th>Editado</th>
                        {/if}
                    </tr>
    
                    {#each ers as erros}
                    {#if erros.isFixed == 0}
                        <tr>
                            {#if +usrType < 4 && +usrType > 0}
                                <td>{erros.error_id}</td>
                            {/if}
                            <td>{erros.description}</td>
    
                            {#if erros.isFixed == 0}
                                <td>Não Resolvido</td>
                            {:else if erros.isFixed == 1}
                                <td>Resolvido</td>
                            {/if}
    
                            {#if +usrType < 4 && +usrType > 0}
                                <td>{erros.users.user_name}</td>
                                <td>{erros.create_time.toLocaleString()}</td>
                                <td>{erros.modified_time?.toLocaleString()}</td>
                            {/if}
                            
                        </tr>
                    {/if}
                    {/each}
                </table>
            </div>
        </section>
    
        <a href="./" class="button">Voltar</a>
</body>

<svelte:head><!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema. -->
    <!-- {#if erro?.error_id} 
    <title>CIET | Erro {erro?.error_id}</title> 
    <meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET.">
    {:else} -->
    <title>CIET | Novo Erro</title> <!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema.-->
    <meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET.">   
    <!-- {/if} -->
  
</svelte:head>