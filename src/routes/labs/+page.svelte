<script lang="ts">
	import { linear } from 'svelte/easing';
  import Show from "./show.svelte";
  import Insert from "./insert.svelte"
    export let data;
    //console.log(data.data);

    const usrType = data.typeUsr || 0;

</script>

<Show />

{#if +usrType > 0 && +usrType < 3}
  <Insert />
{/if}
  

<body>

  <section class="show-labs">

      <table>
        <tr>
          {#if +usrType > 0 && +usrType < 3}
          <th>ID do Laboratório</th>
          {/if}
          <th>Nome do Laboratório</th>
          <th>Quantidade de Máquinas</th>
        </tr>
        {#each data.labData as labs}
          <tr>
            {#if +usrType > 0 && +usrType < 3}
            <td>{labs.lab_id}</td>
            {/if}
            <td>{labs.lab_name}</td>
            <td>{labs.maqs}</td>
            <td class="butTD">
              <a href="/labs/{labs.lab_id}" class="button">Ver Laboratório</a>
            </td>
            {#if +usrType > 0 && +usrType < 3}
            <td class="butTD">
              <form method="POST" action="/labs?/deleteLab">
                <input type="hidden" name="id" value={labs.lab_id}/>
                <button value="Remover" aria-label="Remove" class="button">Remover</button>
              </form>
            </td>
            {/if}
            
            
            <!-- Adicionar um contador para mostrar quantos erros não resolvidos tem em cada laboratório 
            Adicionar nesse contador a opção de clicar e ver todos os erros que existem em um dado laboratório.-->
          </tr>
        {/each}
      </table>
      <br><br>
      <a href="/maqs/" class="button">Todas as Máquinas.</a>
      <br><br>
    <div class="alter">
      
    </div>
    <a href="./" class="button">Voltar</a>
  </section>

</body>
  
<svelte:head>
  <title>CIET | Laboratórios</title>
  <meta name="description" content="Página de Gerenciamento dos Laboratórios do CIET.">
</svelte:head>