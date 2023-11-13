<script lang="ts">
	import { redirect } from '@sveltejs/kit';


    export let data;

    const usrType = data.typeUsr || 0;
    const usrName = data.nameUsr || "";
    const usrId = data.idUsr || 0;

    /* Pagina Maqs agora deve:
    Mostrar as informações da Máquina (ID, Nome, e Lab em que se encontra) 
    Lista de erros da máquina (Talvez separar entre erros resolvidos e não resolvidos)
    
    Permitir edição do lab e nome da máquina (Transferencia de máquina)
    */

</script>

<body>
    <section class="container">
        <div>
            <form>
                <form action="/maqs?/updateEntry" method="post">

                    <div>
                        <label for="erroId">Código do Erro</label>
                        <input type="text" name="erroId" id="erroId" readonly value={data.eId}>
                    </div>

                    <div>
                        <label for="labName">Laboratório</label>
                        <input type="text" name="labName" id="labName" readonly value={data.nameL}>
                    </div>

                    <div>
                        <label for="maqN">Máquina</label>
                        <input type="number" name="maqN" id="maqN" readonly value="{data.eMaq}">
                    </div>

                    <div>
                        <label for="desc">Descrição do Erro</label>
                        <input type="text" name="desc" id="desc" value={data.desc} required class="descText">
                    </div>

                    <input type="submit" value="Atualizar">

                    <a href="./" class="button">Voltar</a>
                </form>
            </form>
        </div>

        <section class="container">
            <div>
                <table>
                    <tr>
                        {#if +usrType < 4 && +usrType > 0}
                            <th>ID do Erro</th>
                        {/if}
                        <th>Máquina</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        {#if +usrType < 4 && +usrType > 0}
                            <th>Criado por</th>
                            <th>Criado</th>
                            <th>Editado</th>
                        {/if}
                    </tr>
    
                    <!-- {#each ers as erros}
                        <tr>
                            {#if +usrType < 4 && +usrType > 0}
                                <td>{erros.error_id}</td>
                            {/if}
                            <td>{erros.error_maq}</td>
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
                    {/each} -->
                </table>
            </div>
        </section>
    </section>
</body>

<svelte:head>
  <title>CIET | Erro {data.eId}</title> <!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema.-->
  <meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET.">
</svelte:head>