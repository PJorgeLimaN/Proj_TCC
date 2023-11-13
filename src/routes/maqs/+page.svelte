<script lang="ts">
  
  import { error } from '@sveltejs/kit';
  import { linear } from 'svelte/easing';

    export let data; // Forma geral de todos os dados que chegam na página //let é basicamente um var, que não pode ser redeclarado, a menos que dentro de um bloco {}, como um if ou iguais.
    export let form;
    
    /* 
    Quando possível, adicionar uma maneira de enviar junto com todos os dados, o nome do usuário que realizou o cadastro do erro (FEITO)
    Se possível, encontrar uma forma de pegar o nome do usuário no computador, ou o nome da máquina, para maior facilidade de impedir ou punir aqueles que decidirem adicionar diversos erros de uma só vez
    */
    
    
    const labD = data.labData;
    const usrType = data.typeUsr || 0;
    const usrName = data.nameUsr || "";
    const usrId = data.idUsr || 0;
    
    
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
          <!-- {#each data.labData as labs} -->
          {#each labD as labs}
            <option value="{labs.lab_id}">{labs.lab_name} ({labs.maqs})</option> <!-- Por enquanto essa é a melhor maneira de mostrar a quantidade total de máquinas em um laboratório -->
          {/each}
        </select>
        <!-- Encontrar uma maneira de dar Bind no valor escolhido e o valor máximo do Laboratório -->
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

      <input type="number" name="user_id" value="{usrId}" hidden>
      <button>Enviar</button><br>

    </form>
  </div>

</section>

<br>



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
  