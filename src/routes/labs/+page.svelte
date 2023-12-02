<script>
	import { linear } from 'svelte/easing';
  import Show from "./show.svelte";
  import Insert from "./insert.svelte"
    export let data;
    //console.log(data.data);
</script>

<Show />
<Insert />
<body>

  <section class="show-labs">

      <table>
        <tr>
          <th>ID do Laboratório</th>
          <th>Nome do Laboratório</th>
          <th>Quantidade de Máquinas</th>
        </tr>
        {#each data.labData as labs}
          <tr>
            <td>{labs.lab_id}</td>
            <td>{labs.lab_name}</td>
            <td>{labs.maqs}</td>
            <td class="butTD">
              <form method="POST" action="/labs?/deleteLab">
                <input type="hidden" name="id" value={labs.lab_id}/>
                <button value="Remover" aria-label="Remove" class="button">Remover</button>
              </form>
            </td>
            <td class="butTD">
              <a href="/labs/{labs.lab_id}" class="button">Editar</a>
          </td>
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