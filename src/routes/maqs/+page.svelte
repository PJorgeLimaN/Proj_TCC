<script lang="ts">
  
  import { error } from '@sveltejs/kit';
  import { linear } from 'svelte/easing';

    export let data;
    export let form;
    $: selLab=0;
    /* console.log(form); */
    //console.log(data.errData);
    //console.log(data.data);
    

    
    
</script>

<body>

<section class="insert">

  {#if form?.message}
  <h2 class="error">{form?.message}</h2>
  
  {/if}

  <div class="divIn">
    <form method="post" action="/maqs?/addErr">
      <div>
        <label for="lab_id">Laboratório</label>
        <select name="lab_id" title="laboratório" placeholder="Lab">
          {#each data.labData as labs}
            <option value="{labs.lab_id}">{labs.lab_name}</option>
          {/each}
        </select>
      </div>

      <!-- {@debug selLab} -->
      
      <div>
        <label for="maq_id">Máquina</label>
        <input type="number" name="maq_id" title="Máquina" required min="1" max="100" value="1"/><br>
      </div>

      <div>
        <label for="error">Descrição do Erro</label>
        <input type="text" name="error" title="Descrição" required size="100" placeholder="Teclado Não Funciona"/><br>
      </div>
      <button>Enviar</button><br>

    </form>
  </div>

</section>

<br>

<section class="show-error">
  
  <table>
    <tr>
      <th>ID do Erro</th>
      <th>Laboratório</th>
      <th>Máquina</th>
      <th>Descrição</th>
      <th>Status</th>
    </tr>
    
    {#each data.errData as error}
    
      <tr>
        <td>{error.error_id}</td>
        <td>{error.labs.lab_name}</td>
        <td>{error.error_maq}</td>
        <td>{error.description}</td>
        <td>{error.isFixed}</td>
        <td>
          <form method="POST" action="/maqs?/deleteEntry">
            <input type="hidden" name="id" value={error.error_id} />
            <button>Remover</button>
          </form>
        </td>
        <td>
          <a href="/maqs/{error.error_id}">Editar</a>
        </td>
        <!-- {@debug error} -->
        
      </tr>
    
    {/each}
  </table>

</section>

</body>

<svelte:head>
  <title>CIET | Erros</title> <!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema.-->
  <meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET.">
</svelte:head>

<!--

  Todos tem acesso a ver quais erros existem nos laboratórios, e todos podem adicionar novos
  Mas somente administradores e bolsistas tem direito de editar e marcar como resolvidos.
  Logo, arrumar um jeito de mostrar as opções de editar e "resolver" somente para esses dois tipos de usuário.


    
  -->
  