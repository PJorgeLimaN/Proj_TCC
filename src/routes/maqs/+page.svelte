<script lang="ts">
  
  import { error } from '@sveltejs/kit';
  import { linear } from 'svelte/easing';

    export let data; // Forma geral de todos os dados que chegam na página //let é basicamente um var, que não pode ser redeclarado, a menos que dentro de um bloco {}, como um if ou iguais.
    export let form;
    
    /* 
    Quando possível, adicionar uma maneira de enviar junto com todos os dados, o nome do usuário que realizou o cadastro do erro (FEITO)
    Se possível, encontrar uma forma de pegar o nome do usuário no computador, ou o nome da máquina, para maior facilidade de impedir ou punir aqueles que decidirem adicionar diversos erros de uma só vez
    */
    
    
    
    const usrType = data.typeUsr || 0;
    const usrName = data.nameUsr || "";
    const usrId = data.idUsr || 0;
    const machines = data.machines;
    
    
</script>

<body>

<section class="container">

  {#if form?.message}
    <h2 class="error">{form?.message}</h2>  
  {/if}

  <div class="divIn">
    <table>
      <tr>
        <th>ID da Máquina</th>
        <th>Máquina</th>
        <th>Laboratório</th>
        <th>Quantidade de Erros</th>
      </tr>

      {#each machines as maqs}
        <tr>
          <td>{maqs.maqId}</td>
          <td>{maqs.maqNum}</td>
          <td>{maqs.labs?.lab_name}</td>
          {#if maqs._count.errors > 0}
          <td style="background-color: crimson;">{maqs._count.errors}</td>
          {:else}
          <td>{maqs._count.errors}</td>
          {/if}
          <td><a href="/maqs/{maqs.maqId}" class="button">Mais Informações</a></td>
        </tr>

      {/each}
    </table>
  </div>
  <a href="./" class="button">Voltar</a>
</section>

<br>



</body>

<svelte:head>
  <title>CIET | Máquinas</title> <!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema.-->
  <meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET.">
</svelte:head>

<!--

  Todos tem acesso a ver quais erros existem nos laboratórios, e todos podem adicionar novos
  Mas somente administradores e bolsistas tem direito de editar e marcar como resolvidos.
  Logo, arrumar um jeito de mostrar as opções de editar e "resolver" somente para esses dois tipos de usuário.


    
  -->
  